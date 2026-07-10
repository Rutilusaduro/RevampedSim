/** GRAVITY weight rungs — g0–g11. Keys never appear in player prose. */
export const GRAVITY_RUNGS = [
  { id: 0, key: 'g0', name: 'baseline', offset: 0, promise: 'Her ordinary; the before every echo cites' },
  { id: 1, key: 'g1', name: 'softening', offset: 25, promise: 'Waistbands negotiate; private noticing' },
  { id: 2, key: 'g2', name: 'settled', offset: 50, promise: 'First garment windows open' },
  { id: 3, key: 'g3', name: 'filled', offset: 80, promise: 'First furniture creaks; Notice fires' },
  { id: 4, key: 'g4', name: 'plush', offset: 110, promise: 'Gravity radiation starts' },
  { id: 5, key: 'g5', name: 'heavy', offset: 145, promise: 'Booths pinch; Intervention window' },
  { id: 6, key: 'g6', name: 'laden', offset: 180, promise: 'Chairs need choosing; flip country begins' },
  { id: 7, key: 'g7', name: 'spilling', offset: 220, promise: 'Doorways brush; task reassignments' },
  { id: 8, key: 'g8', name: 'sweeping', offset: 265, promise: 'Standard furniture done; reinforced era' },
  { id: 9, key: 'g9', name: 'monumental', offset: 310, promise: 'Doorway stuck is live' },
  { id: 10, key: 'g10', name: 'sovereign', offset: 355, promise: 'Crown country' },
  { id: 11, key: 'g11', name: 'overdrive', offset: 400, promise: 'Post-arc only' },
];

export function rungFromLbs(frameLbs, lbs) {
  const offset = lbs - frameLbs;
  let best = GRAVITY_RUNGS[0];
  for (const r of GRAVITY_RUNGS) {
    if (offset >= r.offset) best = r;
  }
  return best;
}

export function rungDescriptor(rungId) {
  const names = [
    'exactly herself', 'a little softer', 'settled in', 'filled out',
    'plush', 'heavy', 'laden', 'spilling', 'sweeping', 'monumental',
    'sovereign', 'beyond measure',
  ];
  return names[rungId] ?? 'changed';
}

export const FIT_STATES = ['loose', 'fitted', 'snug', 'straining', 'failing', 'burst'];

export function garmentFitState(garment, lbs) {
  if (!garment) return null;
  if (garment.integrity <= 0) return 'burst';
  const r = lbs / garment.fitLbs;
  if (r < 0.85) return 'loose';
  if (r < 1.05) return 'fitted';
  if (r < 1.15) return 'snug';
  if (r < 1.30) return 'straining';
  if (r < 1.50) return 'failing';
  return 'burst';
}
