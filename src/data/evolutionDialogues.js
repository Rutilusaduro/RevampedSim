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
          { 
            text: "Good. I think this is going to be good for you.", 
            brand: "CrunchForge",
            result: "Destiny has taken a sponsorship with CrunchForge."
          }
        ]
      }
    },
    onComplete: {
      formId: "branded_glutton"
    }
  }
}
