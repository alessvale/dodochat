const THRESH = 0.25;
const EARLY_STOP = 5;
const training = true;

//Setting up a contex;

let context = {};
console.log(RiTa.STOP_WORDS);
//Tokenizing functions;

function tokenise(sent){
    return RiTa.tokenize(sent.toLowerCase()).filter(w => (!RiTa.STOP_WORDS.includes(w)) || w == "?" || w == "!");
}

function oneHottag(tag, dictionary){
    let vect = new Array(Object.keys(dictionary).length).fill(0);
    vect[dictionary[tag]] = 1;
    return vect;
  }

function processText(sent, dictionary){
      let vect = new Array(Object.keys(dictionary).length).fill(0);
      tokenise(sent).forEach(token =>{

          if (Object.keys(dictionary).includes(token)){
              let idx = dictionary[token];
              vect[idx] = 1
          }
          else {
            idx = dictionary["UNK"];
            vect["UNK"] = 1;
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
        
        let answer = "I don't think I got you";
        let search = true;
        if (results.length > 0){
        while (search) {
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
      words.push(w);
    })
  });

  let vocabulary = Array.from(new Set(words)).sort();

  let word_to_idx = {};

  vocabulary.forEach((val, index) => {
    word_to_idx[val] = index + 1;
  })
  word_to_idx["UNK"] = 0;

  console.log(word_to_idx);

  let X = [];
  let y = [];

  intents["intents"].forEach(intent => {
      let tag = oneHottag(intent['tag'], tag_to_idx);
      intent["patterns"].forEach(sent => {
          X.push(processText(sent, word_to_idx));
          y.push(tag);
        });
      });

      let l = X.length;
      let size = parseInt(Math.floor(l * 0.9));
      console.log("Dataset length: " + l);

      let X_tot = tf.tensor2d(X);
      let y_tot = tf.tensor2d(y);

      let X_train = tf.tensor2d(X.slice(0, size));
      let y_train = tf.tensor2d(y.slice(0, size));
      let X_val = tf.tensor2d(X.slice(size, l));
      let y_val = tf.tensor2d(y.slice(size, l));


  //Training the model;
  async function train(model){
  let count = 0;

  for (let i = 0; i < 1000; i++){
     const h = await model.fit(X_tot, y_tot, {epochs: 1, validationSplit: 0.2});
    // console.log(h);
     let preds = await model.predict(X_val);
     let acc = h.history.acc[0];
     let val_acc = h.history.val_acc[0];
     //let val_acc = await tf.metrics.categoricalAccuracy(y_val, preds).mean().array();
     console.log("Epoch: " + i + ", Train : " + acc + ", Val: " + val_acc);

     if (acc > 4){
       count += 1;
     }
     if (count > EARLY_STOP) break;
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

    model = tf.sequential();
    model.add(tf.layers.dense({units: 6, inputShape: [X_train.shape[1]], activation: 'relu'}));
    model.add(tf.layers.dense({units: 6, activation: 'relu'}));
    model.add(tf.layers.dense({units: tags.length, activation: 'softmax'}));
    model.compile({optimizer: tf.train.adam(0.001), loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    train(model);
  }
  else{
    model = loadModel('model/dodomodel.json');
  }
