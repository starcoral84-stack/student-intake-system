import { useState } from 'react'
import { UNDERSTOOD_CHIPS, STRUGGLED_CHIPS, NEXT_FOCUS_CHIPS } from '../data/archetypes'

const RATINGS = [
  { v: 1, label: 'Stuck', emoji: '🧱' },
  { v: 2, label: 'Slow', emoji: '🐢' },
  { v: 3, label: 'Good', emoji: '👍' },
  { v: 4, label: 'Great', emoji: '🚀' },
]

function ChipGroup({ title, chips, selected, onToggle, tone }) {
  const active = tone === 'green'
    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
    : tone === 'red'
      ? 'border-rose-400 bg-rose-50 text-rose-600'
      : 'border-indigo-400 bg-indigo-50 text-indigo-700'
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</div>
      <div className="flex flex-wrap gap-2">
        {chips.map(c => (
          <button
            key={c}
            onClick={() => onToggle(c)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold active:scale-[0.97] ${
              selected.includes(c) ? active : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            {c}{selected.includes(c) ? ' ✓' : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

// Post-lesson tap notes: understood / struggled / next focus / progress rating.
export default function SessionLogger({ archetype, onSave, saving }) {
  const [understood, setUnderstood] = useState([])
  const [struggled, setStruggled] = useState([])
  const [nextFocus, setNextFocus] = useState([])
  const [rating, setRating] = useState(null)

  const toggle = (setter) => (c) => setter(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <div className="text-sm font-semibold uppercase tracking-wider text-indigo-500">Session log</div>
        <h2 className="text-2xl font-bold text-slate-800">{archetype.emoji} {archetype.label}</h2>
      </div>

      <ChipGroup title="Student understood…" chips={UNDERSTOOD_CHIPS} selected={understood} onToggle={toggle(setUnderstood)} tone="green" />
      <ChipGroup title="Struggled with…" chips={STRUGGLED_CHIPS} selected={struggled} onToggle={toggle(setStruggled)} tone="red" />
      <ChipGroup title="Next lesson focus…" chips={NEXT_FOCUS_CHIPS} selected={nextFocus} onToggle={toggle(setNextFocus)} tone="indigo" />

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Overall progress this session</div>
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map(r => (
            <button
              key={r.v}
              onClick={() => setRating(r.v)}
              className={`rounded-2xl border-2 py-4 text-center font-semibold active:scale-[0.97] ${
                rating === r.v ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <span className="block text-2xl">{r.emoji}</span>
              <span className="text-xs">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSave({ understood, struggled, nextFocus, progressRating: rating })}
        disabled={saving}
        className="w-full rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white shadow-md active:scale-[0.98] active:bg-indigo-700 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save session ✓'}
      </button>
    </div>
  )
}
