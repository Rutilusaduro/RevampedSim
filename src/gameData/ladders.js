/** GRAVITY weight rungs — g0–g15. Keys never appear in player prose. */
export const GRAVITY_RUNGS = [
  { id: 0, key: 'g0', name: 'baseline', offset: 0, promise: 'Her ordinary; the before every echo cites' },
  { id: 1, key: 'g1', name: 'softening', offset: 20, promise: 'Waistbands tighten; private noticing' },
  { id: 2, key: 'g2', name: 'settled', offset: 40, promise: 'First garment windows open' },
  { id: 3, key: 'g3', name: 'filled', offset: 65, promise: 'First furniture creaks; Notice fires' },
  { id: 4, key: 'g4', name: 'plush', offset: 90, promise: 'Gravity radiation starts' },
  { id: 5, key: 'g5', name: 'heavy', offset: 120, promise: 'Chairs need choosing; argument builds' },
  { id: 6, key: 'g6', name: 'laden', offset: 150, promise: 'Flip country; booths pinch' },
  { id: 7, key: 'g7', name: 'spilling', offset: 185, promise: 'Doorways brush; task reassignments' },
  { id: 8, key: 'g8', name: 'sweeping', offset: 220, promise: 'Standard furniture done' },
  { id: 9, key: 'g9', name: 'broad', offset: 255, promise: 'Reinforced furniture era' },
  { id: 10, key: 'g10', name: 'monumental', offset: 290, promise: 'Public scale; town retools' },
  { id: 11, key: 'g11', name: 'anchored', offset: 320, promise: 'Crown approaches' },
  { id: 12, key: 'g12', name: 'sovereign', offset: 340, promise: 'Crown country' },
  { id: 13, key: 'g13', name: 'throne', offset: 355, promise: '~500 lbs for a 145-frame woman' },
  { id: 14, key: 'g14', name: 'immense', offset: 375, promise: 'Post-crown weight band' },
  { id: 15, key: 'g15', name: 'overdrive', offset: 400, promise: 'Post-arc only' },
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
    'plush', 'heavy', 'laden', 'spilling', 'sweeping', 'broad',
    'monumental', 'anchored', 'sovereign', 'throne-sized', 'immense',
    'beyond measure',
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
