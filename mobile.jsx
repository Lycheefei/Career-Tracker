// ── Mobile companion ──────────────────────────────────

function MobileView({ data }) {
  const { user, today, season } = data;
  const doneCount = today.filter(q => q.done).length;
  const hitMVD = user.minutesToday >= user.mvdMin;

  return (
    <div style={{
      height: '100%', background: 'var(--bg)', color: 'var(--text)',
      fontFamily: 'var(--font)', overflow: 'auto',
      paddingBottom: 40,
    }}>
      {/* top */}
      <div style={{ padding: '70px 20px 0' }}>
        <div className="tiny">Streak · day {user.streak}</div>
        <div style={{ font: '600 24px var(--font)', margin: '4px 0 2px', letterSpacing: '-0.01em' }}>
          {hitMVD ? 'Chain safe.' : 'Keep the chain.'}
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          {hitMVD ? `${user.minutesToday}m logged today` : `${user.mvdMin - user.minutesToday}m to MVD`}
        </div>
      </div>

      {/* Ring card */}
      <div style={{ padding: '20px', display:'flex', alignItems:'center', gap: 16 }}>
        <Ring value={user.minutesToday} max={user.dailyGoalMin} size={100} stroke={9}
              color={hitMVD ? 'var(--green)' : 'var(--amber)'}>
          <div style={{ font: '600 24px var(--mono)' }}>{user.minutesToday}</div>
          <div className="tiny" style={{ color: 'var(--text-3)' }}>/ {user.dailyGoalMin}m</div>
        </Ring>
        <div style={{ flex: 1 }}>
          <div className="tiny">Level {user.level}</div>
          <div style={{ font: '600 16px var(--font)', marginTop: 2 }}>{user.xp} / {user.xpToNext} XP</div>
          <div className="bar" style={{ marginTop: 6 }}>
            <div className="bar__fill" style={{ width: `${(user.xp/user.xpToNext)*100}%` }}/>
          </div>
          <div className="tiny" style={{ marginTop: 10 }}>Week {season.currentWeek} / {season.weeksTotal}</div>
          <div style={{ font: '600 14px var(--font)' }}>{season.totalDays - season.daysElapsed}d to apply</div>
        </div>
      </div>

      {/* Quests */}
      <div style={{ margin: '0 16px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 16, padding: 14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
          <div style={{ font: '600 14px var(--font)' }}>Today's quests</div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{doneCount}/{today.length}</div>
        </div>
        {today.slice(0, 4).map(q => (
          <div key={q.id} style={{
            display:'flex', alignItems:'center', gap: 10,
            padding: '10px 0', borderBottom: '1px solid var(--border)',
          }}>
            <div className={'qbox' + (q.done ? ' qbox--done' : '')}>{Icon.check(12, '#1a130a')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                font: '500 13px var(--font)',
                color: q.done ? 'var(--text-4)' : 'var(--text)',
                textDecoration: q.done ? 'line-through' : 'none',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
              }}>{q.title}</div>
              <div className="quest__meta" style={{ fontSize: 11 }}>
                <span>{q.mins}m</span>
                <span style={{ color: 'var(--amber-dim)' }}>+{q.xp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Retention alert */}
      <div style={{
        margin: '16px', padding: 12, borderRadius: 12,
        background: 'oklch(0.25 0.06 20 / 0.25)', border: '1px solid oklch(0.50 0.10 20 / 0.4)',
      }}>
        <div className="tiny" style={{ color: 'var(--rose)' }}>Fading skills</div>
        <div style={{ font: '500 13px var(--font)', color: 'var(--text)', marginTop: 4, lineHeight: 1.45 }}>
          DP and Trees haven't been touched in 55+ days. Queue a 15-min refresher?
        </div>
        <button className="btn btn--primary" style={{ marginTop: 10, width:'100%', justifyContent:'center', padding: '10px' }}>
          Queue refresher
        </button>
      </div>

      {/* Big CTA */}
      <div style={{ padding: '0 16px' }}>
        <button className="btn btn--primary" style={{ width:'100%', padding: '14px', justifyContent:'center', fontSize: 14 }}>
          {Icon.bolt(14, '#1a130a')} Start 25-min focus
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MobileView });
