export const LINT_CHARACTERS = [
  { id: 'mara', name: 'Mara Voss', pronouns: 'she', frameLbs: 145, lbs: 200, stance: 'reluctant', flipped: false, fullness: 0.6, psych: { indulgence: 0, display: 0, dependence: 0 }, wardrobe: { top: { fitLbs: 180, integrity: 1 }, bottom: { fitLbs: 175, integrity: 1 }, waist: { fitLbs: 200, integrity: 1 } } },
  { id: 'mara-flip', name: 'Mara Voss', pronouns: 'she', frameLbs: 145, lbs: 280, stance: 'eager', flipped: true, fullness: 1.0, psych: { indulgence: 2, display: 1, dependence: 1 }, wardrobe: { top: { fitLbs: 180, integrity: 0 }, bottom: { fitLbs: 175, integrity: 0 }, waist: { fitLbs: 200, integrity: 1 } } },
  { id: 'priya', name: 'Priya Chandrasekhar', pronouns: 'she', frameLbs: 150, lbs: 220, stance: 'opposed', flipped: false, fullness: 0.7, psych: { indulgence: 0, display: 0, dependence: 0 }, wardrobe: { top: { fitLbs: 185, integrity: 1 }, bottom: { fitLbs: 180, integrity: 1 }, waist: { fitLbs: 190, integrity: 1 } } },
  { id: 'sofie', name: 'Sofie Lindgren', pronouns: 'she', frameLbs: 140, lbs: 195, stance: 'secret', flipped: true, fullness: 0.8, psych: { indulgence: 2, display: 0, dependence: 0 }, wardrobe: { top: { fitLbs: 165, integrity: 1 }, bottom: { fitLbs: 170, integrity: 1 }, waist: { fitLbs: 175, integrity: 1 } } },
];

export const LINT_GRID = {
  rung: [1, 4, 7],
  stance: ['reluctant', 'eager'],
  flipped: [false, true],
  globals: [
    { seatType: 'enabler', softening: 0 },
    { seatType: 'enabler', softening: 40 },
    { seatType: 'partner', softening: 20 },
    { seatType: 'inhabit', softening: 30 },
  ],
};

export const RENDERS_PER_CELL = 4;

export const SWEEPS = [
  { name: 'port.morning', root: 'port.morning', tpl: '{port.morning}' },
  { name: 'meal.beat', root: 'meal.beat', tpl: '{meal.beat}' },
  { name: 'win.near.garment', root: 'win.near.garment', tpl: '{win.near.garment}' },
  { name: 'arg.intervention', root: 'arg.intervention', tpl: '{arg.intervention}' },
  { name: 'mind.flip', root: 'mind.flip', tpl: '{mind.flip}' },
  { name: 'priya.morning', root: 'priya.port.morning', tpl: '{priya.port.morning}' },
  { name: 'priya.meal', root: 'priya.meal.beat', tpl: '{priya.meal.beat}' },
  { name: 'priya.win.near', root: 'priya.win.near.garment', tpl: '{priya.win.near.garment}' },
  { name: 'priya.arg', root: 'priya.arg.intervention', tpl: '{priya.arg.intervention}' },
  { name: 'inhabit.morning', root: 'inhabit.morning', tpl: '{inhabit.morning}' },
  { name: 'inhabit.meal', root: 'inhabit.meal', tpl: '{inhabit.meal}' },
  { name: 'inhabit.evening', root: 'inhabit.evening', tpl: '{inhabit.evening}' },
  { name: 'sofie.win.near', root: 'sofie.win.near.garment', tpl: '{sofie.win.near.garment}' },
  { name: 'inhabit.arg', root: 'inhabit.arg.intervention', tpl: '{inhabit.arg.intervention}' },
];

export const LADDER_COVERAGE = [
  { prefixes: ['word.size'], dimension: 'rung', rungs: [1, 4, 7] },
  { prefixes: ['word.adv.pace'], dimension: 'rung', rungs: [1, 4, 7] },
];

export const OPTIONAL_EMPTY_POOLS = new Set(['word.adv.pace']);

export const PSYCH_KEYS = /^(indulgence|display|dependence)(Min|Max)?$|^flipped$|^stance$/;
export const PSYCH_REGISTER_EXEMPT_PREFIXES = ['word.moveVerb'];

export const BANNED_PATTERNS = [
  { pattern: /\bobesity\b/i, message: 'clinical language' },
  { pattern: /\bBMI\b/i, message: 'clinical language' },
  { pattern: /you both know/i, message: 'narrated telepathy' },
  { pattern: /\bsuddenly\b/i, message: 'unearned' },
];

export const CONTINUITY_SWEEPS = [];

export const MORPH_CASES = [
  ['past', 'walks', 'walked'], ['past', 'strides', 'strode'],
  ['ing', 'walks', 'walking'], ['s3', 'walk', 'walks'],
  ['plural', 'inch', 'inches'], ['plural', 'woman', 'women'],
];

export const VERB_CORPUS = ['walks', 'moves', 'crosses', 'sways', 'rolls'];
