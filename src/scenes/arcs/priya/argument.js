import { registerPool } from '../../../textEngine/engine.js';

registerPool('priya.arg.notice', [
  { when: {}, text: [
    'A client asks if Priya is "still training." The question is its own answer.',
    'Dev mentions liability over coffee. You mention love. He hears neither.',
    'Sofie at the desk glances up when Priya walks past. The glance lasts a beat too long.',
  ] },
  { when: { seatType: 'partner' }, weight: 2, text: [
    'You watch the morning class notice the refeed plates. They notice you noticing.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'Someone photographs the whiteboard. GAIN is not on it yet. The photo still feels like evidence.',
  ] },
]);

registerPool('priya.arg.concern', [
  { when: {}, text: [
    'Dev corners you both after close. His spreadsheet has a lot of red cells.',
    '"I built this gym on discipline," he says. Priya smiles. "Discipline includes eating."',
    'The client circle speaks in careful voices. Priya answers in portions.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'She cites maintenance calories. Dev cites insurance. You cite the look on her face when she eats.',
  ] },
  { when: { rungMin: 5 }, weight: 2, text: [
    'Mara\'s booth is still the diner\'s favorite story. Priya hears it in every polite pause.',
  ] },
]);

registerPool('priya.arg.intervention', [
  { when: { seatType: 'partner' }, priority: 1, weight: 4, text: [
    'They gather on the gym floor — Dev, the client circle, you — and Priya is inside the kettlebell ring, eating.',
    'Dev brought talking points. Priya brought takeout. The room figures out which one matters.',
    'Dev cries without making a scene. The class lists concerns like a syllabus. Priya listens, already chewing.',
  ] },
  { when: {}, text: [
    'The morning class becomes an intervention with mirrors. Priya listens, then eats.',
    'Concern arranged like equipment. The staff fridge is full of her leftovers.',
  ] },
]);

registerPool('priya.arg.bargaining', [
  { when: {}, text: [
    'They list macros she will ignore by dessert.',
    'Priya agrees to a cut phase the way she agrees to rain — politely, temporarily.',
    'Dev brings a meal plan. You bring takeout. The evening ends the way evenings end now.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'The bargaining is theater now. GAIN stays on the board anyway.',
  ] },
]);

registerPool('priya.arg.awe', [
  { when: {}, text: [
    'The client circle stops correcting her form. They start watching her eat.',
    'Dev retires an old worry in his head. He orders her the usual without asking.',
    'Sofie says nothing at the desk. She just watches Priya walk past.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Elena and Sal still gossip about fitness at the diner. They gossip quieter every week.',
  ] },
  { when: { rungMin: 8 }, weight: 2, text: [
    'New members ask when Priya teaches "the eating class." Nobody corrects them.',
  ] },
]);
