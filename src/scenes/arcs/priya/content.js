import { registerPool } from '../../../textEngine/engine.js';

registerPool('seat.teachClass', [
  { when: {}, text: ['Her morning class — you watch from the floor', 'Teach with her; the room watches both of you'] },
  { when: { flipped: true }, weight: 2, text: ['Co-teach refeed day — the class applauds on cue'] },
]);
registerPool('seat.refeedTogether', [
  { when: {}, text: ['Refeed day — she calls it protocol', 'Post-class meal, measured, then not measured'] },
  { when: { flipped: true }, weight: 3, text: ['She writes GAIN on the whiteboard after. The class applauds.'] },
]);
registerPool('seat.defendHer', [
  { when: {}, text: ['Deflect Dev\'s concern — again', 'Tell the client circle she\'s fine'] },
  { when: { rungMin: 5 }, weight: 2, text: ['Defend her appetite in front of the mirrors — again, louder'] },
]);
registerPool('seat.gymDate', [
  { when: {}, text: ['Date night at the gym after close', 'Smoothies that are not smoothies'] },
  { when: { rungMin: 6 }, weight: 2, text: ['Date night — the blender lies about protein'] },
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
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'Morning class is standing room only. Priya takes the widest bench without asking.',
    'The turnstile teaches a new angle. She learns it like choreography.',
    'She crosses the gym on a sway that was not there in spring.',
  ] },
  { when: { rungMin: 8 }, weight: 3, text: [
    'Morning is logistics now — which bench, which jacket, which refeed first.',
    'Priya chooses the reinforced demonstration bench without being asked.',
    'The mezzanine stairs are a task she delegates to patience.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'She measures her oatmeal. Mara\'s booth ceremony is still the town\'s favorite topic.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'GAIN is still on the board from yesterday. She smiles when she sees you look at it.',
  ] },
]);

registerPool('priya.port.evening', [
  { when: {}, text: ['Evening at the gym. The mirrors know.'] },
  { when: { rungMin: 3 }, weight: 2, text: ['The demonstration bench gets a longer look before she sits. She sits anyway.'] },
  { when: { rungMin: 6 }, weight: 2, text: ['Evening class ends. Priya eats on the floor like it is throne room.'] },
  { when: { rungMin: 8 }, weight: 2, text: ['She programs tomorrow between bites. The whiteboard is all appetite now.'] },
  { when: { flipped: true }, weight: 2, text: ['She eats again while programming tomorrow\'s class.'] },
]);

registerPool('priya.crown.bench', [
  { when: {}, text: [
    'Mid-class, the demonstration bench gives up. Priya finishes on the floor like a queen holding court.',
    'The clients do not leave. Neither does she.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Wood fails under her mid-cue. She completes the set on what remains — serene, public, undeniable.',
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
