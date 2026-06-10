export const diaries = {
  6: { // Destiny
    base: [
      { minLbs: 80, text: "..." },
      { minLbs: 135, text: "..." },
      // add more weight thresholds
    ],
    evolved: {
      branded_glutton: {
        CrunchForge: [
          { minLbs: 238, text: "CrunchForge-specific diary entry..." },
          { minLbs: 285, text: "..." },
        ],
        GlazeCo: [
          { minLbs: 238, text: "GlazeCo-specific diary entry..." },
          { minLbs: 285, text: "..." },
        ],
        // add FizzPeak and VelvetMelt the same way
        default: [ // fallback if no brand match
          { minLbs: 238, text: "Generic branded_glutton diary..." },
        ]
      }
    }
  }
}
