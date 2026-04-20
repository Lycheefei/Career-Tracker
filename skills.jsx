// ── Skill tree with retention map ───────────────────────

function SkillTree({ skills, branches }) {
  const grouped = {};
  skills.forEach(s => { (grouped[s.branch] ||= []).push(s); });

  return (
    <div className="panel fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 14 }}>
        <div>
          <div className="tiny">Skill tree · coverage + retention</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>What you know, and how fresh it is</div>
        </div>
        <div style={{ display:'flex', gap: 10, fontSize: 11, color: 'var(--text-3)', alignItems:'center' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, background: 'var(--green)', borderRadius: 2 }}/> fresh
          </span>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, background: 'var(--amber)', borderRadius: 2 }}/> fading
          </span>
          <span style={{ display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, background: 'var(--rose)', borderRadius: 2 }}/> forgotten
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {Object.entries(branches).map(([key, br]) => (
          <div key={key} style={{
            background: 'var(--bg-2)', borderRadius: 10, padding: 14,
            border: '1px solid var(--border)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: br.color }}/>
              <span style={{ font: '500 12px var(--font)', color: 'var(--text)' }}>{br.label}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              {(grouped[key] || []).map(s => {
                const ret = s.retention;
                const retColor = ret > 0.7 ? 'var(--green)' : ret > 0.4 ? 'var(--amber)' : 'var(--rose)';
                return (
                  <div key={s.id} style={{ display:'flex', alignItems:'center', gap: 8 }}>
                    <div style={{ flex: 1, fontSize: 12.5, color: s.level ? 'var(--text)' : 'var(--text-3)' }}>
                      {s.name}
                    </div>
                    <LevelPips level={s.level} max={s.max} color={br.color}/>
                    <div style={{
                      width: 28, height: 6, borderRadius: 2,
                      background: `linear-gradient(to right, ${retColor} ${ret*100}%, var(--bg-3) ${ret*100}%)`,
                    }} title={`${Math.round(ret*100)}% retained · last ${s.lastTouched}d ago`}/>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 14, padding: '10px 12px', borderRadius: 8,
        background: 'oklch(0.25 0.06 20 / 0.2)', border: '1px solid oklch(0.50 0.10 20 / 0.3)',
        display:'flex', alignItems:'center', gap: 10,
      }}>
        <div style={{ color: 'var(--rose)' }}>{Icon.spark(14, 'currentColor')}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-2)', flex: 1 }}>
          <strong style={{ color: 'var(--text)' }}>3 skills are fading.</strong>{' '}
          Dynamic programming, Trees/DFS, and ML system design haven't been touched in 55+ days. Queue a 15-min refresher today?
        </div>
        <button className="btn btn--primary" style={{ padding: '6px 10px', fontSize: 12 }}>Queue</button>
      </div>
    </div>
  );
}

// ── Projects strip ──
function ProjectBoard({ projects }) {
  const statusColor = { shipped: 'green', active: 'amber', planned: 'teal' };
  return (
    <div className="panel fade">
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 14 }}>
        <div>
          <div className="tiny">Portfolio</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>Projects · 4 planned, 1 shipped</div>
        </div>
        <button className="btn btn--ghost">+ New project</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {projects.map(p => (
          <div key={p.id} style={{
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: 14,
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ font: '500 14px var(--font)', color: 'var(--text)' }}>{p.name}</div>
                <div className="tiny" style={{ marginTop: 3 }}>{p.tag}</div>
              </div>
              <span className={`chip chip--${statusColor[p.status]}`}>{p.status}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10, lineHeight: 1.5 }}>{p.note}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap: 4, marginTop: 10 }}>
              {p.stack.map(t => (
                <span key={t} className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', background: 'var(--bg-3)', padding: '2px 6px', borderRadius: 3 }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>
                <span>Target · {p.target}</span>
                <span className="mono">{p.progress}%</span>
              </div>
              <div className="bar"><div className={'bar__fill' + (p.status==='shipped' ? ' bar__fill--green' : '')} style={{ width: `${p.progress}%` }}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SkillTree, ProjectBoard });
