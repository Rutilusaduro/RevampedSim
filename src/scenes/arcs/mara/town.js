import { registerPool } from '../../../textEngine/engine.js';

registerPool('grav.notice', [
  { when: {}, text: [
    'Kayla tugs at her own waistband when she thinks no one is looking.',
    'Priya leaves the gym early. She says it is nothing. You do not believe her.',
  ] },
]);

registerPool('grav.undeniable', [
  { when: {}, text: [
    'Kayla asks if the diner changed the uniform sizes. Mara says she has not noticed. Kayla has.',
    'Priya stands next to Mara in a photo and her posture is not as straight as it used to be.',
  ] },
]);

registerPool('grav.candidate', [
  { when: {}, text: [
    'Kayla laughs too loud at Mara\'s joke and touches her own hip.',
    'You catch Priya watching Mara eat. Her mouth is slightly open.',
  ] },
]);

registerPool('town.ambient', [
  { when: {}, text: [
    'Someone swapped out a booth at the Anchor for a wider one. Nobody made a fuss.',
    'The bakery line is longer every week.',
  ] },
  { when: { softeningMin: 10 }, weight: 2, text: [
    'The Anchor has two wide booths now. Sal says it was "maintenance."',
  ] },
  { when: { softeningMin: 25 }, weight: 2, text: [
    'The bakery runs out of the good pastries before nine on Saturdays.',
  ] },
]);

registerPool('town.visit', [
  { when: {}, text: [
    'You walk around Halcyon with {subject.first}. People glance, then glance again.',
  ] },
  { when: { location: 'anchor' }, text: [
    'The Anchor smells like coffee and fryer oil. Mara\'s corner booth is already taken.',
  ] },
  { when: { location: 'market' }, text: [
    'Pine & 4th has narrow aisles. Mara reads every label anyway.',
  ] },
  { when: { location: 'marina' }, text: [
    'The boardwalk bench creaks when Mara sits. She sits.',
  ] },
  { when: { location: 'crescent' }, text: [
    'The Crescent stairs creak. Mara takes them one step at a time.',
  ] },
]);

registerPool('town.ledger', [
  { when: {}, text: ['Another day in Halcyon. The diner is busier than usual.'] },
  { when: { softeningMin: 5 }, weight: 2, text: ['The bakery added a second register line.'] },
]);

registerPool('end.settling', [
  { when: {}, text: [
    'Mara still works at the Anchor every day. Everybody knows her. Everybody sees her.',
    'The old corner booth is gone. The new wide one has her name in Sharpie underneath.',
    'Kayla has put on weight. Priya has too. Someone at the gym is already watching.',
  ] },
]);

registerPool('crown.mara.booth', [
  { when: {}, text: [
    'They haul the broken booth out back while the whole diner watches.',
    'Mara sits in the replacement booth and finishes her pie.',
    'Sal says they are not fixing the old one. Mara says good.',
  ] },
]);
