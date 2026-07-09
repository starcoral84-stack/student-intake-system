import { useEffect, useMemo, useState } from 'react'
import ArchetypeGrid from './components/ArchetypeGrid'
import Refinement from './components/Refinement'
import ConversationGuide from './components/ConversationGuide'
import SessionLogger from './components/SessionLogger'
import Insights from './components/Insights'
import Sidebar from './components/Sidebar'
import { loadSessions, saveSession, firebaseEnabled } from './lib/store'
import { questionStats } from './lib/learning'

// Views: home → refine → guide → logger → home. insights from sidebar.
export default function App() {
  const [view, setView] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [archetype, setArchetype] = useState(null)
  const [profile, setProfile] = useState(null) // refinement choices
  const [guideResult, setGuideResult] = useState(null) // { questionsAsked, gaps }
  const [sessions, setSessions] = useState([])
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    loadSessions().then(setSessions)
  }, [])

  const qStats = useMemo(() => questionStats(sessions), [sessions])

  const handleSaveLog = async (log) => {
    setSaving(true)
    const record = await saveSession({
      archetypeId: archetype.id,
      profile: Object.fromEntries(Object.entries(profile || {}).map(([k, v]) => [k, v.id])),
      ...guideResult,
      ...log,
    })
    setSessions(s => [record, ...s])
    setSaving(false)
    setArchetype(null)
    setProfile(null)
    setGuideResult(null)
    setView('home')
    setToast('Session saved ✓')
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl text-slate-500 active:bg-slate-200"
          >
            ☰
          </button>
          <button onClick={() => setView('home')} className="text-lg font-bold text-slate-800">
            Lesson Guide
          </button>
          <span className={`ml-auto h-2.5 w-2.5 rounded-full ${firebaseEnabled ? 'bg-emerald-400' : 'bg-slate-300'}`}
            title={firebaseEnabled ? 'Firebase connected' : 'Local storage mode'} />
        </div>
      </header>

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={setView} firebaseEnabled={firebaseEnabled} />

      <main className="mx-auto max-w-3xl px-4 py-6 pb-24">
        {view === 'home' && (
          <ArchetypeGrid onSelect={(a) => { setArchetype(a); setProfile(null); setView('refine') }} />
        )}
        {view === 'refine' && archetype && (
          <Refinement
            archetype={archetype}
            onBack={() => setView('home')}
            onLocked={(choices) => { setProfile(choices); setView('guide') }}
          />
        )}
        {view === 'guide' && archetype && (
          <ConversationGuide
            archetype={archetype}
            profile={profile}
            qStats={qStats}
            onBack={() => setView('refine')}
            onFinish={(result) => { setGuideResult(result); setView('logger') }}
          />
        )}
        {view === 'logger' && archetype && (
          <SessionLogger archetype={archetype} onSave={handleSaveLog} saving={saving} />
        )}
        {view === 'insights' && <Insights sessions={sessions} />}
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
