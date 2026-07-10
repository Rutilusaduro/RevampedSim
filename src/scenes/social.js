import { registerPool } from '../textEngine/engine.js';

function lookParagraphs(arc, paragraphs) {
  paragraphs.forEach((texts, i) => {
    registerPool(`look.${arc}.p${i + 1}`, texts.map((t) => ({ when: {}, text: [t] })));
  });
}

lookParagraphs('mara', [
  [
    'Mara is in the kitchen in an old t-shirt, pouring coffee.',
    'Mara is on the couch in sleep pants, scrolling her phone.',
    'Mara is eating cereal from the box, standing in the kitchen light.',
  ],
  [
    'She has put on weight — it shows in her face and the way her clothes fit.',
    'Her thighs spread a bit wider on the cushion than they used to.',
    'She looks heavier and happier than you have seen her in months.',
  ],
  [
    'She catches you looking and raises an eyebrow. "What?"',
    'She notices you looking and does not bother to cover up.',
    'She grins with milk on her lip. "What? I was hungry."',
  ],
]);

lookParagraphs('priya', [
  [
    'Priya is at the gym whiteboard in leggings and a sports top.',
    'Priya is demoing a squat for a morning client.',
    'Priya is sitting on a bench eating from a takeout container.',
  ],
  [
    'She looks fit, but softer than the photos on the gym website.',
    'Her leggings strain at the thigh when she finishes the set.',
    'GAIN is written on the board behind her. She has clearly put on weight.',
  ],
  [
    'She waves you over. "Morning. You eating after this?"',
    'She catches your eye in the mirror and winks.',
    'She pats the bench next to her. "Sit. Eat."',
  ],
]);

lookParagraphs('sofie', [
  [
    'You catch yourself in the bathroom mirror before work.',
    'You pause by the library elevator doors on the way in.',
    'You look down at yourself in the break room, pastry in hand.',
  ],
  [
    'Your cardigan gaps at the buttons. Your face looks rounder than last semester.',
    'Your skirt is tight. Your thighs press together when you stand still.',
    'You are noticeably heavier and the chair creaks when you shift.',
  ],
  [
    'You adjust the collar and head out anyway.',
    'You take a breath and walk to the desk.',
    'You take another bite. It tastes good.',
  ],
]);

// Talk — costs a slot
registerPool('talk.mara.how-are-you', [
  { when: {}, text: [
    '"Fine," Mara says, too fast. She looks at the fridge instead of you.',
    '"I slept okay. I might grab something at the diner later."',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    '"Great," Mara says. "I was gonna get pancakes. You in?"',
  ] },
]);

registerPool('talk.mara.work', [
  { when: {}, text: [
    'Mara complains about a double shift and a wobbly booth at the diner.',
    '"Sal says fix it or lose the section," she says. She laughs, but she sounds tired.',
  ] },
]);

registerPool('talk.mara.sister', [
  { when: {}, text: [
    'Mara\'s face tightens when you mention Elena.',
    '"She asked if I was eating my feelings again. I told her I was eating breakfast."',
  ] },
]);

registerPool('talk.priya.how-are-you', [
  { when: {}, text: [
    '"Busy," Priya says. "Class at nine, meetings all afternoon."',
    'She looks you over. "You eating enough?" It sounds like a coach question.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    '"Hungry," Priya says cheerfully. "We\'ll eat after the morning block."',
  ] },
]);

registerPool('talk.priya.gym', [
  { when: {}, text: [
    'Priya walks you through membership numbers and a broken bench.',
    '"Dev wants everything documented. I want everyone fed," she says.',
  ] },
]);

registerPool('talk.priya.dev', [
  { when: {}, text: [
    'Priya sighs when you bring up Dev.',
    '"He worries about lawsuits. I worry about people skipping meals."',
  ] },
]);

registerPool('talk.sofie.mother', [
  { when: {}, text: [
    'Your mom picks up on the second ring.',
    '"Are you eating? Are you sleeping?" You promise to call Sunday.',
  ] },
]);

registerPool('talk.sofie.coworker', [
  { when: {}, text: [
    'Jordan at the front desk asks how your semester is going.',
    'They nod at your pastry. You laugh it off and go shelve returns.',
  ] },
]);

registerPool('talk.sofie.feelings', [
  { when: {}, text: [
    'You have been thinking about food more than usual lately.',
    'You are not sure if that worries you. You get a snack anyway.',
  ] },
  { when: { flipped: true }, weight: 2, text: [
    'You are tired of pretending you are not hungry.',
    'The cardigan does not close. You head to the bakery before work.',
  ] },
]);
