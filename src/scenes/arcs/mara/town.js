import { registerPool } from '../../../textEngine/engine.js';

registerPool('grav.notice', [
  { when: {}, text: [
    'Kayla tugs at her own waistband when she thinks no one is looking.',
    'Priya leaves the gym early. She says it is nothing. It is not nothing.',
  ] },
]);

registerPool('grav.undeniable', [
  { when: {}, text: [
    'Kayla asks if the diner changed the uniform sizes. Mara says she has not noticed. Kayla has.',
    'Priya stands beside Mara in a photo and does not stand quite as straight as she used to.',
  ] },
]);

registerPool('grav.candidate', [
  { when: {}, text: [
    'Kayla laughs too loud at Mara\'s joke and touches her own hip like a question.',
    'At the crown, you catch Priya watching Mara eat. Her mouth is slightly open.',
  ] },
]);

registerPool('town.ambient', [
  { when: {}, text: [
    'Halcyon hums along, unaware it is losing another argument.',
    'The town sleeps. The windows do not.',
  ] },
  { when: { softeningMin: 10 }, weight: 2, text: [
    'Someone widened a booth at the Anchor. No one held a meeting about it.',
  ] },
  { when: { softeningMin: 25 }, weight: 2, text: [
    'The bakery\'s morning line runs longer. No one complains.',
  ] },
]);

registerPool('town.visit', [
  { when: {}, text: [
    'You walk Halcyon with {subject.first}. The town watches politely.',
  ] },
  { when: { location: 'anchor' }, text: [
    'The Anchor smells like coffee and fryer oil and history. Mara\'s booth waits in the corner.',
  ] },
  { when: { location: 'market' }, text: [
    'Pine & 4th is narrow aisles and bright labels. Mara reads them all.',
  ] },
  { when: { location: 'marina' }, text: [
    'The boardwalk benches are rated for smaller summers. Mara sits anyway.',
  ] },
  { when: { location: 'crescent' }, text: [
    'The Crescent stairs creak in a familiar way. Mara takes them one at a time.',
  ] },
]);

registerPool('town.ledger', [
  { when: {}, text: ['Halcyon hums along, unaware it is losing another argument.'] },
  { when: { softeningMin: 5 }, text: ['The town sleeps softer than it did last month.'] },
]);

registerPool('end.settling', [
  { when: {}, text: [
    'Mara stays at the Anchor the way landmarks stay — daily, publicly, without apology.',
    'The corner booth is gone. The widened one has her name in Sharpie on the underside.',
    'Kayla is heavier. Priya is heavier. Someone in the crown crowd is already leaning.',
  ] },
]);

registerPool('crown.mara.booth', [
  { when: {}, text: [
    'The corner booth is retired in front of everyone who ever sat there.',
    'They unscrew the plaque while the diner watches.',
    'Mara takes the first seat in its widened replacement like a coronation.',
  ] },
  { when: { flipped: true }, weight: 3, text: [
    'The booth that held her childhood lets go with a sound the town will quote for years.',
    'Vinyl new, appetite older — she eats through the ceremony.',
    'Elena claps. Priya does not look away. Kayla touches her own waistband and smiles.',
  ] },
]);
