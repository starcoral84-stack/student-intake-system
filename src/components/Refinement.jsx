import { useState } from 'react'

// Tap through the archetype's refinement steps, then lock the profile.
export default function Refinement({ archetype, onLocked, onBack }) {
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState({})
  const steps = archetype.refinements
  const done = step >= steps.length

  const pick = (stepId, opt) => {
    setChoices(c => ({ ...c, [stepId]: opt }))
    setStep(s => s + 1)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-6 shadow-sm">
          <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-indigo-500">Profile locked</div>
          <div className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800">
            <span className="text-4xl">{archetype.emoji}</span>{archetype.label}
          </div>
          <ul className="mb-6 space-y-2">
            {steps.map(s => (
              <li key={s.id} className="flex items-baseline justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-400">{s.prompt}</span>
                <span className="text-right font-semibold text-slate-700">{choices[s.id]?.label}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onLocked(choices)}
            className="w-full rounded-2xl bg-indigo-600 py-5 text-lg font-bold text-white shadow-md active:scale-[0.98] active:bg-indigo-700"
          >
            Start conversation guide →
          </button>
          <button onClick={() => setStep(0)} className="mt-3 w-full rounded-2xl py-3 text-sm font-medium text-slate-400 active:bg-slate-100">
            Redo refinement
          </button>
        </div>
      </div>
    )
  }

  const current = steps[step]
  return (
    <div className="mx-auto max-w-xl">
      <button onClick={step === 0 ? onBack : () => setStep(s => s - 1)} className="mb-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 active:bg-slate-100">
        ← Back
      </button>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
        <span className="text-xl">{archetype.emoji}</span> {archetype.label}
        <span className="ml-auto">{step + 1} / {steps.length}</span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(step / steps.length) * 100}%` }} />
      </div>
      <h2 className="mb-5 text-2xl font-bold text-slate-800">{current.prompt}</h2>
      <div className="space-y-3">
        {current.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => pick(current.id, opt)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm active:scale-[0.99] active:border-indigo-400 active:bg-indigo-50"
          >
            <span className="block text-lg font-semibold text-slate-800">{opt.label}</span>
            {opt.hint && <span className="mt-0.5 block text-sm text-slate-400">{opt.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
