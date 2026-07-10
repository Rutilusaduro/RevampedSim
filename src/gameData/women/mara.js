/** Arc 1 — Mara Voss woman sheet (canonical per GRAVITY_MASTER §9.2) */

export const MARA_NPCS = [
  { id: 'elena', name: 'Elena Voss', age: 32, relation: 'sister', stanceToward: 'arguing', driftLbs: 0, driftRate: 0.04, driftThresholds: [8, 20, 35], argueWeight: 10 },
  { id: 'kayla', name: 'Kayla Ortiz', age: 26, relation: 'coworker', stanceToward: 'worried', driftLbs: 0, driftRate: 0.12, driftThresholds: [8, 20, 35], argueWeight: 2 },
  { id: 'priya', name: 'Priya Chandrasekhar', age: 31, relation: 'gym friend', stanceToward: 'arguing', driftLbs: 0, driftRate: 0.08, driftThresholds: [8, 20, 35], argueWeight: 8 },
  { id: 'sal', name: 'Sal Moretti', age: 48, relation: 'boss', stanceToward: 'worried', driftLbs: 0, driftRate: 0.02, driftThresholds: [8, 20, 35], argueWeight: 3 },
];

export function createMaraWoman() {
  return {
    id: 'mara',
    name: 'Mara Voss',
    age: 29,
    role: 'waitress at the Anchor',
    pronouns: 'she',
    bodyType: 'hourglass',
    frameLbs: 145,
    lbs: 158,
    appetite: 1.0,
    capacity: 4,
    fullness: 0.3,
    stance: 'reluctant',
    resolve: 100,
    flipped: false,
    psych: { indulgence: 0, display: 0, dependence: 0 },
    wardrobe: {
      top: { id: 'work-blouse', name: 'work blouse', fitLbs: 180, integrity: 1 },
      bottom: { id: 'gray-jeans', name: 'gray jeans', fitLbs: 175, integrity: 1 },
      waist: { id: 'apron', name: 'diner apron', fitLbs: 200, integrity: 1 },
    },
    signature: {
      crownEventId: 'boothRemoval',
      registerNotes: 'defiant serenity mid-crisis',
      lexiconBriefIds: ['anchor-diner', 'pastry-ritual'],
    },
    ratchetLog: [],
    weekUsed: new Set(),
    fixture: null,
  };
}

export const MARA_WINDOWS = [
  { id: 'mara-jeans', eventClass: 'seamSplit', target: 'garment', objectId: 'home-jeans', openLbs: 165, certainLbs: 190, state: 'closed', wear: 0, firedOn: null, label: 'the gray jeans' },
  { id: 'mara-blouse', eventClass: 'buttonPop', target: 'garment', objectId: 'home-top', openLbs: 190, certainLbs: 215, state: 'closed', wear: 0, firedOn: null, label: 'the work blouse' },
  { id: 'mara-staff-chair', eventClass: 'chairCreakFail', target: 'object', objectId: 'anchor-chair', openLbs: 215, certainLbs: 245, state: 'closed', wear: 0, firedOn: null, label: 'a staff-room chair' },
  { id: 'mara-chair', eventClass: 'chairCreakFail', target: 'object', objectId: 'home-chair', openLbs: 245, certainLbs: 275, state: 'closed', wear: 0, firedOn: null, label: 'the kitchen chair' },
  { id: 'mara-car', eventClass: 'carSeatBelt', target: 'object', objectId: 'motorline-seat', openLbs: 275, certainLbs: 310, state: 'closed', wear: 0, firedOn: null, label: 'the hatchback seat' },
  { id: 'mara-stairs', eventClass: 'stairsWinded', target: 'task', objectId: 'crescent-stairs', openLbs: 310, certainLbs: 345, state: 'closed', wear: 0, firedOn: null, label: 'the apartment stairs' },
  { id: 'mara-door', eventClass: 'doorframeBrush', target: 'location', objectId: 'home-door', openLbs: 345, certainLbs: 385, state: 'closed', wear: 0, firedOn: null, label: 'the apartment door' },
  { id: 'mara-booth', eventClass: 'boothPinch', target: 'object', objectId: 'anchor-booth', openLbs: 455, certainLbs: 495, state: 'closed', wear: 0, firedOn: null, label: 'the corner booth', crown: true },
];

export const MARA_ARC = {
  id: 'mara',
  title: 'Mara Voss — The Corner Booth',
  seatType: 'enabler',
  day: 1,
  stage: 'orbit',
  argPressure: 0,
  argStage: 'quiet',
  beatsSeen: {},
};
