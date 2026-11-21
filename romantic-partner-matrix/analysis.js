// Compatibility scoring and pattern interpretation. Pure functions, no DOM.
import { CHART_METRICS, SECTIONS } from './data.js';

const num = v => (Number.isFinite(+v) && v !== '' && v !== null ? +v : 0);

export function scorePair(a, b) {
  const rows = CHART_METRICS.map(m => {
    const x = num(a[m.field]), y = num(b[m.field]);
    return { ...m, a: x, b: y, avg: (x + y) / 2, gap: Math.abs(x - y), diff: x - y };
  });
  const mean = rows.reduce((s, r) => s + r.avg, 0) / rows.length;          // 1..10
  const avgGap = rows.reduce((s, r) => s + r.gap, 0) / rows.length;        // 0..9
  const strength = ((mean - 1) / 9) * 100;
  const agreement = (1 - avgGap / 9) * 100;
  const overall = Math.round(strength * 0.8 + agreement * 0.2);
  const categories = SECTIONS.map(s => {
    const r = rows.filter(x => x.section === s.id);
    if (!r.length) return null;
    return { id: s.id, icon: s.icon, name: s.category,
      a: r.reduce((t, x) => t + x.a, 0) / r.length,
      b: r.reduce((t, x) => t + x.b, 0) / r.length };
  }).filter(Boolean);
  return { rows, mean, avgGap, strength: Math.round(strength), agreement: Math.round(agreement), overall, categories, band: band(overall) };
}

function band(score) {
  if (score >= 85) return { label: 'Exceptional', tone: 'great' };
  if (score >= 70) return { label: 'Strong', tone: 'good' };
  if (score >= 55) return { label: 'Promising, with work to do', tone: 'ok' };
  if (score >= 40) return { label: 'Mixed', tone: 'warn' };
  return { label: 'Struggling', tone: 'bad' };
}

// ---------- Attachment ----------
const ATTACH = {
  'Secure|Secure': {
    s: 'Both partners are secure: a stable, trusting base where needs can be voiced directly.',
    c: 'Comfort can slide into autopilot; security is not the same as aliveness.',
    r: 'Keep investing in novelty and vulnerability so safety stays a launchpad, not a plateau.' },
  'Secure|Anxious': {
    s: 'The secure partner\'s consistency can gradually calm the anxious partner\'s alarm system.',
    c: 'The secure partner may feel they can never reassure enough.',
    r: 'Agree on predictable check-ins; the anxious partner practices self-soothing before seeking reassurance.' },
  'Secure|Avoidant': {
    s: 'The secure partner can respect space without reading it as rejection.',
    c: 'The secure partner may feel lonely or shut out over time.',
    r: 'The avoidant partner practices naming needs and staying present a little longer in emotional moments.' },
  'Secure|Fearful-Avoidant': {
    s: 'A steady partner offers the consistency a fearful-avoidant system rarely experienced.',
    c: 'Push-pull swings can confuse and exhaust the secure partner.',
    r: 'Name the approach/withdraw pattern out loud when it shows up; consider trauma-informed individual support.' },
  'Secure|Hyper-Independent': {
    s: 'The secure partner doesn\'t need to be needed, which takes pressure off.',
    c: 'The relationship can feel parallel rather than shared.',
    r: 'The hyper-independent partner experiments with small, low-stakes requests for help.' },
  'Anxious|Anxious': {
    s: 'A shared appetite for closeness can create deep emotional intimacy.',
    c: 'Both alarm systems can fire at once, leading to enmeshment or spiralling fears.',
    r: 'Build individual self-regulation practices and protect separate friendships and interests.' },
  'Anxious|Avoidant': {
    s: 'Each embodies what the other most needs to learn: one closeness, the other autonomy.',
    c: 'The classic anxious-avoidant trap: the more one pursues, the more the other distances, activating both core wounds.',
    r: 'Name the cycle as the shared enemy. The pursuer softens the approach; the distancer commits to coming back after space. Couples therapy is very effective here.' },
  'Anxious|Fearful-Avoidant': {
    s: 'Both deeply want connection and can recognise each other\'s fear.',
    c: 'The fearful-avoidant\'s retreats can trigger the anxious partner\'s panic, intensifying the swing.',
    r: 'Create explicit "I need space but I\'m coming back" language to reduce abandonment alarms.' },
  'Anxious|Hyper-Independent': {
    s: 'The hyper-independent partner offers reliability; the anxious partner offers warmth.',
    c: 'Requests for closeness may feel like pressure; self-reliance may feel like rejection.',
    r: 'Translate needs into concrete behaviours ("a text at lunch") rather than abstract closeness.' },
  'Avoidant|Avoidant': {
    s: 'Plenty of respect for each other\'s independence; little pressure.',
    c: 'Emotional distance can grow quietly until the relationship feels like roommates.',
    r: 'Schedule deliberate intimacy: weekly check-ins, shared feelings, physical affection.' },
  'Avoidant|Fearful-Avoidant': {
    s: 'Both understand the need for space.',
    c: 'When the fearful-avoidant reaches for closeness, the avoidant may withdraw, confirming their fear.',
    r: 'Agree in calm moments how each will respond when the other reaches out.' },
  'Avoidant|Hyper-Independent': {
    s: 'Low-drama, autonomous partnership.',
    c: 'Neither naturally initiates vulnerability; problems may go unspoken.',
    r: 'Practice asking for and accepting support, even in small ways.' },
  'Fearful-Avoidant|Fearful-Avoidant': {
    s: 'Deep mutual recognition of the longing and fear around love.',
    c: 'Both can swing at once, producing intense highs and lows.',
    r: 'Individual trauma-informed work for both; slow, predictable rhythms help nervous systems settle.' },
  'Fearful-Avoidant|Hyper-Independent': {
    s: 'Both value self-protection and understand guardedness.',
    c: 'The hyper-independent partner may not notice when the fearful-avoidant reaches out.',
    r: 'Make bids for connection explicit and acknowledge them every time.' },
  'Hyper-Independent|Hyper-Independent': {
    s: 'Two highly capable people who respect each other\'s competence.',
    c: 'True interdependence and vulnerability may never get a chance.',
    r: 'Practice receiving: let each other help with something that matters.' },
};
const ORDER = ['Secure', 'Anxious', 'Avoidant', 'Fearful-Avoidant', 'Hyper-Independent'];
function attachmentInsight(x, y) {
  if (!x || !y) return null;
  const [p, q] = [x, y].sort((m, n) => ORDER.indexOf(m) - ORDER.indexOf(n));
  return ATTACH[`${p}|${q}`] || null;
}

// ---------- Centres ----------
const CENTRE_PAIRS = {
  'Heart|Mind': 'One processes by feeling, the other by thinking. The Heart partner can feel analysed; the Mind partner can feel flooded. Lead with feelings first, solutions second.',
  'Body|Mind': 'One wants to understand before acting, the other acts to understand. Agree on when to discuss and when to just try something.',
  'Mind|Sacral': 'Head meets desire: the Mind partner may over-plan what the Sacral partner wants to follow spontaneously. Leave room for both.',
  'Body|Heart': 'Feelings meet action. The Body partner may "fix" when the Heart partner wants to be felt. Ask: "Do you want help or presence?"',
  'Heart|Sacral': 'Warm and passionate pairing; watch for emotional intensity without grounding.',
  'Body|Sacral': 'Very embodied and physical pairing; make deliberate space for reflective conversation.',
};
function centreInsight(x, y) {
  if (!x || !y) return null;
  if (x === y) return `Both lead from the ${x} centre, so you naturally speak the same language. Blind spots are shared too: deliberately practise the centres you both use least.`;
  return CENTRE_PAIRS[[x, y].sort().join('|')] || 'Different centres bring complementary perspectives; honour each other\'s way of processing instead of trying to change it.';
}

// ---------- Core needs ----------
const has = (s, k) => (s || '').toLowerCase().includes(k);
function needsInsight(a, b) {
  const na = a.core_need, nb = b.core_need;
  if (!na || !nb) return null;
  if (na.trim().toLowerCase() === nb.trim().toLowerCase()) return `You share the same core need (${na}). That builds empathy, but you may also compete to have it met. Take turns being the giver.`;
  const close = ['connection', 'belong', 'love', 'seen', 'validation', 'safety'];
  const free = ['freedom', 'autonomy'];
  const isClose = n => close.some(k => has(n, k));
  const isFree = n => free.some(k => has(n, k));
  if ((isClose(na) && isFree(nb)) || (isFree(na) && isClose(nb)))
    return 'Closeness vs. freedom: one partner\'s core need is the other\'s core threat. Design rituals that give both connection time and protected solo time, so neither need is met at the other\'s expense.';
  if ((has(na, 'control') && isFree(nb)) || (isFree(na) && has(nb, 'control')))
    return 'Control vs. autonomy: certainty for one can feel like a cage to the other. Agree on which areas need shared plans and which are each person\'s own.';
  return `Different core needs (${na} / ${nb}). Make each one explicit: "What does it look like, day to day, for me to meet your need?"`;
}

// ---------- Reactors ----------
const PURSUE = ['criticism', 'blame', 'anger', 'rage', 'people-pleasing', 'caretaking'];
const WITHDRAW = ['withdrawal', 'stonewalling', 'intellectualizing', 'numbing', 'workaholism'];
function reactorInsights(a, b, na, nb) {
  const out = [];
  const ra = (a.reactors || '').toLowerCase(), rb = (b.reactors || '').toLowerCase();
  const pa = PURSUE.some(k => ra.includes(k)), wa = WITHDRAW.some(k => ra.includes(k));
  const pb = PURSUE.some(k => rb.includes(k)), wb = WITHDRAW.some(k => rb.includes(k));
  if ((pa && wb) || (wa && pb)) {
    const [p, w] = pa && wb ? [na, nb] : [nb, na];
    out.push(`Pursue–withdraw cycle: under stress ${p} tends to move toward (fix, push, please) while ${w} moves away (shut down, numb, escape). Each reaction triggers the other.`);
  }
  if (ra.includes('contempt') || rb.includes('contempt'))
    out.push('Contempt (eye-rolling, sarcasm, mockery) is the most damaging conflict habit in relationship research. Replace it with a culture of appreciation and direct requests.');
  const crit = s => s.includes('criticism') || s.includes('blame');
  if ((crit(ra) && rb.includes('defensive')) || (crit(rb) && ra.includes('defensive')))
    out.push('Criticism ↔ defensiveness loop: try a "soft start-up" (I feel… about… I need…) and taking responsibility for even a small part.');
  if ((ra.includes('people-pleasing') || ra.includes('caretaking')) && (rb.includes('people-pleasing') || rb.includes('caretaking')))
    out.push('Both default to accommodating. Conflict may go underground and come out as resentment; practise saying no to each other safely.');
  return out;
}

// ---------- Archetypes ----------
const ARCH_PAIRS = [
  [['Explorer'], ['Lover', 'Caregiver', 'Innocent'], 'Freedom meets devotion: the Explorer may feel held too tightly, the other may feel left behind. Adventures together are the bridge.'],
  [['Ruler'], ['Rebel', 'Explorer'], 'Structure meets liberation: expect power struggles over rules and plans. Agree which domains each person leads.'],
  [['Ruler'], ['Ruler', 'Hero'], 'Two strong leaders: great when aligned, fierce when not. Make room for each to surrender control sometimes.'],
  [['Sage'], ['Lover', 'Caregiver'], 'Head meets heart: the Sage\'s analysis can feel cold to a partner who leads with warmth. Feel first, explain later.'],
  [['Jester'], ['Ruler', 'Sage', 'Hero'], 'Play meets seriousness: humour can lighten the load or feel like avoidance. Ask when levity helps and when it doesn\'t.'],
  [['Caregiver'], ['Caregiver', 'Orphan'], 'A lot of giving and needing: watch for one partner becoming the permanent caretaker.'],
  [['Magician'], ['Innocent', 'Orphan', 'Caregiver'], 'Transformation meets trust: growth must be invited, not engineered. Check for consent before "helping".'],
  [['Hero'], ['Caregiver', 'Lover'], 'Action meets tenderness: the Hero shows love by doing, the partner by being. Learn each other\'s love language.'],
];
function archetypeInsight(a, b) {
  const x = a.main_ego || '', y = b.main_ego || '';
  if (!x || !y) return null;
  const hit = (s, list) => list.some(k => s.includes(k));
  for (const [g1, g2, text] of ARCH_PAIRS) {
    if ((hit(x, g1) && hit(y, g2)) || (hit(y, g1) && hit(x, g2))) return text;
  }
  if (x === y) return `Two ${x.replace('The ', '')}s: you understand each other\'s drive intimately, and may amplify each other\'s shadow too.`;
  return null;
}

// ---------- Prompts ----------
const PROMPTS = {
  higher_self: 'When we\'re in conflict, what helps you zoom out and remember we\'re on the same team?',
  understanding: 'What\'s one thing about you that you wish I understood better?',
  compassion: 'When you\'re hurting, what does real support from me look like?',
  life_alignment: 'Where do we each see ourselves in five years, and where do those pictures overlap?',
  mind_discernment: 'Which decisions do we want to make slowly together, and which can each of us make alone?',
  discussion: 'What makes it hard for you to bring up difficult topics with me?',
  disagreement: 'What could we each do in the first five minutes of an argument to keep it from escalating?',
  heart_patience: 'Where do you feel rushed by me, and where do I feel rushed by you?',
  empathy: 'Tell me about a time you felt truly felt by me. What did I do?',
  s_chemistry: 'What helps you feel desire, and what gets in the way?',
  eros: 'When did we last feel really alive together? How do we get more of that?',
  comfort: 'Is there anything you hold back from telling me? What would make it feel safe to share?',
};

export function interpret(a, b, score) {
  const na = a.partner_name || 'Person A', nb = b.partner_name || 'Person B';
  const strengths = score.rows.filter(r => r.a >= 7 && r.b >= 7).sort((x, y) => y.avg - x.avg);
  const growth = score.rows.filter(r => r.avg <= 5.5).sort((x, y) => x.avg - y.avg);
  const gaps = score.rows.filter(r => r.gap >= 3).sort((x, y) => y.gap - x.gap);

  const patterns = [];
  const att = attachmentInsight(a.attachment_pattern, b.attachment_pattern);
  if (att) patterns.push({ title: `Attachment: ${a.attachment_pattern} + ${b.attachment_pattern}`, strength: att.s, challenge: att.c, rec: att.r });
  const cen = centreInsight(a.dominant_centre, b.dominant_centre);
  if (cen) patterns.push({ title: `Centres: ${a.dominant_centre} + ${b.dominant_centre}`, body: cen });
  const nd = needsInsight(a, b);
  if (nd) patterns.push({ title: 'Core needs', body: nd });
  const arch = archetypeInsight(a, b);
  if (arch) patterns.push({ title: `Archetypes: ${a.main_ego} + ${b.main_ego}`, body: arch });
  reactorInsights(a, b, na, nb).forEach(t => patterns.push({ title: 'Under stress', body: t }));

  const promptFields = [...new Set([...growth.map(r => r.field), ...gaps.map(r => r.field)])].slice(0, 5);
  const prompts = (promptFields.length ? promptFields : score.rows.slice().sort((x, y) => x.avg - y.avg).slice(0, 3).map(r => r.field))
    .map(f => PROMPTS[f]).filter(Boolean);

  return { strengths, growth, gaps, patterns, prompts };
}
