import { rungFromLbs, rungDescriptor } from '../gameData/ladders.js';

export function RecordGallery({ woman, town }) {
  const rungs = [];
  for (let i = 0; i <= 10; i++) {
    const offset = [0, 25, 50, 80, 110, 145, 180, 220, 265, 310, 355][i];
    if (woman.lbs >= woman.frameLbs + offset) rungs.push(i);
  }

  return (
    <div className="panel record-gallery">
      <h2>{woman.name}&apos;s Record</h2>
      <p className="panel-sub">The ratchet gallery — nothing restores</p>
      <section>
        <h3>Ratchet log</h3>
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
      </section>
      <section>
        <h3>Rungs crossed</h3>
        <ul className="rung-list">
          {rungs.map((id) => (
            <li key={id}>{rungDescriptor(id)}</li>
          ))}
        </ul>
        <p className="meta-line">Current: {rungDescriptor(rungFromLbs(woman.frameLbs, woman.lbs).id)}</p>
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
