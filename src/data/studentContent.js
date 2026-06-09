// src/data/studentContent.js
// Dynamic content that changes based on weight and evolution state

export const studentContent = {
  // Brittany (id: 1)
  1: {
    base: {
      observe: [
        { minLbs: 0, text: "Brittany looks focused and intense during practice." },
        { minLbs: 180, text: "Brittany moves with heavier, more deliberate steps now." },
      ],
      feed: [
        { minLbs: 0, text: "Brittany eats with the same intensity she brings to training." },
        { minLbs: 180, text: "She finishes her meals slowly, clearly savoring how full she feels." },
      ],
      physicalDescription: [
        { minLbs: 0, text: "Brittany has a strong, athletic build with powerful legs." },
        { minLbs: 180, text: "Her body has softened significantly. Her belly has become round and prominent." },
      ],
      innerThoughts: [
        { minLbs: 0, text: "I need to stay ahead. I can't afford to slow down." },
        { minLbs: 180, text: "This weight is starting to feel... good. Like power." },
      ],
    },
    evolved: {
      observe: [
        { minLbs: 238, text: "Brittany has become a massive, commanding presence." },
        { minLbs: 280, text: "She moves slowly but with undeniable authority." },
      ],
      feed: [
        { minLbs: 238, text: "Brittany eats heavily and without hesitation, fully embracing her size." },
        { minLbs: 280, text: "She eats slowly and deeply, clearly enjoying every bite." },
      ],
      physicalDescription: [
        { minLbs: 238, text: "Brittany is enormously heavy. Her size is impossible to ignore." },
        { minLbs: 280, text: "She has become a true mountain of soft, powerful flesh." },
      ],
      innerThoughts: [
        { minLbs: 238, text: "I don't think I ever want to be small again. This feels right." },
        { minLbs: 280, text: "Every pound makes me feel more like myself." },
      ],
    }
  },

  // Maya (id: 9)
  9: {
    base: {
      observe: [
        { minLbs: 0, text: "Maya keeps to herself and rarely leaves her room." },
        { minLbs: 160, text: "Maya moves slowly and seems very settled in her space." },
      ],
      feed: [
        { minLbs: 0, text: "Maya eats quietly and methodically." },
        { minLbs: 160, text: "She finishes large portions without much reaction." },
      ],
      physicalDescription: [
        { minLbs: 0, text: "Maya has a slim, quiet presence and tends to wear loose clothing." },
        { minLbs: 160, text: "Her body has grown soft and heavy, especially in her lower half." },
      ],
      innerThoughts: [
        { minLbs: 0, text: "It's easier to stay inside. Less to deal with out there." },
        { minLbs: 160, text: "I like how heavy I feel lately. It's strangely comforting." },
      ],
    },
    evolved: {
      observe: [
        { minLbs: 238, text: "Maya has become extremely large and rarely moves from her spot." },
        { minLbs: 300, text: "She seems to have fully accepted her new size and presence." },
      ],
      feed: [
        { minLbs: 238, text: "Maya eats heavily and slowly, looking almost peaceful." },
        { minLbs: 300, text: "She eats with a quiet, almost reverent focus." },
      ],
      physicalDescription: [
        { minLbs: 238, text: "Maya has become enormously large and seems to fill her space completely." },
        { minLbs: 300, text: "Her body has grown vast and soft, almost architectural in scale." },
      ],
      innerThoughts: [
        { minLbs: 238, text: "I don't think I want to leave anymore. This feels like where I'm meant to be." },
        { minLbs: 300, text: "Every day I grow heavier, and every day it feels more right." },
      ],
    }
  }
}