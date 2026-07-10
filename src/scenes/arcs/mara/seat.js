import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.schemeBeat', [
  { when: {}, text: ['You keep your face arranged for company.', 'Old habit. Good habit.', ''] },
  { when: { seatType: 'enabler' }, priority: 1, weight: 4, text: [
    'You hide the pastry box behind your back until Elena looks away. Old habit. Good habit.',
    'The cover story writes itself — celebration, bad week, her favorite bakery had a sale.',
    'You play worried convincingly. Your hands keep passing her plates.',
  ] },
]);

registerPool('end.interstitial', [
  { when: {}, text: [
    'New chairs arrive at the Anchor without ceremony. Wider. The town does not comment. It adapts.',
    'Two women at the bakery counter split a second pastry and do not comment either.',
    'Halcyon loses another small argument before breakfast is over.',
  ] },
  { when: { softeningMin: 5 }, weight: 2, text: [
    'The boutique rack drifts sizes without a sign. Everyone pretends not to notice.',
  ] },
]);
