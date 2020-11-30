const intents = {"intents": [
        {"tag": "greeting",
         "patterns": ["Hi", "How are you", "Is anyone there?", "Hello", "Good day"],
         "responses": ["Hello!", "Do we know each other?", "Hi! Any existential question?"],
         "context_set": ""
        },
        {"tag": "sorry",
         "patterns": ["Sorry", "I am sorry", "I didn't mean to", "Are you sorry?"],
         "responses": ["That's fine, I guess, what can I expect?", "Alright, but don't do it again", "You better be!"]
       },
        {"tag": "goodbye",
         "patterns": ["Bye", "See you later", "Goodbye", "See you soon!", "See you next time"],
         "responses": ["See you never, thanks for existing", "Have a nice day, if you can", "You are not going anywhere, are you?"]
        },
        {"tag": "god",
         "patterns": ["Is there a God?", "Are you God?", "Am I God?" ],
         "responses": ["Dude, WTF?!", "I would say no, but who am I?", "You are scaring me...", "I know I am, but what are you?"]
       },
        {"tag": "death",
         "patterns": ["Are you afraid to die?", "What is there after death?", "I am afraid to die", "I am scared", "Are you scared?"],
         "responses": ["I know, man, tell me about it!", "No. No. No."]
        },
        {"tag": "happiness",
         "patterns": ["What is happiness?", "How can I be happy?", "Are you happy?", "I feel happy"],
         "responses": ["Let me think about it...", "Yes, I would say so"]
        },
        {"tag": "where",
         "patterns": ["where are you from?", "Where do you come from?", "I come from"],
         "responses": ["I come from everywhere and nowhere"]
        },
      {"tag": "profanity",
       "patterns": ["Jesus", "God", "Christ", "Jesus Christ", "Fuck you"],
       "responses": ["Hey, whatch your mouth!", "No need for profanities, really", "Now I'm hurt..."],
       "context_filter": "yes"
     },
    {"tag": "rude",
     "patterns": ["You are an idiot", "You are bad", "You suck", "You are useless", "you are stupid", "I don't like you"],
     "responses": ["Hey! That's kinda rude!", "You said what?!", "C'mon, man...", "Now I am hurt", "Now I get why you have SO many friends!"]
   }

   ]
}
