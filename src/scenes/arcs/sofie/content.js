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
  { when: {}, text: ['Shift the stacks to fit your wider reach', 'Work the desk; the chair creaks when you sit'] },
  { when: { rungMin: 6 }, weight: 2, text: ['Shift the stacks — the cart lists when you lean on it'] },
]);
registerPool('seat.cardiganRitual', [
  { when: {}, text: ['Try the cardigan again', 'Keep it anyway'] },
  { when: { rungMin: 4 }, weight: 2, text: ['Try the belt again. Use the next hole down.'] },
]);

registerPool('inhabit.morning', [
  { when: {}, text: [
    'You wake already hungry. The cardigan on the chair will not close. You keep it.',
    'Morning light in the stacks. You have been thinking about pastries since yesterday.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The inherited cardigan gaps at the buttons. You wear it anyway.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    'You catch your reflection in the elevator door and do not look away as quickly as you used to.',
    'The library skirt rides when you reach high shelves. You reach anyway.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The desk chair creaks when you sit — once, then again when you settle.',
    'You pour coffee into a mug that feels smaller. You fill it twice.',
  ] },
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'You choose the reinforced reading chair without being asked.',
    'You cross the stacks with a sway that was not there in spring.',
  ] },
  { when: { rungMin: 8, rungMax: 9 }, weight: 3, text: [
    'Morning is logistics now — which chair, which belt, which pastry first.',
    'You shelve by feel — you know where your hips clear the aisles.',
  ] },
  { when: { rungMin: 10, rungMax: 11 }, weight: 3, text: [
    'You are at the rotunda before the doors open. Coworkers act like that was always true.',
    'The elevator groans on your floor. You take the stairs. Slowly.',
  ] },
  { when: { rungMin: 12 }, weight: 3, text: [
    'Morning is appetite first, catalog second. You do not apologize for the order.',
    'Your cardigan will not close. You wear it open and eat at the desk.',
    'Jordan watches you shelve. You shelve slower on purpose.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'You hum while you eat — not hiding, not apologizing.',
    'You are full before breakfast and you do not mind.',
  ] },
]);

registerPool('inhabit.meal', [
  { when: {}, text: [
    'You eat like you are finally allowed. You were the stop, once.',
    'Pastry flakes on your skirt. You brush at it. You do not care enough to stop.',
  ] },
  { when: { stance: 'secret' }, weight: 3, text: [
    'You eat like nobody is watching. Somebody is. You like that too.',
    'Seconds used to be a secret. Now they are a habit with good lighting.',
  ] },
  { when: { rungMin: 3, rungMax: 5 }, weight: 2, text: [
    'You order two without pretending it is for someone else. You eat both at the desk.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'You eat between stacks the way you breathe — often, without thinking about it.',
  ] },
  { when: { rungMin: 8, rungMax: 10 }, weight: 2, text: [
    'You eat in the rotunda because you can. The staff stop commenting.',
  ] },
  { when: { rungMin: 11 }, weight: 2, text: [
    'You eat at the desk, in the break room, in the rotunda — wherever you want.',
    'You order two pastries and eat both walking to the stacks.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'You order two. You eat both. The pleasure is private and complete.',
  ] },
  { when: { fullnessBand: 'full' }, weight: 2, text: [
    'You sit back and the desk chair dips. You stay put.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 3, text: [
    'You lean back, full, warm, heavier in the reading chair. Breath comes slower. You smile.',
  ] },
]);

registerPool('inhabit.evening', [
  { when: {}, text: ['Evening in the apartment. The fridge again. The quiet is yours.'] },
  { when: { rungMin: 4 }, weight: 2, text: ['The couch dips more than last month. You notice. You stay.'] },
  { when: { rungMin: 7 }, weight: 2, text: ['Evening in the rotunda — after hours, yours. The chair creaks when you shift.'] },
  { when: { flipped: true }, weight: 2, text: ['You eat again because the day is not finished with you yet.'] },
]);

registerPool('inhabit.mind.secret', [
  { when: { stance: 'secret' }, priority: 1, text: [
    'You wanted this before you had words for it. The cardigan was always too small on purpose.',
    'You are hungry and happy at the same time. That still surprises you.',
    'The mirror used to make you flinch. Now you look longer.',
  ] },
  { when: {}, text: [
    'Nobody is watching. You eat anyway.',
  ] },
]);

registerPool('crown.sofie.chair', [
  { when: {}, text: [
    'The rotunda reading chair is old wood and bad luck. It cracks under you mid-chapter.',
    'You stay seated on what is left. The library goes quiet. Then soft applause.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Wood fails under you mid-page. You finish the chapter on the floor — flushed, not sorry.',
  ] },
]);

registerPool('sofie.end.settling', [
  { when: {}, text: [
    'You stay at the library. Shelves get moved so you can pass.',
    'The chain continues somewhere you cannot see yet.',
  ] },
]);

registerPool('sofie.end.interstitial', [
  { when: {}, text: [
    'The rotunda gets a reinforced reading chair. Nobody holds a vote.',
    'Your mother stops calling as often. The bakery knows your order.',
    'Dev orders another reinforced bench for the gym. Sofie hears about it at the desk.',
  ] },
]);
