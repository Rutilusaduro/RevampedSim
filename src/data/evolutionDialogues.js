export const evolutionDialogues = {
  6: {
    id: 6,
    title: "Destiny's Brand Offer",
    start: "intro",
    nodes: {
      intro: {
        speaker: "Destiny",
        text: "So... I got this email. A snack company wants to sponsor me. They want me to do big eating challenges on stream. I don’t know... it feels like if I do this, I’m basically signing up to get way bigger, doesn’t it?",
        choices: [
          { text: "It could be a good opportunity. You’ve been wanting to grow your channel.", next: "push_back" },
          { text: "You’re worried it’ll make you gain weight faster?", next: "worried" }
        ]
      },
      worried: {
        speaker: "Destiny",
        text: "Yeah... exactly. Like, I already feel like I’m getting soft. If I start doing these huge challenges every week... I don’t know if I’ll be able to stop. What if I just keep getting bigger and bigger?",
        choices: [
          { text: "That’s not necessarily a bad thing. A lot of your viewers would love to see that.", next: "push_back" },
          { text: "You don’t have to decide everything at once. You can try one challenge and see how it feels.", next: "try_one" }
        ]
      },
      push_back: {
        speaker: "Destiny",
        text: "I guess... but it still feels like I’m choosing to get fatter on purpose. Like I’m giving up control. Doesn’t that sound kind of scary?",
        choices: [
          { text: "You’re not giving up control. You’re choosing to lean into something you already enjoy.", next: "lean_in" },
          { text: "Scary can be exciting too. Especially when it’s something you secretly want.", next: "lean_in" }
        ]
      },
      try_one: {
        speaker: "Destiny",
        text: "...Maybe. One challenge doesn’t mean I have to keep doing it forever, right? I could always say no later if it gets too much.",
        choices: [
          { text: "Exactly. You’re allowed to explore it without committing to it forever.", next: "accept" }
        ]
      },
      lean_in: {
        speaker: "Destiny",
        text: "...When you put it like that, it doesn’t sound as bad. Maybe I’ve been overthinking it. If I’m already gaining, maybe I should just... see how far it goes.",
        choices: [
          { text: "That’s the spirit. You deserve to enjoy this.", next: "accept" }
        ]
      },
      accept: {
        speaker: "Destiny",
        text: "...Okay. I think I’m gonna do it. I’ll reply to them tonight.",
        choices: [
          { text: "Good. I think this is going to be good for you.", next: "sponsor_pick",} 
           ]
      },
        sponsor_pick: {
          speaker: "Destiny",
          text: "Oh no....there's more e-mails, I don't know who to pick!",
          choices: [
            { text: "That's okay, let me help, it's the last I can do, after all", next: "sponsor_options"}
            ]
        },
      sponsor_options: {
        Speaker: "Destiny",
        text: "okay, these are the four that have e-mailed me:",
        choices: [
          { text: "There's CrunchForge. They do, like… really crunchy stuff. Chips, crackers, those super thick kettle chips. They want me to do these big, loud challenge videos where I just power through massive bags. I dunno… it feels kind of aggressive? Like I’d be making a whole show out of how much I can stuff myself", brand: "Crunchforge", result: "Destiny has taken the sponsorship with CrunchForge!"},
          { text: "There's FizzPeak. They’re the soda and energy drink people. They want me to do chugging challenges and ‘try every flavor’ streams. I’d probably be burping a lot on camera… and I know how bloated I get when I drink too much fizzy stuff. It kinda makes me nervous thinking about how big my stomach would look after.",  brand: "FizzPeak", result: "Destiny has taken the sponsorship with FizzPeak!"},
          { text: "There's VelvetMelt. They specialize in chocolate and caramel stuff. Really rich, melty desserts. Their whole thing is ‘slow indulgence’ — like they want me to take my time and really savor everything. It sounds… kinda nice? But also dangerous. I feel like I’d end up eating way more than I meant to if I went with them",  brand: "VelvetMelt", result: "Destiny has taken the sponsorship with VelvetMelt!"},
          { text: "There's GlazeCo. They make donuts and pastries. Everything’s super soft and glazed. They said they want this cozy, ‘treat yourself’ vibe where I just keep eating these warm, fluffy donuts on stream. It sounds the least intense out of all of them… but I already know how easy it is for me to lose track when I’m eating soft stuff.",  brand: "GlazeCo", result: "Destiny has taken the sponsorship with GlazeCo!"},
        ]
          }
    }
      }
    },
    onComplete: {
      formId: "branded_glutton"
    }
  }
}
