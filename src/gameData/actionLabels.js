/** Plain, concrete action labels — no cryptic pool randomization for menus. */

const FIRST = (state) => state.woman.name.split(' ')[0];

export const ACTION_CATEGORIES = {
  'scheme-pastry': 'food',
  'breakfast-pastry': 'food',
  'breakfast-hearty': 'food',
  'refeed-together': 'food',
  'gym-date': 'food',
  'bakery-run': 'food',
  'visit-diner': 'hangout',
  'work-shift': 'hangout',
  'walk': 'hangout',
  'errand-market': 'hangout',
  'rest': 'hangout',
  'teach-class': 'hangout',
  'defend-her': 'hangout',
  'stacks-shift': 'hangout',
  'cardigan-ritual': 'hangout',
  'mirror-check': 'hangout',
  observe: 'hidden',
};

export function getActionCategory(actionId) {
  return ACTION_CATEGORIES[actionId] ?? 'hangout';
}

export function getActionLabel(actionId, state) {
  const n = FIRST(state);
  const arc = state.arc.id;
  const inhabit = state.player.seatType === 'inhabit';

  const labels = {
    'scheme-pastry': inhabit ? 'Buy a box of donuts for yourself' : `Bring ${n} a box of donuts`,
    'breakfast-pastry': inhabit ? 'Pick up pastries on the way in' : `Bring ${n} pastries from the bakery`,
    'breakfast-hearty': inhabit ? 'Make yourself a big breakfast' : `Cook ${n} a big breakfast`,
    'visit-diner': arc === 'priya' ? `Meet ${n} at the gym` : `Meet ${n} at the diner`,
    'work-shift': arc === 'priya'
      ? `Help ${n} teach her morning class`
      : arc === 'sofie'
        ? 'Work your shift at the library'
        : `Hang out with ${n} during her shift`,
    'walk': inhabit ? 'Walk around town' : `Take a walk with ${n}`,
    'errand-market': inhabit ? 'Run errands at the market' : `Go grocery shopping with ${n}`,
    'rest': inhabit ? 'Take a break at home' : `Spend a quiet hour with ${n}`,
    'refeed-together': `Eat a post-workout meal with ${n}`,
    'defend-her': `Tell Dev that ${n} is fine`,
    'gym-date': `Get food with ${n} after the gym closes`,
    'teach-class': `Help ${n} teach her morning class`,
    'bakery-run': 'Go to the bakery for pastries',
    'stacks-shift': 'Work your shift at the library',
    'cardigan-ritual': 'Try on the cardigan again',
    'mirror-check': 'Check yourself in the mirror',
  };

  return labels[actionId] ?? actionId;
}

export function dayPrompt(state) {
  const n = FIRST(state);
  const left = 3 - state.ui.slotsUsed;
  const inhabit = state.player.seatType === 'inhabit';

  if (state.ui.slotsUsed === 0) {
    return inhabit
      ? 'You wake up for another day. What do you do first?'
      : `You wake up for another day. ${n} is already up. What do you do first?`;
  }
  if (left === 1) return 'You have time for one more thing today.';
  return `You still have time for ${left} more things today.`;
}

export function moodLine(woman) {
  if (woman.flipped) return 'She seems happy about all of this.';
  const map = {
    reluctant: 'She keeps saying she should stop, but she never does.',
    opposed: 'She is still fighting it, but losing ground.',
    secret: 'She acts like nothing is happening. You can tell something is.',
    neutral: 'She does not seem bothered.',
    eager: 'She is into it.',
  };
  return map[woman.stance] ?? 'Hard to read today.';
}

export function moodLineInhabit(woman) {
  if (woman.flipped) return 'You are not hiding it anymore.';
  const map = {
    secret: 'You know what you want. You are still pretending you do not.',
    reluctant: 'You keep telling yourself to stop.',
    opposed: 'You are still arguing with yourself.',
    neutral: 'You feel weirdly calm about it.',
    eager: 'You are enjoying this.',
  };
  return map[woman.stance] ?? 'You feel restless.';
}

export function garmentLinePlain(woman) {
  const piece = woman.wardrobe.bottom ?? woman.wardrobe.top;
  const name = piece?.name ?? 'clothes';
  const intact = (piece?.integrity ?? 1) > 0;
  if (!intact) return `Her ${name} do not fit anymore.`;
  const fit = woman.lbs / (piece?.fitLbs ?? woman.lbs);
  if (fit < 1.05) return `Her ${name} still fit.`;
  if (fit < 1.2) return `Her ${name} are getting tight.`;
  return `Her ${name} are way too small.`;
}

export function garmentLinePlainInhabit(woman) {
  const piece = woman.wardrobe.bottom ?? woman.wardrobe.top;
  const name = piece?.name ?? 'clothes';
  const intact = (piece?.integrity ?? 1) > 0;
  if (!intact) return `Your ${name} do not fit anymore.`;
  const fit = woman.lbs / (piece?.fitLbs ?? woman.lbs);
  if (fit < 1.05) return `Your ${name} still fit.`;
  if (fit < 1.2) return `Your ${name} are getting tight.`;
  return `Your ${name} are way too small.`;
}
