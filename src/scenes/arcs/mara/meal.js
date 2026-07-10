import { registerPool } from '../../../textEngine/engine.js';

registerPool('meal.beat', [
  { when: {}, text: [
    '{subject.first} picks at the food, then stops picking and just eats.',
    'She finishes what you brought. Her eyes go to the empty plate, then to you.',
    'The food goes fast. The small talk does not keep up.',
  ] },
  { when: { stance: 'reluctant', flipped: false }, weight: 4, text: [
    '"I should not," she says, and clears the plate anyway.',
    'Her fork hovers over the last bite. She eats it.',
    'She wipes her mouth and looks guilty for about three seconds.',
  ] },
  { when: { rungMin: 2, rungMax: 4, stance: 'reluctant' }, weight: 3, text: [
    'She slides into the booth. The table edge is closer to her stomach than last month.',
    'She flinches, then laughs and claims she was reaching for a napkin.',
  ] },
  { when: { rungMin: 5, rungMax: 7 }, weight: 3, text: [
    'She orders without looking at the menu. The booth seat dips when she sits.',
    'She eats fast, then slower, then fast again. The plate is empty.',
  ] },
  { when: { rungMin: 8, rungMax: 10 }, weight: 3, text: [
    'She needs both hands to steady the tray. She eats anyway, leaning back into the booth.',
    'The table is too close. She pushes it with her stomach and does not stop eating.',
  ] },
  { when: { rungMin: 11 }, weight: 3, text: [
    'She eats like the diner is watching. It is. She does not care.',
    'She finishes one plate and reaches for yours without asking.',
  ] },
  { when: { seatType: 'enabler', rungMax: 5 }, weight: 3, text: [
    'You slide the pastry box toward her. She opens it.',
    'Her eyes go to the box. Away. Back. Her hand finds the lid.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 4, text: [
    'She eats without looking guilty. Fork to mouth, steady, focused.',
    '{subject.first} takes seconds before you ask. Thirds too.',
    'She leans back, patting her stomach, already thinking about what is next.',
  ] },
  { when: { fullnessBand: 'full' }, weight: 2, text: [
    'She sits back. The booth seat dips under her. Her hand rests on her stomach.',
    'She breathes out slow. Full. Warm. She looks pleased.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 3, text: [
    'She leans back, stuffed, heavy in the chair, cheeks flushed.',
    'She breathes slow through her nose. She is still smiling.',
  ] },
]);

registerPool('seat.schemePastry', [
  { when: { seatType: 'enabler' }, weight: 4, text: [
    'Bring the pink bakery box again',
    'Pick up donuts on the way over',
    'Hide the pastry box until Elena looks away',
  ] },
  { when: {}, text: ['Bring something sweet'] },
]);
