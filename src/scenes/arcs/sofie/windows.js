import { registerPool } from '../../../textEngine/engine.js';

registerPool('sofie.win.near.garment', [
  { when: {}, text: [
    'The inherited cardigan gaps when you reach for a high shelf. You reach anyway.',
    'The library skirt rides when you sit at the desk. You smooth it once, then stop bothering.',
    'A button on the cardigan strains. Holds. Your hand drifts to it, then away.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The soft belt will not find its old hole. You wear it where it wants to live.',
  ] },
  { when: { rungMin: 6 }, weight: 3, text: [
    'The cardigan will not close. You keep it on your shoulders like a flag.',
  ] },
  { when: { rungMin: 8 }, weight: 3, text: [
    'Fabric gives when you bend for a dropped pen. You stand slower. You stand anyway.',
  ] },
]);

registerPool('sofie.win.near.chair', [
  { when: {}, text: [
    'The desk chair groans when you settle in for cataloging. You shift your weight and the sound stops — for now.',
    'Wood complains under you at the reading desk. You pretend you did not hear it.',
  ] },
  { when: { rungMin: 4 }, weight: 2, text: [
    'The desk chair creaks twice when you sit. You stay seated like you earned the noise.',
  ] },
  { when: { rungMin: 7 }, weight: 2, text: [
    'The rotunda chair sighs before you even sit. You sit anyway.',
  ] },
]);

registerPool('sofie.win.near.cart', [
  { when: {}, text: [
    'The book cart lists when you lean across it. You redistribute the stacks and lean again.',
    'A wheel complains. You push through the stacks like nothing shifted.',
  ] },
]);

registerPool('sofie.win.near.door', [
  { when: {}, text: [
    'You turn sideways at the bakery door. It is closer than it used to be.',
    'The elevator door brushes your shoulder. You shoulder through without breaking stride.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'The slow elevator groans on your floor. You take the stairs tomorrow. Maybe.',
  ] },
]);

registerPool('sofie.win.near.generic', [
  { when: {}, text: [
    'Something in the stacks creaks when you pass. You freeze, then keep walking — slower.',
    'A shelf bracket complains. You pretend not to notice. The quiet notices.',
  ] },
]);

registerPool('sofie.win.fire.garment', [
  { when: {}, text: [
    'A button on the cardigan pops — small sound, huge punctuation.',
    'You look down at the gap, then up at the empty desk, cheeks warm.',
    'The skirt seam surrenders. Fabric parts like it was always going to.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The cardigan gives up. You keep it on your lap like a pet.',
  ] },
]);

registerPool('sofie.win.fire.chair', [
  { when: {}, text: [
    'The desk chair gives up with a crack that silences the circulation desk.',
    'You stay seated on what is left, breathing hard, not leaving.',
    'Wood splinters. The chair is done. You are not.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The chair fails. You look at the wreckage, then at your pastry, serene.',
  ] },
]);

registerPool('sofie.win.fire.cart', [
  { when: {}, text: [
    'The book cart buckles when you lean. Volumes slide. You laugh — surprised, not offended.',
    'A wheel cracks. You finish the shift dragging beauty like penance.',
  ] },
]);

registerPool('sofie.win.fire.door', [
  { when: {}, text: [
    'You turn sideways. The bakery doorframe still wins.',
    'You are laughing before you are free.',
    'The door and your hips disagree. The door is learning.',
  ] },
]);

registerPool('sofie.win.fire.stairs', [
  { when: {}, text: [
    'Halfway up the mezzanine you stop to breathe. The stairs are not cruel — just honest.',
    'You take the landing sitting down. The elevator can wait.',
  ] },
]);

registerPool('sofie.win.fire.turnstile', [
  { when: {}, text: [
    'The slow elevator jams between floors with you inside. You are not in a hurry.',
  ] },
]);

export const NEAR_MISS_TEMPLATES = {
  buttonPop: '{sofie.win.near.garment}',
  seamSplit: '{sofie.win.near.garment}',
  chairCreakFail: '{sofie.win.near.chair}',
  doorframeBrush: '{sofie.win.near.door}',
  stairsWinded: '{sofie.win.near.generic}',
  turnstile: '{sofie.win.near.door}',
};

export const FIRE_TEMPLATES = {
  buttonPop: '{sofie.win.fire.garment}',
  seamSplit: '{sofie.win.fire.garment}',
  chairCreakFail: '{sofie.win.fire.chair}',
  doorframeBrush: '{sofie.win.fire.door}',
  stairsWinded: '{sofie.win.fire.stairs}',
  turnstile: '{sofie.win.fire.turnstile}',
};
