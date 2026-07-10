import { registerPool } from '../../../textEngine/engine.js';

// Near-miss register — evidence over verdict (exemplar §4)
registerPool('win.near.generic', [
  { when: {}, text: [
    'Something creaks. {subject.first} freezes, then laughs it off too quickly.',
    'A seam complains. She pretends not to notice. You both notice.',
  ] },
]);

registerPool('win.near.garment', [
  { when: {}, text: [
    'The blouse pulls when she reaches — a small hitch. She finishes the reach slower.',
    'The gray jeans whisper at the hip. {subject.first} exhales and keeps walking.',
    'A button strains. Holds. Her hand drifts to it once, then away.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The seam along her thigh goes tight when she sits. She sits anyway.',
  ] },
]);

registerPool('win.near.chair', [
  { when: {}, text: [
    'The chair groans. She shifts her weight and the sound stops — for now.',
    'Wood complains under her. {subject.first} pretends she did not hear it.',
  ] },
  { when: { rungMin: 4 }, weight: 2, text: [
    'The staff chair creaks twice when she settles. She stays seated like she earned the noise.',
  ] },
]);

registerPool('win.near.booth', [
  { when: {}, text: [
    'Vinyl sighs under her in the corner booth. She traces the menu with one finger, unbothered.',
    'The booth leather compresses. {subject.first} does not get up.',
  ] },
  { when: { rungMin: 5 }, weight: 2, text: [
    'The corner booth pinches her hips. She laughs — surprised, not offended.',
  ] },
]);

registerPool('win.near.door', [
  { when: {}, text: [
    'She turns sideways at the door. It is closer than it used to be.',
    'The doorframe brushes her shoulder. She shoulders through without breaking stride.',
  ] },
]);

registerPool('win.fire.chair', [
  { when: {}, text: [
    'The chair gives up with a crack that silences the room.',
    '{subject.first} stays seated on what is left, breathing hard, not leaving.',
    'Wood splinters. The chair is done. She is not.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The chair fails. She looks at the wreckage, then at you, serene.',
  ] },
]);

registerPool('win.fire.booth', [
  { when: {}, text: [
    'The booth pinches, then refuses. {subject.name} laughs — surprised, delighted.',
    'Vinyl protests. The corner booth will never be the same.',
    'She is stuck for a moment. She does not look like she minds.',
  ] },
]);

registerPool('win.fire.garment', [
  { when: {}, text: [
    'A button pops — small sound, huge punctuation.',
    '{subject.first} looks down, then up at you, cheeks warm.',
    'The seam surrenders. Fabric parts like it was always going to.',
  ] },
]);

registerPool('win.fire.door', [
  { when: {}, text: [
    'She turns sideways. The doorframe still wins.',
    'She is laughing before she is free.',
    'The door and her hips disagree. The door is learning.',
  ] },
]);

registerPool('win.fire.car', [
  { when: {}, text: [
    'The seatbelt will not meet. She holds it like a necklace and drives anyway.',
    'The hatchback seat has opinions. {subject.first} has more.',
  ] },
]);

registerPool('win.fire.stairs', [
  { when: {}, text: [
    'Halfway up she stops to breathe. The stairs are not cruel — just honest.',
    'She takes the landing sitting down. The elevator can wait.',
  ] },
]);

export const NEAR_MISS_TEMPLATES = {
  garment: '{win.near.garment}',
  object: '{win.near.chair}',
  boothPinch: '{win.near.booth}',
  chairCreakFail: '{win.near.chair}',
  seamSplit: '{win.near.garment}',
  buttonPop: '{win.near.garment}',
  doorframeBrush: '{win.near.door}',
  doorStuck: '{win.near.door}',
  carSeatBelt: '{win.near.chair}',
  stairsWinded: '{win.near.chair}',
};

export const FIRE_TEMPLATES = {
  chairCreakFail: '{win.fire.chair}',
  boothPinch: '{win.fire.booth}',
  seamSplit: '{win.fire.garment}',
  buttonPop: '{win.fire.garment}',
  doorframeBrush: '{win.fire.door}',
  doorStuck: '{win.fire.door}',
  carSeatBelt: '{win.fire.car}',
  stairsWinded: '{win.fire.stairs}',
};
