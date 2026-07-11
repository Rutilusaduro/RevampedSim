import { registerPool } from '../../../textEngine/engine.js';

registerPool('win.near.generic', [
  { when: {}, text: [
    'Something creaks. {subject.first} freezes, then laughs too loud.',
    'A seam pulls. She pretends not to notice. You noticed.',
  ] },
]);

registerPool('win.near.garment', [
  { when: {}, text: [
    'Her blouse pulls when she reaches. She finishes the reach slower.',
    'The gray jeans are tight at the hip. {subject.first} exhales and keeps walking.',
    'A button strains. Holds. Her hand touches it once, then drops.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The seam along her thigh goes tight when she sits. She sits anyway.',
  ] },
]);

registerPool('win.near.chair', [
  { when: {}, text: [
    'The chair groans. She shifts her weight and it stops — for now.',
    'Wood creaks under her. {subject.first} acts like she did not hear it.',
  ] },
  { when: { rungMin: 4 }, weight: 2, text: [
    'The staff chair creaks twice when she sits down. She stays put.',
  ] },
]);

registerPool('win.near.booth', [
  { when: {}, text: [
    'The booth vinyl squeaks under her. She runs a finger down the menu.',
    'The booth cushion compresses flat. {subject.first} does not get up.',
  ] },
  { when: { rungMin: 9 }, weight: 2, text: [
    'The corner booth vinyl is flat under her before she orders.',
    'She has to squeeze into the booth. She squeezes anyway.',
  ] },
  { when: { rungMin: 11 }, weight: 2, text: [
    'The booth frame groans when she sits. The whole diner hears it.',
    'She takes both sides of the booth now. Nobody sits with her. Nobody minds.',
  ] },
]);

registerPool('win.near.door', [
  { when: {}, text: [
    'She turns sideways at the door. It is a tighter fit than it used to be.',
    'The doorframe brushes her shoulder. She pushes through.',
  ] },
]);

registerPool('win.fire.chair', [
  { when: {}, text: [
    'The chair cracks. The room goes quiet.',
    '{subject.first} stays on what is left of the seat, breathing hard.',
    'Wood splinters. The chair is broken. She is not moving.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The chair breaks. She looks at the mess, then at you, and smiles.',
  ] },
]);

registerPool('win.fire.booth', [
  { when: {}, text: [
    'The booth vinyl tears. {subject.name} laughs — surprised, then pleased.',
    'She is stuck for a second. She does not look upset about it.',
    'The booth frame cracks. Sal comes running.',
  ] },
]);

registerPool('win.fire.garment', [
  { when: {}, text: [
    'A button pops off. Small sound. Everyone looks.',
    '{subject.first} looks down at the gap, then up at you, cheeks red.',
    'The seam splits. Fabric gives way.',
  ] },
]);

registerPool('win.fire.door', [
  { when: {}, text: [
    'She turns sideways. She still does not fit.',
    'She laughs while she wedges herself through.',
    'The doorframe wins. She keeps pushing anyway.',
  ] },
]);

registerPool('win.fire.car', [
  { when: {}, text: [
    'The seatbelt will not click. She holds it across her chest and drives.',
    'The car seat groans when she sits. She starts the engine anyway.',
  ] },
]);

registerPool('win.fire.stairs', [
  { when: {}, text: [
    'Halfway up she stops to catch her breath.',
    'She sits on the landing. She will take the elevator next time.',
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
