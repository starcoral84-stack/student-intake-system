# Lesson Guide — Student Intake & Conversation System

A tap-only, mobile-first web app for private English teachers. Pick a student archetype, refine it into an exact profile with a few taps, then follow a guided conversation flow during the lesson — logging what lands, what falls flat, and which grammar gaps you hear. The system learns from every logged session.

Built for iPad use during live lessons: **no typing, no dragging — every interaction is a tap.**

## How it works

1. **Archetype Quick-Select** — 30 archetypes grouped by category (Life & Family, Test Prep, Business & Career, Academic, Specialist). Tap one to start.
2. **Tap refinement** — 2–3 tap questions (level, goal, deadline, weakness…) narrow into an exact profile, then lock it.
3. **Conversation Guide** — one question at a time, with "listen for" hints and coaching notes. Tap **Landed / Partial / Fell flat** to record the reaction and reveal the next question. Tap gap chips (past tense, S-V agreement, articles…) live as you hear errors.
4. **Session Logger** — after the lesson: tap chips for what the student understood, struggled with, and next focus, plus a 4-point progress rating.
5. **Learning** — every session feeds the insights screen: question effectiveness badges ("★ works well" / "often falls flat") appear in future guides, per-archetype progress bars, top gaps, and plain-language adjustment suggestions ("Business Owners consistently show vocabulary gaps — consider a standing warm-up drill").

### MVP status

5 archetypes are fully fleshed out with custom refinements + hand-built flows: **Housewife, Business Owner, IELTS, Interview Prep, TOEIC** (marked `FULL` in the grid). The other 25 use a solid generic intake flow until fleshed out — add flows in `src/data/archetypes.js`.

## Stack

- **Frontend:** React 18 + Vite + Tailwind CSS 4
- **Data:** Firebase Firestore (sessions collection) with automatic localStorage fallback — the app is fully functional with zero configuration on a single device
- **Deploy:** Netlify (config in `netlify.toml`, SPA redirect included)

## Local development

```bash
npm install
npm run dev
```

## Firebase setup (optional but recommended)

Without Firebase keys the app stores everything in localStorage (one device only). To sync across devices:

1. Create a Firebase project at https://console.firebase.google.com
2. Add a **Web app**, enable **Firestore** (production mode is fine)
3. Copy `.env.example` to `.env` and fill in the `VITE_FIREBASE_*` values from your web app config
4. Firestore rules: this is a single-user personal tool; either keep the database locked and add Firebase Auth later, or scope rules to your own use. Sessions are written to the `sessions` collection.

## Deploy to Netlify

1. Push this repo to GitHub
2. Netlify → **Add new site → Import an existing project** → pick the repo
3. Build settings are auto-detected from `netlify.toml` (`npm run build` → `dist`)
4. Add the `VITE_FIREBASE_*` environment variables under **Site settings → Environment variables**
5. Every push to the default branch auto-deploys

## Extending

- **New archetype / flow:** edit `src/data/archetypes.js` — add refinement steps and a `flow` array of `{ id, text, listenFor, focus? }`. Question `id`s are how the learning engine tracks effectiveness, so keep them stable.
- **Learning logic:** `src/lib/learning.js` — reaction weighting, badges, suggestion rules.
- **Persistence:** `src/lib/store.js` — swap or extend the storage backend here.
