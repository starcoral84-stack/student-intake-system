// 30 student archetypes for private English lessons.
// 5 are "full": custom refinement steps + a hand-built conversation flow.
// The rest use GENERIC_REFINEMENTS + GENERIC_FLOW until fleshed out iteratively.

export const GAP_CHIPS = [
  { id: 'past-tense', label: 'Past tense' },
  { id: 'sv-agreement', label: 'S-V agreement' },
  { id: 'articles', label: 'Articles (a/the)' },
  { id: 'tense-consistency', label: 'Tense consistency' },
  { id: 'word-order', label: 'Word order' },
  { id: 'vocabulary', label: 'Vocabulary range' },
  { id: 'register', label: 'Register / politeness' },
  { id: 'pronunciation', label: 'Pronunciation' },
  { id: 'fillers', label: 'Filler words' },
  { id: 'listening', label: 'Listening comprehension' },
  { id: 'fluency', label: 'Fluency / hesitation' },
  { id: 'confidence', label: 'Confidence' },
]

export const UNDERSTOOD_CHIPS = [
  'Target grammar point', 'New vocabulary', 'Question forms', 'Past tense narrative',
  'Register switching', 'Test strategy', 'Pronunciation focus', 'Conversation turn-taking',
]

export const STRUGGLED_CHIPS = [
  'Past tense', 'S-V agreement', 'Articles', 'Listening speed', 'Vocabulary recall',
  'Long answers', 'Confidence', 'Question forms', 'Register', 'Time pressure',
]

export const NEXT_FOCUS_CHIPS = [
  'Drill past tense', 'Expand topic vocab', 'Shadowing practice', 'Longer answers',
  'Mock test section', 'Role-play scenario', 'Review last lesson', 'Free conversation',
  'Pronunciation drill', 'Writing sample',
]

const LEVEL_STEP = {
  id: 'level',
  prompt: 'Speaking level right now?',
  options: [
    { id: 'beginner', label: 'Beginner', hint: 'Single words, set phrases' },
    { id: 'lower-int', label: 'Lower intermediate', hint: 'Simple sentences, frequent errors' },
    { id: 'upper-int', label: 'Upper intermediate', hint: 'Conversational, gaps under pressure' },
    { id: 'advanced', label: 'Advanced', hint: 'Fluent, polishing nuance' },
  ],
}

const GENERIC_REFINEMENTS = [
  LEVEL_STEP,
  {
    id: 'goal-horizon',
    prompt: 'Time horizon for their goal?',
    options: [
      { id: 'urgent', label: 'Under 3 months', hint: 'Deadline pressure' },
      { id: 'medium', label: '3–12 months', hint: 'Steady build' },
      { id: 'open', label: 'Open-ended', hint: 'Lifestyle / enjoyment' },
    ],
  },
  {
    id: 'priority',
    prompt: 'Biggest priority?',
    options: [
      { id: 'speaking', label: 'Speaking' },
      { id: 'listening', label: 'Listening' },
      { id: 'reading-writing', label: 'Reading / Writing' },
      { id: 'confidence', label: 'Confidence' },
    ],
  },
]

const GENERIC_FLOW = [
  { id: 'g1', text: 'Why English, and why now? What changed?', listenFor: ['Motivation strength', 'Tense control', 'Fluency'] },
  { id: 'g2', text: 'Tell me about your typical day.', listenFor: ['Present simple', 'S-V agreement', 'Daily-life vocabulary'] },
  { id: 'g3', text: 'When do you actually use English in your life?', listenFor: ['Real usage contexts', 'Frequency adverbs', 'Honesty about exposure'] },
  { id: 'g4', text: 'Tell me about the last time you used English and it went badly.', listenFor: ['Past tense accuracy', 'Emotional blockers', 'Narrative coherence'] },
  { id: 'g5', text: 'What would success look like six months from now?', listenFor: ['Future forms', 'Concreteness of goal', 'Conditionals'] },
  { id: 'g6', text: 'How did you study English before? What worked, what didn’t?', listenFor: ['Past habits', 'Learning-style clues', 'Comparatives'] },
  { id: 'g7', text: 'Ask ME three questions — anything you want to know.', listenFor: ['Question formation', 'Word order', 'Confidence taking initiative'] },
]

// ---------- 5 FULL ARCHETYPES ----------

const HOUSEWIFE = {
  id: 'housewife',
  label: 'Housewife',
  emoji: '🏠',
  category: 'Life & Family',
  tagline: 'General English, confidence-building',
  full: true,
  refinements: [
    LEVEL_STEP,
    {
      id: 'motivation',
      prompt: 'Main motivation?',
      options: [
        { id: 'hobby', label: 'Hobby / self-growth', hint: 'English as personal project' },
        { id: 'travel', label: 'Travel', hint: 'Trips abroad, practical use' },
        { id: 'family', label: 'Family reasons', hint: 'Kids’ school, in-laws, spouse’s work' },
        { id: 'return-work', label: 'Returning to work', hint: 'Re-entering workforce later' },
      ],
    },
    {
      id: 'blocker',
      prompt: 'Biggest blocker you sense?',
      options: [
        { id: 'confidence', label: 'Confidence', hint: 'Knows more than she shows' },
        { id: 'rust', label: 'Rusty basics', hint: 'Studied long ago, forgotten' },
        { id: 'exposure', label: 'Zero exposure', hint: 'No English in daily life' },
      ],
    },
  ],
  flow: [
    { id: 'hw1', text: 'Tell me about your family and your typical week.', listenFor: ['Present simple', 'S-V agreement', 'Family vocabulary'], focus: 'Low-stakes opener — let her talk 70%.' },
    { id: 'hw2', text: 'What did you do last weekend?', listenFor: ['Past tense accuracy', 'Time expressions', 'Detail level'], focus: 'First grammar checkpoint: regular vs irregular past.' },
    { id: 'hw3', text: 'When was the last time you spoke English outside a lesson?', listenFor: ['Real exposure level', 'Confidence signals', 'Avoidance stories'] },
    { id: 'hw4', text: 'What do you enjoy that’s just for YOU — not family?', listenFor: ['Hobby vocabulary', 'Gerunds (I enjoy ~ing)', 'Enthusiasm = future topic bank'], focus: 'Mine this for recurring conversation topics.' },
    { id: 'hw5', text: 'If your English were perfect tomorrow, what’s the first thing you’d do?', listenFor: ['Second conditional', 'True goal behind the stated goal'] },
    { id: 'hw6', text: 'Tell me about a place you’ve travelled to — or dream of visiting.', listenFor: ['Present perfect (have been)', 'Descriptive vocabulary', 'Would like to'] },
    { id: 'hw7', text: 'Ask me three questions about my life.', listenFor: ['Question formation', 'Word order', 'Initiative'], focus: 'Confidence test — many housewife students freeze here. Note it.' },
  ],
}

const BUSINESS_OWNER = {
  id: 'business-owner',
  label: 'Business Owner',
  emoji: '💼',
  category: 'Business & Career',
  tagline: 'Business English, leadership communication',
  full: true,
  refinements: [
    {
      id: 'company',
      prompt: 'What kind of business?',
      options: [
        { id: 'local', label: 'Local / domestic', hint: 'English is aspirational' },
        { id: 'import-export', label: 'Import / export', hint: 'Email + negotiation heavy' },
        { id: 'global-clients', label: 'Global clients', hint: 'Meetings, calls, presentations' },
        { id: 'startup', label: 'Startup / raising', hint: 'Pitching, investor English' },
      ],
    },
    LEVEL_STEP,
    {
      id: 'goal',
      prompt: 'Top priority?',
      options: [
        { id: 'meetings', label: 'Meetings & calls' },
        { id: 'negotiation', label: 'Negotiation' },
        { id: 'email', label: 'Email & writing' },
        { id: 'small-talk', label: 'Small talk / relationships' },
      ],
    },
  ],
  flow: [
    { id: 'bo1', text: 'What’s your main communication challenge at work?', listenFor: ['Tense consistency', 'Register', 'Vocabulary range'], focus: 'Let them self-diagnose first — compare with what you observe.' },
    { id: 'bo2', text: 'Tell me about your business — what do you sell, and to whom?', listenFor: ['Field-specific vocabulary', 'Present simple for facts', 'Clarity of explanation'], focus: 'Can they do their 30-second pitch? Most can’t, in English.' },
    { id: 'bo3', text: 'Tell me about a recent meeting. What happened?', listenFor: ['Narrative coherence', 'Past tense accuracy', 'Filler words'] },
    { id: 'bo4', text: 'Describe a difficult conversation you had with a client or employee.', listenFor: ['Register / diplomacy', 'Reported speech (he said, I told him)', 'Emotional vocabulary'] },
    { id: 'bo5', text: 'Where do you want the business to be in three years?', listenFor: ['Future forms (will vs going to)', 'Conditionals', 'Concrete vs vague goals'] },
    { id: 'bo6', text: 'Role-play: I’m a new client. Introduce your company to me.', listenFor: ['Register under pressure', 'Persuasive structure', 'Recovery from mistakes'], focus: 'This is the benchmark task — repeat it in a month to show progress.' },
    { id: 'bo7', text: 'What English situations do you avoid right now?', listenFor: ['Honest gaps', 'Avoidance patterns'], focus: 'Their avoidance list = your syllabus.' },
  ],
}

const IELTS = {
  id: 'ielts',
  label: 'IELTS Candidate',
  emoji: '📝',
  category: 'Test Prep',
  tagline: 'All bands, test format mastery',
  full: true,
  refinements: [
    {
      id: 'target',
      prompt: 'Target band?',
      options: [
        { id: 'band-5-5', label: '5.0 – 5.5', hint: 'Foundation + format' },
        { id: 'band-6-65', label: '6.0 – 6.5', hint: 'Most visa / uni thresholds' },
        { id: 'band-7', label: '7.0 – 7.5', hint: 'Competitive programs' },
        { id: 'band-8', label: '8.0+', hint: 'Precision & range work' },
      ],
    },
    {
      id: 'weakest',
      prompt: 'Weakest section (their guess)?',
      options: [
        { id: 'speaking', label: 'Speaking' },
        { id: 'writing', label: 'Writing' },
        { id: 'listening', label: 'Listening' },
        { id: 'reading', label: 'Reading' },
      ],
    },
    {
      id: 'deadline',
      prompt: 'Test date?',
      options: [
        { id: 'booked', label: 'Booked, under 2 months', hint: 'Strategy > accuracy' },
        { id: 'soon', label: '2–6 months away', hint: 'Balanced build' },
        { id: 'undecided', label: 'Not booked yet', hint: 'Foundation first' },
      ],
    },
  ],
  flow: [
    { id: 'ie1', text: 'Why do you need IELTS, and what happens if you hit your band?', listenFor: ['Stakes & motivation', 'Future forms', 'Fluency baseline'] },
    { id: 'ie2', text: 'Part 1 style: Let’s talk about your hometown. What’s it like?', listenFor: ['Extended answers vs one-liners', 'Descriptive range', 'Present simple'], focus: 'Score their answer mentally against band descriptors.' },
    { id: 'ie3', text: 'Have you taken IELTS before? Walk me through what happened.', listenFor: ['Past tense', 'Self-analysis quality', 'Which section broke down'] },
    { id: 'ie4', text: 'Part 2 style: Describe a person who influenced you. One minute prep — go.', listenFor: ['2-minute stamina', 'Discourse markers', 'Paraphrasing vs repetition'], focus: 'Time it. Note where they run dry.' },
    { id: 'ie5', text: 'Part 3 style: Do you think role models matter more for young people today?', listenFor: ['Abstract argument', 'Complex sentences', 'Hedging language (it depends, arguably)'] },
    { id: 'ie6', text: 'How are you studying now — hours, materials, mock tests?', listenFor: ['Study habits', 'Realistic self-assessment'], focus: 'Gap between habits and target band = the honest conversation.' },
    { id: 'ie7', text: 'What vocabulary do you reach for and miss? Give me an example from this week.', listenFor: ['Lexical resource awareness', 'Paraphrasing strategies'] },
  ],
}

const INTERVIEW_PREP = {
  id: 'interview-prep',
  label: 'Interview Prep',
  emoji: '🎯',
  category: 'Business & Career',
  tagline: 'Job interviews, specific industry',
  full: true,
  refinements: [
    {
      id: 'interview-type',
      prompt: 'What kind of interview?',
      options: [
        { id: 'foreign-company', label: 'Foreign company (domestic)', hint: 'English interview, local role' },
        { id: 'overseas-role', label: 'Overseas position', hint: 'Full relocation stakes' },
        { id: 'internal', label: 'Internal promotion / transfer', hint: 'Knows company, needs polish' },
        { id: 'academic', label: 'Academic / scholarship', hint: 'Panel style, motivation heavy' },
      ],
    },
    {
      id: 'timeline',
      prompt: 'When is the interview?',
      options: [
        { id: 'this-month', label: 'Within a month', hint: 'Drill answers, fix top 3 errors only' },
        { id: 'quarter', label: '1–3 months', hint: 'Answers + delivery' },
        { id: 'exploring', label: 'No date yet', hint: 'Build foundation broadly' },
      ],
    },
    LEVEL_STEP,
  ],
  flow: [
    { id: 'ip1', text: 'Tell me about the role — company, position, why this one?', listenFor: ['Industry vocabulary', 'Motivation clarity', 'Present simple facts'] },
    { id: 'ip2', text: 'Classic opener: “Tell me about yourself.” Answer as if I’m the interviewer.', listenFor: ['Structure (present → past → future)', 'Tense control', 'Length control (60–90s)'], focus: 'Benchmark recording #1 — this answer gets rebuilt over the course.' },
    { id: 'ip3', text: '“What’s your greatest strength?” — and give me a real example.', listenFor: ['STAR structure', 'Past tense in the example', 'Overclaiming vs underclaiming'] },
    { id: 'ip4', text: '“Tell me about a time you failed or faced a difficult problem.”', listenFor: ['Narrative coherence', 'Past perfect / sequencing', 'Recovery framing'] },
    { id: 'ip5', text: '“Why should we hire you over other candidates?”', listenFor: ['Comparatives', 'Persuasive register', 'Confidence under direct pressure'] },
    { id: 'ip6', text: 'Now YOU ask me questions, as if I’m the hiring manager.', listenFor: ['Question formation', 'Quality of questions', 'Register'], focus: 'Weak questions lose offers. Coach this explicitly.' },
    { id: 'ip7', text: 'Which question tonight felt hardest, and why?', listenFor: ['Self-awareness', 'Meta-language about own English'], focus: 'Their answer sets next lesson’s drill list.' },
  ],
}

const TOEIC = {
  id: 'toeic',
  label: 'TOEIC Candidate',
  emoji: '📊',
  category: 'Test Prep',
  tagline: 'Test strategy, score target',
  full: true,
  refinements: [
    {
      id: 'scores',
      prompt: 'Current → target score?',
      options: [
        { id: 'to-600', label: '→ 600', hint: 'Foundation + Part 1/2 wins' },
        { id: 'to-730', label: '→ 730', hint: 'Common promotion threshold' },
        { id: 'to-860', label: '→ 860', hint: 'Part 7 stamina, grammar polish' },
        { id: 'to-900', label: '→ 900+', hint: 'Error elimination, speed' },
      ],
    },
    {
      id: 'why',
      prompt: 'Why the score?',
      options: [
        { id: 'promotion', label: 'Promotion / requirement', hint: 'Company mandate' },
        { id: 'job-change', label: 'Job change', hint: 'Resume line' },
        { id: 'personal', label: 'Personal milestone', hint: 'Self-set goal' },
      ],
    },
    {
      id: 'weakness',
      prompt: 'Weaker half?',
      options: [
        { id: 'listening', label: 'Listening (Parts 1–4)' },
        { id: 'reading', label: 'Reading (Parts 5–7)' },
        { id: 'both', label: 'Both / unsure' },
      ],
    },
  ],
  flow: [
    { id: 'to1', text: 'What’s your current score, target, and deadline?', listenFor: ['Numbers accuracy', 'Realistic gap assessment'], focus: 'Rule of thumb: +100 points ≈ 200–300 study hours. Say it out loud.' },
    { id: 'to2', text: 'Walk me through your last test day — section by section, how did it feel?', listenFor: ['Past tense', 'Where time ran out', 'Panic points'] },
    { id: 'to3', text: 'Describe this room to me in detail. (Part 1 muscle)', listenFor: ['Present continuous', 'Prepositions of place', 'Object vocabulary'] },
    { id: 'to4', text: 'I’ll ask quick questions, you answer instantly — where’s the meeting? Who’s calling? (Part 2 muscle)', listenFor: ['Response speed', 'WH-question comprehension', 'Indirect answers'] },
    { id: 'to5', text: 'How many hours a week can you honestly study, and when?', listenFor: ['Realistic scheduling', 'Frequency expressions'], focus: 'Get a concrete weekly slot commitment before the lesson ends.' },
    { id: 'to6', text: 'Do you actually use English at work, or is TOEIC the whole game?', listenFor: ['Real usage vs paper goal'], focus: 'Pure-score students need drill plans, not conversation practice. Adjust the course.' },
    { id: 'to7', text: 'Read this short email aloud and tell me what the writer wants. (Part 7 muscle)', listenFor: ['Reading speed', 'Skimming vs word-by-word', 'Pronunciation while reading'] },
  ],
}

// ---------- REMAINING 25 (generic flow until fleshed out) ----------

const basic = (id, label, emoji, category, tagline) => ({
  id, label, emoji, category, tagline,
  full: false,
  refinements: GENERIC_REFINEMENTS,
  flow: GENERIC_FLOW,
})

export const ARCHETYPES = [
  // Life & Family
  HOUSEWIFE,
  basic('mum', 'Mum', '👩‍👧', 'Life & Family', 'School support, child-focused'),
  basic('retiree', 'Retiree / Hobbyist', '🌸', 'Life & Family', 'Lifelong learning, enjoyment'),
  basic('travel', 'Travel English', '✈️', 'Life & Family', 'Trips abroad, survival + social'),
  basic('expat-spouse', 'Expat-bound Spouse', '🧳', 'Life & Family', 'Accompanying overseas posting'),
  basic('emigration', 'Emigration Prep', '🗺️', 'Life & Family', 'Citizenship, practical daily English'),

  // Test Prep
  TOEIC,
  IELTS,
  basic('toefl', 'TOEFL Candidate', '🎓', 'Test Prep', 'Academic test, uni admission'),
  basic('eiken', 'Eiken Candidate', '🏅', 'Test Prep', 'Grade targets, interview stage'),
  basic('entrance-exam', 'Entrance Exam', '🏫', 'Test Prep', 'University entrance, academic focus'),

  // Business & Career
  BUSINESS_OWNER,
  basic('ceo', 'CEO / Executive', '🏢', 'Business & Career', 'Executive presence, presentations'),
  INTERVIEW_PREP,
  basic('job-seeker', 'Job Seeker', '🔍', 'Business & Career', 'Career change, resume + interviews'),
  basic('presentation', 'Presentation Prep', '🎤', 'Business & Career', 'One big talk, delivery + slides'),
  basic('email-writing', 'Business Writing', '✉️', 'Business & Career', 'Email, reports, tone'),
  basic('freelancer', 'Freelancer / Remote', '💻', 'Business & Career', 'Global clients, async + calls'),

  // Academic
  basic('scholarship', 'Scholarship Candidate', '🏆', 'Academic', 'Academic English, high stakes'),
  basic('intl-school', 'International School Student', '🌍', 'Academic', 'Curriculum support, peer communication'),
  basic('ib', 'IB Student', '📚', 'Academic', 'Higher-level academic, essay writing'),
  basic('study-abroad', 'Study Abroad Prep', '🛫', 'Academic', 'Pre-departure, classroom survival'),
  basic('returnee', 'Returnee Student', '🔄', 'Academic', 'Maintaining English after living abroad'),
  basic('uni-student', 'University Student', '🎒', 'Academic', 'General + career-ready English'),
  basic('teen', 'Teen Conversation', '🧑‍🎤', 'Academic', 'Junior/senior high, engagement-first'),
  basic('kids', 'Kids / Elementary', '🧒', 'Academic', 'Play-based, phonics + phrases'),

  // Specialist
  basic('engineer', 'Engineer / Technical', '⚙️', 'Specialist', 'Technical docs, global team calls'),
  basic('medical', 'Medical Professional', '🩺', 'Specialist', 'Patient care, conferences, papers'),
  basic('researcher', 'Researcher / Academic', '🔬', 'Specialist', 'Papers, conference presentations'),
  basic('hospitality', 'Hospitality / Tourism', '🏨', 'Specialist', 'Guest service, tour guiding'),
]

export const CATEGORIES = ['Life & Family', 'Test Prep', 'Business & Career', 'Academic', 'Specialist']

export function getArchetype(id) {
  return ARCHETYPES.find(a => a.id === id)
}
