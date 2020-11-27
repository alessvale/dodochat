const intents = {"intents": [
        {"tag": "greeting",
         "patterns": ["Hi", "How are you", "Is anyone there?", "Hello", "Good day"],
         "responses": ["Hello!", "Do we know each other?", "Hi, any existential question?"],
         "context_set": ""
        },
        {"tag": "sorry",
         "patterns": ["Sorry", "I am sorry"],
         "responses": ["That's fine, I guess, what can I expect?", "Alright, but don't do it again", "You better be!"]
       },
        {"tag": "goodbye",
         "patterns": ["Bye", "See you later", "Goodbye"],
         "responses": ["See you never, thanks for existing", "Have a nice day, if you can", "You are not going anywhere, are you?"]
        },
        {"tag": "thanks",
         "patterns": ["Thanks", "Thank you", "That's helpful"],
         "responses": ["Whatever", "Any time!", "Never again. please"]
        },
        {"tag": "god",
         "patterns": ["Is there a God?", "Are you God?", "Am I God?" ],
         "responses": ["Dude, WTF?!", "I would say no, but who am I?"]
        },
        {"tag": "death",
         "patterns": ["Are you afraid to die?", "What is there after death?", "I am afraid to die" ],
         "responses": ["I know, man, tell me about it!", "No. No. No."]
        },
        {"tag": "name",
         "patterns": ["What is your name?", "Do you have a name?" ],
         "responses": ["I am Dodo!", "Guess..."]
       },
        {"tag": "happiness",
         "patterns": ["What is happiness?", "How can I be happy?", "Are you happy?" ],
         "responses": ["Let me think about it", "Yes, I would say so"]
        },
        {"tag": "love",
         "patterns": ["love", "hate", "Are you in love?", "I love you"],
         "responses": ["Why do you think so?", "Tell me more about it"]
        },
        {"tag": "where",
         "patterns": ["where are you from?", "Where do you come from?" ],
         "responses": ["I come from everywhere and nowhere"]
        },
        {"tag": "funny",
         "patterns": ["funny", "ahaha"],
         "responses": ["You are so funny, are you?"]
       },
       {"tag": "yes",
        "patterns": ["yes"],
        "responses": ["Now we are talking", "I thought so", "Oh, yeahh!"],
        "context_filter": "yes"
      },
      {"tag": "profanity",
       "patterns": ["Jesus", "God", "Christ", "Jesus Christ"],
       "responses": ["Hey, whatch your mouth!", "No need for profanities, really", "Now I'm hurt..."],
       "context_filter": "yes"
     },
      {"tag": "no",
       "patterns": ["no"],
       "responses": ["Of course you would say that", "Eheh", "Just don't do heroin, man"],
       "context_filter": "yes"
     },
     {"tag": "ok",
      "patterns": ["ok"],
      "responses": [""]
    },
    {"tag": "rude",
     "patterns": ["You are an idiot", "You are bad", "You suck", "You are useless"],
     "responses": ["Hey! That's kinda rude!", "You said what?!", "C'mon, man..."]
   }

   ]
}
