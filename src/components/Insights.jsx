import { archetypeInsights, cohortTrends } from '../lib/learning'

// Learning dashboard: per-archetype stats, best/worst questions, and
// plain-language adjustment suggestions derived from logged sessions.
export default function Insights({ sessions }) {
  const insights = archetypeInsights(sessions)
  const trends = cohortTrends(sessions)

  if (!sessions.length) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-2 text-4xl">📈</div>
        <p className="text-lg font-bold text-slate-800">No sessions logged yet</p>
        <p className="mt-1 text-sm text-slate-400">Run a lesson and save the session log — insights build automatically from there.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Insights</h2>

      {trends.length > 0 && (
        <div className="rounded-2xl bg-indigo-50 p-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-500">Cohort trends</div>
          <ul className="space-y-1.5 text-sm text-indigo-800">
            {trends.map((t, i) => <li key={i}>• {t}</li>)}
          </ul>
        </div>
      )}

      {insights.map(i => (
        <div key={i.archetype.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <span className="text-2xl">{i.archetype.emoji}</span>{i.archetype.label}
            </span>
            <span className="text-sm text-slate-400">{i.sessions} session{i.sessions !== 1 ? 's' : ''}</span>
          </div>

          {i.avgRating !== null && (
            <div className="mb-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(i.avgRating / 4) * 100}%` }} />
              </div>
              <span className="text-sm font-semibold text-slate-600">{i.avgRating.toFixed(1)}/4 progress</span>
            </div>
          )}

          {i.topGaps.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {i.topGaps.map(g => (
                <span key={g.label} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  {g.label} ×{g.n}
                </span>
              ))}
            </div>
          )}

          {i.bestQuestion && (
            <p className="mb-1 text-sm text-slate-600">
              <span className="font-semibold text-emerald-600">Best question:</span> “{i.bestQuestion.text}”
            </p>
          )}
          {i.worstQuestion && (
            <p className="mb-1 text-sm text-slate-600">
              <span className="font-semibold text-rose-500">Weakest question:</span> “{i.worstQuestion.text}”
            </p>
          )}

          {i.suggestions.length > 0 && (
            <div className="mt-3 rounded-xl bg-amber-50 p-4">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-600">Suggested adjustments</div>
              <ul className="space-y-1 text-sm text-amber-800">
                {i.suggestions.map((s, idx) => <li key={idx}>• {s}</li>)}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
