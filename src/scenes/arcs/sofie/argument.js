import { registerPool } from '../../../textEngine/engine.js';

registerPool('inhabit.arg.notice', [
  { when: {}, text: [
    'Your mother calls. She mentions your voice sounding "tired." You sound happy.',
    'A stranger in the bakery looks at you a second too long. You like it.',
    'Jordan from study group asks if you are "doing okay." The question hangs in the stacks.',
  ] },
  { when: { rungMin: 3 }, weight: 2, text: [
    'A patron watches you shelve from the mezzanine. You shelve slower on purpose.',
  ] },
]);

registerPool('inhabit.arg.concern', [
  { when: {}, text: [
    'Your mother asks about the cardigan. You lie beautifully.',
    'Helene speaks in gentle voices. You keep eating at your desk.',
    'Riley brings salad to the break room. You bring pastries. The evening ends the way evenings end now.',
  ] },
  { when: { stance: 'secret' }, weight: 3, text: [
    'You agree to "watch portions" the way you agree to rain — politely, temporarily.',
  ] },
  { when: { rungMin: 5 }, weight: 2, text: [
    'Priya\'s bench is still the gym\'s favorite story. You hear it in every polite pause at the desk.',
  ] },
]);

registerPool('inhabit.arg.intervention', [
  { when: {}, text: [
    'Coworkers talk about you in the stacks. You eat at the desk anyway.',
    'They stage it in the staff break room. Concern arranged like overdue books.',
    'Your mother cries without making a scene. You pass the fruit tray and hide pastries in your cardigan.',
  ] },
  { when: { rungMin: 4 }, weight: 2, text: [
    'Study group becomes an intervention with textbooks. You listen, already chewing.',
  ] },
]);

registerPool('inhabit.arg.bargaining', [
  { when: {}, text: [
    'They list terms you will lose: one week, one size, one promise.',
    'You agree to a diet the way you agree to rain — politely, temporarily.',
    'Helene brings a salad. You bring dessert. The apartment ends the way apartments end now.',
  ] },
  { when: { flipped: true }, priority: 1, text: [
    'The bargaining is theater now. Everyone knows the ending.',
  ] },
]);

registerPool('inhabit.arg.awe', [
  { when: {}, text: [
    'Your mother stops mid-sentence and watches you eat. The protest dies in her throat.',
    'Jordan says nothing at the study table. They just watch you finish your pastry.',
    'A patron holds the elevator for you without being asked.',
  ] },
  { when: { rungMin: 6 }, weight: 2, text: [
    'Gossip at the front desk gets quieter every week. Nobody says why.',
  ] },
  { when: { rungMin: 8 }, weight: 2, text: [
    'New hires ask which chair is yours in the rotunda. Nobody corrects them.',
  ] },
]);
