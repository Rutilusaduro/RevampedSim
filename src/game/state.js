import { TUNING } from '../gameData/tuning.js';
import { createMaraWoman, MARA_NPCS, MARA_WINDOWS, MARA_ARC } from '../gameData/women/mara.js';
import { createObjectRegistry } from '../gameData/town.js';

export function createInitialGameState(toggles = {}) {
  return {
    saveVersion: TUNING.saveVersion,
    town: {
      day: 1,
      arcIndex: 0,
      softening: 0,
      scars: [],
      fixtures: [],
      economy: { cash: 120, incomePerShift: 45, mealCostBase: 8 },
      objects: createObjectRegistry(),
    },
    arc: { ...MARA_ARC },
    woman: createMaraWoman(),
    npcs: MARA_NPCS.map((n) => ({ ...n })),
    windows: MARA_WINDOWS.map((w) => ({ ...w })),
    player: {
      seatType: 'enabler',
      name: 'You',
      driftLbs: 0,
      knowledge: {},
    },
    toggles: {
      stuckContent: true,
      witnessedFailure: true,
      firstPersonArcs: true,
      influencedSeatGain: true,
      overdrive: false,
      ...toggles,
    },
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
    },
    rngSeed: Date.now() & 0xffffffff,
  };
}
