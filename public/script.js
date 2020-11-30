
let messages = [],
lastUserMessage = "";
let userID = Math.floor(Math.random() * 10000);

let time = Math.floor(Date.now() / 1000);

 async function newEntry() {
  //if the message from the user isn't empty then run
  if (document.getElementById("chatbox").value != "") {
    time = Math.floor(Date.now() / 1000);
    lastUserMessage = document.getElementById("chatbox").value;
    document.getElementById("chatbox").value = "";
    messages.push("<b>" + "Me" + ":</b> " + lastUserMessage);

    let reply = await response(lastUserMessage, word_to_idx, userID);


              messages.push("<b>" + "Dodo" + ":</b> " + reply);
            
                for (var i = 1; i < 8; i++) {
                    if (messages[messages.length - i])
                      document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
                  }
                }
              }

document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
}

function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}

setInterval(function(){

let current_time = Math.floor(Date.now() / 1000);
if (current_time - time > 10){

  time = Math.floor(Date.now() / 1000);

  let answers = ["I'm sooo bored!", "Man, kill me now...", "Are you ok?", "I feel you are ignoring me :("];
  let answer = answers[Math.floor(Math.random() * answers.length)];
  messages.push("<b>" + "Dodo" + ":</b> " + answer);


    for (var i = 1; i < 8; i++) {
        if (messages[messages.length - i])
          document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
      }
    }
}, 80000);
