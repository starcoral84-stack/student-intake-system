// Learning engine: aggregates saved sessions into question effectiveness,
// archetype progress stats, and plain-language adjustment suggestions.
import { ARCHETYPES, GAP_CHIPS } from '../data/archetypes'

const REACTION_WEIGHT = { landed: 2, partial: 1, flat: -1 }

// Per-archetype, per-question effectiveness from logged reactions.
// score is normalized to roughly [-1, 2]; n is sample size.
export function questionStats(sessions) {
  const stats = {} // `${archetypeId}:${qId}` -> { landed, partial, flat, n, score }
  for (const s of sessions) {
    for (const q of s.questionsAsked || []) {
      const key = `${s.archetypeId}:${q.qId}`
      const st = (stats[key] ||= { landed: 0, partial: 0, flat: 0, n: 0 })
      if (st[q.reaction] !== undefined) st[q.reaction] += 1
      st.n += 1
    }
  }
  for (const st of Object.values(stats)) {
    st.score = st.n ? (REACTION_WEIGHT.landed * st.landed + REACTION_WEIGHT.partial * st.partial + REACTION_WEIGHT.flat * st.flat) / st.n : 0
  }
  return stats
}

export function badgeFor(stat) {
  if (!stat || stat.n < 2) return null
  if (stat.score >= 1.3) return { label: 'works well', tone: 'good' }
  if (stat.score <= 0.2) return { label: 'often falls flat', tone: 'bad' }
  return null
}

// Per-archetype rollup: sessions, avg progress (1-4), top gaps, best/worst question.
export function archetypeInsights(sessions) {
  const byArch = {}
  for (const s of sessions) {
    const a = (byArch[s.archetypeId] ||= { sessions: 0, ratingSum: 0, rated: 0, gaps: {}, struggled: {}, nextFocus: {} })
    a.sessions += 1
    if (s.progressRating) { a.ratingSum += s.progressRating; a.rated += 1 }
    for (const g of s.gaps || []) a.gaps[g] = (a.gaps[g] || 0) + 1
    for (const c of s.struggled || []) a.struggled[c] = (a.struggled[c] || 0) + 1
    for (const c of s.nextFocus || []) a.nextFocus[c] = (a.nextFocus[c] || 0) + 1
  }
  const qStats = questionStats(sessions)
  const out = []
  for (const [archetypeId, a] of Object.entries(byArch)) {
    const arch = ARCHETYPES.find(x => x.id === archetypeId)
    if (!arch) continue
    const avgRating = a.rated ? a.ratingSum / a.rated : null
    const topGaps = topN(a.gaps, 3).map(([id, n]) => ({ label: gapLabel(id), n }))
    const flowStats = arch.flow
      .map(q => ({ q, stat: qStats[`${archetypeId}:${q.id}`] }))
      .filter(x => x.stat && x.stat.n >= 2)
      .sort((x, y) => y.stat.score - x.stat.score)
    out.push({
      archetype: arch,
      sessions: a.sessions,
      avgRating,
      topGaps,
      topStruggles: topN(a.struggled, 3).map(([label, n]) => ({ label, n })),
      bestQuestion: flowStats[0]?.q || null,
      worstQuestion: flowStats.length > 1 ? flowStats[flowStats.length - 1].q : null,
      suggestions: buildSuggestions(arch, a, avgRating, flowStats),
    })
  }
  return out.sort((x, y) => y.sessions - x.sessions)
}

function buildSuggestions(arch, a, avgRating, flowStats) {
  const s = []
  const topGap = topN(a.gaps, 1)[0]
  if (topGap && topGap[1] >= 2) {
    s.push(`${arch.label} students consistently show "${gapLabel(topGap[0])}" gaps — consider a standing warm-up drill for it.`)
  }
  if (avgRating !== null && a.sessions >= 3 && avgRating < 2.2) {
    s.push(`Progress is slow for ${arch.label} (avg ${avgRating.toFixed(1)}/4 over ${a.sessions} sessions) — the flow may need restructuring.`)
  }
  const worst = flowStats.length > 1 ? flowStats[flowStats.length - 1] : null
  if (worst && worst.stat.score <= 0.2) {
    s.push(`“${worst.q.text}” often falls flat — try rewording it or moving it later in the flow.`)
  }
  const topFocus = topN(a.nextFocus, 1)[0]
  if (topFocus && topFocus[1] >= 2) {
    s.push(`Most-chosen next focus: "${topFocus[0]}" — worth building dedicated material for.`)
  }
  return s
}

// Cross-cohort one-liners for the insights screen.
export function cohortTrends(sessions) {
  const insights = archetypeInsights(sessions)
  return insights
    .filter(i => i.sessions >= 2 && i.topGaps.length)
    .map(i => `${i.archetype.label}s most often need work on ${i.topGaps.map(g => g.label.toLowerCase()).join(', ')}.`)
}

function topN(counts, n) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n)
}

function gapLabel(id) {
  return GAP_CHIPS.find(g => g.id === id)?.label || id
}
