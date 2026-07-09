import { ARCHETYPES, CATEGORIES } from '../data/archetypes'

export default function ArchetypeGrid({ onSelect }) {
  return (
    <div className="space-y-8">
      {CATEGORIES.map(cat => (
        <section key={cat}>
          <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wider text-slate-400">{cat}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ARCHETYPES.filter(a => a.category === cat).map(a => (
              <button
                key={a.id}
                onClick={() => onSelect(a)}
                className="relative flex min-h-[110px] flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm active:scale-[0.98] active:border-indigo-400 active:bg-indigo-50"
              >
                <span className="text-3xl">{a.emoji}</span>
                <span>
                  <span className="block font-semibold leading-tight text-slate-800">{a.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-400">{a.tagline}</span>
                </span>
                {a.full && (
                  <span className="absolute right-3 top-3 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600">FULL</span>
                )}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
