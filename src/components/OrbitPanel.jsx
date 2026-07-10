import { currentArgStage } from '../game/argument.js';
import { TUNING } from '../gameData/tuning.js';

function driftLabel(npc) {
  const [t1, t2, t3] = npc.driftThresholds ?? [TUNING.driftT1, TUNING.driftT2, TUNING.driftT3];
  const d = npc.driftLbs ?? 0;
  if (d >= t3) return 'candidate';
  if (d >= t2) return 'undeniable';
  if (d >= t1) return 'noticing';
  return 'steady';
}

function driftBar(npc) {
  const t3 = (npc.driftThresholds ?? [8, 20, 35])[2];
  return Math.min(100, Math.round((npc.driftLbs / t3) * 100));
}

export function OrbitPanel({ npcs, arc, argPressure }) {
  const stage = currentArgStage(arc);
  const pressurePct = Math.min(100, argPressure);

  return (
    <div className="panel orbit-panel">
      <h2>Orbit</h2>
      <div className="arg-track">
        <span>Argument — {stage}</span>
        <div className="bar-track warm">
          <div className="bar-fill" style={{ width: `${pressurePct}%` }} />
        </div>
      </div>
      <ul className="npc-list">
        {npcs.map((n) => (
          <li key={n.id} className="npc-row">
            <div className="npc-header">
              <strong>{n.name}</strong>
              <span className="stance">{n.stanceToward}</span>
            </div>
            <p className="npc-relation">{n.relation}</p>
            <p className="drift-line">{n.name.split(' ')[0]}&apos;s jeans are learning about gravity — {driftLabel(n)}</p>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${driftBar(n)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
