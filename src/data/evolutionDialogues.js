export const evolutionDialogues = {
  6: { // Destiny
    id: 6,
    name: "Destiny",
    title: "Destiny seems distracted...",
    steps: [
      {
        id: 1,
        speaker: "You",
        text: "Hey Destiny, you've been really quiet lately. Is everything okay? You seem hesitant to eat more."
      },
      {
        id: 2,
        speaker: "Destiny",
        text: "...Yeah. I've been thinking about it a lot. I've already gained so much weight. I don't know if I should keep going."
      },
      {
        id: 3,
        speaker: "You",
        text: "What's holding you back?"
      },
      {
        id: 4,
        speaker: "Destiny",
        text: "It's not that I'm scared exactly... It's just that if I keep going, there's no turning back. But lately I've been getting all these emails from snack companies."
      },
      {
        id: 5,
        speaker: "You",
        text: "Snack companies?"
      },
      {
        id: 6,
        speaker: "Destiny",
        text: "Yeah. CrunchForge, FizzPeak, VelvetMelt, GlazeCo... They all want to sponsor me if I go full send on the gaining content. Like, officially become their 'Branded Glutton'."
      },
      {
        id: 7,
        speaker: "You",
        text: "And what do you think about that?"
      },
      {
        id: 8,
        speaker: "Destiny",
        text: "I think... I kind of want it. I want to see how big I can really get. For the content. For the brands. For me."
      },
      {
        id: 9,
        speaker: "You",
        text: "Then let's do it. Which brand feels right to you?"
      }
    ],
    choices: [
      { 
        text: "CrunchForge", 
        brand: "CrunchForge",
        result: "Destiny has signed a sponsorship deal with CrunchForge."
      },
      { 
        text: "FizzPeak", 
        brand: "FizzPeak",
        result: "Destiny has signed a sponsorship deal with FizzPeak."
      },
      { 
        text: "VelvetMelt", 
        brand: "VelvetMelt",
        result: "Destiny has signed a sponsorship deal with VelvetMelt."
      },
      { 
        text: "GlazeCo", 
        brand: "GlazeCo",
        result: "Destiny has signed a sponsorship deal with GlazeCo."
      }
    ]
  }
}
