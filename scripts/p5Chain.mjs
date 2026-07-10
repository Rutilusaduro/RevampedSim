/** P5 chain — Mara crown → Priya partner → Sofie inhabit + attribution */
import { createContext, render } from '../src/textEngine/engine.js';
import '../src/scenes/index.js';
import { nextArcId } from '../src/game/arcs.js';
import { createInitialGameState } from '../src/game/state.js';
import {
  startDay, executeAction, runEvening, advanceDay, triggerCrown,
  transitionToArc, renderActionMenu,
} from '../src/game/dayLoop.js';

const rush = ['scheme-pastry', 'scheme-pastry', 'visit-diner'];
const priyaDay = ['teach-class', 'refeed-together', 'defend-her'];
const sofieDay = ['bakery-run', 'stacks-shift', 'mirror-check'];

function runDays(state, actions, n) {
  for (let d = 0; d < n; d++) {
    for (const id of actions) executeAction(state, id);
    runEvening(state);
    advanceDay(state);
  }
}

function assert(cond, msg) {
  if (!cond) {
    console.error(`✖ ${msg}`);
    process.exit(1);
  }
}

// Inhabit pronoun pass
const inhCtx = createContext({
  subject: { id: 'sofie', name: 'Sofie Lindgren', pronouns: 'she', frameLbs: 140, lbs: 165, stance: 'secret', flipped: true, fullness: 0.5, psych: {}, wardrobe: {} },
  skillEffects: { seatType: 'inhabit' },
});
const inhText = render('{inhabit.morning}', inhCtx);
assert(/\b(you|your|yourself)\b/i.test(inhText), 'inhabit morning should render second person');

const state = startDay(createInitialGameState({ firstPersonArcs: true }));
runDays(state, rush, 55);
assert(['crown-ready', 'crown', 'settling'].includes(state.arc.stage) || state.woman.lbs > 195, 'Mara should be near crown');
if (state.arc.stage !== 'settling') triggerCrown(state);
assert(state.anthology.length === 1, 'anthology should have Mara');
assert(state.ui.nextArcId === 'priya', 'next arc should be Priya');

transitionToArc(state, 'priya');
assert(state.player.seatType === 'partner', 'Priya seat is partner');
assert(state.arc.id === 'priya', 'arc id is priya');
const priyaMenu = renderActionMenu(state);
assert(priyaMenu.some((a) => a.id === 'teach-class'), 'partner actions available');
runDays(state, priyaDay, 8);
assert(state.woman.lbs > state.woman.frameLbs + 10, 'Priya should gain weight');

transitionToArc(state, 'sofie');
assert(state.player.seatType === 'inhabit', 'Sofie seat is inhabit');
assert(state.woman.flipped === true, 'Sofie starts flipped');
const sofieMenu = renderActionMenu(state);
assert(sofieMenu.some((a) => a.id === 'bakery-run'), 'inhabit actions available');
runDays(state, sofieDay, 5);
const scene = state.ui.sceneText ?? '';
assert(/\b(you|your|yourself)\b/i.test(scene), 'Sofie scenes should use second person');

// Toggle gate
const gated = createInitialGameState({ firstPersonArcs: false });
gated.arc = { id: 'priya' };
gated.toggles = { firstPersonArcs: false };
assert(nextArcId(gated) === null, 'Sofie gated when firstPersonArcs off');

console.log('Mara → Priya → Sofie chain verified');
console.log('✔ P5 chain smoke passed');
