export const ACTIONS = [
  {
    id: 'observe',
    labelTpl: '{seat.observe}',
    slotCost: 1,
    seatTypes: ['partner', 'enabler', 'influenced', 'inhabit'],
    stageGate: null,
    effects: { observe: true },
    windowTags: [],
  },
  {
    id: 'breakfast-pastry',
    labelTpl: '{seat.breakfastPastry}',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { meal: 2, outing: 'anchor' },
    windowTags: ['garment', 'sitting'],
  },
  {
    id: 'breakfast-hearty',
    labelTpl: '{seat.breakfastHearty}',
    slotCost: 1,
    seatTypes: ['enabler', 'partner', 'inhabit'],
    effects: { meal: 3 },
    windowTags: ['garment'],
  },
  {
    id: 'work-shift',
    labelTpl: '{seat.workShift}',
    slotCost: 1,
    seatTypes: ['enabler', 'partner', 'inhabit'],
    effects: { work: true, meal: 1 },
    windowTags: ['sitting', 'booth'],
  },
  {
    id: 'errand-market',
    labelTpl: '{seat.errandMarket}',
    slotCost: 1,
    seatTypes: ['enabler', 'partner', 'influenced', 'inhabit'],
    effects: { outing: 'market', meal: 1 },
    windowTags: ['transit'],
  },
  {
    id: 'scheme-pastry',
    labelTpl: '{seat.schemePastry}',
    slotCost: 1,
    seatTypes: ['enabler'],
    effects: { meal: 3, scheme: true },
    windowTags: ['garment'],
  },
  {
    id: 'visit-diner',
    labelTpl: '{seat.visitDiner}',
    slotCost: 1,
    seatTypes: ['enabler', 'partner', 'influenced'],
    effects: { outing: 'anchor', meal: 2 },
    windowTags: ['booth', 'sitting'],
  },
  {
    id: 'walk',
    labelTpl: '{seat.walk}',
    slotCost: 1,
    seatTypes: ['partner', 'enabler', 'influenced', 'inhabit'],
    effects: { outing: 'marina' },
    windowTags: ['transit', 'stairs'],
  },
  {
    id: 'rest',
    labelTpl: '{seat.rest}',
    slotCost: 1,
    seatTypes: ['partner', 'enabler', 'influenced', 'inhabit'],
    effects: { rest: true },
    windowTags: [],
  },
];

export const WINDOW_TAG_MAP = {
  buttonPop: ['garment'],
  seamSplit: ['garment'],
  zipperRetreat: ['garment'],
  chairCreakFail: ['sitting'],
  boothPinch: ['booth', 'sitting'],
  doorframeBrush: ['transit'],
  doorStuck: ['transit'],
  carSeatBelt: ['transit'],
  stairsWinded: ['stairs'],
  stairsRoute: ['stairs'],
};

export function getAvailableActions(state) {
  const { player, arc, ui } = state;
  if (ui.slotsUsed >= 3) return [];
  return ACTIONS.filter((a) => {
    if (!a.seatTypes.includes(player.seatType)) return false;
    if (a.stageGate && arc.stage !== a.stageGate) return false;
    return true;
  });
}

export function actionRelevantWindows(action, windows) {
  const tags = new Set(action.windowTags ?? []);
  return windows.filter((w) => {
    if (w.state === 'fired') return false;
    const wTags = WINDOW_TAG_MAP[w.eventClass] ?? [w.target];
    return wTags.some((t) => tags.has(t));
  });
}
