import { registerPool } from '../../../textEngine/engine.js';

registerPool('mind.flip', [
  { when: { stance: 'reluctant' }, priority: 1, text: [
    'The walk-in at the Anchor is cold and bright. Mara licks frosting from her thumb and says, without looking up: "Bring two next time."',
    'Something quiet dies. Something warmer takes its chair.',
    'She does not announce it. She just stops fighting in her shoulders.',
  ] },
  { when: {}, text: [
    'Resistance ends the way a candle ends — not all at once, but without argument.',
    '{subject.first} reaches for seconds before the question is finished.',
  ] },
]);

registerPool('mind.denial', [
  { when: {}, text: ['She smooths her shirt and does not comment.', 'A glance at the mirror, then away.', ''] },
  { when: { flipped: false, rungMax: 3 }, weight: 3, text: [
    'She mentions the scale like it owes her an apology.',
    'Her hand, unsupervised, rests on her waistband and stays there.',
  ] },
]);
