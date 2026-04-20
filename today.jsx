// ── Today's quests + MVD ────────────────────────────────

function TodayQuests({ data, onToggle }) {
  const { today, user } = data;
  const doneCount = today.filter(q => q.done).length;
  const totalXP = today.reduce((a, q) => a + (q.done ? q.xp : 0), 0);
  const possibleXP = today.reduce((a, q) => a + q.xp, 0);

  return (
    <div className="panel fade">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 14 }}>
        <div>
          <div className="tiny">Today · Mon, Apr 20</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>Daily quests</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <span className="chip chip--amber">{Icon.bolt(11, 'currentColor')} +{totalXP} / {possibleXP} XP</span>
          <span className="mono muted" style={{ fontSize: 12 }}>{doneCount}/{today.length}</span>
        </div>
      </div>

      {/* MVD rail */}
      <div style={{
        display:'flex', alignItems:'center', gap: 10,
        padding: '10px 12px', borderRadius: 8,
        background: user.minutesToday >= user.mvdMin ? 'oklch(0.25 0.04 150 / 0.25)' : 'oklch(0.25 0.06 20 / 0.25)',
        border: `1px solid ${user.minutesToday >= user.mvdMin ? 'oklch(0.45 0.08 150 / 0.4)' : 'oklch(0.50 0.10 20 / 0.4)'}`,
        marginBottom: 14,
      }}>
        <div style={{ color: user.minutesToday >= user.mvdMin ? 'var(--green)' : 'var(--rose)' }}>
          {user.minutesToday >= user.mvdMin ? Icon.check(14, 'currentColor') : Icon.clock(14, 'currentColor')}
        </div>
        <div style={{ flex: 1, fontSize: 12.5, color: 'var(--text-2)' }}>
          <strong style={{ color: 'var(--text)' }}>Minimum Viable Day: {user.mvdMin} min.</strong>{' '}
          {user.minutesToday >= user.mvdMin
            ? 'Streak protected. Anything beyond is bonus.'
            : `Even 15 min keeps the chain alive. You've done ${user.minutesToday}m.`}
        </div>
      </div>

      {/* quests */}
      <div>
        {today.map(q => (
          <div key={q.id} className={'quest' + (q.done ? ' quest--done' : '')}
               onClick={() => onToggle(q.id)} style={{ cursor: 'pointer' }}>
            <div className={'qbox' + (q.done ? ' qbox--done' : '')}>
              {Icon.check(14, '#1a130a')}
            </div>
            <div style={{ color: q.done ? 'var(--text-4)' : 'var(--text-2)' }}>
              {kindIcon(q.kind, 'currentColor')}
            </div>
            <div className="quest__body">
              <div className="quest__title">{q.title}</div>
              <div className="quest__meta">
                <span>{q.mins} min</span>
                <span style={{ color: 'var(--amber-dim)' }}>+{q.xp} XP</span>
                {q.skill && <span className="mono" style={{ color: 'var(--text-4)' }}>#{q.skill}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap: 8, marginTop: 14 }}>
        <button className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
          {Icon.bolt(12, '#1a130a')} Start 25-min focus
        </button>
        <button className="btn">+ Add quest</button>
      </div>
    </div>
  );
}

// ── Weekly activity sparkline ──
function WeeklyActivity({ week, dailyGoalMin }) {
  const max = Math.max(...week, dailyGoalMin/60);
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = 0; // Monday in demo
  const total = week.reduce((a,b)=>a+b,0);
  return (
    <div className="panel fade">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 12 }}>
        <div>
          <div className="tiny">This week</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>{total.toFixed(1)}h <span className="muted" style={{ font: '400 13px var(--font)' }}>/ 7h goal</span></div>
        </div>
        <span className="chip chip--teal">on pace</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, alignItems: 'end', height: 100 }}>
        {week.map((h, i) => (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 6, height: '100%' }}>
            <div style={{ flex: 1, width: '100%', display:'flex', alignItems:'flex-end' }}>
              <div style={{
                width: '100%', height: `${(h/max)*100}%`, minHeight: 2,
                background: i === today ? 'var(--amber)' : 'var(--teal-dim)',
                borderRadius: '4px 4px 0 0',
                opacity: h > 0 ? 1 : 0.3,
              }}/>
            </div>
            <div className="tiny" style={{ color: i === today ? 'var(--amber)' : 'var(--text-4)' }}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TodayQuests, WeeklyActivity });
