import { seededRandom, setRandomSource, createContext, createFacts, createSessionUsed, render, hasModule } from '../textEngine/engine.js';
import '../scenes/index.js';
import { rungFromLbs, rungDescriptor } from '../gameData/ladders.js';
import { TUNING } from '../gameData/tuning.js';
import { applyMeal, decayFullness, decayAppetite, mealCost, eveningMealSize, applyEndOfDayAppetite, appetiteCap } from './appetite.js';
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


function appendBeat(state, text) {
  if (!text?.trim()) return;
  if (!state.ui.sceneHistory.length && state.ui.morningText) {
    state.ui.sceneHistory.push(state.ui.morningText);
  }
  state.ui.sceneHistory.push(text);
  state.ui.sceneText = state.ui.sceneHistory.join('\n\n');
}

function ensureEventScopes(state) {
  if (!state._eventScopes) {
    state._eventScopes = {
      facts: createFacts(),
      sessionUsed: createSessionUsed(),
      sceneStems: new Set(),
      weekUsed: state.woman.weekUsed,
    };
  }
  return state._eventScopes;
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
  const scopes = ensureEventScopes(state);
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

function noteWindowEvent(state, window, type, text) {
  if (!state.ui.windowJournal) state.ui.windowJournal = {};
  const list = state.ui.windowJournal[window.id] ?? [];
  list.push({ day: state.town.day, type, text: text?.slice(0, 120) ?? window.label });
  state.ui.windowJournal[window.id] = list;
}

function processWindowRolls(state, action, rng) {
  const results = [];
  const relevant = actionRelevantWindows(action, state.windows);
  const rolled = relevant.map((w) => ({ w, outcome: rollWindow(w, state.woman, rng.next) }));

  const fireCandidate = rolled
    .filter(({ outcome }) => outcome.fired)
    .sort((a, b) => (b.outcome.p ?? 0) - (a.outcome.p ?? 0))[0];

  for (const { w, outcome } of rolled) {
    if (outcome.nearMiss) {
      w.wear = Math.min(TUNING.nearMissWearCap, (w.wear ?? 0) + TUNING.nearMissWearAdd);
      if (!fireCandidate || w.id !== fireCandidate.w.id) {
        results.push({ type: 'nearMiss', window: w, text: renderBeat(state, nearMissTpl(state, w)) });
        state.ui.lastNearMiss = w.id;
        noteWindowEvent(state, w, 'nearMiss', w.label);
      }
    }
  }

  if (fireCandidate) {
    const { w } = fireCandidate;
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
    noteWindowEvent(state, w, 'fire', w.label);
    if (w.crown) state.arc.stage = 'crown';
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
    const rungText = renderBeat(state, '{port.rung}');
    if (rungText) appendBeat(state, rungText);
    return true;
  }
  return false;
}

function updateArcStage(state) {
  if (state.arc.stage === 'settling' || state.arc.stage === 'crown') return;
  const rung = rungFromLbs(state.woman.frameLbs, state.woman.lbs).id;
  const crown = state.windows.find((w) => w.crown && w.state !== 'fired');
  if (state.woman.flipped && rung >= 4 && state.arc.stage !== 'crown-ready') {
    state.arc.stage = 'convergence';
  }
  if (crown && state.woman.flipped) {
    updateWindowStates(state.windows, state.woman);
    if (crown.state === 'open' || crown.state === 'imminent' || state.woman.lbs >= crown.openLbs) {
      state.arc.stage = 'crown-ready';
    }
  }
}

export function renderMorning(state) {
  ensureEventScopes(state);
  return renderBeat(state, tpl(state).morning);
}

export function renderActionMenu(state) {
  const cash = state.town.economy.cash;
  const tight = cash < 20;
  const broke = cash < 8;
  return getAvailableActions(state)
    .filter((a) => !a.menuHidden)
    .filter((a) => {
      if (!a.effects?.meal) return true;
      const size = a.effects.meal;
      if (broke) return size <= 2 || a.effects.work;
      if (tight) return size <= 3;
      return true;
    })
    .map((a) => ({
      ...a,
      label: getActionLabel(a.id, state),
      category: getActionCategory(a.id),
    }));
}

export function executeLook(state) {
  const arc = state.arc.id;
  const text = renderParagraphSequence(state, `look.${arc}`, 3);
  appendBeat(state, text);
  return text;
}

export function executeWeigh(state) {
  const arc = state.arc.id;
  const text = renderParagraphSequence(state, `weigh.${arc}`, 4);
  state.woman.lastWeigh = { day: state.town.day, lbs: state.woman.lbs };
  appendBeat(state, text);
  return text;
}

export function executeTalk(state, topicId) {
  if (state.ui.slotsUsed >= 3) return { ok: false };
  const base = `talk.${state.arc.id}.${topicId}`;
  const text = renderParagraphSequence(state, base, 6);
  if (!text) return { ok: false, error: 'missing dialogue' };
  bumpArgPressure(state.arc, 1);
  advanceArgStage(state.arc);
  updateArcStage(state);
  state.ui.slotsUsed += 1;
  appendBeat(state, text);
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';
  return { ok: true, text };
}

export function executeAction(state, actionId) {
  const action = getAvailableActions(state).find((a) => a.id === actionId);
  if (!action) return { ok: false };
  const rng = makeRng(state);
  const t = tpl(state);
  const texts = [];
  let lbsGained = 0;

  if (action.effects?.scheme) {
    texts.push(renderBeat(state, t.scheme));
  }

  if (action.effects?.meal) {
    state._dayHadPlayerMeal = true;
    lbsGained += applyMeal(state.woman, action.effects.meal);
    if (action.effects.feedTpl) {
      texts.push(renderParagraphSequence(state, action.effects.feedTpl, action.effects.feedParts ?? 3));
    } else {
      texts.push(renderBeat(state, t.meal));
    }
    tickGravity(state.woman, state.npcs, { sharedMeal: true });
  } else if (action.effects?.intimate) {
    state.woman.appetite = Math.min(appetiteCap(state.woman), state.woman.appetite + 0.06);
    texts.push(renderParagraphSequence(state, action.effects.intimate, action.effects.feedParts ?? 3));
  } else if (action.effects?.observe) {
    texts.push(renderBeat(state, t.morning));
  } else if (action.effects?.work) {
    state.town.economy.cash += state.town.economy.incomePerShift;
    if (action.effects.meal) {
      state._dayHadPlayerMeal = true;
      lbsGained += applyMeal(state.woman, action.effects.meal);
    }
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
  for (const t of texts) appendBeat(state, t);
  state.ui.actionMenu = renderActionMenu(state);
  if (state.ui.slotsUsed >= 3) state.ui.phase = 'evening-ready';

  return { ok: true, lbsGained, windowResults };
}

export function runEvening(state) {
  const t = tpl(state);
  const eveningSize = eveningMealSize(state.woman, {
    hadPlayerMeal: !!state._dayHadPlayerMeal,
  });
  let eveningServed = false;
  if (eveningSize > 0) {
    applyMeal(state.woman, eveningSize, { passive: true });
    eveningServed = true;
  }
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

  appendBeat(state, text);
  state.ui.eveningText = text;
  applyEndOfDayAppetite(state.woman, eveningServed);
  decayAppetite(state.woman);
  bumpArgPressure(state.arc, 2 + Math.floor(state.town.day / 14));
  advanceArgStage(state.arc);
  updateArcStage(state);
  return text;
}

export function runNightLedger(state) {
  const delta = state.woman.lbs - (state._dayStartLbs ?? state.woman.lbs);
  const prose = renderBeat(state, '{town.ledger}');
  const lines = [
    prose,
    '',
    `Day ${state.town.day} closes.`,
    `She gained ${delta >= 0 ? '+' : ''}${delta.toFixed(1)} lbs today — now ${state.woman.lbs.toFixed(1)} lbs.`,
  ];
  if (state.ui.rungMilestone?.day === state.town.day) {
    lines.push(`She looks ${state.ui.rungMilestone.label} tonight.`);
  }
  if (state.woman.ratchetLog.length) {
    const last = state.woman.ratchetLog[state.woman.ratchetLog.length - 1];
    lines.push(`Still thinking about: ${last.summary}`);
  }
  lines.push(`Cash on hand: $${state.town.economy.cash}`);
  state.ui.ledgerText = lines.join('\n');
  return state.ui.ledgerText;
}

export function advanceDay(state) {
  state.town.day += 1;
  state.ui.slotsUsed = 0;
  state.ui.phase = 'morning';
  state.ui.sceneHistory = [];
  state._dayHadPlayerMeal = false;
  state.woman._capacityGrewToday = false;
  state._dayStartLbs = state.woman.lbs;
  state._eventScopes = null;
  state.ui.morningText = renderMorning(state);
  state.ui.sceneText = state.ui.morningText;
  state.ui.sceneHistory = [state.ui.morningText];
  state.ui.actionMenu = renderActionMenu(state);
  updateArcStage(state);
  return state;
}

export function startDay(state) {
  state._dayStartLbs = state.woman.lbs;
  state._lastRung = rungFromLbs(state.woman.frameLbs, state.woman.lbs).id;
  state._dayHadPlayerMeal = false;
  state.woman._capacityGrewToday = false;
  state.ui.phase = 'morning';
  state.ui.slotsUsed = 0;
  state._eventScopes = null;
  state.ui.morningText = renderMorning(state);
  state.ui.sceneText = state.ui.morningText;
  state.ui.sceneHistory = [state.ui.morningText];
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
  const rng = makeRng(state);
  const texts = [renderBeat(state, '{town.visit}', { location: locationId, locationName: loc.name })];
  if (locationId === 'anchor' || locationId === 'fitness') {
    state._dayHadPlayerMeal = true;
    applyMeal(state.woman, 2);
    texts.push(renderBeat(state, t.meal));
    tickGravity(state.woman, state.npcs, { sharedMeal: true });
  }
  const windowResults = processWindowRolls(state, action, rng);
  for (const wr of windowResults) texts.push(wr.text);
  state.ui.slotsUsed += 1;
  for (const line of texts) appendBeat(state, line);
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
  state.woman.lbs += TUNING.crownSpurtLbs;
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
