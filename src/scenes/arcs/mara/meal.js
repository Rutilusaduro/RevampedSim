import { registerPool } from '../../../textEngine/engine.js';

registerPool('meal.beat', [
  { when: {}, text: [
    '{subject.first} eats like she is still deciding. She is not, not really.',
    'She finishes what you brought. Her eyes ask about seconds before her mouth does.',
    'The meal disappears between jokes and small talk that runs out of small.',
  ] },
  { when: { stance: 'reluctant', flipped: false }, weight: 4, text: [
    'She protests once, beautifully, then clears the plate.',
    '"I shouldn\'t," she says, already reaching.',
    'Her fork pauses over the last bite — theater, and you both enjoy the show.',
  ] },
  { when: { rungMin: 2, rungMax: 4, stance: 'reluctant' }, weight: 3, text: [
    'She slides into the booth and the table is closer than it was last month.',
    'She notices, and pretends the flinch was reaching for a napkin.',
  ] },
  { when: { seatType: 'enabler', rungMax: 5 }, weight: 3, text: [
    'You push the pastry box two inches toward her hand. Not a word.',
    'Her eyes go to it. Away. Back. Then her fingers find the lid.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 4, text: [
    'She eats with the focus of someone who stopped arguing with joy.',
    '{subject.first} savors every bite like a promise she intends to keep.',
    'Seconds are not a question anymore. They are a rhythm.',
  ] },
  { when: { fullnessBand: 'full' }, weight: 2, text: [
    'She sits back and the booth receives more of her than she offered it.',
    'Her hand rests on her middle — present, unhurried.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 3, text: [
    'She leans back, full, warm, visibly heavier in the chair.',
    'Breath comes slower. She smiles like the meal is still happening inside her.',
  ] },
]);

registerPool('seat.schemePastry', [
  { when: { seatType: 'enabler' }, weight: 4, text: [
    'The pastry scheme — another pink box, another beautiful lie',
    'Bring the good bakery box. She will call it a treat. You will call it Tuesday.',
    'Pastry boxes: your cover story and her favorite argument to lose',
  ] },
  { when: {}, text: ['Something indulgent, quietly'] },
]);
