// ── Hero / Season overview ──────────────────────────────

function Hero({ data, onEditModeToggle }) {
  const { user, season, apps } = data;
  const daysLeft = season.totalDays - season.daysElapsed;
  const seasonPct = season.daysElapsed / season.totalDays;
  const xpPct = user.xpToNext ? user.xp / user.xpToNext : 0;
  const todayPct = user.minutesToday / user.dailyGoalMin;
  const hitMVD = user.minutesToday >= user.mvdMin;
  const isFirstDay = user.streak === 0 && user.totalHours === 0;

  return (
    <div className="panel fade" style={{ padding: 'calc(var(--pad) * 1.4)', overflow: 'hidden' }}>
      {/* amber glow */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 340, height: 340,
        background: 'radial-gradient(circle, oklch(0.65 0.14 62 / 0.18), transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start', position: 'relative' }}>
        <div>
          <div className="tiny">{season.name}</div>
          <h1 style={{ font: '600 32px/1.1 var(--font)', margin: '8px 0 4px', letterSpacing: '-0.02em' }}>
            {isFirstDay ? <>Day zero, {user.name}. Let's begin.</> : <>Guten Morgen, {user.name}.</>}
          </h1>
          <div className="muted" style={{ fontSize: 15 }}>
            {isFirstDay
              ? <>Pick one quest below. Any one. A <span style={{color:'var(--amber)'}}>15-minute win</span> today starts the chain.</>
              : hitMVD
              ? <>Streak is safe. <span style={{color:'var(--amber)'}}>{user.minutesToday - user.mvdMin} min</span> past your MVD — push for the full hour?</>
              : <><span style={{color:'var(--rose)'}}>{user.mvdMin - user.minutesToday} min</span> left on today's Minimum Viable Day to keep the chain alive.</>}
          </div>
        </div>

        {/* streak stack */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div className="tiny">Streak</div>
            <div style={{ font: '600 28px var(--mono)', color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
              {Icon.flame(22, 'var(--amber)')} {user.streak}
            </div>
            <div className="tiny" style={{ color: 'var(--text-4)' }}>best · {user.bestStreak}</div>
          </div>
          <Ring value={user.minutesToday} max={user.dailyGoalMin} size={88} stroke={8}
                color={hitMVD ? 'var(--green)' : 'var(--amber)'}>
            <div style={{ font: '600 22px var(--mono)' }}>{user.minutesToday}</div>
            <div className="tiny" style={{ color: 'var(--text-3)', marginTop: 0 }}>/ {user.dailyGoalMin}m</div>
          </Ring>
        </div>
      </div>

      {/* stat strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1,
        marginTop: 24, background: 'var(--border)', borderRadius: 10, overflow: 'hidden',
      }}>
        {[
          { label: 'Level', val: user.level, sub: `${user.xp} / ${user.xpToNext} XP`, barVal: xpPct, barColor: 'var(--amber)' },
          { label: 'Season', val: `Wk ${season.currentWeek}/${season.weeksTotal}`, sub: `${daysLeft} days to apply`, barVal: seasonPct, barColor: 'var(--teal)' },
          { label: 'Hours', val: user.totalHours.toFixed(1), sub: 'logged · season' },
          { label: 'Projects', val: `${data.projects.filter(p=>p.status==='shipped').length}/${data.projects.length}`, sub: 'shipped' },
          { label: 'Applications', val: `${apps.submitted}/${apps.target}`, sub: 'queue · Dec 2026' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--panel-hi)', padding: '14px 16px' }}>
            <div className="tiny">{s.label}</div>
            <div style={{ font: '600 22px var(--mono)', color: 'var(--text)', marginTop: 4 }}>{s.val}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{s.sub}</div>
            {s.barVal !== undefined && (
              <div className="bar" style={{ marginTop: 8, height: 3 }}>
                <div className="bar__fill" style={{ width: `${s.barVal*100}%`, background: s.barColor }}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Season timeline (phases) ──
function SeasonTimeline({ phases, currentWeek, weeksTotal }) {
  return (
    <div className="panel fade">
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 14 }}>
        <div>
          <div className="tiny">Season map</div>
          <div style={{ font: '600 18px var(--font)', marginTop: 2 }}>Four phases · 35 weeks to December</div>
        </div>
        <div className="muted" style={{ fontSize: 12 }}>You are here → Week {currentWeek}</div>
      </div>

      {/* track */}
      <div style={{ position:'relative', marginTop: 20 }}>
        <div style={{ position:'absolute', left: 0, right: 0, top: 20, height: 2, background: 'var(--border)' }}/>
        <div style={{ position:'absolute', left: 0, top: 20, height: 2, width: `${(currentWeek/weeksTotal)*100}%`, background: 'var(--amber)' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 0, position:'relative' }}>
          {phases.map((p) => {
            const active = p.status === 'active';
            const done = p.status === 'done';
            return (
              <div key={p.n} style={{ padding: '0 8px' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 8, height: 40 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: active ? 'var(--amber)' : (done ? 'var(--green)' : 'var(--bg-3)'),
                    border: active ? 'none' : '2px solid var(--border-hi)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: active ? '#1a130a' : 'var(--text-3)',
                    font: '600 11px var(--mono)',
                  }} className={active ? 'pulse' : ''}>
                    {done ? '✓' : p.n}
                  </div>
                  <div style={{ font: '600 13px var(--font)', color: active ? 'var(--text)' : 'var(--text-2)' }}>
                    {p.name}
                  </div>
                </div>
                <div className="tiny" style={{ marginTop: 6 }}>Week {p.weeks} · {p.range}</div>
                <div style={{ font: '400 12.5px/1.5 var(--font)', color: 'var(--text-2)', marginTop: 6 }}>
                  {p.theme}
                </div>
                <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display:'flex', flexDirection:'column', gap: 4 }}>
                  {p.focus.map((f, i) => (
                    <li key={i} style={{ font: '400 12px var(--mono)', color: 'var(--text-3)' }}>· {f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, SeasonTimeline });
