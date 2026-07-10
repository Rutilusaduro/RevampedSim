import { registerPool } from '../textEngine/engine.js';

registerPool('feed.donut', [
  { when: {}, text: [
    'You bring her a single donut in a little bag. She eats it in two bites.',
    'Jelly on her lip. She licks it off without thinking.',
  ] },
]);

registerPool('feed.pizza', [
  { when: {}, text: [
    'You order a large pizza. She says she will have one slice.',
    'Three slices later the box is half empty. She leans back, satisfied.',
    'She pats her stomach. "Okay. That was a lot." She reaches for slice four.',
  ] },
]);

registerPool('feed.dessert', [
  { when: {}, text: [
    'You tell the waiter to bring the dessert menu. She pretends to resist.',
    'She orders the chocolate cake. You order a second fork. She does not argue.',
  ] },
]);

registerPool('feed.buffet', [
  { when: {}, text: [
    'The all-you-can-eat place is loud and bright. Mara fills her plate twice before you sit down.',
    'Plate three is mostly carbs. Plate four is dessert.',
    'She unbuttons her jeans under the table. Nobody at home needs to know.',
    'She waddles to the car smiling. "We are doing this again Friday."',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'She treats the buffet like a sport. You lose count of her plates.',
    'Other diners stare. She stares back while chewing.',
    'On the drive home she asks what is in the fridge. You laugh. She is serious.',
  ] },
]);

registerPool('feed.seconds', [
  { when: {}, text: [
    '"You want seconds?" you ask. She hesitates half a second.',
    '"...Yeah," she says. She goes back for more like she has been waiting for permission.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'You ask if she wants more. She is already standing up. "Obviously."',
  ] },
]);

registerPool('feed.rub', [
  { when: {}, text: [
    'She is full and slouched on the couch. You rub her belly without asking.',
    'She stiffens, then melts into it. "That feels nice," she mumbles.',
    'Her stomach is firm and warm under your hand. She breathes slower.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'You rub her swollen belly. She moans softly and does not stop you.',
    '"Keep going," she says. She sounds half asleep and wholly happy.',
  ] },
]);

registerPool('feed.compliment', [
  { when: {}, text: [
    'You tell her she looks good. She rolls her eyes. "Liar."',
    'You tell her you like how she looks. She goes quiet. "...Thanks."',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'You tell her she is beautiful like this. She believes you. She smiles into her plate.',
  ] },
]);

registerPool('feed.inhabit.binge', [
  { when: {}, text: [
    'You buy too much takeout and eat it all on the couch.',
    'Carton after carton. Your belt digs in. You loosen it and keep going.',
    'When it is gone you sit heavy and dazed, fingers greasy, heart pounding.',
  ] },
]);
