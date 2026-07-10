/** Arc-specific prose template routing */

const ARC_TPL = {
  mara: {
    morning: '{port.morning}',
    evening: '{port.evening}',
    meal: '{meal.beat}',
    scheme: '{seat.schemeBeat}',
    crown: '{crown.mara.booth}',
    settling: '{end.settling}',
    interstitial: '{end.interstitial}',
    flip: '{mind.flip}',
    arg: {
      notice: '{arg.notice}',
      concern: '{arg.concern}',
      intervention: '{arg.intervention}',
      bargaining: '{arg.bargaining}',
      awe: '{arg.awe}',
    },
    grav: { t1: '{grav.notice}', t2: '{grav.undeniable}', t3: '{grav.candidate}' },
    crownLocation: 'anchor',
    crownSummary: 'The corner booth — retired before the whole diner',
    fixtureId: 'mara-fixture',
  },
  priya: {
    morning: '{priya.port.morning}',
    evening: '{priya.port.evening}',
    meal: '{priya.meal.beat}',
    scheme: '{seat.defendHer}',
    crown: '{priya.crown.bench}',
    settling: '{priya.end.settling}',
    interstitial: '{priya.end.interstitial}',
    flip: '{priya.mind.flip}',
    arg: {
      notice: '{priya.arg.notice}',
      concern: '{priya.arg.concern}',
      intervention: '{priya.arg.intervention}',
      bargaining: '{priya.arg.bargaining}',
      awe: '{priya.arg.awe}',
    },
    grav: { t1: '{grav.notice}', t2: '{grav.undeniable}', t3: '{grav.candidate}' },
    crownLocation: 'fitness',
    crownSummary: 'The demonstration bench — mid-class, public',
    fixtureId: 'priya-fixture',
  },
  sofie: {
    morning: '{inhabit.morning}',
    evening: '{inhabit.evening}',
    meal: '{inhabit.meal}',
    scheme: '{inhabit.mind.secret}',
    crown: '{crown.sofie.chair}',
    settling: '{sofie.end.settling}',
    interstitial: '{sofie.end.interstitial}',
    flip: '{inhabit.mind.secret}',
    arg: {
      notice: '{inhabit.arg.notice}',
      concern: '{inhabit.arg.concern}',
      intervention: '{inhabit.arg.intervention}',
      bargaining: '{inhabit.arg.awe}',
      awe: '{inhabit.arg.awe}',
    },
    grav: { t1: '{grav.notice}', t2: '{grav.undeniable}', t3: '{grav.candidate}' },
    crownLocation: 'library',
    crownSummary: 'The rotunda reading chair — retired in ceremony',
    fixtureId: 'sofie-fixture',
  },
};

export function arcTemplates(arcId) {
  return ARC_TPL[arcId] ?? ARC_TPL.mara;
}
