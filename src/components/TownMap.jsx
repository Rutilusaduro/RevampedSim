import { LOCATIONS } from '../gameData/town.js';

export function TownMap({ town, slotsUsed, onVisit }) {
  const scarByLocation = Object.fromEntries(
    town.scars.map((s) => [s.location, s]),
  );
  const fixtures = town.fixtures ?? [];

  return (
    <div className="panel town-map">
      <h2>Halcyon</h2>
      <p className="panel-sub">Places you can visit today</p>
      <ul className="location-list">
        {LOCATIONS.map((loc) => {
          const scar = scarByLocation[loc.id];
          const fixture = fixtures.find((f) => f.location === loc.id);
          const canVisit = slotsUsed < 3;
          return (
            <li key={loc.id} className={`location-row ${scar ? 'scarred' : ''}`}>
              <button
                type="button"
                className="location-btn"
                disabled={!canVisit}
                onClick={() => onVisit(loc.id)}
              >
                {loc.name}
              </button>
              {scar && <p className="scar-line">{scar.line}</p>}
              {fixture && <p className="fixture-line">{fixture.name} — a fixture now</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
