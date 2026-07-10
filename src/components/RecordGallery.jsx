import { rungFromLbs, rungDescriptor } from '../gameData/ladders.js';

function WomanRecord({ woman, title }) {
  const rungs = [];
  for (let i = 0; i <= 10; i++) {
    const offset = [0, 25, 50, 80, 110, 145, 180, 220, 265, 310, 355][i];
    if (woman.lbs >= woman.frameLbs + offset) rungs.push(i);
  }

  return (
    <section className="woman-record">
      <h3>{title ?? woman.name}</h3>
      {woman.ratchetLog.length === 0 ? (
        <p className="empty">No fires yet. The windows are patient.</p>
      ) : (
        <ol className="ratchet-timeline">
          {woman.ratchetLog.map((e, i) => (
            <li key={i}>
              <span className="ratchet-day">Day {e.day}</span>
              <span>{e.summary}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="meta-line">
        Final: {rungDescriptor(rungFromLbs(woman.frameLbs, woman.lbs).id)}
        {woman.fixture ? ` · fixture at ${woman.fixture.location}` : ''}
      </p>
      {rungs.length > 0 && (
        <ul className="rung-list compact">
          {rungs.map((id) => (
            <li key={id}>{rungDescriptor(id)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function RecordGallery({ woman, town, anthology = [] }) {
  return (
    <div className="panel record-gallery">
      <h2>Record</h2>
      <p className="panel-sub">The ratchet gallery — nothing restores</p>

      {anthology.length > 0 && (
        <section>
          <h3>Anthology</h3>
          {anthology.map((entry) => (
            <WomanRecord
              key={entry.id}
              title={entry.arcTitle ?? entry.name}
              woman={{
                ...entry,
                frameLbs: entry.frameLbs ?? woman.frameLbs,
                lbs: entry.finalLbs ?? entry.lbs,
              }}
            />
          ))}
        </section>
      )}

      <section>
        <h3>{woman.name} — current arc</h3>
        <WomanRecord woman={woman} />
      </section>

      <section>
        <h3>Town scars</h3>
        {town.scars.length === 0 ? (
          <p className="empty">Halcyon is still pretending.</p>
        ) : (
          <ul>
            {town.scars.map((s, i) => (
              <li key={i}>{s.line}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
