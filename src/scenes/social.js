import { registerPool } from '../textEngine/engine.js';

function talkLines(arc, topic, lines) {
  lines.forEach((text, i) => {
    registerPool(`talk.${arc}.${topic}.p${i + 1}`, [{ when: {}, text: [text] }]);
  });
}

talkLines('mara', 'how_are_you', [
  '"Fine," Mara says, too fast. She is at the kitchen counter and will not quite meet your eyes.',
  'You ask again. She sighs. "Tired. The diner was nuts yesterday."',
  'She opens the fridge, closes it, opens it again. "I am gonna eat something before my shift."',
  'You nod. She relaxes a little. "Thanks for checking on me."',
]);

talkLines('mara', 'work', [
  'Mara leans against the counter and tells you about her double shift.',
  '"Sal says the corner booth is wobbling again. Like that is my fault."',
  'She laughs, but it sounds worn out. "I swear half the town comes in just to watch me work."',
  'You offer to bring her coffee at the diner. Her face softens. "Yeah. Do that."',
]);

talkLines('mara', 'sister', [
  'You bring up Elena. Mara\'s jaw tightens.',
  '"She called last night. Asked if I was okay. You know how she asks."',
  'Mara picks at her nail polish. "She thinks I am eating my feelings. Maybe I am. Maybe the feelings are hungry."',
  'She looks at you. "Do not tell her I said that."',
]);

talkLines('priya', 'how_are_you', [
  '"Busy," Priya says, bouncing on her heels. "Class at nine, then paperwork, then more class."',
  'She looks you up and down. "You eating enough? You look thin."',
  'You laugh. She does not. "I am serious. We can grab something after the morning block."',
  'She kisses your cheek and goes back to the whiteboard.',
]);

talkLines('priya', 'gym', [
  'Priya walks you through the gym floor — membership renewals, a cracked bench, a client complaint.',
  '"Dev wants every incident in a spreadsheet," she says. "I want people to show up and eat after."',
  'She points at the mirrors. "Half these people stare at themselves. I would rather they stare at lunch."',
  'You squeeze her hand. She squeezes back. "Stay for the morning class?"',
]);

talkLines('priya', 'dev', [
  'Priya\'s voice drops when you mention Dev.',
  '"He cornered me about liability again. A waiver for the refeed program."',
  'She rolls her eyes. "I told him love is not a lawsuit. He did not laugh."',
  '"Just— back me up if he brings it up tonight. Okay?"',
]);

talkLines('sofie', 'mother', [
  'Your phone rings. Mom.',
  '"Are you eating?" she asks before hello. "You sound different."',
  'You insist you are fine. She does not believe you, but she lets it go.',
  '"Call me Sunday," she says. You promise.',
]);

talkLines('sofie', 'coworker', [
  'Jordan is at the front desk sorting holds.',
  '"Rough morning?" they ask, nodding at the pastry bag in your hand.',
  'You shrug. They grin. "No judgment. The good muffins sell out by nine."',
  'You head to the stacks feeling oddly seen.',
]);

talkLines('sofie', 'feelings', [
  'You sit in the break room longer than you need to.',
  'You have been thinking about food constantly. That used to scare you.',
  'It scares you less now. That might be the scariest part.',
  'You finish your pastry, lick your fingers, and go back to work.',
]);

// Weigh scenes
registerPool('weigh.mara.p1', [{ when: {}, text: ['You find the old bathroom scale. Mara kicks off her shoes like she has been dreading this.'] }]);
registerPool('weigh.mara.p2', [{ when: {}, text: ['She steps on. The dial spins, clicks, settles.'] }]);
registerPool('weigh.mara.p3', [{ when: {}, text: [(ctx) => `You both look: ${(ctx.subject?.lbs ?? 0).toFixed(1)} lbs.`] }]);
registerPool('weigh.mara.p4', [
  { when: { flipped: false }, text: ['"Huh," she says. She steps off fast. "Do not tell Elena."'] },
  { when: { flipped: true }, text: ['She grins at the number. "Still going up. Good."'] },
  { when: {}, text: ['She steps off the scale without another word.'] },
]);

registerPool('weigh.priya.p1', [{ when: {}, text: ['Priya pulls the gym scale into the office and locks the door.'] }]);
registerPool('weigh.priya.p2', [{ when: {}, text: ['She steps on in leggings. The digital display thinks about it.'] }]);
registerPool('weigh.priya.p3', [{ when: {}, text: [(ctx) => `${(ctx.subject?.lbs ?? 0).toFixed(1)} lbs. She writes it on her hand.`] }]);
registerPool('weigh.priya.p4', [{ when: {}, text: ['"Numbers are just data," she says. She does not sound convinced.'] }]);

registerPool('weigh.sofie.p1', [{ when: {}, text: ['You drag the scale out from under the sink.'] }]);
registerPool('weigh.sofie.p2', [{ when: {}, text: ['You step on. The floor creaks with you.'] }]);
registerPool('weigh.sofie.p3', [{ when: {}, text: [(ctx) => `${(ctx.subject?.lbs ?? 0).toFixed(1)} lbs. You stare a long second.`] }]);
registerPool('weigh.sofie.p4', [{ when: {}, text: ['You step off. Your face is warm. You are not sure if that is shame or excitement.'] }]);

// look paragraphs (unchanged structure - keep existing lookParagraphs)
function lookParagraphs(arc, paragraphs) {
  paragraphs.forEach((texts, i) => {
    registerPool(`look.${arc}.p${i + 1}`, texts.map((t) => {
      if (typeof t === 'string') return { when: {}, text: [t] };
      return { when: t.when ?? {}, text: t.text };
    }));
  });
}

lookParagraphs('mara', [
  [
    'Mara is in the kitchen in an old t-shirt, pouring coffee.',
    'Mara is on the couch in sleep pants, scrolling her phone.',
    'Mara is eating cereal from the box, standing in the kitchen light.',
  ],
  [
    { when: {}, text: ['She has put on weight — it shows in her face and the way her clothes fit.'] },
    { when: { rungMax: 7 }, text: ['Her thighs spread a bit wider on the cushion than they used to.'] },
    { when: { rungMax: 7 }, text: ['She looks heavier and happier than you have seen her in months.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['She is noticeably heavy now — her shirt rides up when she reaches.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['Her hips spread wide on the couch. The cushions flatten under her.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['She looks soft and big and comfortable in her own skin.'] },
    { when: { rungMin: 11 }, text: ['She is massive compared to when you met — belly, thighs, face all rounder.'] },
    { when: { rungMin: 11 }, text: ['She fills the couch. She fills the doorway when she stands.'] },
    { when: { rungMin: 11 }, text: ['She looks close to five hundred pounds of woman and she knows it.'] },
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
    { when: {}, text: ['She looks fit, but softer than the photos on the gym website.'] },
    { when: { rungMax: 7 }, text: ['Her leggings strain at the thigh when she finishes the set.'] },
    { when: { rungMax: 7 }, text: ['GAIN is written on the board behind her. She has clearly put on weight.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['Her compression top is tight across her belly. She keeps teaching.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['She looks thick and strong and soft at the same time.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['The bench dips when she sits. She does not get up.'] },
    { when: { rungMin: 11 }, text: ['She is huge by gym standards — belly, hips, thighs all straining her leggings.'] },
    { when: { rungMin: 11 }, text: ['She takes up half the demonstration bench without trying.'] },
    { when: { rungMin: 11 }, text: ['She looks close to five hundred pounds of coach and she owns it.'] },
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
    { when: {}, text: ['Your cardigan gaps at the buttons. Your face looks rounder than last semester.'] },
    { when: { rungMax: 7 }, text: ['Your skirt is tight. Your thighs press together when you stand still.'] },
    { when: { rungMax: 7 }, text: ['You are noticeably heavier and the chair creaks when you shift.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['Your cardigan will not close. Your belly pushes at the fabric.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['You look soft and wide in the mirror. You keep looking.'] },
    { when: { rungMin: 8, rungMax: 10 }, text: ['Your thighs rub when you walk. You have stopped minding.'] },
    { when: { rungMin: 11 }, text: ['You are massive now — belly, hips, thighs filling the frame.'] },
    { when: { rungMin: 11 }, text: ['You fill the elevator. You fill the reading chair.'] },
    { when: { rungMin: 11 }, text: ['You look close to five hundred pounds and you are not hiding.'] },
  ],
  [
    'You adjust the collar and head out anyway.',
    'You take a breath and walk to the desk.',
    'You take another bite. It tastes good.',
  ],
]);
