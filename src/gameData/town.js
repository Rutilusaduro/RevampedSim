export const LOCATIONS = [
  { id: 'anchor', name: 'The Anchor', note: 'landmark diner; corner booth is town history' },
  { id: 'mercer', name: 'Mercer & Vale', note: 'office block' },
  { id: 'crescent', name: 'The Crescent', note: 'apartment block' },
  { id: 'fitness', name: 'Halcyon Fitness', note: 'Priya\'s gym' },
  { id: 'verdis', name: "Verdi's", note: 'Carmen\'s restaurant' },
  { id: 'library', name: 'Meridian Library', note: 'rotunda, antique chair' },
  { id: 'oaks', name: 'The Twelve Oaks', note: 'event hall' },
  { id: 'sorelle', name: 'Sorelle Bridal', note: 'fitting rooms' },
  { id: 'market', name: 'Pine & 4th Market', note: 'groceries' },
  { id: 'townhall', name: 'Town Hall', note: 'council chamber' },
  { id: 'marina', name: 'The Marina Walk', note: 'boardwalk' },
  { id: 'motorline', name: 'Motorline', note: 'bus + hatchback' },
  { id: 'tailor', name: "Dr. Osei's", note: 'tailor — ritual measurements only' },
  { id: 'home', name: 'Home', note: 'per-arc interiors' },
];

export function createObjectRegistry() {
  return [
    { id: 'anchor-booth', location: 'anchor', kind: 'booth', name: 'corner booth', ratingLbs: 220, status: 'fine', history: [] },
    { id: 'anchor-chair', location: 'anchor', kind: 'chair', name: 'staff chair', ratingLbs: 200, status: 'fine', history: [] },
    { id: 'home-chair', location: 'home', kind: 'chair', name: 'kitchen chair', ratingLbs: 210, status: 'fine', history: [] },
    { id: 'home-jeans', location: 'home', kind: 'garment', name: 'gray jeans', ratingLbs: 175, status: 'fine', history: [], slot: 'bottom' },
    { id: 'home-top', location: 'home', kind: 'garment', name: 'work blouse', ratingLbs: 180, status: 'fine', history: [], slot: 'top' },
    { id: 'home-door', location: 'home', kind: 'doorway', name: 'apartment door', ratingLbs: 320, status: 'fine', history: [] },
    { id: 'motorline-seat', location: 'motorline', kind: 'carSeat', name: 'hatchback seat', ratingLbs: 240, status: 'fine', history: [] },
    { id: 'crescent-stairs', location: 'crescent', kind: 'stairs', name: 'apartment stairs', ratingLbs: 280, status: 'fine', history: [] },
  ];
}
