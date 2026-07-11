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
    'She talks about hunger like it is part of training. You love her for it. Dev does not.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The compression top sits honest on her shoulders. She programs anyway.',
    'Oatmeal measured. Mara\'s booth story is still all anyone talks about at the diner.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    'Her leggings are tight at the hip. Priya chalks form cues like nothing changed.',
    'She demos a squat. The mirror catches her a beat longer than she wants.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The office chair creaks when she sits to answer email. She stands back up smiling.',
    'Clients arrive early. Priya is already eating between sets.',
  ] },
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'Morning class is fuller than it used to be. Priya demos slower between bites.',
    'She eats at the front desk before the clients arrive.',
  ] },
  { when: { rungMin: 8, rungMax: 9 }, weight: 3, text: [
    'Morning class is standing room only. Priya takes the widest bench without asking.',
    'She has to turn sideways at the turnstile now. She does it without breaking stride.',
    'She crosses the gym with a sway that was not there in spring.',
  ] },
  { when: { rungMin: 10, rungMax: 11 }, weight: 3, text: [
    'The mezzanine stairs wind her. She takes them slow and does not apologize.',
    'Clients stare when she demos. She stares back while chewing.',
    'GAIN is on the board in permanent marker now.',
  ] },
  { when: { rungMin: 12 }, weight: 3, text: [
    'Morning is logistics: which bench, which jacket, which refeed first.',
    'Priya chooses the reinforced demonstration bench without being asked.',
    'She eats between sets like it is part of the warmup.',
    'Dev watches from the office. She waves at him with a fork.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 3, text: [
    'She measures her oatmeal. Mara\'s booth story is still all anyone talks about.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'GAIN is still on the board from yesterday. She smiles when she sees you look at it.',
  ] },
]);

registerPool('priya.port.evening', [
  { when: {}, text: ['Evening at the gym. The mirrors are everywhere.'] },
  { when: { rungMin: 3 }, weight: 2, text: ['She looks at the demonstration bench before she sits. She sits anyway.'] },
  { when: { rungMin: 6 }, weight: 2, text: ['Evening class ends. Priya eats on the gym floor with her back against the bench.'] },
  { when: { rungMin: 8 }, weight: 2, text: ['She programs tomorrow between bites. The whiteboard is all food now.'] },
  { when: { flipped: true }, weight: 2, text: ['She eats again while programming tomorrow\'s class.'] },
]);

registerPool('priya.crown.bench', [
  { when: {}, text: [
    'Mid-class, the demonstration bench cracks under her. Priya finishes the set on the floor.',
    'The clients do not leave. Neither does she.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Wood fails under her mid-cue. She completes the set on what is left — breathing hard, not embarrassed.',
  ] },
]);

registerPool('priya.end.settling', [
  { when: {}, text: [
    'Priya is at the gym every day now — visible, routine, hard to ignore.',
    'Sofie at the desk watches everything and says nothing. Yet.',
  ] },
]);

registerPool('priya.end.interstitial', [
  { when: {}, text: [
    'Wider benches arrive at Halcyon Fitness without a memo. The morning class does not comment.',
    'Dev updates the liability forms. The bakery line gets longer on refeed days.',
    'Sofie at the front desk starts recommending pastry places again.',
  ] },
]);
