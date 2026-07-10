import { registerPool } from '../../../textEngine/engine.js';

// Shape: SENT — morning portrait, rung-keyed
registerPool('port.morning', [
  { when: {}, text: [
    '{subject.name} is already awake, {word.size} in the kitchen light.',
    'Morning finds {subject.first} softer than she left herself last night.',
    '{subject.name} checks her phone, then the fridge — the second look lasts longer.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The waistband of the gray jeans leaves a quiet mark. {subject.first} smooths her shirt and does not mention it.',
    'Coffee first. She pours two cups before she remembers she lives alone.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    '{subject.name} stands at the mirror a beat longer than she used to.',
    'The gray jeans negotiate before {subject.first} even pours coffee.',
    'She tugs once at her blouse, then lets the fabric settle where it wants.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The kitchen chair announces her — a creak on the sit, a second settling creak after.',
    '{subject.first} has stopped waiting for the sound to finish before she reaches for the cereal.',
  ] },
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'She crosses the apartment on a sway that was not there in spring.',
    'The doorframe teaches her a new angle. She learns it without comment.',
  ] },
  { when: { rungMin: 8 }, weight: 3, text: [
    'Morning is a logistics problem now — where to sit, what still closes.',
    '{subject.name} chooses the reinforced chair without being asked.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    '{subject.name} moves through morning like the day already belongs to her appetite.',
    '{subject.first} hums while she eats — not hiding, not apologizing.',
    'She pours cereal into a bowl that looks smaller than it used to. She fills it twice.',
  ] },
]);

registerPool('port.evening', [
  { when: {}, text: [
    'Evening settles. {subject.first} finds the couch and the remote and something sweet.',
    'Dinner happens the way it has been happening — a little more, a little easier.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The couch receives more of her than it did last month. She notices. She stays.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 3, text: [
    'She eats again because the day is not finished with her yet.',
    'The refrigerator light finds her like a confessional. She does not hurry.',
  ] },
]);
