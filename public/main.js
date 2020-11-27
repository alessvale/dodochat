const THRESH = 0.25;
const training = false;

//Setting up a contex;

let context = {};

//Tokenizing functions;

function tokenise(sent){
    return RiTa.tokenize(sent.toLowerCase()).filter(w => !RiTa.isPunctuation(w));
}

function oneHottag(tag, dictionary){
    let vect = new Array(Object.keys(dictionary).length).fill(0);
    vect[dictionary[tag]] = 1;
    return vect;
  }

function processText(sent, dictionary){
      let vect = new Array(Object.keys(dictionary).length).fill(0);
      tokenise(sent).forEach(token =>{

          if (Object.keys(dictionary).includes(RiTa.stem(token))){
              let idx = dictionary[RiTa.stem(token)];
              vect[idx] = 1
          }
        });
      return vect
    }

async function getResults(text, dictionary){
  let vect = processText(text,dictionary);
  let vect_tf = tf.expandDims(tf.tensor1d(vect), axis = 0);
  let pred = await model.predict(vect_tf).array();
  let results = [];
  pred[0].forEach((val, index) => {
    if (val > THRESH){
    results.push([idx_to_tag[index], val]);
    }
  });

  results.sort((a, b) => b[1] - a[1]);
  return results;
}

async function response(text, dictionary, userID){
        let results = await getResults(text, dictionary);
        console.log(results);
        let answer = "I don't think I got you";
        let search = true;
        if (results.length > 0){
        while (search) {
          console.log("Looping!");
          intents["intents"].forEach(intent =>{
            if (intent['tag'] == results[0][0]){
              if (Object.keys(intent).includes("context_set")){
                context[userID] = intent["context_set"];
              }
              let responses = answers[intent["tag"]];
              answer = responses[Math.floor(Math.random() * responses.length)];
              search = false;
                }
              })
            results.pop(0);
            if (results.length == 0){
              search = false;
               }
             }
           }
            console.log(context);
            return answer;
          }

let tags = [];
let patns = [];
let answers = {};

intents["intents"].forEach(intent => {
    tags.push(intent['tag']);
    patns.push(intent['patterns']);
    answers[intent['tag']] = intent['responses'];
  });

  //tags.sort();

  //Create a doc array;

  let docs = [];

  patns.forEach(pattern => {
    pattern.forEach(p => docs.push(p));
  });

  let tag_to_idx = {};
  let idx_to_tag = {};

  tags.forEach((val, index ) => {
    tag_to_idx[val] = index;
    idx_to_tag[index] = val;
  })

  let words = [];
  docs.forEach(d => {
    tokenise(d).forEach(w => {
      words.push(RiTa.stem(w));
    })
  });

  let vocabulary = Array.from(new Set(words)).sort();

  let word_to_idx = {};

  vocabulary.forEach((val, index) => {
    word_to_idx[val] = index;
  })

  let X = [];
  let y = [];

  intents["intents"].forEach(intent => {
      let tag = oneHottag(intent['tag'], tag_to_idx);
      intent["patterns"].forEach(sent => {
          X.push(processText(sent, word_to_idx));
          y.push(tag);
        });
      });




  //Training the model;
  async function train(model){

  for (let i = 0; i < 125; i++){
     const h = await model.fit(X_train, y_train, {epochs: 20, batchSize : 16});
     console.log("Accuracy after Epoch: " + i + ": " + h.history.acc[0]);
  }
  console.log("Training ended");
  await model.save('downloads://dodomodel');
  };

 async function loadModel(path){
  model = await tf.loadLayersModel(path);
  console.log("Model loaded!");
 }

let model;

  if (training){
    let X_train = tf.tensor2d(X);
    let y_train = tf.tensor2d(y);

    model = tf.sequential();
    model.add(tf.layers.dense({units: 8, inputShape: [X_train.shape[1]], activation: 'relu'}));
    model.add(tf.layers.dense({units: 8, activation: 'relu'}));
    model.add(tf.layers.dense({units: tags.length, activation: 'softmax'}));
    model.compile({optimizer: 'sgd', loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    train(model);
  }
  else{
    model = loadModel('model/dodomodel.json');
  }
