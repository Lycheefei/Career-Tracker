// ── German panel ───────────────────────────────────────

function GermanPanel() {
  const today = { anki: { done: 12, total: 20 }, lesson: 'Konjunktiv II · wishes & polite forms', speaking: 0, target: 15 };
  return (
    <div className="panel fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom: 14 }}>
        <div>
          <div className="tiny">Deutsch · B1 → B2</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>Weekly cadence</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
          <span className="mono" style={{ fontSize: 22, color: 'var(--text)' }}>B1</span>
          <div style={{ width: 40, height: 3, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '35%', height: '100%', background: 'var(--teal)' }}/>
          </div>
          <span className="mono" style={{ fontSize: 22, color: 'var(--text-3)' }}>B2</span>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, padding: 10, background: 'var(--bg-2)', borderRadius: 8 }}>
          <div style={{ color: 'var(--teal)' }}>{Icon.lang(14)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13 }}>Anki · daily reviews</div>
            <div className="tiny" style={{ marginTop: 2 }}>{today.anki.done} / {today.anki.total} cards</div>
          </div>
          <div style={{ width: 80 }}>
            <div className="bar"><div className="bar__fill bar__fill--teal" style={{ width: `${(today.anki.done/today.anki.total)*100}%` }}/></div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 10, padding: 10, background: 'var(--bg-2)', borderRadius: 8 }}>
          <div style={{ color: 'var(--teal)' }}>{Icon.book(14)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13 }}>Lesson · {today.lesson}</div>
            <div className="tiny" style={{ marginTop: 2 }}>Lingoda live, 19:00 CET</div>
          </div>
          <span className="chip chip--teal">scheduled</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 10, padding: 10, background: 'var(--bg-2)', borderRadius: 8 }}>
          <div style={{ color: 'var(--rose)' }}>{Icon.clock(14)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13 }}>Speaking · tandem / podcast shadowing</div>
            <div className="tiny" style={{ marginTop: 2 }}>{today.speaking} / {today.target} min this week</div>
          </div>
          <span className="chip chip--rose">behind</span>
        </div>
      </div>
    </div>
  );
}

// ── Journal ──
function Journal({ journal }) {
  const pip = (v, color) => (
    <div style={{ display:'flex', gap: 2 }}>
      {[1,2,3,4,5].map(n => (
        <div key={n} style={{ width: 6, height: 10, borderRadius: 1, background: n <= v ? color : 'var(--bg-3)' }}/>
      ))}
    </div>
  );
  return (
    <div className="panel fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 14 }}>
        <div>
          <div className="tiny">Journal · 7 days</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>How has the week felt?</div>
        </div>
        <button className="btn btn--ghost">+ Entry</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'70px repeat(3, auto) 1fr', gap: '10px 14px', alignItems:'center', fontSize: 12 }}>
        <div className="tiny">When</div>
        <div className="tiny" style={{ color: 'var(--rose)' }}>Mood</div>
        <div className="tiny" style={{ color: 'var(--amber)' }}>Energy</div>
        <div className="tiny" style={{ color: 'var(--teal)' }}>Confidence</div>
        <div className="tiny">Note</div>
        {journal.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '30px 16px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
            No entries yet. Click <strong style={{ color: 'var(--text-2)' }}>+ Entry</strong> after your first day to log how it felt.
          </div>
        )}
        {journal.map((j, i) => (
          <React.Fragment key={i}>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{j.date}</div>
            {pip(j.mood, 'var(--rose)')}
            {pip(j.energy, 'var(--amber)')}
            {pip(j.conf, 'var(--teal)')}
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.45 }}>{j.note}</div>
          </React.Fragment>
        ))}
      </div>

      <div style={{
        marginTop: 14, padding: '10px 12px', borderRadius: 8,
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        display:'flex', alignItems:'center', gap: 10,
      }}>
        <div style={{ color: 'var(--teal)' }}>{Icon.spark(14)}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-2)', flex: 1 }}>
          <strong style={{ color: 'var(--text)' }}>Tip:</strong>{' '}
          pattern-spotting will start after ~7 entries. Just write one line after each day — even "tired, did MVD, sleep" counts.
        </div>
      </div>
    </div>
  );
}

// ── Applications pipeline ──
function AppsPipeline({ apps }) {
  const stages = [
    { k: 'target',    label: 'Target',   color: 'var(--text-3)' },
    { k: 'submitted', label: 'Applied',  color: 'var(--teal)' },
    { k: 'screens',   label: 'Screen',   color: 'var(--amber)' },
    { k: 'onsites',   label: 'Onsite',   color: 'var(--amber)' },
    { k: 'offers',    label: 'Offer',    color: 'var(--green)' },
  ];
  return (
    <div className="panel fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 14 }}>
        <div>
          <div className="tiny">Pipeline · Dec 2026 target</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>Applications</div>
        </div>
        <span className="chip" style={{ color: 'var(--text-3)' }}>{Icon.lock(11)} unlocks Phase 4 · Oct 19</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 8 }}>
        {stages.map(s => (
          <div key={s.k} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, textAlign:'center' }}>
            <div className="tiny" style={{ color: s.color }}>{s.label}</div>
            <div style={{ font: '600 22px var(--mono)', color: 'var(--text)', marginTop: 4 }}>{apps[s.k]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { GermanPanel, Journal, AppsPipeline });
