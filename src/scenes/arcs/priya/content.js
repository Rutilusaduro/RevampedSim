import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.teachClass', [
  { when: {}, text: ['Her morning class — you watch from the floor', 'Teach with her; the room watches both of you'] },
]);
registerPool('seat.refeedTogether', [
  { when: {}, text: ['Refeed day — she calls it protocol', 'Post-class meal, measured, then not measured'] },
  { when: { flipped: true }, weight: 3, text: ['She writes GAIN on the whiteboard after. The class applauds.'] },
]);
registerPool('seat.defendHer', [
  { when: {}, text: ['Deflect Dev\'s concern — again', 'Tell the client circle she\'s fine'] },
]);
registerPool('seat.gymDate', [
  { when: {}, text: ['Date night at the gym after close', 'Smoothies that are not smoothies'] },
]);

registerPool('priya.port.morning', [
  { when: {}, text: [
    'Priya is already at the whiteboard when you arrive. Programs where numbers used to live.',
    'She teaches hunger like a skill. You love her for it. The town does not.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The compression top sits honest on her shoulders. She programs anyway.',
    'Oatmeal measured. Mara\'s booth ceremony is still the town\'s favorite topic.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    'Studio leggings negotiate at the hip. Priya chalks form cues like nothing shifted.',
    'She demos a squat. The mirror keeps the secret a beat too long.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The office chair creaks when she sits to answer email. She stands back up smiling.',
    'Clients arrive early. Priya is already eating between sets.',
  ] },
  { when: { rungMin: 6 }, weight: 3, text: [
    'Morning class is standing room only. Priya takes the widest bench without asking.',
    'The turnstile teaches a new angle. She learns it like choreography.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'She measures her oatmeal. Mara\'s booth ceremony is still the town\'s favorite topic.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'GAIN is still on the board from yesterday. She smiles when she sees you look at it.',
  ] },
]);

registerPool('priya.meal.beat', [
  { when: {}, text: [
    'She eats like she is auditing herself. Then she stops auditing.',
    'Refeed becomes feast when the door locks.',
  ] },
  { when: { rungMin: 2, rungMax: 4 }, weight: 2, text: [
    'Protein shake, then something that is not a protein shake. Priya calls both "recovery."',
  ] },
  { when: { rungMin: 5 }, weight: 2, text: [
    'She eats while programming tomorrow\'s class. The whiteboard fills with calories, not reps.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    '"Maintenance calories," she says, already over them.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 4, text: [
    'She tracks the meal on a napkin, then eats the napkin\'s numbers too.',
  ] },
]);

registerPool('priya.port.evening', [
  { when: {}, text: ['Evening at the gym. The mirrors know.'] },
  { when: { rungMin: 3 }, weight: 2, text: ['The demonstration bench gets a longer look before she sits. She sits anyway.'] },
  { when: { flipped: true }, weight: 2, text: ['She eats again while programming tomorrow\'s class.'] },
]);

registerPool('priya.arg.notice', [
  { when: {}, text: [
    'A client asks if Priya is "still training." The question is its own answer.',
    'Dev mentions liability. You mention love.',
  ] },
]);
registerPool('priya.arg.concern', [
  { when: {}, text: ['Dev corners you both after close. His spreadsheet is not gentle.'] },
]);
registerPool('priya.arg.intervention', [
  { when: {}, text: ['The morning class becomes an intervention with kettlebells. Priya listens, then eats.'] },
]);
registerPool('priya.arg.bargaining', [
  { when: {}, text: ['They negotiate macros she will ignore by dessert.'] },
]);
registerPool('priya.arg.awe', [
  { when: {}, text: ['The client circle stops correcting her form. They start watching her eat.'] },
]);

registerPool('priya.mind.flip', [
  { when: {}, priority: 1, text: [
    'She writes GAIN where the class programs go. The marker squeaks.',
    'Opposition ends the way a plank ends — shaking, then still.',
  ] },
]);

registerPool('priya.crown.bench', [
  { when: {}, text: [
    'Mid-class, the demonstration bench gives up. Priya finishes on the floor like a queen holding court.',
    'The clients do not leave. Neither does she.',
  ] },
]);

registerPool('priya.end.settling', [
  { when: {}, text: [
    'Priya stays at the gym like a standard — visible, daily, undeniable.',
    'Sofie at the desk watches everything and says nothing. Yet.',
  ] },
]);

registerPool('priya.end.interstitial', [
  { when: {}, text: [
    'Wider benches arrive at Halcyon Fitness without a memo. The morning class does not comment.',
    'Dev updates the liability forms. The town updates its appetite.',
    'Sofie at the front desk starts recommending pastry places again.',
  ] },
]);
