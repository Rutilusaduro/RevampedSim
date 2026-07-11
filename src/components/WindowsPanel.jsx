import { useState } from 'react';
import { getOpenWindows, barFill } from '../game/windows.js';

function stateClass(word) {
  if (word === 'imminent') return 'win-imminent';
  if (word === 'creaking') return 'win-creaking';
  if (word === 'restless') return 'win-restless';
  if (word === 'waiting') return 'win-waiting';
  return 'win-quiet';
}

export function WindowsPanel({ windows, woman, lastNearMiss, journal = {} }) {
  const [selected, setSelected] = useState(null);
  const rows = getOpenWindows(windows, woman);
  const crown = windows.find((w) => w.crown && w.state !== 'fired');
  const approaching = windows.filter(
    (w) => w.state !== 'fired' && w.state === 'approaching',
  );
  const history = selected ? journal[selected] ?? [] : [];

  return (
    <aside className="panel windows-panel">
      <h2>What might break</h2>
      <p className="panel-sub">The town&apos;s nerves — watch the bars</p>

      {approaching.length > 0 && (
        <ul className="win-ghost-list">
          {approaching.map((w) => (
            <li key={w.id} className="win-ghost">
              {w.label} — getting close
            </li>
          ))}
        </ul>
      )}

      <ul className="win-list">
        {rows.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              className={`win-row win-row-btn ${stateClass(w.stateWord)} ${lastNearMiss === w.id ? 'win-pulse' : ''} ${w.crown ? 'win-crown-row' : ''} ${selected === w.id ? 'win-selected' : ''}`}
              onClick={() => setSelected(selected === w.id ? null : w.id)}
            >
              <span className="win-label">{w.label}</span>
              <div className="bar-track win-bar">
                <div className="bar-fill" style={{ width: `${barFill(w.p)}%` }} />
              </div>
              <span className="win-state">{w.stateWord}</span>
            </button>
          </li>
        ))}
      </ul>

      {selected && history.length > 0 && (
        <div className="win-history">
          <h3>History</h3>
          <ul>
            {history.map((e, i) => (
              <li key={i}>
                Day {e.day}: {e.type === 'fire' ? 'broke' : 'creaked'} — {e.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {crown && crown.state !== 'fired' && (
        <div className={`crown-pin ${crown.state !== 'closed' ? 'crown-visible' : ''}`}>
          <span className="crown-label">{crown.label}</span>
          <span className="crown-tag">something is coming</span>
        </div>
      )}
    </aside>
  );
}
