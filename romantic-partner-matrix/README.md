# Romantic Partner Matrix

A private, in-browser relationship assessment: archetypes, reactors, core needs and wounds, attachment, dominant centre, and 13 rated dimensions, with a Self vs Partner compatibility report.

Standalone static site (plain HTML/CSS/ES modules, no build step). Originally a Canva code app; the Canva Data SDK was replaced with browser `localStorage`, plus JSON export/import for backups.

## Files
- `index.html`: page shell and home illustration
- `data.js`: all content (archetypes, chips, rating scales, sample couple)
- `analysis.js`: compatibility index and pattern insights
- `app.js`: UI, storage, routing
- `styles.css`, `netlify.toml` (security headers, no build)

## Run locally
```bash
cd romantic-partner-matrix && python3 -m http.server 8000
```

## Deploy
Netlify project `romantic-partner-matrix`, base directory `romantic-partner-matrix`, no build command, publish `.`.
