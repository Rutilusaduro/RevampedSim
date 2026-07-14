import { registerPool } from '../../../textEngine/engine.js';

// Long crown — booth breaks (each part ≤200 chars for text lint)
const boothParts = [
  'The lunch rush is loud at the Anchor. Mara is in her corner booth with a plate of fries and a milkshake.',
  'She slides in like she has done a thousand times. Today the vinyl grabs her hips and does not let go.',
  'She laughs once, surprised. "Okay, hang on." She shifts her weight. The booth creaks. The diner goes quiet.',
  'Mara tries to stand. The booth holds her. Her thighs press into the cracked vinyl; the table tilts toward her.',
  'Sal comes over wiping his hands. "Mara—" She is not panicking. She is breathing hard, cheeks red, still chewing.',
  'You move to her side. The whole diner is watching now. Kayla drops a tray. Elena stands up in the back.',
  'Mara wiggles forward. Something in the frame gives with a sharp crack. She is free — but the booth is ruined.',
  'She sits back down on what is left, breathing, heavier than the booth was built for. She finishes her fries.',
  'Sal stares at the wreckage. "We are not fixing that one," he says. Mara nods. "Good." She orders pie.',
  'Elena claps once before she can stop herself. Priya, at the window, does not look away. Kayla touches her own hip.',
  'They roll the broken booth out back. Mara stays in the widened replacement when it arrives, Sharpie on the underside.',
  'The town will talk about this for years. Mara eats her pie like she won something. Maybe she did.',
];

boothParts.forEach((text, i) => {
  registerPool(`crown.mara.booth.p${i + 1}`, [{ when: {}, text: [text] }]);
});
