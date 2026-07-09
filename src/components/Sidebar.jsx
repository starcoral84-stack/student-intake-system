export default function Sidebar({ open, onClose, onNavigate, firebaseEnabled }) {
  if (!open) return null
  const Item = ({ view, icon, label }) => (
    <button
      onClick={() => { onNavigate(view); onClose() }}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-slate-700 active:bg-indigo-50"
    >
      <span className="text-2xl">{icon}</span>
      {label}
    </button>
  )
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <nav className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-2xl">
        <div className="mb-6 flex items-center justify-between px-2">
          <span className="text-lg font-bold text-slate-800">Lesson Guide</span>
          <button onClick={onClose} className="rounded-lg px-3 text-2xl text-slate-400 active:bg-slate-100">×</button>
        </div>
        <Item view="home" icon="👥" label="Archetypes" />
        <Item view="insights" icon="📈" label="Insights" />
        <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Data: {firebaseEnabled ? 'Firebase ✓ synced' : 'This device only (add Firebase keys to sync)'}
        </div>
      </nav>
    </div>
  )
}
