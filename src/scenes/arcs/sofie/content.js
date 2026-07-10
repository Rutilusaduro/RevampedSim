import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.mirrorCheck', [
  { when: {}, text: ['Check the mirror — honestly', 'Look at yourself the way you look at books'] },
]);
registerPool('seat.bakeryRun', [
  { when: {}, text: ['Bakery run — permission granted', 'Second pastry, no witness required'] },
]);
registerPool('seat.stacksShift', [
  { when: {}, text: ['Shift the stacks around your new geometry', 'Work the desk; feel the chair notice'] },
]);
registerPool('seat.cardiganRitual', [
  { when: {}, text: ['Try the cardigan again', 'Keep it anyway'] },
]);

registerPool('inhabit.morning', [
  { when: {}, text: [
    'You wake already hungry. The cardigan on the chair will not close. You keep it.',
    'Morning light in the stacks. You have been thinking about pastries since yesterday.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The inherited cardigan gaps at the buttons. You wear it anyway — costume becoming skin.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    'You catch your reflection in the elevator door and do not look away as quickly as you used to.',
    'The library skirt rides when you reach high shelves. You reach anyway.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The desk chair announces you — a creak, then a second settling creak.',
    'You pour coffee into a mug that feels smaller. You fill it twice.',
  ] },
  { when: { rungMin: 6 }, weight: 3, text: [
    'Morning is logistics now — which chair, which belt, which pastry first.',
    'You choose the reinforced reading chair without being asked.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'You hum while you eat — not hiding, not apologizing.',
    'Joy sits in your chest like a second meal before breakfast.',
  ] },
]);

registerPool('inhabit.meal', [
  { when: {}, text: [
    'You eat like you are finally allowed. You were the stop, once.',
    'Pastry flakes on your skirt. You brush at it. You do not care enough to stop.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'You order two without pretending it is for someone else. You eat both at the desk.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'You order two. You eat both. The pleasure is private and complete.',
  ] },
]);

registerPool('inhabit.evening', [
  { when: {}, text: ['Evening in the apartment. The fridge again. The quiet is yours.'] },
  { when: { rungMin: 4 }, weight: 2, text: ['The couch receives more of you than last month. You notice. You stay.'] },
  { when: { flipped: true }, weight: 2, text: ['You eat again because the day is not finished with you yet.'] },
]);

registerPool('inhabit.arg.notice', [
  { when: {}, text: [
    'Your mother calls. She mentions your voice sounding "tired." You sound happy.',
    'A stranger in the bakery looks at you a second too long. You like it.',
  ] },
]);
registerPool('inhabit.arg.concern', [
  { when: {}, text: ['Your mother asks about the cardigan. You lie beautifully.'] },
]);
registerPool('inhabit.arg.intervention', [
  { when: {}, text: ['The department whispers. You hear it in the stacks. You eat anyway.'] },
]);

registerPool('inhabit.mind.secret', [
  { when: {}, text: [
    'You wanted this before you had words for it. The cardigan was always a costume.',
    'Joy sits in your chest like a second meal.',
  ] },
]);

registerPool('crown.sofie.chair', [
  { when: {}, text: [
    'The rotunda reading chair was older than the town\'s arguments. It gives under you like a vow kept.',
    'You stay seated. The library stays quiet. Then applause — soft, real.',
  ] },
]);

registerPool('sofie.end.settling', [
  { when: {}, text: [
    'You stay at the library. The stacks reorganize around you without asking.',
    'The chain continues somewhere you cannot see yet.',
  ] },
]);

registerPool('sofie.end.interstitial', [
  { when: {}, text: [
    'The rotunda gets a reinforced reading chair. Nobody holds a vote.',
    'Your mother stops calling as often. The bakery knows your order.',
    'Halcyon loses another small argument before the stacks open.',
  ] },
]);
