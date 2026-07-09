// Persistence layer. Firestore when configured, localStorage otherwise.
// Both paths keep a local cache so the UI is instant; Firestore syncs on load/save.
import { db, firebaseEnabled } from './firebase'
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

const LS_KEY = 'intake-sessions-v1'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || []
  } catch {
    return []
  }
}

function writeLocal(sessions) {
  localStorage.setItem(LS_KEY, JSON.stringify(sessions))
}

export async function loadSessions() {
  if (firebaseEnabled) {
    try {
      const snap = await getDocs(query(collection(db, 'sessions'), orderBy('date', 'desc'), limit(500)))
      const sessions = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      writeLocal(sessions) // cache for offline
      return sessions
    } catch (e) {
      console.warn('Firestore load failed, using local cache', e)
    }
  }
  return readLocal()
}

export async function saveSession(session) {
  const record = { ...session, date: session.date || new Date().toISOString() }
  const local = readLocal()
  local.unshift({ id: `local-${Date.now()}`, ...record })
  writeLocal(local)
  if (firebaseEnabled) {
    try {
      await addDoc(collection(db, 'sessions'), record)
    } catch (e) {
      console.warn('Firestore save failed, kept locally', e)
    }
  }
  return record
}

export { firebaseEnabled }
