export const ACTIONS = [
  {
    id: 'bring-donut',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { meal: 1, feedTpl: 'feed.donut', feedParts: 2 },
    windowTags: ['garment'],
  },
  {
    id: 'bring-pizza',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { meal: 4, feedTpl: 'feed.pizza', feedParts: 3 },
    windowTags: ['garment', 'sitting'],
  },
  {
    id: 'order-dessert',
    slotCost: 1,
    seatTypes: ['enabler', 'partner', 'inhabit'],
    effects: { meal: 2, feedTpl: 'feed.dessert', feedParts: 2 },
    windowTags: ['sitting'],
  },
  {
    id: 'all-you-can-eat',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { meal: 5, feedTpl: 'feed.buffet', feedParts: 4, outing: 'anchor' },
    windowTags: ['booth', 'sitting'],
  },
  {
    id: 'offer-seconds',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { meal: 2, feedTpl: 'feed.seconds', feedParts: 2 },
    windowTags: [],
  },
  {
    id: 'rub-belly',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { intimate: 'feed.rub', feedParts: 3 },
    windowTags: [],
  },
  {
    id: 'say-she-looks-good',
    slotCost: 1,
    seatTypes: ['enabler', 'partner'],
    effects: { intimate: 'feed.compliment', feedParts: 2 },
    windowTags: [],
  },
  {
    id: 'inhabit-binge',
    slotCost: 1,
    seatTypes: ['inhabit'],
    effects: { meal: 4, feedTpl: 'feed.inhabit.binge', feedParts: 3 },
    windowTags: ['garment', 'sitting'],
    arcIds: ['sofie'],
  },
  {
    id: 'observe',
    labelTpl: '{seat.observe}',
    menuHidden: true,
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
  // Partner seat (Priya)
  {
    id: 'teach-class',
    labelTpl: '{seat.teachClass}',
    slotCost: 1,
    seatTypes: ['partner'],
    effects: { work: true, meal: 1, outing: 'fitness' },
    windowTags: ['sitting'],
    arcIds: ['priya'],
  },
  {
    id: 'refeed-together',
    labelTpl: '{seat.refeedTogether}',
    slotCost: 1,
    seatTypes: ['partner'],
    effects: { meal: 3, outing: 'fitness' },
    windowTags: ['garment'],
    arcIds: ['priya'],
  },
  {
    id: 'defend-her',
    labelTpl: '{seat.defendHer}',
    slotCost: 1,
    seatTypes: ['partner'],
    effects: { scheme: true },
    windowTags: [],
    arcIds: ['priya'],
  },
  {
    id: 'gym-date',
    labelTpl: '{seat.gymDate}',
    slotCost: 1,
    seatTypes: ['partner'],
    effects: { meal: 2, outing: 'fitness' },
    windowTags: ['sitting', 'garment'],
    arcIds: ['priya'],
  },
  // Inhabit seat (Sofie) — second-person pools
  {
    id: 'mirror-check',
    labelTpl: '{seat.mirrorCheck}',
    slotCost: 1,
    seatTypes: ['inhabit'],
    effects: { observe: true },
    windowTags: ['garment'],
    arcIds: ['sofie'],
  },
  {
    id: 'bakery-run',
    labelTpl: '{seat.bakeryRun}',
    slotCost: 1,
    seatTypes: ['inhabit'],
    effects: { meal: 3, outing: 'market' },
    windowTags: ['garment', 'transit'],
    arcIds: ['sofie'],
  },
  {
    id: 'stacks-shift',
    labelTpl: '{seat.stacksShift}',
    slotCost: 1,
    seatTypes: ['inhabit'],
    effects: { work: true, meal: 1, outing: 'library' },
    windowTags: ['sitting', 'stairs'],
    arcIds: ['sofie'],
  },
  {
    id: 'cardigan-ritual',
    labelTpl: '{seat.cardiganRitual}',
    slotCost: 1,
    seatTypes: ['inhabit'],
    effects: { observe: true },
    windowTags: ['garment'],
    arcIds: ['sofie'],
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
    if (a.arcIds && !a.arcIds.includes(arc.id)) return false;
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
