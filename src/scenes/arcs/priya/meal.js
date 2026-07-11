import { registerPool } from '../../../textEngine/engine.js';

registerPool('priya.meal.beat', [
  { when: {}, text: [
    'She eats carefully at first. Then she stops counting and finishes the plate.',
    'Refeed becomes feast when the door locks.',
  ] },
  { when: { stance: 'opposed', flipped: false }, weight: 4, text: [
    '"Maintenance calories," she says, already over them.',
    'She protests once, precisely, then clears the plate.',
    'Her fork pauses over the last bite — a show for the room, and you both know it.',
  ] },
  { when: { rungMin: 2, rungMax: 4 }, weight: 3, text: [
    'Protein shake, then something that is not a protein shake. Priya calls both "recovery."',
    'She sits on the bench and the table is closer than it was last month.',
  ] },
  { when: { rungMin: 5, rungMax: 7 }, weight: 3, text: [
    'She eats while programming tomorrow\'s class. The whiteboard fills with food notes, not reps.',
    'Post-class refeed becomes a sermon. The class stays for dessert.',
  ] },
  { when: { rungMin: 8, rungMax: 10 }, weight: 3, text: [
    'She eats between demonstrations without stopping. Nobody asks her to.',
    'Seconds are not a question anymore. They are part of the program.',
  ] },
  { when: { rungMin: 11 }, weight: 3, text: [
    'She eats on the gym floor between classes. Clients bring her food now.',
    'The whiteboard is all food notes. She finishes every plate.',
  ] },
  { when: { seatType: 'partner', rungMax: 5 }, weight: 3, text: [
    'You slide the refeed bowl two inches toward her hand. Not a word.',
    'Her eyes go to it. Away. Back. Then her fingers find the fork.',
  ] },
  { when: { flipped: true }, priority: 1, weight: 4, text: [
    'She tracks refeed on a gym napkin, then eats past the napkin\'s numbers while GAIN dries on the board.',
    'GAIN is still on the whiteboard. She eats like the morning class is watching — because it is.',
    'Refeed protocol becomes sermon. Priya finishes every bite on the demonstration bench.',
    'She savors every bite the way she used to demo form — out loud, on the gym floor, hungry.',
  ] },
  { when: { fullnessBand: 'full' }, weight: 2, text: [
    'She sits back and the bench dips under her. She does not move.',
    'Her hand rests on her middle — present, unhurried, unapologetic.',
  ] },
  { when: { fullnessBand: 'stuffed' }, weight: 3, text: [
    'She leans back, full, warm, visibly heavier on the demonstration bench.',
    'Breath comes slower. She smiles like the meal is still happening inside her.',
  ] },
]);
