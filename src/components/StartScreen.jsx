export function StartScreen({ toggles, onToggle, onStart }) {
  return (
    <div className="start-screen">
      <header className="start-hero">
        <h1>GRAVITY</h1>
        <p>Halcyon loses the same argument, beautifully — one woman at a time.</p>
      </header>
      <section className="toggle-panel panel">
        <h2>Content preferences</h2>
        <p className="panel-sub">Toggles gate selection at start — never mid-scene.</p>
        <label>
          <input
            type="checkbox"
            checked={toggles.stuckContent}
            onChange={(e) => onToggle('stuckContent', e.target.checked)}
          />
          Stuck / wedged content
        </label>
        <label>
          <input
            type="checkbox"
            checked={toggles.witnessedFailure}
            onChange={(e) => onToggle('witnessedFailure', e.target.checked)}
          />
          Witnessed failures
        </label>
        <label>
          <input
            type="checkbox"
            checked={toggles.firstPersonArcs}
            onChange={(e) => onToggle('firstPersonArcs', e.target.checked)}
          />
          First-person arcs (future arcs)
        </label>
        <label>
          <input
            type="checkbox"
            checked={toggles.influencedSeatGain}
            onChange={(e) => onToggle('influencedSeatGain', e.target.checked)}
          />
          Influenced-seat player gain
        </label>
        <label>
          <input
            type="checkbox"
            checked={toggles.overdrive}
            onChange={(e) => onToggle('overdrive', e.target.checked)}
          />
          Overdrive on fixtures (opt-in at settling)
        </label>
      </section>
      <button type="button" className="primary start-btn" onClick={onStart}>Begin — Mara Voss</button>
    </div>
  );
}
