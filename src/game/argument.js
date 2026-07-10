import { TUNING } from '../gameData/tuning.js';

const STAGES = ['quiet', 'notice', 'concern', 'intervention', 'bargaining', 'awe'];

export function bumpArgPressure(arc, amount) {
  arc.argPressure = (arc.argPressure ?? 0) + amount;
}

export function currentArgStage(arc) {
  const p = arc.argPressure ?? 0;
  if (p >= 80) return 'awe';
  if (p >= 60) return 'bargaining';
  if (p >= 40) return 'intervention';
  if (p >= 25) return 'concern';
  if (p >= 10) return 'notice';
  return 'quiet';
}

export function advanceArgStage(arc) {
  const stage = currentArgStage(arc);
  if (arc.argStage !== stage) {
    arc.argStage = stage;
    return true;
  }
  return false;
}

export function reduceArgGain(softening) {
  return Math.max(0.3, 1 - softening / 150);
}

export function onPublicWindowFire(arc, town) {
  bumpArgPressure(arc, TUNING.argPressurePerPublicFire * reduceArgGain(town.softening));
}

export function onRungCross(arc, town) {
  bumpArgPressure(arc, TUNING.argPressurePerRung * reduceArgGain(town.softening));
}

export function tryFlip(woman, amount = 15) {
  if (woman.flipped) return false;
  woman.resolve = Math.max(0, (woman.resolve ?? 100) - amount);
  if (woman.resolve <= 0) {
    woman.flipped = true;
    woman.stance = 'eager';
    return true;
  }
  return false;
}

export { STAGES };
