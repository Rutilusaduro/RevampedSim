import { registerPool } from '../../../textEngine/engine.js';

registerPool('mind.flip', [
  { when: { stance: 'reluctant' }, priority: 1, text: [
    'Mara licks frosting off her thumb at the Anchor and says, without looking up: "Bring two next time."',
    'Her shoulders drop. The fight goes out of them.',
    'She does not make a speech. She just stops saying no.',
  ] },
  { when: {}, text: [
    '{subject.first} reaches for seconds before you finish asking.',
    'She smiles while she chews. That is new.',
  ] },
]);

registerPool('mind.denial', [
  { when: {}, text: ['She smooths her shirt and changes the subject.', 'A glance in the mirror, then away.'] },
  { when: { flipped: false, rungMax: 3 }, weight: 3, text: [
    'She mentions the scale like it is lying to her.',
    'Her hand rests on her waistband. It stays there.',
  ] },
]);
