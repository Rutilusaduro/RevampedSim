import { TUNING } from '../gameData/tuning.js';
import { createObjectRegistry } from '../gameData/town.js';
import { loadArcIntoState, createFreshArcState } from './arcs.js';

export function createInitialGameState(toggles = {}, arcId = 'mara') {
  const base = createFreshArcState(toggles);
  base.saveVersion = TUNING.saveVersion;
  base.town.objects = createObjectRegistry();
  base.player = { seatType: 'enabler', name: 'You', driftLbs: 0, knowledge: {} };
  base.anthology = [];
  loadArcIntoState(base, arcId);
  return base;
}
