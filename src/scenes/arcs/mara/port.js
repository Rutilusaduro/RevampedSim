import { registerPool } from '../../../textEngine/engine.js';

registerPool('port.morning', [
  { when: {}, text: [
    '{subject.name} is already up, padding around the kitchen in sleep clothes.',
    '{subject.name} checks her phone, then the fridge. She stares at the fridge longer.',
  ] },
  { when: { rung: 1 }, weight: 3, text: [
    'The gray jeans leave a red line on her waist. She pulls her shirt down and says nothing.',
    'She pours coffee, then pours a second cup before remembering she lives alone.',
  ] },
  { when: { rungMin: 2, rungMax: 3 }, weight: 3, text: [
    '{subject.name} stands at the mirror longer than she used to.',
    'The gray jeans are tight at the waist. She tugs her blouse straight and makes coffee.',
    'Her blouse pulls when she reaches for a mug. She reaches anyway.',
  ] },
  { when: { rungMin: 4, rungMax: 5 }, weight: 3, text: [
    'The kitchen chair creaks when she sits. It creaks again when she shifts.',
    'She has stopped waiting for the creaking to stop before she reaches for the cereal.',
  ] },
  { when: { rungMin: 6, rungMax: 7 }, weight: 3, text: [
    'She walks to the bathroom with a sway she did not have last spring.',
    'She turns sideways to fit through the bathroom door. She does it without thinking now.',
  ] },
  { when: { rungMin: 8, rungMax: 9 }, weight: 3, text: [
    'She picks the sturdier kitchen chair without being asked.',
    'Half her old shirts do not button. She wears the ones that still do.',
  ] },
  { when: { rungMin: 10, rungMax: 11 }, weight: 3, text: [
    'She has to turn sideways in the hallway now. She does it without sighing.',
    'The bathroom scale groans. She steps on anyway and reads the number out loud.',
  ] },
  { when: { rungMin: 12 }, weight: 3, text: [
    'Morning is a list: which chair, which route, which shirt still closes.',
    'She eats standing at the counter because the kitchen chair is done.',
    'She catches her reflection and does not look away. She looks bigger. She looks fine.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    '{subject.first} hums while she eats cereal straight from the box.',
    'She fills the bowl twice. She is not pretending to be shy about it.',
    'She eats standing up, licking milk off her thumb, already thinking about lunch.',
  ] },
]);

registerPool('port.rung', [
  { when: {}, text: [
    'Something shifts — not dramatic, just real. {subject.first} carries her weight differently today.',
    'You notice before she does: she looks {word.size}.',
    'The mirror catches her on the way past. She pauses. She keeps walking.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'She is heavier than last month and moving like she knows it.',
    'Furniture notices before people do. She notices after.',
  ] },
]);

registerPool('port.evening', [
  { when: {}, text: [
    'It is evening. {subject.first} finds the couch, the remote, and something sweet.',
    'Dinner is bigger than it used to be. So is dessert.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'The couch dips when she sits. She notices. She does not get up.',
  ] },
  { when: { rungMin: 8 }, weight: 2, text: [
    'The couch dips deep when she sits. She has stopped apologizing for it.',
  ] },
  { when: { rungMin: 11 }, weight: 2, text: [
    'She needs both hands to push off the couch. She gets up anyway.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 3, text: [
    'She goes back to the fridge after dinner. The day is not over for her yet.',
    'She eats standing in the kitchen light, door open, not caring who might see.',
  ] },
]);
