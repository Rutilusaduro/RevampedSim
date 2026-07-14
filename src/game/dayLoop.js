import { seededRandom, setRandomSource, createContext, createFacts, createSessionUsed, render, hasModule } from '../textEngine/engine.js';
import '../scenes/index.js';
import { rungFromLbs, rungDescriptor } from '../gameData/ladders.js';
import { TUNING } from '../gameData/tuning.js';
import { applyMeal, decayFullness, decayAppetite, mealCost, eveningMealSize } from './appetite.js';
import { updateWindowStates, rollWindow, getOpenWindows } from './windows.js';
import { recordRatchet, failObject } from './ratchet.js';
import { tickGravity, applySofteningFromDrift } from './gravity.js';
import {
  advanceArgStage, currentArgStage, onPublicWindowFire, onRungCross, tryFlip, bumpArgPressure,
} from './argument.js';
import { getAvailableActions, actionRelevantWindows } from '../gameData/actions.js';
import { getActionLabel, getActionCategory } from '../gameData/actionLabels.js';
import { nearMissTemplate, fireTemplate } from './windowTemplates.js';
import { LOCATIONS } from '../gameData/town.js';
import { arcTemplates } from './templates.js';
import { beginArc, nextArcId, snapshotWoman } from './arcs.js';

function mealPacing(state) {
  const crown = state.windows.find((w) => w.crown && w.state !== 'fired');
  return { day: state.town.day, crownOpenLbs: crown?.openLbs ?? null };
}

function tpl(state) {
  return arcTemplates(state.arc.id);
}

function renderParagraphSequence(state, baseKey, maxParts = 12) {
  const parts = [];
  for (let i = 1; i <= maxParts; i++) {
    const key = `${baseKey}.p${i}`;
    if (!hasModule(key)) break;
    const t = renderBeat(state, `{${key}}`);
    if (t) parts.push(t);
  }
  return parts.join('\n\n');
}

function crownSequenceKey(state) {
  const arc = state.arc.id;
  if (arc === 'mara') return 'crown.mara.booth';
  if (arc === 'priya') return 'priya.crown.bench';
  return 'crown.sofie.chair';
}

function renderCrownScene(state) {
  const base = crownSequenceKey(state);
  const seq = renderParagraphSequence(state, base, 14);
  if (seq) return seq;
  return renderBeat(state, tpl(state).crown, { spurtActive: true, crownNear: true, witnesses: 'many' });
}

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

function renderBeat(state, beatTpl, extraGlobals = {}) {
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
  return render(beatTpl, ctx);
}

function nearMissTpl(state, window) {
  return nearMissTemplate(state.arc.id, window);
}

function fireTpl(window, state) {
  return fireTemplate(state.arc.id, window, state, tpl(state).crown);
}

function processWindowRolls(state, action, rng) {
  const results = [];
  const relevant = actionRelevantWindows(action, state.windows);
  for (const w of relevant) {
    const outcome = rollWindow(w, state.woman, rng.next);
    if (outcome.nearMiss) {
      w.wear = (w.wear ?? 0) + 0.05;
      results.push({ type: 'nearMiss', window: w, text: renderBeat(state, nearMissTpl(state, w)) });
      state.ui.lastNearMiss = w.id;
    }
    if (outcome.fired) {
      if (w.crown && state.town.day < TUNING.minCrownReadyDay) {
        w.wear = (w.wear ?? 0) + 0.05;
        results.push({ type: 'nearMiss', window: w, text: renderBeat(state, nearMissTpl(state, w)) });
        state.ui.lastNearMiss = w.id;
        continue;
      }
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
      const text = w.crown
        ? renderCrownScene(state)
        : renderBeat(state, fireTpl(w, state), { spurtActive: true });
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
    state.ui.rungMilestone = {
      id: now,
      label: rungDescriptor(now),
      lbs: state.woman.lbs,
      day: state.town.day,
    };
    return true;
  }
  return false;
}

function updateArcStage(state) {
  if (state.arc.stage === 'settling' || state.arc.stage === 'crown') return;
  const rung = rungFromLbs(state.woman.frameLbs, state.woman.lbs).id;
  const crown = state.windows.find((w) => w.crown && w.state !== 'fired');
  if (state.woman.flipped && rung >= 6 && state.arc.stage !== 'crown-ready') {
    state.arc.stage = 'convergence';
  }
  if (crown && state.woman.flipped && state.town.day >= TUNING.minCrownReadyDay) {
    updateWindowStates(state.windows, state.woman);
    if (crown.state === 'open' || crown.state === 'imminent' || state.woman.lbs >= crown.openLbs) {
      state.arc.stage = 'crown-ready';
    }
  }
}

export function renderMorning(state) {
  state._eventScopes = null;
  return renderBeat(state, tpl(state).morning);
}

export function renderActionMenu(state) {
  return getAvailableActions(state)
    .filter((a) => !a.menuHidden)
    .map((a) => ({
      ...a,
      label: getActionLabel(a.id, state),
      category: getActionCategory(a.id),
    }));
}

export function executeLook(state) {
  const arc = state.arc.id;
  state._eventScopes = null;
  const text = renderParagraphSequence(state, `look.${arc}`, 3);
  const base = state.ui.sceneHistory.length
    ? state.ui.sceneHistory.join('\n\n')
    : state.ui.morningText;
  state.ui.sceneText = `${base}\n\n${text}`;
  return text;
}

export function executeWeigh(state) {
  const arc = state.arc.id;
  state._eventScopes = null;
  const text = renderParagraphSequence(state, `weigh.${arc}`, 4);
  state.woman.lastWeigh = { day: state.town.day, lbs: state.woman.lbs };
  const base = state.ui.sceneHistory.length
    ? state.ui.sceneHistory.join('\n\n')
    : state.ui.morningText;
  state.ui.sceneText = `${base}\n\n${text}`;
  return text;
}

export function executeTalk(state, topicId) {
  if (state.ui.slotsUsed >= 3) return { ok: false };
  state._eventScopes = null;
  const base = `talk.${state.arc.id}.${topicId}`;
  const text = renderParagraphSequence(state, base, 6);
  if (!text) return { ok: false, error: 'missing dialogue' };
  bumpArgPressure(state.arc, 1);
  advanceArgStage(state.arc);
  updateArcStage(state);
  state.ui.slotsUsed += 1;
  if (state.ui.sceneHistory.length === 0) {
    state.ui.sceneHistory.push(state.ui.morningText);
  }
  state.ui.sceneHistory.push(text);
  state.ui.sceneText = state.ui.sceneHistory.join('\n\n');
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';
  return { ok: true, text };
}

export function executeAction(state, actionId) {
  const action = getAvailableActions(state).find((a) => a.id === actionId);
  if (!action) return { ok: false };
  const rng = makeRng(state);
  const t = tpl(state);
  state._eventScopes = null;
  const texts = [];
  let lbsGained = 0;

  if (action.effects?.scheme) {
    texts.push(renderBeat(state, t.scheme));
  }

  if (action.effects?.meal) {
    lbsGained += applyMeal(state.woman, action.effects.meal, { pacing: mealPacing(state) });
    if (action.effects.feedTpl) {
      texts.push(renderParagraphSequence(state, action.effects.feedTpl, action.effects.feedParts ?? 3));
    } else {
      texts.push(renderBeat(state, t.meal));
    }
    tickGravity(state.woman, state.npcs, { sharedMeal: true });
  } else if (action.effects?.intimate) {
    state.woman.appetite = Math.min(2.5, state.woman.appetite + 0.06);
    texts.push(renderParagraphSequence(state, action.effects.intimate, action.effects.feedParts ?? 3));
  } else if (action.effects?.observe) {
    texts.push(renderBeat(state, t.morning));
  } else if (action.effects?.work) {
    state.town.economy.cash += state.town.economy.incomePerShift;
    lbsGained += applyMeal(state.woman, action.effects.meal ?? 1, { pacing: mealPacing(state) });
    texts.push(renderBeat(state, t.meal));
  } else if (action.effects?.rest) {
    texts.push(renderBeat(state, t.evening));
  } else if (!action.effects?.scheme) {
    texts.push(renderBeat(state, t.meal));
  }

  if (action.effects?.meal && !action.effects?.work) {
    const cost = mealCost(state.town, state.woman, action.effects.meal);
    state.town.economy.cash = Math.max(0, state.town.economy.cash - cost);
  }

  const windowResults = processWindowRolls(state, action, rng);
  for (const wr of windowResults) texts.push(wr.text);

  const driftBeats = tickGravity(state.woman, state.npcs, { sharedMeal: !!action.effects?.meal });
  for (const db of driftBeats) {
    applySofteningFromDrift(state.town, db.tier);
    const g = t.grav;
    if (db.tier === 1) texts.push(renderBeat(state, g.t1));
    else if (db.tier === 2) texts.push(renderBeat(state, g.t2));
    else if (db.tier >= 3) texts.push(renderBeat(state, g.t3));
  }

  checkRungCross(state);
  advanceArgStage(state.arc);
  updateArcStage(state);
  decayFullness(state.woman, action.slotCost);
  state.ui.slotsUsed += action.slotCost;
  if (state.ui.sceneHistory.length === 0 && texts.length) {
    state.ui.sceneHistory.push(state.ui.morningText);
  }
  state.ui.sceneHistory.push(...texts);
  state.ui.sceneText = texts.join('\n\n');
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';

  return { ok: true, lbsGained, windowResults };
}

export function runEvening(state) {
  const t = tpl(state);
  state._eventScopes = null;
  applyMeal(state.woman, eveningMealSize(state.woman, state.town.day), { passive: true, pacing: mealPacing(state) });
  let text = renderBeat(state, t.evening);
  const stage = currentArgStage(state.arc);
  let flippedNow = false;

  const argTpl = t.arg[stage];
  if (argTpl && !state.arc.beatsSeen?.[stage]) {
    text += '\n\n' + renderBeat(state, argTpl);
    state.arc.beatsSeen = { ...state.arc.beatsSeen, [stage]: true };
    if (stage === 'intervention') flippedNow = tryFlip(state.woman, 100);
  }

  if (flippedNow || (state.woman.flipped && !state.arc.beatsSeen?.flip)) {
    text += '\n\n' + renderBeat(state, t.flip);
    state.arc.beatsSeen = { ...state.arc.beatsSeen, flip: true };
  }

  state.ui.eveningText = text;
  state.ui.sceneText = text;
  decayAppetite(state.woman);
  bumpArgPressure(state.arc, 2 + Math.floor(state.town.day / 14));
  advanceArgStage(state.arc);
  updateArcStage(state);
  return text;
}

export function runNightLedger(state) {
  const delta = state.woman.lbs - (state._dayStartLbs ?? state.woman.lbs);
  const lines = [
    `Day ${state.town.day}`,
    `She gained ${delta >= 0 ? '+' : ''}${delta.toFixed(1)} lbs today`,
    `Weight: ${state.woman.lbs.toFixed(1)} lbs`,
    `Cash: $${state.town.economy.cash}`,
    renderBeat(state, '{town.ledger}'),
  ];
  if (state.ui.rungMilestone?.day === state.town.day) {
    lines.splice(2, 0, `Milestone: she looks ${state.ui.rungMilestone.label}`);
  }
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
  updateArcStage(state);
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
  updateArcStage(state);
  return state;
}

export function executeVisit(state, locationId) {
  const loc = LOCATIONS.find((l) => l.id === locationId);
  if (!loc || state.ui.slotsUsed >= 3) return { ok: false };
  const action = {
    id: `visit-${locationId}`,
    slotCost: 1,
    windowTags: locationId === 'crescent' ? ['stairs'] : locationId === 'anchor' ? ['booth', 'sitting'] : locationId === 'fitness' ? ['sitting', 'garment'] : locationId === 'library' ? ['sitting', 'stairs'] : ['transit'],
    effects: { outing: locationId },
  };
  const t = tpl(state);
  state._eventScopes = null;
  const rng = makeRng(state);
  const texts = [renderBeat(state, '{town.visit}', { location: locationId, locationName: loc.name })];
  if (locationId === 'anchor' || locationId === 'fitness') {
    applyMeal(state.woman, 2, { pacing: mealPacing(state) });
    texts.push(renderBeat(state, t.meal));
    tickGravity(state.woman, state.npcs, { sharedMeal: true });
  }
  const windowResults = processWindowRolls(state, action, rng);
  for (const wr of windowResults) texts.push(wr.text);
  state.ui.slotsUsed += 1;
  state.ui.sceneText = texts.join('\n\n');
  state.ui.sceneHistory.push(...texts);
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';
  decayFullness(state.woman, 1);
  checkRungCross(state);
  advanceArgStage(state.arc);
  updateArcStage(state);
  return { ok: true, windowResults };
}

export function finalizeSettling(state) {
  const t = tpl(state);
  state.anthology = state.anthology ?? [];
  state.anthology.push(snapshotWoman(state.woman, state.arc));
  state.ui.interstitialText = renderBeat(state, t.interstitial);
  state.ui.nextArcId = nextArcId(state);
  state.ui.candidateLine = state.ui.nextArcId === 'priya'
    ? 'Priya Chandrasekhar — the loudest arguer — is already leaning.'
    : state.ui.nextArcId === 'sofie'
      ? 'Sofie Lindgren — watching from the desk — is ready.'
      : null;
  const crownText = state.ui.sceneText;
  const settlingText = renderBeat(state, t.settling);
  state.ui.sceneText = `${crownText}\n\n${settlingText}`;
  state.ui.phase = 'settling';
}

export function triggerCrown(state) {
  const crown = state.windows.find((w) => w.crown);
  if (!crown) return null;
  const t = tpl(state);
  state.woman.lbs += 12;
  crown.state = 'fired';
  crown.firedOn = { day: state.town.day, sceneRef: 'crown' };
  failObject(state.town, crown.objectId, state.town.day, crown.label);
  recordRatchet(state.woman, state.town, {
    windowId: crown.id,
    day: state.town.day,
    location: t.crownLocation,
    summary: t.crownSummary,
    objectId: crown.objectId,
    eventClass: crown.eventClass,
  });
  state.town.softening = Math.min(100, state.town.softening + 3);
  state.town.fixtures.push({
    id: t.fixtureId,
    womanId: state.woman.id,
    location: t.crownLocation,
    name: state.woman.name,
    overdrive: state.toggles?.overdrive ?? false,
  });
  state.woman.fixture = { location: t.crownLocation, overdrive: state.toggles?.overdrive ?? false, odLbsPerDay: 0.5 };
  state.arc.stage = 'settling';
  const crownText = renderCrownScene(state);
  state.ui.sceneText = crownText;
  finalizeSettling(state);
  return state.ui.sceneText;
}

export function transitionToArc(state, arcId) {
  beginArc(state, arcId);
  startDay(state);
  const intro = state.ui.interstitialText;
  if (intro) {
    state.ui.sceneText = `${intro}\n\n${state.ui.morningText}`;
  }
  state.ui.interstitialText = null;
  state.ui.nextArcId = null;
  state.ui.phase = 'morning';
  return state;
}

export { getOpenWindows, setRandomSource, seededRandom };
