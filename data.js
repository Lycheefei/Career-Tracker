// ── Career Tracker data ────────────────────────────────────────────────
// Target: Dec 2026 applications. 1hr weekdays + 1hr weekends = ~7hr/week.
// ~245 days from April 20, 2026 → December 21, 2026.

const TRACKER_DATA = {
  user: {
    name: 'Lychee',
    role: 'Junior Data Scientist',
    level: 1,          // season level
    xp: 0,          // current xp in level
    xpToNext: 200,
    streak: 0,        // days
    bestStreak: 0,
    totalHours: 0,
    minutesToday: 0,  // of 60
    dailyGoalMin: 60,
    mvdMin: 15,        // minimum-viable day to keep streak
  },

  // ── Season: Apr 20 → Dec 21, 2026 (245 days) ──
  season: {
    name: 'Season One · The December Run',
    startISO: '2026-04-20',
    endISO:   '2026-12-21',
    totalDays: 245,
    daysElapsed: 0,
    weeksTotal: 35,
    currentWeek: 1,
  },

  // ── Phases (macro plan) ──
  phases: [
    { n: 1, name: 'Foundations',    weeks: '1–8',   range: 'Apr 20 – Jun 14',
      theme: 'Rebuild the base. ML math, core DSA, first German push.',
      focus: ['ML/DL math', 'LeetCode Easy ramp', 'German B1→B2 grammar', 'Portfolio repo #1 (ETL→Dashboard)'],
      status: 'active' },
    { n: 2, name: 'Depth',          weeks: '9–18',  range: 'Jun 15 – Aug 23',
      theme: 'Go deep. GenAI, classic ML, DP, system design basics.',
      focus: ['LLM/RAG project #2', 'DP & graphs', 'ML system design reps', 'AWS Cloud Practitioner'],
      status: 'locked' },
    { n: 3, name: 'Portfolio',      weeks: '19–26', range: 'Aug 24 – Oct 18',
      theme: 'Ship visibly. 2 public projects. Resume + LinkedIn.',
      focus: ['Portfolio project #3 (ML Eng)', 'Blog x3 posts', 'Resume v2', 'German B2 exam-ready'],
      status: 'locked' },
    { n: 4, name: 'Apply & Close',  weeks: '27–35', range: 'Oct 19 – Dec 21',
      theme: 'Mock interviews, applications, offers.',
      focus: ['2 mock interviews / week', '40 applications', 'Behavioral stories', 'Negotiation'],
      status: 'locked' },
  ],

  // ── Skill tree · with retention (0–1, decays over time unless revisited) ──
  skills: [
    { id: 'py',      name: 'Python fluency',       branch: 'core', level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'sql',     name: 'SQL & windows',        branch: 'core', level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'stats',   name: 'Stats & probability',  branch: 'math', level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'linalg',  name: 'Linear algebra',       branch: 'math', level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'calc',    name: 'Calculus for ML',      branch: 'math', level: 0, max: 5, retention: 0, lastTouched: 0 },

    { id: 'arrays',  name: 'Arrays & hashing',     branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'twoptr',  name: 'Two pointers',         branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'bsearch', name: 'Binary search',        branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'trees',   name: 'Trees & DFS/BFS',      branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'dp',      name: 'Dynamic programming',  branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'graphs',  name: 'Graphs',               branch: 'dsa',  level: 0, max: 5, retention: 0, lastTouched: 0 },

    { id: 'classic', name: 'Classical ML',         branch: 'ml',   level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'dl',      name: 'Deep learning',        branch: 'ml',   level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'llm',     name: 'LLM / RAG',            branch: 'ml',   level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'mlops',   name: 'MLOps & deployment',   branch: 'ml',   level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'mlsys',   name: 'ML system design',     branch: 'ml',   level: 0, max: 5, retention: 0, lastTouched: 0 },

    { id: 'aws',     name: 'AWS fundamentals',     branch: 'cloud', level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'docker',  name: 'Docker & k8s basics',  branch: 'cloud', level: 0, max: 5, retention: 0, lastTouched: 0 },

    { id: 'german',  name: 'German B1→B2',         branch: 'lang',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'gramm',   name: 'German grammar',       branch: 'lang',  level: 0, max: 5, retention: 0, lastTouched: 0 },
    { id: 'vocab',   name: 'Tech vocabulary DE',   branch: 'lang',  level: 0, max: 5, retention: 0, lastTouched: 0 },
  ],

  branches: {
    core:  { label: 'Core tools',       color: '#7ec4cf' },
    math:  { label: 'Math foundations', color: '#c9a979' },
    dsa:   { label: 'DSA / interview',  color: '#e89b6d' },
    ml:    { label: 'ML / AI',          color: '#b892d4' },
    cloud: { label: 'Cloud & infra',    color: '#8ab573' },
    lang:  { label: 'German',           color: '#d48a8a' },
  },

  // ── Today's quests ──
  today: [
    { id: 'q1', kind: 'code',   title: 'LeetCode · Two Sum (easy)',                 mins: 20, xp: 40, done: false, skill: 'arrays' },
    { id: 'q2', kind: 'study',  title: 'ML math · gradient descent (3Blue1Brown)',  mins: 15, xp: 30, done: false, skill: 'calc'   },
    { id: 'q3', kind: 'build',  title: 'RAG project · set up LangChain + Chroma',   mins: 20, xp: 50, done: false, skill: 'llm'    },
    { id: 'q4', kind: 'lang',   title: 'German · Anki reviews (20 cards)',          mins: 10, xp: 20, done: false, skill: 'vocab'  },
    { id: 'q5', kind: 'review', title: 'Journal · 3 lines on what clicked today',   mins: 3,  xp: 15, done: false, skill: null     },
  ],

  // ── Projects ──
  projects: [
    { id: 'p1', name: 'ETL → Superset dashboard', tag: 'Data Eng',      progress: 0, target: 'Public repo + README', status: 'planned',
      stack: ['Python', 'SQLAlchemy', 'Superset', 'Postgres'], note: 'Anonymized version of your work project.' },
    { id: 'p2', name: 'RAG over my notes',        tag: 'LLM / AI',      progress: 0, target: 'Live demo + blog post', status: 'planned',
      stack: ['LangChain', 'Chroma', 'OpenAI', 'Streamlit'], note: 'Weekend build. Blog post draft by W8.' },
    { id: 'p3', name: 'Churn prediction + MLOps', tag: 'ML Engineer',   progress: 0,   target: 'FastAPI + Docker + CI', status: 'planned',
      stack: ['scikit-learn', 'FastAPI', 'Docker', 'GH Actions'], note: 'Phase 2 kickoff.' },
    { id: 'p4', name: 'Feedback-analyzer v2',     tag: 'Applied DS',    progress: 0,   target: 'Open-source re-build', status: 'planned',
      stack: ['LLM', 'Prompt evals', 'Gradio'], note: 'Rebuild for portfolio.' },
  ],

  // ── Applications pipeline ──
  apps: { target: 40, submitted: 0, screens: 0, onsites: 0, offers: 0 },

  // ── Recent journal ──
  journal: [],

  // ── Weekly activity (7d × hours) ──
  week: [0, 0, 0, 0, 0, 0, 0], // Mon–Sun
};

window.TRACKER_DATA = TRACKER_DATA;
