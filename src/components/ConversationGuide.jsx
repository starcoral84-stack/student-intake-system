import { useState } from 'react'
import { GAP_CHIPS } from '../data/archetypes'
import { badgeFor } from '../lib/learning'

const REACTIONS = [
  { id: 'landed', label: 'Landed', emoji: '✅', cls: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
  { id: 'partial', label: 'Partial', emoji: '🟡', cls: 'bg-amber-50 border-amber-300 text-amber-700' },
  { id: 'flat', label: 'Fell flat', emoji: '⬜', cls: 'bg-slate-50 border-slate-300 text-slate-500' },
]

// The in-lesson screen: reveal one question at a time, tap a reaction to advance,
// tap gap chips as you hear errors. Ends into the session logger.
export default function ConversationGuide({ archetype, profile, qStats, onFinish, onBack }) {
  const [idx, setIdx] = useState(0)
  const [asked, setAsked] = useState([]) // [{ qId, reaction }]
  const [gaps, setGaps] = useState([])
  const flow = archetype.flow
  const q = flow[idx]
  const finished = idx >= flow.length

  const react = (reaction) => {
    setAsked(a => [...a, { qId: q.id, reaction }])
    setIdx(i => i + 1)
  }
  const skip = () => setIdx(i => i + 1)
  const toggleGap = (id) => setGaps(g => (g.includes(id) ? g.filter(x => x !== id) : [...g, id]))
  const finish = () => onFinish({ questionsAsked: asked, gaps })

  const badge = q ? badgeFor(qStats[`${archetype.id}:${q.id}`]) : null

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onBack} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-400 active:bg-slate-100">← Profile</button>
        <span className="text-sm font-medium text-slate-400">
          {archetype.emoji} {archetype.label} · {Math.min(idx + 1, flow.length)} / {flow.length}
        </span>
        <button onClick={finish} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white active:bg-slate-900">
          End session
        </button>
      </div>

      {!finished ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500">
            Ask now
            {badge && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.tone === 'good' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                ★ {badge.label}
              </span>
            )}
          </div>
          <p className="mb-4 text-2xl font-bold leading-snug text-slate-800">“{q.text}”</p>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Listen for</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {q.listenFor.map(l => (
              <span key={l} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">{l}</span>
            ))}
          </div>
          {q.focus && <p className="mb-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">💡 {q.focus}</p>}
          <div className="grid grid-cols-3 gap-2">
            {REACTIONS.map(r => (
              <button key={r.id} onClick={() => react(r.id)} className={`rounded-2xl border-2 py-4 text-center font-semibold active:scale-[0.97] ${r.cls}`}>
                <span className="block text-xl">{r.emoji}</span>
                <span className="text-sm">{r.label}</span>
              </button>
            ))}
          </div>
          <button onClick={skip} className="mt-2 w-full rounded-xl py-3 text-sm font-medium text-slate-400 active:bg-slate-100">
            Skip this question
          </button>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mb-2 text-4xl">🏁</div>
          <p className="mb-1 text-xl font-bold text-slate-800">Flow complete</p>
          <p className="mb-6 text-sm text-slate-400">Free conversation from here — tap gaps below as you hear them, then end the session.</p>
          <button onClick={finish} className="w-full rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white active:bg-indigo-700">
            End session & log →
          </button>
        </div>
      )}

      <div className="mt-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Observed gaps (tap as you hear them)</div>
        <div className="flex flex-wrap gap-2">
          {GAP_CHIPS.map(g => (
            <button
              key={g.id}
              onClick={() => toggleGap(g.id)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold active:scale-[0.97] ${
                gaps.includes(g.id)
                  ? 'border-rose-400 bg-rose-50 text-rose-600'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {g.label}{gaps.includes(g.id) ? ' ✓' : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
