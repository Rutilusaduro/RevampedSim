import { seededRandom, setRandomSource, createContext, createFacts, createSessionUsed, render } from '../textEngine/engine.js';
import '../scenes/index.js';
import { rungFromLbs } from '../gameData/ladders.js';
import { applyMeal, decayFullness, decayAppetite, mealCost } from './appetite.js';
import { updateWindowStates, rollWindow, getOpenWindows } from './windows.js';
import { recordRatchet, failObject } from './ratchet.js';
import { tickGravity, applySofteningFromDrift } from './gravity.js';
import {
  advanceArgStage, currentArgStage, onPublicWindowFire, onRungCross, tryFlip,
} from './argument.js';
import { getAvailableActions, actionRelevantWindows } from '../gameData/actions.js';

function makeRng(state) {
  const seed = state.rngSeed >>> 0;
  const rng = seededRandom(seed);
  return {
    next: () => {
      const v = rng();
      state.rngSeed = (state.rngSeed + 0x9e3779b9) >>> 0;
      return v;
    },
    seed,
  };
}

function buildGlobals(state) {
  return {
    softening: state.town.softening,
    argPressure: state.arc.argPressure,
    argStage: currentArgStage(state.arc),
    seatType: state.player.seatType,
    witnesses: 'few',
  };
}

function renderBeat(state, tpl, extraGlobals = {}) {
  const scopes = state._eventScopes ?? {
    facts: createFacts(),
    sessionUsed: createSessionUsed(),
    sceneStems: new Set(),
    weekUsed: state.woman.weekUsed,
  };
  state._eventScopes = scopes;
  const ctx = createContext({
    subject: state.woman,
    week: Math.ceil(state.town.day / 7),
    globals: { ...buildGlobals(state), ...extraGlobals },
    ...scopes,
    skillEffects: { seatType: state.player.seatType, softening: state.town.softening },
  });
  return render(tpl, ctx);
}

function fireTemplateFor(window, state) {
  if (window.eventClass.includes('chair') || window.eventClass === 'boothPinch') {
    if (window.crown && ['crown-ready', 'crown', 'convergence'].includes(state.arc.stage)) {
      return '{crown.mara.booth}';
    }
    return '{win.fire.booth}';
  }
  if (window.eventClass.includes('door')) return '{win.fire.door}';
  if (window.target === 'garment') return '{win.fire.garment}';
  return '{win.fire.chair}';
}

function processWindowRolls(state, action, rng) {
  const results = [];
  const relevant = actionRelevantWindows(action, state.windows);
  for (const w of relevant) {
    const outcome = rollWindow(w, state.woman, rng.next);
    if (outcome.nearMiss) {
      w.wear = (w.wear ?? 0) + 0.05;
      results.push({ type: 'nearMiss', window: w, text: renderBeat(state, '{win.near.generic}') });
      state.ui.lastNearMiss = w.id;
    }
    if (outcome.fired) {
      w.state = 'fired';
      w.firedOn = { day: state.town.day, sceneRef: action.id };
      const obj = failObject(state.town, w.objectId, state.town.day, w.label);
      const summary = `${w.label} — day ${state.town.day}`;
      recordRatchet(state.woman, state.town, {
        windowId: w.id,
        day: state.town.day,
        location: obj?.location ?? 'home',
        summary,
        objectId: w.objectId,
        eventClass: w.eventClass,
      });
      if (w.target === 'garment') {
        const slot = obj?.slot;
        if (slot && state.woman.wardrobe[slot]) state.woman.wardrobe[slot].integrity = 0;
      }
      onPublicWindowFire(state.arc, state.town);
      const text = renderBeat(state, fireTemplateFor(w, state), { spurtActive: true });
      results.push({ type: 'fire', window: w, text });
      if (w.crown) state.arc.stage = 'crown';
    }
  }
  updateWindowStates(state.windows, state.woman);
  return results;
}

function checkRungCross(state) {
  const prev = state._lastRung ?? rungFromLbs(state.woman.frameLbs, state.woman.lbs - 0.01).id;
  const now = rungFromLbs(state.woman.frameLbs, state.woman.lbs).id;
  state._lastRung = now;
  if (now > prev) {
    onRungCross(state.arc, state.town);
    return true;
  }
  return false;
}

export function renderMorning(state) {
  state._eventScopes = null;
  return renderBeat(state, '{port.morning}');
}

export function renderActionMenu(state) {
  const actions = getAvailableActions(state);
  return actions.map((a) => ({
    ...a,
    label: render(a.labelTpl, createContext({
      subject: state.woman,
      globals: buildGlobals(state),
      skillEffects: { seatType: state.player.seatType },
    })),
  }));
}

export function executeAction(state, actionId) {
  const action = getAvailableActions(state).find((a) => a.id === actionId);
  if (!action) return { ok: false };
  const rng = makeRng(state);
  state._eventScopes = null;
  const texts = [];
  let lbsGained = 0;

  if (action.effects?.meal) {
    lbsGained += applyMeal(state.woman, action.effects.meal);
    texts.push(renderBeat(state, '{meal.beat}'));
    tickGravity(state.woman, state.npcs, { sharedMeal: true });
  } else if (action.effects?.observe) {
    texts.push(renderBeat(state, '{port.morning}'));
  } else if (action.effects?.work) {
    state.town.economy.cash += state.town.economy.incomePerShift;
    lbsGained += applyMeal(state.woman, action.effects.meal ?? 1);
    texts.push(renderBeat(state, '{meal.beat}'));
  } else if (action.effects?.rest) {
    texts.push(renderBeat(state, '{port.evening}'));
  } else {
    texts.push(renderBeat(state, '{meal.beat}'));
    if (action.effects?.meal) lbsGained += applyMeal(state.woman, action.effects.meal);
  }

  if (action.effects?.meal && !action.effects?.work) {
    const cost = mealCost(state.town, state.woman, action.effects.meal);
    state.town.economy.cash = Math.max(0, state.town.economy.cash - cost);
  }

  const windowResults = processWindowRolls(state, action, rng);
  for (const wr of windowResults) texts.push(wr.text);

  const driftBeats = tickGravity(state.woman, state.npcs);
  for (const db of driftBeats) {
    applySofteningFromDrift(state.town, db.tier);
    if (db.tier >= 1) texts.push(renderBeat(state, '{grav.notice}'));
  }

  checkRungCross(state);
  advanceArgStage(state.arc);
  decayFullness(state.woman, action.slotCost);
  state.ui.slotsUsed += action.slotCost;
  state.ui.sceneHistory.push(...texts);
  state.ui.sceneText = texts.join('\n\n');
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';

  return { ok: true, lbsGained, windowResults };
}

export function runEvening(state) {
  state._eventScopes = null;
  applyMeal(state.woman, state.woman.flipped ? 3 : 2);
  let text = renderBeat(state, '{port.evening}');
  const stage = currentArgStage(state.arc);
  if (stage === 'notice' && !state.arc.beatsSeen?.notice) {
    text += '\n\n' + renderBeat(state, '{arg.notice}');
    state.arc.beatsSeen = { ...state.arc.beatsSeen, notice: true };
  } else if (stage === 'concern' && !state.arc.beatsSeen?.concern) {
    text += '\n\n' + renderBeat(state, '{arg.concern}');
    state.arc.beatsSeen = { ...state.arc.beatsSeen, concern: true };
  } else if (stage === 'intervention' && !state.arc.beatsSeen?.intervention) {
    text += '\n\n' + renderBeat(state, '{arg.intervention}');
    state.arc.beatsSeen = { ...state.arc.beatsSeen, intervention: true };
    tryFlip(state.woman, 100);
  }
  state.ui.eveningText = text;
  state.ui.sceneText = text;
  decayAppetite(state.woman);
  return text;
}

export function runNightLedger(state) {
  const open = getOpenWindows(state.windows, state.woman);
  const delta = state.woman.lbs - (state._dayStartLbs ?? state.woman.lbs);
  const lines = [
    `Day ${state.town.day} — ${state.arc.title}`,
    `Weight: heavier than yesterday (${delta >= 0 ? '+' : ''}${delta.toFixed(1)} lbs today)`,
    `Cash: $${state.town.economy.cash}`,
    `Softening: ${state.town.softening}`,
    `Open windows: ${open.length ? open.map((w) => `${w.label} (${w.stateWord})`).join(', ') : 'none yet'}`,
    renderBeat(state, '{town.ledger}'),
  ];
  if (state.woman.ratchetLog.length) {
    const last = state.woman.ratchetLog[state.woman.ratchetLog.length - 1];
    lines.push(`Ratchet: ${last.summary}`);
  }
  state.ui.ledgerText = lines.join('\n');
  return state.ui.ledgerText;
}

export function advanceDay(state) {
  state.town.day += 1;
  state.ui.slotsUsed = 0;
  state.ui.phase = 'morning';
  state.ui.sceneHistory = [];
  state._dayStartLbs = state.woman.lbs;
  state._eventScopes = null;
  state.ui.morningText = renderMorning(state);
  state.ui.sceneText = state.ui.morningText;
  state.ui.actionMenu = renderActionMenu(state);

  if (state.arc.stage !== 'crown' && state.woman.lbs >= 260 && state.woman.flipped) {
    state.arc.stage = 'convergence';
  }
  if (state.arc.stage === 'convergence') {
    const crown = state.windows.find((w) => w.crown && w.state !== 'fired');
    if (crown && state.woman.lbs >= crown.openLbs) state.arc.stage = 'crown-ready';
  }
  return state;
}

export function startDay(state) {
  state._dayStartLbs = state.woman.lbs;
  state._lastRung = rungFromLbs(state.woman.frameLbs, state.woman.lbs).id;
  state.ui.phase = 'morning';
  state.ui.slotsUsed = 0;
  state.ui.morningText = renderMorning(state);
  state.ui.sceneText = state.ui.morningText;
  state.ui.actionMenu = renderActionMenu(state);
  return state;
}

export function triggerCrown(state) {
  const crown = state.windows.find((w) => w.crown);
  if (!crown) return null;
  state.woman.lbs += 8;
  crown.state = 'fired';
  crown.firedOn = { day: state.town.day, sceneRef: 'crown' };
  failObject(state.town, crown.objectId, state.town.day, crown.label);
  recordRatchet(state.woman, state.town, {
    windowId: crown.id,
    day: state.town.day,
    location: 'anchor',
    summary: 'The corner booth — retired before the whole diner',
    objectId: crown.objectId,
    eventClass: 'boothRemoval',
  });
  state.town.softening = Math.min(100, state.town.softening + 3);
  state.arc.stage = 'settling';
  const text = renderBeat(state, '{crown.mara.booth}', { spurtActive: true, crownNear: true });
  state.ui.sceneText = text;
  return text;
}

export { getOpenWindows, setRandomSource, seededRandom };
