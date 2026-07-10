import { registerPool } from '../../../textEngine/engine.js';

// Argument register: love losing to joy — never sides with shame
registerPool('arg.notice', [
  { when: {}, text: [
    'Elena mentions the jeans over coffee — casual, careful, too careful.',
    'Mara deflects with a joke that does not land. Elena lets it die kindly.',
    'Priya asks if Mara is "still doing okay." The question hangs in the air.',
  ] },
  { when: { seatType: 'enabler' }, weight: 2, text: [
    'You watch Elena notice the pastry crumbs on the counter. She notices you noticing.',
  ] },
]);

registerPool('arg.concern', [
  { when: {}, text: [
    'Elena corners her after shift. Love in every word, worry in every pause.',
    '"I just want you happy," Elena says. Mara hears: I want you smaller.',
    'Priya offers a meal plan like a lifeline. Mara smiles like she is holding something back.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'Sal pulls you aside at the Anchor. "Talk to her," he says. He means: stop feeding her.',
  ] },
]);

registerPool('arg.intervention', [
  { when: { seatType: 'enabler' }, priority: 1, weight: 4, text: [
    'They gather at the Crescent — Elena, Priya, Sal — Mara in the center, already eating.',
    'The intervention is warm and wrong at Elena\'s apartment. Pastries hide under the sink. Mara does not stop.',
    'Elena cries without ugliness. Mara listens, already reaching for the fruit tray\'s backup dessert.',
  ] },
  { when: {}, text: [
    'They stage it at her apartment. Concern arranged like furniture.',
    'Everyone speaks in gentle voices. The refrigerator hums its disagreement.',
  ] },
]);

registerPool('arg.bargaining', [
  { when: {}, text: [
    'They negotiate terms they will lose: one week, one dress size, one promise.',
    'Mara agrees to a diet the way she agrees to weather — politely, temporarily.',
    'Elena brings a salad. You bring dessert. The evening ends the way evenings end now.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'The bargaining is theater now. Everyone knows the ending.',
  ] },
]);

registerPool('arg.awe', [
  { when: {}, text: [
    'Elena stops mid-sentence and watches Mara eat. The protest dies in her throat.',
    'Priya says nothing at the gym window. Her silence is the surrender.',
    'Sal retires an old booth rating in his head. He orders her the usual without asking.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'The town still argues. It argues quieter every week.',
  ] },
]);
