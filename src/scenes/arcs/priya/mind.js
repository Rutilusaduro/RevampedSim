import { registerPool } from '../../../textEngine/engine.js';

registerPool('priya.mind.flip', [
  { when: { stance: 'opposed' }, priority: 1, text: [
    'She writes GAIN where the class programs go. The marker squeaks.',
    'Opposition ends the way a plank ends — shaking, then still on the gym floor.',
    'Something disciplined dies. GAIN stays on the whiteboard. Something hungrier takes its mat.',
  ] },
  { when: {}, text: [
    'Resistance ends the way a set ends — not all at once, but without argument.',
    'Priya reaches for seconds before the question is finished.',
  ] },
]);

registerPool('priya.mind.denial', [
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'She mentions the scale like it owes her data.',
    'Her hand, unsupervised, rests on the compression top and stays there.',
    'She smooths the track jacket and does not comment.',
  ] },
  { when: {}, text: [
    'A glance at the mirror wall, then away.',
    'She cites form cues when the room cites appetite.',
  ] },
]);
