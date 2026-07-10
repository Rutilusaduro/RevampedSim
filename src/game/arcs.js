/** Arc registry and anthology chain (GRAVITY_MASTER §3.2, §9.2) */

import {
  createMaraWoman, MARA_NPCS, MARA_WINDOWS, MARA_ARC,
} from '../gameData/women/mara.js';
import {
  createPriyaWoman, PRIYA_NPCS, PRIYA_WINDOWS, PRIYA_ARC,
} from '../gameData/women/priya.js';
import {
  createSofieWoman, SOFIE_NPCS, SOFIE_WINDOWS, SOFIE_ARC,
} from '../gameData/women/sofie.js';

export const ARC_CHAIN = ['mara', 'priya', 'sofie'];

const ARC_DEFS = {
  mara: {
    arc: MARA_ARC,
    createWoman: createMaraWoman,
    npcs: MARA_NPCS,
    windows: MARA_WINDOWS,
    seatType: 'enabler',
    nextChannel: 'loudestArguer',
    pickNext: () => 'priya',
  },
  priya: {
    arc: PRIYA_ARC,
    createWoman: createPriyaWoman,
    npcs: PRIYA_NPCS,
    windows: PRIYA_WINDOWS,
    seatType: 'partner',
    nextChannel: 'influencedFriend',
    pickNext: () => 'sofie',
  },
  sofie: {
    arc: SOFIE_ARC,
    createWoman: createSofieWoman,
    npcs: SOFIE_NPCS,
    windows: SOFIE_WINDOWS,
    seatType: 'inhabit',
    nextChannel: null,
    pickNext: () => null,
  },
};

export function getArcDef(arcId) {
  return ARC_DEFS[arcId] ?? null;
}

export function pickLoudestArguer(npcs) {
  return [...npcs].sort((a, b) => (b.argueWeight ?? 0) - (a.argueWeight ?? 0))[0];
}

export function pickTopDriftNpc(npcs) {
  return [...npcs].sort((a, b) => (b.driftLbs ?? 0) - (a.driftLbs ?? 0))[0];
}

export function snapshotWoman(woman, arc) {
  return {
    id: woman.id,
    name: woman.name,
    ratchetLog: [...woman.ratchetLog],
    crownEventId: woman.signature?.crownEventId,
    fixture: woman.fixture,
    finalLbs: woman.lbs,
    frameLbs: woman.frameLbs,
    arcTitle: arc.title,
  };
}

/** Load arc into existing town state (chain progression). */
export function loadArcIntoState(state, arcId, { carryDriftFrom } = {}) {
  const def = getArcDef(arcId);
  if (!def) throw new Error(`Unknown arc: ${arcId}`);

  const woman = def.createWoman();
  if (carryDriftFrom) {
    const prior = state.npcs?.find((n) => n.id === carryDriftFrom.id);
    if (prior?.driftLbs) {
      woman.lbs += Math.min(25, prior.driftLbs * 0.4);
      woman.appetite += 0.05;
    }
  }

  state.arc = { ...def.arc, beatsSeen: {}, argPressure: Math.max(0, state.town.softening * 0.3) };
  state.woman = woman;
  state.npcs = def.npcs.map((n) => ({ ...n }));
  state.windows = def.windows.map((w) => ({ ...w }));
  state.player.seatType = def.seatType;
  state.town.arcIndex = ARC_CHAIN.indexOf(arcId);
  state.ui.phase = 'morning';
  state.ui.slotsUsed = 0;
  state.ui.sceneHistory = [];
  state._eventScopes = null;
  state._dayStartLbs = woman.lbs;
  state._lastRung = null;

  return state;
}

export function beginArc(state, arcId) {
  let carry = null;
  const prevId = state.arc?.id;
  if (prevId === 'mara' && arcId === 'priya') {
    carry = pickLoudestArguer(state.npcs);
  } else if (prevId === 'priya' && arcId === 'sofie') {
    carry = pickTopDriftNpc(state.npcs);
  }
  return loadArcIntoState(state, arcId, { carryDriftFrom: carry });
}

export function nextArcId(state) {
  const def = getArcDef(state.arc?.id);
  const next = def?.pickNext?.(state) ?? null;
  if (next === 'sofie' && !state.toggles?.firstPersonArcs) return null;
  return next;
}

export function createFreshArcState(toggles) {
  const base = {
    saveVersion: 1,
    town: {
      day: 1,
      arcIndex: 0,
      softening: 0,
      scars: [],
      fixtures: [],
      economy: { cash: 120, incomePerShift: 45, mealCostBase: 8 },
      objects: null, // filled by state.js
    },
    anthology: [],
    toggles,
    ui: {
      sceneText: '',
      sceneHistory: [],
      morningText: '',
      eveningText: '',
      ledgerText: '',
      actionMenu: [],
      slotsUsed: 0,
      phase: 'morning',
      pendingChoice: null,
      lastNearMiss: null,
      devSeed: null,
      interstitialText: null,
      nextArcId: null,
      candidateLine: null,
    },
    rngSeed: Date.now() & 0xffffffff,
  };
  return base;
}
