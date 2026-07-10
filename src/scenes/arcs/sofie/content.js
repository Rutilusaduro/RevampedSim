import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.mirrorCheck', [
  { when: {}, text: ['Check the mirror — honestly', 'Look at yourself the way you look at books'] },
  { when: { rungMin: 5 }, weight: 2, text: ['Check the elevator doors — honestly'] },
]);
registerPool('seat.bakeryRun', [
  { when: {}, text: ['Bakery run — permission granted', 'Second pastry, no witness required'] },
  { when: { flipped: true }, weight: 2, text: ['Third pastry — the baker knows your name'] },
]);
registerPool('seat.stacksShift', [
  { when: {}, text: ['Shift the stacks around your new geometry', 'Work the desk; feel the chair notice'] },
  { when: { rungMin: 6 }, weight: 2, text: ['Shift the stacks — the cart notices now'] },
]);
registerPool('seat.cardiganRitual', [
  { when: {}, text: ['Try the cardigan again', 'Keep it anyway'] },
  { when: { rungMin: 4 }, weight: 2, text: ['Try the belt again. Keep it where it wants.'] },
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
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'Morning is logistics now — which chair, which belt, which pastry first.',
    'You choose the reinforced reading chair without being asked.',
    'You cross the stacks on a sway that was not there in spring.',
  ] },
  { when: { rungMin: 8 }, weight: 3, text: [
    'The rotunda is yours before the doors open. The town pretends that was always true.',
    'You shelve by feel now — geometry learned, not fought.',
    'Morning is appetite first, catalog second. You do not apologize for the order.',
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
  { when: { stance: 'secret' }, weight: 3, text: [
    'You eat like nobody is watching. Somebody is. You like that too.',
    'Seconds were a secret. Now they are a habit with good lighting.',
  ] },
  { when: { rungMin: 3, rungMax: 5 }, weight: 2, text: [
    'You order two without pretending it is for someone else. You eat both at the desk.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'You eat between stacks like breathing. The quiet approves.',
  ] },
  { when: { rungMin: 8 }, weight: 2, text: [
    'You eat in the rotunda because you can. The library learns your appetite.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'You order two. You eat both. The pleasure is private and complete.',
  ] },
  { when: { fullnessBand: 'full' }, weight: 2, text: [
    'You sit back and the desk chair receives more of you than you offered it.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 3, text: [
    'You lean back, full, warm, heavier in the reading chair. Breath comes slower. You smile.',
  ] },
]);

registerPool('inhabit.evening', [
  { when: {}, text: ['Evening in the apartment. The fridge again. The quiet is yours.'] },
  { when: { rungMin: 4 }, weight: 2, text: ['The couch receives more of you than last month. You notice. You stay.'] },
  { when: { rungMin: 7 }, weight: 2, text: ['Evening in the rotunda — after hours, yours. The chair knows your weight now.'] },
  { when: { flipped: true }, weight: 2, text: ['You eat again because the day is not finished with you yet.'] },
]);

registerPool('inhabit.mind.secret', [
  { when: { stance: 'secret' }, priority: 1, text: [
    'You wanted this before you had words for it. The cardigan was always a costume.',
    'Joy sits in your chest like a second meal.',
    'The mirror used to be an accusation. Now it is an audience.',
  ] },
  { when: {}, text: [
    'Permission arrives without a witness. You accept anyway.',
  ] },
]);

registerPool('crown.sofie.chair', [
  { when: {}, text: [
    'The rotunda reading chair was older than the town\'s arguments. It gives under you like a vow kept.',
    'You stay seated. The library stays quiet. Then applause — soft, real.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Wood fails under you mid-page. You finish the chapter on what remains — serene, public, yours.',
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
