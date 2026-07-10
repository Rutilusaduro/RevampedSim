import '../textEngine/settingPack.js';
import { registerPool } from '../textEngine/engine.js';

// Seat-specific menu labels
registerPool('seat.observe', [
  { when: {}, text: ['Watch her for a minute', 'Just look at her', 'Take her in'] },
]);
registerPool('seat.breakfastPastry', [
  { when: { seatType: 'enabler' }, weight: 4, text: ['Bring pastries — the good box', 'Show up with the pink box again'] },
  { when: {}, text: ['Breakfast together', 'Share something sweet'] },
]);
registerPool('seat.breakfastHearty', [
  { when: {}, text: ['Cook something real', 'A breakfast that counts'] },
]);
registerPool('seat.workShift', [
  { when: {}, text: ['Her shift at the Anchor', 'Work the lunch rush with her'] },
]);
registerPool('seat.errandMarket', [
  { when: {}, text: ['Groceries at Pine & 4th', 'Stock the kitchen together'] },
]);
registerPool('seat.schemePastry', [
  { when: { seatType: 'enabler' }, weight: 4, text: ['The pastry scheme', 'Another box, another excuse'] },
  { when: {}, text: ['Something indulgent, quietly'] },
]);
registerPool('seat.visitDiner', [
  { when: {}, text: ['Meet her at the Anchor', 'The diner, her territory'] },
]);
registerPool('seat.walk', [
  { when: {}, text: ['Walk the Marina', 'Air and appetite'] },
]);
registerPool('seat.rest', [
  { when: {}, text: ['A quiet hour', 'Let the day settle'] },
]);

// Morning portrait
registerPool('port.morning', [
  { when: {}, text: [
    '{subject.name} is already awake, {word.size} in the kitchen light.',
    'Morning finds {subject.first} softer than she left herself last night.',
    '{subject.name} checks her phone, then the fridge — the second look lasts longer.',
  ] },
  { when: { rungMin: 2 }, weight: 2, text: [
    '{subject.name} stands at the mirror a beat longer than she used to.',
    'The gray jeans negotiate before {subject.first} even pours coffee.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    '{subject.name} moves through morning like the day already belongs to her appetite.',
    '{subject.first} hums while she eats — not hiding, not apologizing.',
  ] },
]);

// Meals
registerPool('meal.beat', [
  { when: {}, text: [
    '{subject.first} eats like she is still deciding. She is not, not really.',
    'She finishes what you brought. Her eyes ask about seconds before her mouth does.',
    'The meal disappears between jokes and small talk that runs out of small.',
  ] },
  { when: { stance: 'reluctant' }, weight: 2, text: [
    'She protests once, beautifully, then clears the plate.',
    '"I shouldn\'t," she says, already reaching.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 3, text: [
    'She eats with the focus of someone who stopped arguing with joy.',
    '{subject.first} savors every bite like a promise she intends to keep.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 2, text: [
    'She leans back, full, warm, visibly heavier in the chair.',
    'Her hand rests on her middle — not ashamed, just present.',
  ] },
]);

// Window near-miss
registerPool('win.near.generic', [
  { when: {}, text: [
    'Something creaks. {subject.first} freezes, then laughs it off too quickly.',
    'A seam complains. She pretends not to notice. You both notice.',
    'The chair groans. She shifts her weight and the sound stops — for now.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The booth leather sighs under her. She stays seated like she earned the noise.',
  ] },
]);

// Window fire
registerPool('win.fire.chair', [
  { when: {}, text: [
    'The chair gives up with a crack that silences the room. {subject.first} stays seated on what\'s left, breathing hard, not leaving.',
    'Wood splinters. The chair is done. She is not.',
  ] },
]);
registerPool('win.fire.booth', [
  { when: {}, text: [
    'The booth pinches, then refuses. {subject.name} laughs — surprised, delighted, stuck.',
    'Vinyl protests. The corner booth will never be the same.',
  ] },
]);
registerPool('win.fire.garment', [
  { when: {}, text: [
    'A button pops — small sound, huge punctuation. {subject.first} looks down, then up at you, cheeks warm.',
    'The seam surrenders. Fabric parts like it was always going to.',
  ] },
]);
registerPool('win.fire.door', [
  { when: {}, text: [
    'She turns sideways. The doorframe still wins. She is laughing before she is free.',
    'The door and her hips disagree. The door is learning.',
  ] },
]);

// Argument beats
registerPool('arg.notice', [
  { when: {}, text: [
    'Elena mentions her jeans over coffee. Mara deflects with a joke that doesn\'t land.',
    'Priya asks if Mara is "still doing okay." The question hangs in the air.',
  ] },
]);
registerPool('arg.concern', [
  { when: {}, text: [
    'Elena corners her after shift. Love in every word, worry in every pause.',
    'Priya offers a meal plan like a lifeline. Mara smiles like she is holding something back.',
  ] },
]);
registerPool('arg.intervention', [
  { when: { seatType: 'enabler' }, weight: 4, text: [
    'They gather at the Crescent — Elena, Priya, Sal — and you are inside the circle, lying beautifully.',
    'The intervention is warm and wrong. You pass the fruit tray and hide the pastries.',
  ] },
  { when: {}, text: [
    'They stage it at her apartment. Concern arranged like furniture.',
  ] },
]);

// Gravity beats
registerPool('grav.notice', [
  { when: {}, text: [
    'Kayla tugs at her own waistband when she thinks no one is looking.',
    'Priya leaves the gym early. She says it is nothing. It is not nothing.',
  ] },
]);

// Evening
registerPool('port.evening', [
  { when: {}, text: [
    'Evening settles. {subject.first} finds the couch and the remote and something sweet.',
    'Dinner happens the way it has been happening — a little more, a little easier.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'She eats again because the day is not finished with her yet.',
  ] },
]);

// Night ledger flavor
registerPool('town.ledger', [
  { when: {}, text: [
    'Halcyon hums along, unaware it is losing another argument.',
    'The town sleeps. The windows do not.',
  ] },
]);

// Crown — Mara booth removal
registerPool('crown.mara.booth', [
  { when: {}, text: [
    'The corner booth is retired in front of everyone who ever sat there.',
    'They unscrew the plaque while the diner watches.',
    'Mara takes the first seat in its widened replacement like a coronation.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'The booth that held her childhood lets go with a sound the town will quote for years.',
    'Vinyl new, appetite older — she eats through the ceremony.',
  ] },
]);
