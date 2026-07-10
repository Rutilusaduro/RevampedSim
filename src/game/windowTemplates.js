/** Arc-specific near-miss / fire template routing */
import {
  NEAR_MISS_TEMPLATES as MARA_NEAR,
  FIRE_TEMPLATES as MARA_FIRE,
} from '../scenes/arcs/mara/windows.js';
import {
  NEAR_MISS_TEMPLATES as PRIYA_NEAR,
  FIRE_TEMPLATES as PRIYA_FIRE,
} from '../scenes/arcs/priya/windows.js';
import {
  NEAR_MISS_TEMPLATES as SOFIE_NEAR,
  FIRE_TEMPLATES as SOFIE_FIRE,
} from '../scenes/arcs/sofie/windows.js';

const BY_ARC = {
  mara: { near: MARA_NEAR, fire: MARA_FIRE },
  priya: { near: PRIYA_NEAR, fire: PRIYA_FIRE },
  sofie: { near: SOFIE_NEAR, fire: SOFIE_FIRE },
};

function maps(arcId) {
  return BY_ARC[arcId] ?? BY_ARC.mara;
}

const GARMENT_NEAR = { mara: '{win.near.garment}', priya: '{priya.win.near.garment}', sofie: '{sofie.win.near.garment}' };
const GENERIC_NEAR = { mara: '{win.near.generic}', priya: '{priya.win.near.generic}', sofie: '{sofie.win.near.generic}' };
const GARMENT_FIRE = { mara: '{win.fire.garment}', priya: '{priya.win.fire.garment}', sofie: '{sofie.win.fire.garment}' };
const CHAIR_FIRE = { mara: '{win.fire.chair}', priya: '{priya.win.fire.chair}', sofie: '{sofie.win.fire.chair}' };

export function nearMissTemplate(arcId, window) {
  const near = maps(arcId).near;
  return near[window.eventClass]
    ?? (window.target === 'garment' ? GARMENT_NEAR[arcId] ?? GARMENT_NEAR.mara : GENERIC_NEAR[arcId] ?? GENERIC_NEAR.mara);
}

export function fireTemplate(arcId, window, state, crownTpl) {
  if (window.crown && ['crown-ready', 'crown', 'convergence', 'settling'].includes(state.arc.stage)) {
    return crownTpl;
  }
  const fire = maps(arcId).fire;
  return fire[window.eventClass]
    ?? (window.target === 'garment' ? GARMENT_FIRE[arcId] ?? GARMENT_FIRE.mara : CHAIR_FIRE[arcId] ?? CHAIR_FIRE.mara);
}
