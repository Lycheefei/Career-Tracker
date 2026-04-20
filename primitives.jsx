// ── Primitives & icons ─────────────────────────────────────────────

const Icon = {
  flame: (s=16, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-3s-1 4 1 4 2-3 2-5-0-4 0-4z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M7 14a5 5 0 1 0 10 0" stroke={c} strokeWidth="1.8"/></svg>
  ),
  bolt: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>
  ),
  check: (s=14, c='#1a130a') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  clock: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  target: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6"/><circle cx="12" cy="12" r="5" stroke={c} strokeWidth="1.6"/><circle cx="12" cy="12" r="1.5" fill={c}/></svg>
  ),
  book: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 4h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4V4zM20 4h-6a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h7V4z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  code: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  build: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z M3 7l9 4 9-4 M12 11v10" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  lang: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 5h10M8 3v2M6 10c0-3 2-5 4-5s4 2 4 5M4 10h10" stroke={c} strokeWidth="1.6" strokeLinecap="round"/><path d="M12 21l5-11 5 11M14 17h6" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  journal: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 3h13a1 1 0 0 1 1 1v17l-4-2-4 2-4-2-2 1V4a1 1 0 0 1 1-1z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 8h6M9 12h6M9 16h4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  spark: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  lock: (s=14, c='currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke={c} strokeWidth="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={c} strokeWidth="1.6"/></svg>
  ),
};

function kindIcon(k, c='currentColor') {
  return ({ code: Icon.code(14,c), study: Icon.book(14,c), build: Icon.build(14,c), lang: Icon.lang(14,c), review: Icon.journal(14,c) })[k] || Icon.bolt(14,c);
}

// ── Ring / radial ──
function Ring({ value, max = 1, size = 120, stroke = 10, color = 'var(--amber)', track = 'var(--bg-3)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const off = c * (1 - pct);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 600ms ease' }}/>
      </svg>
      <div style={{ position:'absolute', inset: 0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
        {children}
      </div>
    </div>
  );
}

// ── Level pips ──
function LevelPips({ level, max = 5, color = 'var(--amber)' }) {
  return (
    <div className="ticks" style={{ color }}>
      {Array.from({length: max}).map((_, i) =>
        <span key={i} className={'tick' + (i < level ? ' tick--on' : '')} />)}
    </div>
  );
}

Object.assign(window, { Icon, kindIcon, Ring, LevelPips });
