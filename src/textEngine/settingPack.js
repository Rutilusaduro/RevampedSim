import {
  registerSubjectDeriver, registerDimension, trackStemsFor,
  registerModule, registerPool,
} from './engine.js';
import { rungFromLbs, garmentFitState } from '../gameData/ladders.js';

trackStemsFor('port.');
trackStemsFor('meal.');
trackStemsFor('win.');
trackStemsFor('arg.');
trackStemsFor('mind.');
trackStemsFor('grav.');
trackStemsFor('town.');
trackStemsFor('seat.');
trackStemsFor('crown.');

registerSubjectDeriver((woman, ref, skillEffects) => {
  const frame = woman?.frameLbs ?? 150;
  const lbs = woman?.lbs ?? frame;
  const rung = rungFromLbs(frame, lbs);
  const psych = woman?.psych ?? { indulgence: 0, display: 0, dependence: 0 };
  return {
    subjectId: woman?.id ?? null,
    rung: rung.id,
    rungKey: rung.key,
    stance: woman?.stance ?? 'reluctant',
    flipped: !!woman?.flipped,
    fullnessBand: woman?.fullness >= 1.0 ? 'stuffed' : woman?.fullness >= 0.8 ? 'full' : woman?.fullness >= 0.5 ? 'fed' : 'light',
    indulgence: psych.indulgence ?? 0,
    display: psych.display ?? 0,
    dependence: psych.dependence ?? 0,
    seatType: skillEffects?.seatType ?? 'enabler',
    argStage: skillEffects?.argStage ?? 'quiet',
    spurtActive: !!skillEffects?.spurtActive,
    crownNear: !!skillEffects?.crownNear,
    softening: skillEffects?.softening ?? 0,
    argPressure: skillEffects?.argPressure ?? 0,
    fitTop: garmentFitState(woman?.wardrobe?.top, lbs),
    fitBottom: garmentFitState(woman?.wardrobe?.bottom, lbs),
    fitWaist: garmentFitState(woman?.wardrobe?.waist, lbs),
  };
});

registerDimension('softening', (ctx) => ctx.globals?.softening ?? ctx.d.softening ?? 0);
registerDimension('argPressure', (ctx) => ctx.globals?.argPressure ?? ctx.d.argPressure ?? 0);
registerDimension('witnesses', (ctx) => ctx.globals?.witnesses ?? 'none');
registerDimension('driftTier', (ctx) => ctx.globals?.driftTier ?? 0);
registerDimension('relSize', (ctx) => {
  const s = ctx.subject?.lbs;
  const r = ctx.ref?.lbs;
  if (s == null || r == null) return null;
  const ratio = s / r;
  if (ratio < 0.6) return 'much_smaller';
  if (ratio < 0.85) return 'smaller';
  if (ratio <= 1.18) return 'similar';
  if (ratio <= 1.67) return 'larger';
  return 'much_larger';
});

const PRONOUN_SETS = {
  she: { they: 'she', them: 'her', their: 'her', theirs: 'hers', themself: 'herself' },
  he: { they: 'he', them: 'him', their: 'his', theirs: 'his', themself: 'himself' },
  they: { they: 'they', them: 'them', their: 'their', theirs: 'theirs', themself: 'themself' },
};

for (const slot of ['they', 'them', 'their', 'theirs', 'themself']) {
  registerModule(`subject.${slot}`, [
    { when: {}, text: [(ctx) => (PRONOUN_SETS[ctx.subject?.pronouns] || PRONOUN_SETS.she)[slot]] },
  ]);
}
registerModule('subject.name', [
  { when: {}, text: [(ctx) => ctx.subject?.name || 'Someone'] },
]);
registerModule('subject.first', [
  { when: {}, text: [(ctx) => (ctx.subject?.name || 'Someone').split(' ')[0]] },
]);
registerModule('ref.name', [
  { when: {}, text: [(ctx) => ctx.ref?.name || 'someone'] },
]);

registerPool('word.adv.pace', [
  { when: {}, text: ['', '', 'without hurry'] },
  { when: { rung: 1 }, text: ['', 'a little slower than she meant to'] },
  { when: { rungMin: 4 }, weight: 2, text: ['with a sway that arrives before she does', 'slower than yesterday'] },
  { when: { flipped: true }, weight: 2, text: ['like the room already made room'] },
]);

registerPool('word.size', [
  { when: {}, text: ['soft', 'settled', 'warm'] },
  { when: { rung: 1 }, weight: 2, text: ['curved', 'a little softer', 'noticeable'] },
  { when: { rungMin: 2, rungMax: 4 }, weight: 2, text: ['curved', 'generous', 'noticeable'] },
  { when: { rungMin: 5, rungMax: 7 }, weight: 2, text: ['heavy', 'ample', 'undeniable'] },
  { when: { rungMin: 8 }, weight: 2, text: ['monumental', 'room-filling', 'sovereign'] },
  { when: { indulgenceMin: 2 }, weight: 2, text: ['indulged', 'well-fed', 'satisfied'] },
]);

registerPool('word.moveVerb', [
  { when: {}, text: ['walks', 'moves', 'crosses'] },
  { when: { rungMin: 4 }, weight: 2, text: ['sways', 'rolls', 'settles forward'] },
  { when: { rungMin: 7 }, weight: 2, text: ['navigates', 'negotiates', 'claims space'] },
]);
