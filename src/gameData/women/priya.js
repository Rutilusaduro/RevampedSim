/** Arc 2 — Priya Chandrasekhar (loudest arguer from Mara → partner seat) */

export const PRIYA_NPCS = [
  { id: 'dev', name: 'Dev Kapoor', age: 33, relation: 'business partner', stanceToward: 'worried', driftLbs: 0, driftRate: 0.03, driftThresholds: [8, 20, 35], argueWeight: 6 },
  { id: 'mara', name: 'Mara Voss', age: 29, relation: 'fixture at the Anchor', stanceToward: 'awed', driftLbs: 0, driftRate: 0, driftThresholds: [8, 20, 35], argueWeight: 0 },
  { id: 'sofie', name: 'Sofie Lindgren', age: 24, relation: 'front desk', stanceToward: 'admiring', driftLbs: 0, driftRate: 0.14, driftThresholds: [8, 20, 35], argueWeight: 1 },
  { id: 'client-circle', name: 'the morning class', age: 30, relation: 'clients', stanceToward: 'arguing', driftLbs: 0, driftRate: 0.05, driftThresholds: [8, 20, 35], argueWeight: 4 },
];

export function createPriyaWoman() {
  return {
    id: 'priya',
    name: 'Priya Chandrasekhar',
    age: 31,
    role: 'owns Halcyon Fitness',
    pronouns: 'she',
    bodyType: 'apple',
    frameLbs: 150,
    lbs: 162,
    appetite: 0.9,
    capacity: 4,
    fullness: 0.25,
    stance: 'opposed',
    resolve: 100,
    flipped: false,
    psych: { indulgence: 0, display: 0, dependence: 0 },
    wardrobe: {
      top: { id: 'compression-top', name: 'compression top', fitLbs: 185, integrity: 1 },
      bottom: { id: 'leggings', name: 'studio leggings', fitLbs: 180, integrity: 1 },
      waist: { id: 'track-jacket', name: 'track jacket', fitLbs: 190, integrity: 1 },
    },
    signature: {
      crownEventId: 'chairCreakFail',
      registerNotes: 'delighted rigor post-flip',
      lexiconBriefIds: ['gym-metrics', 'refeed-language'],
    },
    ratchetLog: [],
    weekUsed: new Set(),
    fixture: null,
  };
}

export const PRIYA_WINDOWS = [
  { id: 'priya-top', eventClass: 'seamSplit', target: 'garment', objectId: 'fitness-top', openLbs: 170, certainLbs: 195, state: 'closed', wear: 0, firedOn: null, label: 'the compression top' },
  { id: 'priya-leggings', eventClass: 'seamSplit', target: 'garment', objectId: 'fitness-leggings', openLbs: 195, certainLbs: 220, state: 'closed', wear: 0, firedOn: null, label: 'the studio leggings' },
  { id: 'priya-office-chair', eventClass: 'chairCreakFail', target: 'object', objectId: 'fitness-office-chair', openLbs: 220, certainLbs: 250, state: 'closed', wear: 0, firedOn: null, label: 'the office chair' },
  { id: 'priya-scale', eventClass: 'scaleCap', target: 'object', objectId: 'fitness-scale', openLbs: 250, certainLbs: 280, state: 'closed', wear: 0, firedOn: null, label: 'the gym scale' },
  { id: 'priya-car', eventClass: 'carSeatBelt', target: 'object', objectId: 'motorline-seat', openLbs: 280, certainLbs: 315, state: 'closed', wear: 0, firedOn: null, label: 'the car seat' },
  { id: 'priya-stairs', eventClass: 'stairsWinded', target: 'task', objectId: 'crescent-stairs', openLbs: 315, certainLbs: 350, state: 'closed', wear: 0, firedOn: null, label: 'the mezzanine stairs' },
  { id: 'priya-turnstile', eventClass: 'turnstile', target: 'location', objectId: 'fitness-turnstile', openLbs: 350, certainLbs: 390, state: 'closed', wear: 0, firedOn: null, label: 'the gym turnstile' },
  { id: 'priya-bench', eventClass: 'chairCreakFail', target: 'object', objectId: 'fitness-bench', openLbs: 460, certainLbs: 500, state: 'closed', wear: 0, firedOn: null, label: 'the demonstration bench', crown: true },
];

export const PRIYA_ARC = {
  id: 'priya',
  title: 'Priya Chandrasekhar — The Demonstration Bench',
  seatType: 'partner',
  day: 1,
  stage: 'orbit',
  argPressure: 0,
  argStage: 'quiet',
  beatsSeen: {},
};
