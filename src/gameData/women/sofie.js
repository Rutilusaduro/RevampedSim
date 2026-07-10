/** Arc 3 — Sofie Lindgren (drift from Priya → inhabit seat) */

export const SOFIE_NPCS = [
  { id: 'mother', name: 'Helene Lindgren', age: 52, relation: 'mother', stanceToward: 'arguing', driftLbs: 0, driftRate: 0.02, driftThresholds: [8, 20, 35], argueWeight: 9 },
  { id: 'study-a', name: 'Jordan Lee', age: 23, relation: 'study group', stanceToward: 'worried', driftLbs: 0, driftRate: 0.1, driftThresholds: [8, 20, 35], argueWeight: 2 },
  { id: 'study-b', name: 'Riley Park', age: 25, relation: 'study group', stanceToward: 'enabling', driftLbs: 0, driftRate: 0.08, driftThresholds: [8, 20, 35], argueWeight: 1 },
  { id: 'priya', name: 'Priya Chandrasekhar', age: 31, relation: 'fixture at the gym', stanceToward: 'awed', driftLbs: 0, driftRate: 0, driftThresholds: [8, 20, 35], argueWeight: 0 },
];

export function createSofieWoman() {
  return {
    id: 'sofie',
    name: 'Sofie Lindgren',
    age: 24,
    role: 'library assistant',
    pronouns: 'she',
    bodyType: 'pear',
    frameLbs: 140,
    lbs: 152,
    appetite: 1.1,
    capacity: 4,
    fullness: 0.35,
    stance: 'secret',
    resolve: 40,
    flipped: true,
    psych: { indulgence: 1, display: 0, dependence: 0 },
    wardrobe: {
      top: { id: 'cardigan', name: 'inherited cardigan', fitLbs: 165, integrity: 1 },
      bottom: { id: 'skirt', name: 'library skirt', fitLbs: 170, integrity: 1 },
      waist: { id: 'belt', name: 'soft belt', fitLbs: 175, integrity: 1 },
    },
    signature: {
      crownEventId: 'readingChair',
      registerNotes: 'private joy made public',
      lexiconBriefIds: ['library-stacks', 'cardigan-ritual'],
    },
    ratchetLog: [],
    weekUsed: new Set(),
    fixture: null,
  };
}

export const SOFIE_WINDOWS = [
  { id: 'sofie-cardigan', eventClass: 'buttonPop', target: 'garment', objectId: 'library-cardigan', openLbs: 152, certainLbs: 195, state: 'closed', wear: 0, firedOn: null, label: 'the inherited cardigan' },
  { id: 'sofie-skirt', eventClass: 'seamSplit', target: 'garment', objectId: 'library-skirt', openLbs: 157, certainLbs: 201, state: 'closed', wear: 0, firedOn: null, label: 'the library skirt' },
  { id: 'sofie-chair', eventClass: 'chairCreakFail', target: 'object', objectId: 'library-reading-chair', openLbs: 184, certainLbs: 236, state: 'closed', wear: 0, firedOn: null, label: 'the rotunda reading chair', crown: true },
  { id: 'sofie-desk-chair', eventClass: 'chairCreakFail', target: 'object', objectId: 'library-desk-chair', openLbs: 178, certainLbs: 228, state: 'closed', wear: 0, firedOn: null, label: 'the desk chair' },
  { id: 'sofie-stairs', eventClass: 'stairsWinded', target: 'task', objectId: 'crescent-stairs', openLbs: 220, certainLbs: 282, state: 'closed', wear: 0, firedOn: null, label: 'the mezzanine stairs' },
  { id: 'sofie-bakery-run', eventClass: 'doorframeBrush', target: 'location', objectId: 'home-door', openLbs: 200, certainLbs: 256, state: 'closed', wear: 0, firedOn: null, label: 'the bakery door' },
  { id: 'sofie-elevator', eventClass: 'turnstile', target: 'location', objectId: 'library-elevator', openLbs: 240, certainLbs: 308, state: 'closed', wear: 0, firedOn: null, label: 'the slow elevator' },
  { id: 'sofie-cart', eventClass: 'chairCreakFail', target: 'object', objectId: 'library-cart', openLbs: 190, certainLbs: 244, state: 'closed', wear: 0, firedOn: null, label: 'the book cart' },
];

export const SOFIE_ARC = {
  id: 'sofie',
  title: 'Sofie Lindgren — The Reading Chair',
  seatType: 'inhabit',
  day: 1,
  stage: 'slide',
  argPressure: 0,
  argStage: 'quiet',
  beatsSeen: { flip: true },
};
