import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.schemeBeat', [
  { when: {}, text: ['You keep your face neutral. Old habit.', 'You pass her another plate. Good habit.'] },
  { when: { seatType: 'enabler' }, priority: 1, weight: 4, text: [
    'You hide the pastry box behind your back until Elena looks away.',
    'You tell them it is a celebration. It is Tuesday. That counts.',
    'You play worried for the room. Your hands keep feeding her.',
  ] },
]);

registerPool('end.interstitial', [
  { when: {}, text: [
    'Wider chairs show up at the Anchor. Nobody holds a meeting about it.',
    'Two women at the bakery split a second pastry and do not comment.',
    'Elena stops bringing up the scale as often.',
  ] },
  { when: { softeningMin: 5 }, weight: 2, text: [
    'The clothing rack at Pine & 4th drifts toward larger sizes. No sign explains it.',
  ] },
]);
