import { registerPool } from '../../../textEngine/engine.js';

registerPool('priya.win.near.garment', [
  { when: {}, text: [
    'The compression top pulls when she demos a reach. She finishes the reach slower.',
    'Studio leggings whisper at the hip mid-squat. Priya chalks the next cue like nothing shifted.',
    'A seam along her thigh goes tight when she sits on the bench. She sits anyway.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The track jacket will not zip. She wears it open and calls it layering.',
  ] },
  { when: { rungMin: 6 }, weight: 3, text: [
    'Leggings go sheer at the stress point. The mirror pretends not to see.',
  ] },
  { when: { rungMin: 8 }, weight: 3, text: [
    'The compression top has given up pretending. Priya teaches in what still closes.',
  ] },
]);

registerPool('priya.win.near.bench', [
  { when: {}, text: [
    'The demonstration bench groans when she sits to cue form. She stays seated like she earned the sound.',
    'Wood complains under her mid-class. Priya does not get up.',
  ] },
  { when: { rungMin: 5 }, weight: 2, text: [
    'The bench dips when she demos. The client circle watches her face, not the wood.',
  ] },
]);

registerPool('priya.win.near.scale', [
  { when: {}, text: [
    'She steps on the gym scale between classes. The number pauses like it is thinking.',
    'The scale stutters. Priya steps off, then on again, smiling at the hesitation.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'Weekly weigh-in ritual — she exhales before the display. The display is not gentle.',
  ] },
]);

registerPool('priya.win.near.turnstile', [
  { when: {}, text: [
    'The turnstile catches her hip. She angles through without breaking stride.',
    'She turns sideways at the gym entrance. It is closer than it was in spring.',
  ] },
  { when: { rungMin: 7 }, weight: 2, text: [
    'The turnstile will not spin on the first push. Priya laughs and pushes again.',
  ] },
]);

registerPool('priya.win.near.generic', [
  { when: {}, text: [
    'Something creaks in the mezzanine. Priya freezes, then smiles it off too quickly.',
    'Equipment complains. She pretends not to notice. The class notices.',
  ] },
]);

registerPool('priya.win.fire.garment', [
  { when: {}, text: [
    'The compression top gives up mid-reach — a seam surrenders with a small sound.',
    'Leggings split along the thigh. Priya finishes the set looking at the class, not the tear.',
    'A zipper retreats. She keeps teaching in what still holds.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'Fabric fails. She looks at you across the floor, serene, still chewing.',
  ] },
]);

registerPool('priya.win.fire.bench', [
  { when: {}, text: [
    'The demonstration bench cracks under her. Priya stays on what is left, breathing hard.',
    'Wood splinters mid-cue. The bench is done. She is not.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The bench fails. She finishes on the floor like a queen holding court.',
  ] },
]);

registerPool('priya.win.fire.scale', [
  { when: {}, text: [
    'The scale caps out with an error tone. Priya reads it like a compliment.',
    'Numbers stop. She steps off smiling — the gym hears the surrender.',
  ] },
]);

registerPool('priya.win.fire.turnstile', [
  { when: {}, text: [
    'The turnstile jams on her hip. She is stuck for a moment. She does not look offended.',
    'She laughs before she is through. The entrance will never be the same width.',
  ] },
]);

registerPool('priya.win.fire.chair', [
  { when: {}, text: [
    'The office chair gives up with a crack that silences the front desk.',
    'Priya stays seated on what is left, answering email like nothing happened.',
  ] },
]);

registerPool('priya.win.fire.stairs', [
  { when: {}, text: [
    'Halfway up the mezzanine she stops to breathe. The stairs are honest.',
    'She takes the landing sitting down. The elevator can wait.',
  ] },
]);

registerPool('priya.win.fire.car', [
  { when: {}, text: [
    'The seatbelt will not meet. She holds it like a necklace and drives anyway.',
  ] },
]);

export const NEAR_MISS_TEMPLATES = {
  seamSplit: '{priya.win.near.garment}',
  buttonPop: '{priya.win.near.garment}',
  chairCreakFail: '{priya.win.near.bench}',
  scaleCap: '{priya.win.near.scale}',
  turnstile: '{priya.win.near.turnstile}',
  stairsWinded: '{priya.win.near.generic}',
  carSeatBelt: '{priya.win.near.bench}',
  doorframeBrush: '{priya.win.near.turnstile}',
};

export const FIRE_TEMPLATES = {
  seamSplit: '{priya.win.fire.garment}',
  buttonPop: '{priya.win.fire.garment}',
  chairCreakFail: '{priya.win.fire.bench}',
  scaleCap: '{priya.win.fire.scale}',
  turnstile: '{priya.win.fire.turnstile}',
  stairsWinded: '{priya.win.fire.stairs}',
  carSeatBelt: '{priya.win.fire.car}',
  doorframeBrush: '{priya.win.fire.turnstile}',
};
