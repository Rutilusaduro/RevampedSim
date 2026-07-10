import { registerPool } from '../../../textEngine/engine.js';

registerPool('arg.notice', [
  { when: {}, text: [
    'Elena mentions the jeans over coffee — casual, careful, too careful.',
    'Mara makes a joke. It does not land. Elena lets it die.',
    'Priya asks if Mara is "still doing okay." Nobody answers right away.',
  ] },
  { when: { seatType: 'enabler' }, weight: 2, text: [
    'Elena sees the pastry crumbs on the counter. She sees you seeing her see them.',
  ] },
]);

registerPool('arg.concern', [
  { when: {}, text: [
    'Elena corners her after shift. Every sentence is worry dressed up as love.',
    '"I just want you happy," Elena says. Mara hears: I want you smaller.',
    'Priya offers a meal plan. Mara smiles and changes the subject.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'Sal pulls you aside at the Anchor. "Talk to her," he says. He means stop feeding her.',
  ] },
]);

registerPool('arg.intervention', [
  { when: { seatType: 'enabler' }, priority: 1, weight: 4, text: [
    'They gather at Elena\'s apartment — Elena, Priya, Sal — Mara in the middle, already eating.',
    'The intervention is awkward and warm. You hide the pastries under the sink.',
    'Elena cries. Priya lists concerns. Mara listens and reaches for the fruit tray\'s backup dessert.',
  ] },
  { when: {}, text: [
    'They sit her down at the apartment. Everyone talks at once.',
    'Everyone uses gentle voices. The fridge hums in the background.',
  ] },
]);

registerPool('arg.bargaining', [
  { when: {}, text: [
    'They agree on one week, one dress size, one promise. None of it will stick.',
    'Mara nods along to a diet plan. She has already decided otherwise.',
    'Elena brings salad. You bring dessert. Mara eats both.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'They still try to bargain. Mara has already won. She just chews while they talk.',
  ] },
]);

registerPool('arg.awe', [
  { when: {}, text: [
    'Elena stops mid-sentence and watches Mara eat. She does not finish the lecture.',
    'Priya says nothing at the gym. She just watches.',
    'Sal stops arguing about the booth. He orders Mara the usual without asking.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'People still comment. They comment quieter every week.',
  ] },
]);
