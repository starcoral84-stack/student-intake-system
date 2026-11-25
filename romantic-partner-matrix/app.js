import {
  ARCHETYPES, REACTORS, CORE_NEEDS, EMOTIONS, CENTRES, ATTACHMENTS, EXILE_EXAMPLES, WOUND_EXAMPLES,
  SECTIONS, ALL_METRICS, CHART_METRICS, TEXT_FIELDS, SAMPLE_PAIR,
} from './data.js';
import { scorePair, interpret } from './analysis.js';
import { LEARN } from './learn.js';

// ---------- Utilities ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
const bandIndex = v => Math.min(4, Math.max(0, Math.ceil(v / 2) - 1));
const BAND_LABELS = ['1–2', '3–4', '5–6', '7–8', '9–10'];
const fmtDate = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return ''; } };
const clampRating = v => { const n = Math.round(+v); return Number.isFinite(n) ? Math.min(10, Math.max(1, n)) : 5; };

function toast(message, { error = false, action, actionLabel, timeout = 3500 } = {}) {
  $$('#toasts .toast').filter(t => t.dataset.msg === message).forEach(t => t.remove());
  const el = document.createElement('div');
  el.dataset.msg = message;
  el.className = 'toast' + (error ? ' error' : '');
  el.innerHTML = `<span>${esc(message)}</span>`;
  if (action) {
    const b = document.createElement('button');
    b.textContent = actionLabel || 'Undo';
    b.addEventListener('click', () => { action(); el.remove(); });
    el.appendChild(b);
  }
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), timeout);
}

// ---------- Storage ----------
const KEY = 'rpm.assessments.v1';
const PREFS = 'rpm.prefs.v1';
let records = [];
let storageOk = true;

function load() {
  try { records = JSON.parse(localStorage.getItem(KEY) || '[]'); if (!Array.isArray(records)) records = []; }
  catch { records = []; storageOk = false; }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(records)); }
  catch { storageOk = false; toast('Could not save to this browser (private mode or storage full). Export a backup.', { error: true, timeout: 6000 }); }
  refreshAll();
}
function prefs(patch) {
  let p = {};
  try { p = JSON.parse(localStorage.getItem(PREFS) || '{}'); } catch {}
  if (patch) { p = { ...p, ...patch }; try { localStorage.setItem(PREFS, JSON.stringify(p)); } catch {} }
  return p;
}
const byId = id => records.find(r => r.id === id);

function sanitize(raw) {
  const r = { id: typeof raw.id === 'string' && raw.id ? raw.id : (raw.__backendId || uid()) };
  TEXT_FIELDS.forEach(f => { r[f] = typeof raw[f] === 'string' ? raw[f].slice(0, 5000) : ''; });
  if (!['Self', 'Partner'].includes(r.person_type)) r.person_type = 'Partner';
  ALL_METRICS.forEach(m => { r[m.field] = clampRating(raw[m.field]); });
  r.created_at = raw.created_at || new Date().toISOString();
  r.updated_at = raw.updated_at || r.created_at;
  return r;
}

// ---------- Router ----------
const SECTIONS_IDS = ['home', 'assess', 'records', 'detail', 'compare', 'learn'];
function route() {
  const hash = location.hash.slice(1) || 'home';
  const [name, arg] = hash.split('/');
  let target = SECTIONS_IDS.includes(name) ? name : 'home';
  if (name === 'record') target = 'detail';
  SECTIONS_IDS.forEach(id => { $('#' + id).hidden = id !== target; });
  $$('.tab-button').forEach(t => {
    const active = t.dataset.tab === target || (target === 'detail' && t.dataset.tab === 'records');
    t.classList.toggle('active', active);
    if (active) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
  });
  if (target === 'detail') renderDetail(decodeURIComponent(arg || ''));
  if (target === 'home') renderHome();
  if (target === 'learn') {
    $$('#learnToc a').forEach(a => a.classList.toggle('active', a.dataset.topic === arg));
    const el = arg && $('#learn-' + arg);
    if (el) { requestAnimationFrame(() => el.scrollIntoView({ block: 'start', behavior: 'instant' })); return; }
  }
  if (target === 'compare') renderCompare();
  window.scrollTo({ top: 0 });
}
const go = hash => { if (location.hash === '#' + hash) route(); else location.hash = hash; };

// ---------- Sidebar guide ----------
function archDetails(a) {
  return `<details class="arch"><summary>${esc(a.name)}</summary><div class="arch-body">
    <p><strong>Core drive:</strong> ${esc(a.drive)}</p>
    <p><strong>In relationships:</strong> ${esc(a.rel)}</p>
    <p><strong>Shadow:</strong> ${esc(a.shadow)}</p>
    <p><strong>Growth edge:</strong> ${esc(a.growth)}</p></div></details>`;
}
function renderGuide() {
  $('#guideContent').innerHTML = `
    <h3>🎭 12 Archetypes</h3>
    <p>Your dominant archetype shows how you show up in love. Each has gifts (light) and challenges (shadow).</p>
    ${ARCHETYPES.map(archDetails).join('')}
    <h3>🧠 Dominant Centres</h3>
    ${CENTRES.map(([n, v, d]) => `<p><strong>${n} (${v}):</strong> ${esc(d)}</p>`).join('')}
    <h3>🔗 Attachment Patterns</h3>
    ${ATTACHMENTS.map(([n, d]) => `<p><strong>${n}:</strong> ${esc(d)}</p>`).join('')}
    <h3>📊 Rating Scales</h3>
    <p>All scales run 1–10. Higher means a stronger presence of the quality. The description under each slider updates as you move it.</p>
    <h3>🔒 Your data</h3>
    <p>Assessments are stored only in this browser. Use <em>Export backup</em> on the Saved tab to keep a copy or move to another device.</p>
    <h3>📖 Go deeper</h3>
    <p>The <a href="#learn">Learn</a> page explains the theory behind every section: No Bad Parts, saboteurs, archetypes, attachment, wounds, needs, and more.</p>`;
  const sb = $('#sidebar'), ov = $('#sidebarOverlay'), btn = $('#hamburgerBtn');
  const open = o => {
    sb.classList.toggle('open', o); ov.hidden = !o; sb.setAttribute('aria-hidden', String(!o)); btn.setAttribute('aria-expanded', String(o));
    if (o) $('#closeSidebar').focus(); else btn.focus();
  };
  btn.addEventListener('click', () => open(true));
  $('#closeSidebar').addEventListener('click', () => open(false));
  ov.addEventListener('click', () => open(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sb.classList.contains('open')) open(false); });
}

// ---------- Form ----------
let editingId = null;
let dirty = false;
let justSaved = null;
const STEP_LABELS = ['About', 'Ego', 'Needs', 'Emotions', 'Orientation', 'Unity', 'Mind', 'Heart', 'Sacral', 'Review'];
const LAST = STEP_LABELS.length - 1;
let step = 0;
const visited = new Set();

const chips = (target, items, { multi = false, labelFn = x => x } = {}) =>
  `<div class="chips" data-chips-for="${target}" data-multi="${multi}">${items.map(v =>
    `<button type="button" class="chip" data-value="${esc(v)}" aria-pressed="false">${esc(labelFn(v))}</button>`).join('')}</div>`;
const help = (title, body) => `<details class="help"><summary>${esc(title)}</summary><div class="help-body">${body}</div></details>`;
const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;

function sliderHtml([field, label, , scale]) {
  return `<div class="slider-group">
    <div class="slider-header"><label class="slider-label" for="f_${field}">${esc(label)}</label><output class="slider-value" id="v_${field}" for="f_${field}">5</output></div>
    <input type="range" id="f_${field}" name="${field}" min="1" max="10" value="5" aria-describedby="d_${field}">
    <div class="scale-ticks" aria-hidden="true">${[1,2,3,4,5,6,7,8,9,10].map(n => `<span>${n}</span>`).join('')}</div>
    <div class="band-desc" id="d_${field}"></div>
    ${help('See full scale', scale.map((s, i) => `<div class="rating-item" data-band="${i}"><strong>${BAND_LABELS[i]}:</strong> ${esc(s)}</div>`).join(''))}
  </div>`;
}

function buildForm() {
  const form = $('#assessmentForm');
  form.innerHTML = `
  <div class="form-section">
    <h3>👤 Basic Information</h3>
    <div class="form-group"><label for="f_partner_name">Name <span class="hint">(needed to save; you can look through the steps first)</span></label>
      <input type="text" id="f_partner_name" name="partner_name" autocomplete="off" maxlength="80" required>
      <div class="error-text" id="err_name" hidden>Please enter a name.</div></div>
    <div class="form-group" role="radiogroup" aria-labelledby="typeLabel"><span class="label" id="typeLabel">I am assessing <span class="hint">(needed to save)</span></span>
      <div class="segmented" id="typeGroup">
        <label><input type="radio" name="person_type" value="Self"><span>🙋 Myself</span></label>
        <label><input type="radio" name="person_type" value="Partner"><span>💞 My partner</span></label>
      </div>
      <div class="error-text" id="err_type" hidden>Choose who you are assessing.</div>
      <p class="perspective-hint" id="perspectiveHint" hidden></p></div>
  </div>

  <div class="form-section">
    <h3>🎭 Main Ego &amp; Reactors</h3>
    <div class="form-group"><label for="f_main_ego">Main Ego (and Protectors)</label>
      <input type="text" id="f_main_ego" name="main_ego" placeholder="e.g. The Hero, The Caregiver">
      ${chips('main_ego', ARCHETYPES.map(a => a.name), { labelFn: v => ARCHETYPES.find(a => a.name === v).short })}
      <div id="archCard"></div>
      ${help('Explore all 12 archetypes', ARCHETYPES.map(archDetails).join(''))}</div>
    <div class="form-group"><label for="f_reactors">Reactors <span class="hint">(firefighters / reactions in distress, pick any)</span></label>
      <textarea id="f_reactors" name="reactors" placeholder="How do you react when triggered or in distress?"></textarea>
      ${chips('reactors', REACTORS.map(r => r[0]), { multi: true, labelFn: v => v.split(/[ /(]/)[0] })}
      ${help('Common stress reactions', `<p>Reactors are automatic protective responses that emerge when you feel threatened, hurt, or overwhelmed: the "firefighters" that try to put out emotional fires, often creating new problems.</p>${list(REACTORS.map(([n, d]) => `<strong>${esc(n)}:</strong> ${esc(d)}`))}`)}</div>
  </div>

  <div class="form-section">
    <h3>💝 Core Needs &amp; Wounds</h3>
    <div class="form-group"><label for="f_core_need">Core Need</label>
      <input type="text" id="f_core_need" name="core_need" placeholder="e.g. To feel safe, To be seen, To belong">
      ${chips('core_need', CORE_NEEDS.map(n => n[0]), { labelFn: v => v.split(' & ')[0] })}
      ${help('Universal human needs', `<p>Core needs are the fundamental emotional requirements we all have. When unmet, they create suffering and drive protective behaviours.</p>${list(CORE_NEEDS.map(([n, d]) => `<strong>${esc(n)}:</strong> ${esc(d)}`))}`)}</div>
    <div class="form-group"><label for="f_exiled_parts">Exiled Parts</label>
      <textarea id="f_exiled_parts" name="exiled_parts" placeholder="The hidden, vulnerable parts of yourself"></textarea>
      ${help('Understanding exiled parts', `<p>Exiled parts are the vulnerable, wounded aspects you've buried because they were too painful or unacceptable, often formed in childhood. Examples:</p>${list(EXILE_EXAMPLES.map(esc))}`)}</div>
    <div class="form-group"><label for="f_core_unhealed">Core Unhealed Wound</label>
      <textarea id="f_core_unhealed" name="core_unhealed" placeholder="The deepest wound that shapes your patterns"></textarea>
      ${help('Core wounds', `<p>Your core wound is the primary emotional injury that shapes your relationship patterns: the lens through which you unconsciously view love. Examples:</p>${list(WOUND_EXAMPLES.map(w => `"${esc(w)}"`))}`)}</div>
  </div>

  <div class="form-section">
    <h3>🎨 Emotional Patterns</h3>
    <div class="form-group"><label for="f_predominant_emotion">Predominant Emotion</label>
      <input type="text" id="f_predominant_emotion" name="predominant_emotion" placeholder="e.g. Joy, Anxiety, Contentment, Sadness">
      <p class="chip-group-label">Resourceful</p>${chips('predominant_emotion', EMOTIONS.resourceful.map(e => e[0]))}
      <p class="chip-group-label">Survival</p>${chips('predominant_emotion', EMOTIONS.survival.map(e => e[0]))}
      ${help('Your emotional home base', `<p>The emotion you return to most often: your emotional default setting.</p>
        <p><strong>Resourceful states</strong></p>${list(EMOTIONS.resourceful.map(([n, d]) => `<strong>${n}:</strong> ${esc(d)}`))}
        <p><strong>Survival states</strong></p>${list(EMOTIONS.survival.map(([n, d]) => `<strong>${n}:</strong> ${esc(d)}`))}`)}</div>
    <div class="form-group"><label for="f_breakup_reason">Reason for Breakup / Trauma <span class="hint">(if applicable)</span></label>
      <textarea id="f_breakup_reason" name="breakup_reason" placeholder="What led to the end or to major challenges?"></textarea>
      ${help('Understanding relationship endings', '<p>Endings and ruptures reveal core incompatibilities, unmet needs, or activated wounds. Understanding them helps prevent repetition.</p>')}</div>
    <div class="form-group"><label for="f_trauma_regret">Trauma / Regret</label>
      <textarea id="f_trauma_regret" name="trauma_regret" placeholder="Significant painful experiences or things you wish were different"></textarea>
      ${help('Processing relationship pain', '<p>Betrayals, losses, missed opportunities, or things said or done that can\'t be taken back. Acknowledging these helps with healing.</p>')}</div>
  </div>

  <div class="form-section">
    <h3>🧭 Orientation &amp; Attachment</h3>
    <div class="form-group"><label for="f_dominant_centre">Dominant Centre</label>
      <select id="f_dominant_centre" name="dominant_centre"><option value="">Select…</option>${CENTRES.map(([n, v]) => `<option value="${n}">${n} (${v})</option>`).join('')}</select>
      ${help('Your primary operating system', list(CENTRES.map(([n, , d]) => `<strong>${n}:</strong> ${esc(d)}`)))}</div>
    <div class="form-group"><label for="f_attachment_pattern">Attachment Pattern</label>
      <select id="f_attachment_pattern" name="attachment_pattern"><option value="">Select…</option>${ATTACHMENTS.map(([n]) => `<option>${n}</option>`).join('')}</select>
      ${help('How we bond', list(ATTACHMENTS.map(([n, d]) => `<strong>${n}:</strong> ${esc(d)}`)))}</div>
  </div>

  ${SECTIONS.map(s => `<div class="form-section"><h3>${s.icon} ${esc(s.title)}</h3><p class="section-sub" data-sub></p>${s.metrics.map(sliderHtml).join('')}</div>`).join('')}

  <div class="form-section">
    <h3>📋 Review &amp; save</h3>
    <p class="section-sub">Tap any row to go back and change it. Everything except the name and type is optional.</p>
    <div id="reviewSummary"></div>
    <div class="form-group"><label for="f_notes">Notes <span class="hint">(optional: context, dates, things to revisit)</span></label>
      <textarea id="f_notes" name="notes" placeholder="Anything else worth remembering…"></textarea></div>
  </div>

  <div class="form-actions">
    <button type="button" class="btn btn-secondary" id="backBtn">← Back</button>
    <button type="button" class="link-btn subtle" id="resetBtn">Clear</button>
    <button type="button" class="btn btn-ghost" id="saveNowBtn">Save now</button>
    <button type="submit" class="btn btn-primary" id="nextBtn">Next →</button>
  </div>`;

  form.insertAdjacentHTML('afterbegin', `<ol class="stepper" id="stepper" aria-label="Assessment steps">${STEP_LABELS.map((l, i) =>
    `<li><button type="button" data-goto="${i}"><span class="num">${i + 1}</span><span class="lbl">${l}</span></button></li>`).join('')}</ol>`);
  $$('.form-section', form).forEach((sec, i) => {
    sec.dataset.step = i; $('h3', sec).tabIndex = -1;
    const topics = STEP_TOPICS[i] || [];
    if (topics.length) $('h3', sec).insertAdjacentHTML('afterend', `<div class="learn-links"><span>📖 Learn:</span>${topics.map(t =>
      `<a href="#learn/${t}">${esc(TOPIC_SHORT[t])}</a>`).join('')}</div>`);
  });
  form.addEventListener('click', e => { const g = e.target.closest('[data-goto]'); if (g) showStep(+g.dataset.goto); });
  $('#backBtn').addEventListener('click', () => showStep(step - 1));
  $('#saveNowBtn').addEventListener('click', save);

  // Sliders
  ALL_METRICS.forEach(m => {
    const input = $('#f_' + m.field);
    input.addEventListener('input', () => updateSlider(m));
    updateSlider(m);
  });

  // Chips
  $$('.chips', form).forEach(group => {
    const target = $('#f_' + group.dataset.chipsFor);
    const multi = group.dataset.multi === 'true';
    group.addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      const v = chip.dataset.value;
      if (multi) {
        const parts = target.value.split(',').map(s => s.trim()).filter(Boolean);
        const i = parts.indexOf(v);
        if (i >= 0) parts.splice(i, 1); else parts.push(v);
        target.value = parts.join(', ');
      } else {
        target.value = target.value === v ? '' : v;
      }
      target.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  form.addEventListener('input', e => {
    dirty = true;
    if (e.target.name) syncChips(e.target.name);
    if (e.target.name === 'main_ego') renderArchCard();
    if (e.target.name === 'partner_name' && e.target.value.trim()) { e.target.classList.remove('invalid'); $('#err_name').hidden = true; }
    if (e.target.name === 'person_type') { $('#typeGroup').classList.remove('invalid'); $('#err_type').hidden = true; }
    if (e.target.name === 'partner_name' || e.target.name === 'person_type') {
      updatePerspective();
    }
    updateProgress();
    saveDraft();
  });
  form.addEventListener('change', updateProgress);
  form.addEventListener('submit', e => { e.preventDefault(); if (step < LAST) showStep(step + 1); else save(); });
  $('#resetBtn').addEventListener('click', () => {
    if (dirty && !confirm('Clear everything you have entered in this form?')) return;
    resetForm();
  });
  $('#cancelEditBtn').addEventListener('click', () => { const id = editingId; resetForm(); go(id ? 'record/' + id : 'records'); });
}

function updateSlider(m) {
  const v = +$('#f_' + m.field).value;
  const b = bandIndex(v);
  $('#v_' + m.field).textContent = v;
  $('#d_' + m.field).innerHTML = `<strong>${BAND_LABELS[b]}:</strong> ${esc(m.scale[b])}`;
  $$(`#f_${m.field} ~ details .rating-item`).forEach(el => el.classList.toggle('current', +el.dataset.band === b));
}

function syncChips(name) {
  const target = $('#f_' + name); if (!target) return;
  const parts = target.value.split(',').map(s => s.trim().toLowerCase());
  $$(`.chips[data-chips-for="${name}"] .chip`).forEach(c => {
    const multi = c.parentElement.dataset.multi === 'true';
    const on = multi ? parts.includes(c.dataset.value.toLowerCase()) : target.value.trim().toLowerCase() === c.dataset.value.toLowerCase();
    c.setAttribute('aria-pressed', String(on));
  });
}

function renderArchCard() {
  const v = $('#f_main_ego').value.trim().toLowerCase();
  const a = ARCHETYPES.find(x => x.name.toLowerCase() === v);
  $('#archCard').innerHTML = a ? `<div class="arch-card"><h4>${esc(a.name)}</h4>
    <p><strong>Core drive:</strong> ${esc(a.drive)}</p><p><strong>In relationships:</strong> ${esc(a.rel)}</p>
    <p><strong>Shadow:</strong> ${esc(a.shadow)}</p><p><strong>Growth edge:</strong> ${esc(a.growth)}</p></div>` : '';
}

function updateProgress() { if ($('#stepper')) renderStepper(); }

// ---------- Wizard ----------
function validateBasics(show = true) {
  const name = $('#f_partner_name').value.trim();
  const type = ($('input[name=person_type]:checked') || {}).value;
  if (show) {
    $('#f_partner_name').classList.toggle('invalid', !name); $('#err_name').hidden = !!name;
    $('#typeGroup').classList.toggle('invalid', !type); $('#err_type').hidden = !!type;
  }
  return !!(name && type);
}

function stepStatus(i) {
  const sec = $(`#assessmentForm .form-section[data-step="${i}"]`);
  if (i === LAST || $('input[type=range]', sec)) return visited.has(i) && i !== step ? 'done' : '';
  const names = [...new Set($$('[name]', sec).map(e => e.name))];
  const d = getFormData();
  const filled = names.filter(n => String(d[n] || '').trim()).length;
  return filled === names.length ? 'done' : filled ? 'partial' : '';
}

function renderStepper() {
  $$('#stepper button').forEach((b, i) => {
    const st = stepStatus(i);
    b.dataset.status = st;
    b.classList.toggle('current', i === step);
    if (i === step) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    $('.num', b).textContent = st === 'done' && i !== step ? '✓' : i + 1;
    b.setAttribute('aria-label', `Step ${i + 1}: ${STEP_LABELS[i]}${st === 'done' ? ' (done)' : ''}`);
  });
  $('#progressText').textContent = `Step ${step + 1} of ${STEP_LABELS.length} · ${STEP_LABELS[step]}` +
    (dirty ? ' · draft saved on this device' : '');
}

function showStep(i, { focus = true } = {}) {
  i = Math.max(0, Math.min(LAST, i));
  step = i;
  visited.add(i);
  $$('#assessmentForm .form-section').forEach(sec => { sec.hidden = +sec.dataset.step !== step; });
  $('#backBtn').hidden = step === 0;
  $('#saveNowBtn').hidden = step === LAST;
  $('#nextBtn').textContent = step === LAST ? (editingId ? 'Update assessment ✓' : 'Save assessment ✓') : `Next: ${STEP_LABELS[step + 1]} →`;
  if (step === LAST) renderReview();
  renderStepper();
  const cur = $(`#stepper [data-goto="${step}"]`);
  if (cur) { const ol = $('#stepper'); ol.scrollLeft = cur.offsetLeft - ol.clientWidth / 2 + cur.clientWidth / 2; }
  saveDraft();
  if (focus) {
    $('#assess').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (step === 0 && !$('#f_partner_name').value) $('#f_partner_name').focus({ preventScroll: true });
    else $(`#assessmentForm .form-section[data-step="${step}"] h3`).focus({ preventScroll: true });
  }
}

function renderReview() {
  const d = getFormData();
  const avg = sec => (sec.metrics.reduce((t, [f]) => t + d[f], 0) / sec.metrics.length).toFixed(1);
  const rows = [
    [d.partner_name ? `${d.partner_name} · ${d.person_type || 'type not set'}` : 'Name not set'],
    [[d.main_ego, d.reactors && `${d.reactors.split(',').filter(x => x.trim()).length} reactor(s)`].filter(Boolean).join(' · ')],
    [[d.core_need, d.exiled_parts && 'exiled parts', d.core_unhealed && 'core wound'].filter(Boolean).join(' · ')],
    [[d.predominant_emotion, d.breakup_reason && 'breakup reason', d.trauma_regret && 'trauma/regret'].filter(Boolean).join(' · ')],
    [[d.dominant_centre, d.attachment_pattern].filter(Boolean).join(' · ')],
    ...SECTIONS.map(sec => [`average ${avg(sec)} / 10 · ${sec.metrics.map(([f, , short]) => `${short} ${d[f]}`).join(', ')}`]),
  ];
  $('#reviewSummary').innerHTML = (validateBasics(false) ? '' :
    `<div class="review-warn">To save, add a name and choose who you're assessing. <button type="button" class="link-btn" data-goto="0">Go to About →</button></div>`) +
    `<div class="review-list">${rows.map(([text], i) => {
    const st = stepStatus(i);
    return `<button type="button" class="review-item" data-goto="${i}">
      <span class="dot ${st || 'empty'}" aria-hidden="true">${st === 'done' ? '✓' : st === 'partial' ? '•' : ''}</span>
      <span class="review-label">${STEP_LABELS[i]}</span>
      <span class="review-text ${text ? '' : 'muted'}">${esc(text || 'Not filled in (optional)')}</span>
      <span class="review-edit" aria-hidden="true">Edit</span></button>`;
  }).join('')}</div>`;
}

function updatePerspective() {
  const name = $('#f_partner_name').value.trim();
  const type = ($('input[name=person_type]:checked') || {}).value;
  const hint = $('#perspectiveHint');
  hint.hidden = !type;
  if (type === 'Self') hint.textContent = '🙋 Answer about yourself. For the ratings, score yourself as you show up in this relationship.';
  if (type === 'Partner') hint.textContent = `💞 Answer about ${name || 'your partner'} as you experience them. For the ratings, score how they show up in the relationship.`;
  const sub = type === 'Self' ? `Rating ${name ? name + ' (you)' : 'yourself'}. Move the slider; the description updates as you go.`
    : type === 'Partner' ? `Rating ${name || 'your partner'}. Move the slider; the description updates as you go.` : '';
  $$('[data-sub]').forEach(el => { el.textContent = sub; });
  $('#assessTitle').textContent = name ? `${editingId ? 'Editing' : 'Assessing'}: ${name}` : 'Relationship Assessment';
}

// ---------- Drafts ----------
const DRAFT = 'rpm.draft.v1';
let draftTimer;
function readDraft() { try { const d = JSON.parse(localStorage.getItem(DRAFT) || 'null'); return d && d.data ? d : null; } catch { return null; } }
function saveDraft() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => {
    if (!dirty) return;
    try { localStorage.setItem(DRAFT, JSON.stringify({ data: getFormData(), editingId, step, at: Date.now() })); } catch {}
    renderStepper();
  }, 400);
}
function clearDraft() { clearTimeout(draftTimer); try { localStorage.removeItem(DRAFT); } catch {} }
function restoreDraft(d) {
  if (!d) return;
  setFormData(d.data);
  setEditing(d.editingId && byId(d.editingId) ? d.editingId : null);
  dirty = true;
  for (let i = 0; i <= (d.step || 0); i++) visited.add(i);
  updatePerspective();
  showStep(d.step || 0, { focus: false });
  if (location.hash.startsWith('#assess')) {
    toast(`Picked up where you left off${d.data.partner_name ? ' with ' + d.data.partner_name : ''}.`,
      { action: () => resetForm(), actionLabel: 'Start over', timeout: 7000 });
  }
}

// ---------- Guidance ----------
function nextStepCard(r) {
  const other = r.person_type === 'Self' ? 'Partner' : 'Self';
  const counterpart = records.find(x => x.person_type === other);
  const fresh = justSaved === r.id; justSaved = null;
  const lead = fresh ? '<span class="next-badge">Saved ✓</span>' : '';
  if (!counterpart) {
    return `<div class="next-card">${lead}<div><strong>Next step:</strong> ${other === 'Partner' ? 'assess your partner' : 'assess yourself'} so you can see how you compare.</div>
      <button class="btn btn-primary btn-small" data-act="new" data-type="${other}">${other === 'Partner' ? 'Assess partner' : 'Assess yourself'} →</button></div>`;
  }
  return `<div class="next-card">${lead}<div><strong>Ready to compare:</strong> ${esc(r.partner_name)} with ${esc(counterpart.partner_name)}${records.filter(x => x.person_type === other).length > 1 ? ' (you can switch people on the next screen)' : ''}.</div>
    <button class="btn btn-primary btn-small" data-act="compare" data-id="${esc(r.id)}">See compatibility →</button></div>`;
}

function sortRecords(list, how) {
  const l = [...list];
  if (how === 'name') return l.sort((a, b) => (a.partner_name || '').localeCompare(b.partner_name || ''));
  if (how === 'type') return l.sort((a, b) => (a.person_type === b.person_type ? 0 : a.person_type === 'Self' ? -1 : 1) || (b.updated_at || '').localeCompare(a.updated_at || ''));
  return l.sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''));
}

const IDEAS = [
  { text: 'There are no bad parts. Even the parts of you that rage, numb out or criticise are trying to protect you.', from: 'Richard Schwartz, Internal Family Systems', topic: 'ifs' },
  { text: '“Compatibility is an achievement of love; it must not be its precondition.”', from: 'Alain de Botton', topic: 'debotton' },
  { text: 'When something about your partner irritates you, ask: what strength is this the cost of?', from: 'After Alain de Botton', topic: 'debotton' },
  { text: 'Make the cycle the enemy, not each other.', from: 'After Sue Johnson, Emotionally Focused Therapy', topic: 'conflict' },
  { text: 'Most couple conflicts are never fully solved. The goal is a kind dialogue about them, not victory.', from: 'After John Gottman', topic: 'conflict' },
  { text: 'Love wants closeness; desire needs a little distance. A good relationship makes room for both.', from: 'After Esther Perel', topic: 'eros' },
  { text: 'Behind every complaint is an unmet need. Name the need, not the fault.', from: 'After Marshall Rosenberg, Nonviolent Communication', topic: 'needs' },
  { text: 'Attachment patterns are not a life sentence. Security can be earned.', from: 'Attachment research', topic: 'attachment' },
  { text: 'Speak for your part, not from it: “a part of me is scared” lands softer than “you always…”.', from: 'After Richard Schwartz', topic: 'ifs' },
  { text: 'Notice the saboteur, name it, and step into curiosity instead.', from: 'After Shirzad Chamine, Positive Intelligence', topic: 'saboteurs' },
];
const TOPIC_TEASERS = {
  ifs: 'Why every part of you, even the difficult ones, is trying to help.',
  attachment: 'How childhood bonds shape the way you reach for love.',
  archetypes: 'The roles you play, their gifts and their shadows.',
  conflict: 'The four habits that predict breakups, and their antidotes.',
  eros: 'Why safety and desire pull in opposite directions.',
  debotton: 'The trait you fell for is the one that drives you mad.',
};
const CENTRE_INFO = {
  Unity: ['✨ Unity: the Higher Self', 'The calm centre that can step back from the drama and see the relationship as a shared project. In the assessment it is the first rating group: Higher Self, Understanding, Compassion and Life Alignment.', 'ifs'],
};
let ideaIndex = Math.floor(Date.now() / 86400000) % IDEAS.length;

function renderIdea() {
  const i = IDEAS[ideaIndex];
  const t = LEARN.find(x => x.id === i.topic);
  $('#ideaCard').innerHTML = `<div class="idea-label">💡 An idea to sit with</div>
    <blockquote>${esc(i.text)}</blockquote>
    <div class="idea-foot"><span class="muted small">${esc(i.from)}</span>
      <span class="idea-actions"><a href="#learn/${i.topic}">Read about ${esc(TOPIC_SHORT[i.topic] || t.title)} →</a>
      <button type="button" class="btn btn-small btn-ghost" id="nextIdea">↻ Another idea</button></span></div>`;
}

function showCentre(name) {
  $$('.mandala .node').forEach(n => n.classList.toggle('active', n.dataset.centre === name));
  $('.mandala').classList.toggle('has-active', !!name);
  const box = $('#centreCaption');
  if (!name) {
    box.innerHTML = '<strong>Four centres, one relationship.</strong> Tap Mind, Heart, Body, Sacral, or the glowing centre, to see how each shapes the way you love.';
    return;
  }
  let title, desc, topic = 'centres';
  if (CENTRE_INFO[name]) [title, desc, topic] = CENTRE_INFO[name];
  else {
    const c = CENTRES.find(x => x[0] === name);
    const icon = { Mind: '🧠', Heart: '💗', Body: '🦶', Sacral: '🔥' }[name];
    title = `${icon} ${name}: ${c[1].toLowerCase()}`;
    desc = c[2];
  }
  box.innerHTML = `<strong>${esc(title)}</strong> ${esc(desc)} <a href="#learn/${topic}">Learn more →</a>`;
}

function renderHome() {
  const box = $('#homeActions'); if (!box) return;
  const draft = readDraft();
  const primary = draft
    ? `<a class="btn btn-primary btn-lg" href="#assess">Continue your assessment →<span class="btn-sub">Step ${(draft.step || 0) + 1} of ${STEP_LABELS.length}, saved on this device</span></a>`
    : `<button class="btn btn-primary btn-lg" type="button" data-act="new">Start an assessment →</button>`;
  const secondary = records.length >= 2
    ? `<a class="btn btn-secondary btn-lg" href="#compare">📊 View comparison</a>`
    : `<button class="btn btn-secondary btn-lg" type="button" data-act="sample">✨ Try a sample couple</button>`;
  box.innerHTML = primary + secondary + (draft ? `<button class="link-btn subtle" type="button" data-act="new">or start a new one</button>` : '');
  if (!$('#topicGrid').childElementCount) {
    $('#topicGrid').innerHTML = Object.entries(TOPIC_TEASERS).map(([id, teaser]) => {
      const t = LEARN.find(x => x.id === id);
      return `<a class="topic-card" href="#learn/${id}"><span class="topic-icon" aria-hidden="true">${t.icon}</span>
        <strong>${esc(TOPIC_SHORT[id])}</strong><span>${esc(teaser)}</span></a>`;
    }).join('') + `<a class="topic-card all" href="#learn"><strong>All 12 topics →</strong><span>IFS, saboteurs, wounds, needs, centres and sources.</span></a>`;
    renderIdea();
    showCentre(null);
  }
}

function getFormData() {
  const form = $('#assessmentForm');
  const d = {};
  TEXT_FIELDS.forEach(f => {
    if (f === 'person_type') d[f] = (form.querySelector('input[name=person_type]:checked') || {}).value || '';
    else d[f] = ($('#f_' + f)?.value || '').trim();
  });
  ALL_METRICS.forEach(m => { d[m.field] = clampRating($('#f_' + m.field).value); });
  return d;
}

function setFormData(r) {
  TEXT_FIELDS.forEach(f => {
    if (f === 'person_type') $$('input[name=person_type]').forEach(i => { i.checked = i.value === r.person_type; });
    else if ($('#f_' + f)) $('#f_' + f).value = r[f] || '';
  });
  ALL_METRICS.forEach(m => { $('#f_' + m.field).value = clampRating(r[m.field] ?? 5); updateSlider(m); });
  ['main_ego', 'reactors', 'core_need', 'predominant_emotion'].forEach(syncChips);
  renderArchCard();
  updatePerspective();
  updateProgress();
}

function resetForm() {
  clearDraft();
  $('#assessmentForm').reset();
  dirty = false;
  setFormData({});
  setEditing(null);
  visited.clear();
  $$('.invalid').forEach(e => e.classList.remove('invalid'));
  $$('.error-text').forEach(e => { e.hidden = true; });
  showStep(0, { focus: false });
}

function setEditing(id) {
  editingId = id;
  const r = id && byId(id);
  $('#editBanner').hidden = !r;
  if (r) $('#editName').textContent = r.partner_name || 'Unnamed';
  updatePerspective();
}

function startEdit(id) {
  const r = byId(id); if (!r) return;
  if (dirty && editingId !== id && !confirm('You have an unsaved assessment in progress. Discard it and edit this one?')) return;
  resetForm();
  setFormData(r);
  setEditing(id);
  STEP_LABELS.forEach((_, i) => visited.add(i));
  showStep(0, { focus: false });
  go('assess');
}

function startNew(type) {
  if (dirty && !confirm('You have an unsaved assessment in progress. Discard it and start a new one?')) { go('assess'); return; }
  resetForm();
  if (type) { const r = $(`input[name=person_type][value="${type}"]`); if (r) r.checked = true; updatePerspective(); }
  go('assess');
  setTimeout(() => $('#f_partner_name').focus(), 50);
}

function save() {
  const d = getFormData();
  if (!validateBasics()) { showStep(0); toast('Add a name and who you are assessing first.', { error: true }); return; }

  const now = new Date().toISOString();
  let id;
  if (editingId && byId(editingId)) {
    const i = records.findIndex(r => r.id === editingId);
    records[i] = sanitize({ ...records[i], ...d, id: editingId, updated_at: now });
    id = editingId;
    toast('Assessment updated.');
  } else {
    id = uid();
    records.unshift(sanitize({ ...d, id, created_at: now, updated_at: now }));
    toast('Assessment saved.');
  }
  persist();
  resetForm();
  justSaved = id;
  go('record/' + encodeURIComponent(id));
}

// ---------- Records list ----------
function renderRecords() {
  const q = $('#searchInput').value.trim().toLowerCase();
  const t = $('#typeFilter').value;
  const sort = $('#sortSelect').value;
  const items = sortRecords(records, sort).filter(r => (!t || r.person_type === t) &&
    (!q || [r.partner_name, r.main_ego, r.attachment_pattern, r.dominant_centre, r.core_need, r.predominant_emotion].join(' ').toLowerCase().includes(q)));
  const box = $('#recordsList');
  if (!records.length) {
    box.innerHTML = `<div class="empty-state"><div class="icon">📋</div><p>No assessments yet.</p>
      <p><a class="btn btn-primary" href="#assess">Start your first assessment</a></p></div>`;
    return;
  }
  if (!items.length) { box.innerHTML = '<div class="empty-state"><p>No assessments match your search.</p></div>'; return; }
  box.innerHTML = `<div class="record-grid">${items.map(r => `
    <article class="record-card" data-id="${esc(r.id)}">
      <h3>${esc(r.partner_name || 'Unnamed')} <span class="badge ${r.person_type === 'Self' ? 'self' : 'partner'}">${esc(r.person_type)}</span></h3>
      <dl class="record-meta">
        <dt>Archetype</dt><dd>${esc(r.main_ego || '—')}</dd>
        <dt>Attachment</dt><dd>${esc(r.attachment_pattern || '—')}</dd>
        <dt>Centre</dt><dd>${esc(r.dominant_centre || '—')}</dd>
        <dt>Overall</dt><dd>${r.total_compatibility}/10</dd>
        <dt>Updated</dt><dd>${esc(fmtDate(r.updated_at))}</dd>
      </dl>
      <div class="record-actions">
        <a class="btn btn-primary btn-small" href="#record/${encodeURIComponent(r.id)}">View</a>
        <button class="btn btn-secondary btn-small" data-act="edit" data-id="${esc(r.id)}">Edit</button>
        <button class="btn btn-secondary btn-small" data-act="compare" data-id="${esc(r.id)}">Compare</button>
        <button class="btn btn-secondary btn-small" data-act="delete" data-id="${esc(r.id)}" aria-label="Delete ${esc(r.partner_name)}">🗑️</button>
      </div>
    </article>`).join('')}</div>`;
}

function deleteRecord(id) {
  const i = records.findIndex(r => r.id === id); if (i < 0) return;
  const [removed] = records.splice(i, 1);
  if (editingId === id) resetForm();
  persist();
  toast(`Deleted ${removed.partner_name || 'assessment'}.`, { action: () => { records.splice(i, 0, removed); persist(); toast('Restored.'); }, actionLabel: 'Undo', timeout: 7000 });
}

function compareWith(id) {
  const r = byId(id); if (!r) return;
  const p = prefs();
  if (r.person_type === 'Self') prefs({ a: id, b: p.b && byId(p.b) && p.b !== id ? p.b : (records.find(x => x.person_type === 'Partner') || {}).id });
  else prefs({ b: id, a: p.a && byId(p.a) && p.a !== id ? p.a : (records.find(x => x.person_type === 'Self') || {}).id });
  go('compare');
}

function addSample() {
  const now = new Date().toISOString();
  const pair = SAMPLE_PAIR.map(s => sanitize({ ...s, id: uid(), created_at: now, updated_at: now }));
  records.unshift(...pair);
  persist();
  prefs({ a: pair[0].id, b: pair[1].id });
  toast('Sample couple added. Here is their comparison.');
  go('compare');
}

function exportData() {
  const blob = new Blob([JSON.stringify({ app: 'romantic-partner-matrix', version: 1, exported_at: new Date().toISOString(), assessments: records }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `partner-matrix-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(`Exported ${records.length} assessment${records.length === 1 ? '' : 's'}.`);
}

async function importData(file) {
  try {
    const json = JSON.parse(await file.text());
    const list = Array.isArray(json) ? json : json.assessments;
    if (!Array.isArray(list)) throw new Error('format');
    let added = 0, updated = 0;
    list.filter(x => x && typeof x === 'object').forEach(raw => {
      const r = sanitize(raw);
      const i = records.findIndex(x => x.id === r.id);
      if (i >= 0) { records[i] = r; updated++; } else { records.push(r); added++; }
    });
    persist();
    toast(`Imported: ${added} new, ${updated} updated.`);
  } catch {
    toast('That file isn\'t a valid backup.', { error: true });
  }
}

// ---------- Detail ----------
function renderDetail(id) {
  const box = $('#detail');
  const r = byId(id);
  if (!r) { box.innerHTML = '<p>Assessment not found.</p><a class="btn btn-secondary" href="#records">← Back to saved</a>'; return; }
  const field = (label, v) => `<div><div class="field-label">${label}</div><div class="field-value">${esc(v || '—')}</div></div>`;
  box.innerHTML = `
    <div class="report-actions no-print" style="margin:0 0 20px">
      <a class="btn btn-secondary btn-small" href="#records">← Back</a>
      <button class="btn btn-secondary btn-small" data-act="edit" data-id="${esc(r.id)}">✏️ Edit</button>
      <button class="btn btn-secondary btn-small" data-act="compare" data-id="${esc(r.id)}">📊 Compare</button>
      <button class="btn btn-secondary btn-small" data-act="print">🖨️ Print / PDF</button>
      <button class="btn btn-secondary btn-small" data-act="delete" data-id="${esc(r.id)}">🗑️ Delete</button>
    </div>
    <h2 class="card-title" style="font-size:30px">${esc(r.partner_name || 'Unnamed')} <span class="badge ${r.person_type === 'Self' ? 'self' : 'partner'}">${esc(r.person_type)}</span></h2>
    <p class="muted small">Created ${esc(fmtDate(r.created_at))}${r.updated_at !== r.created_at ? ' · updated ' + esc(fmtDate(r.updated_at)) : ''}</p>
    ${nextStepCard(r)}
    <div class="form-section"><h3>🎭 Ego, Centre &amp; Attachment</h3><div class="detail-grid">
      ${field('Main ego', r.main_ego)}${field('Attachment', r.attachment_pattern)}${field('Dominant centre', r.dominant_centre)}
      ${field('Predominant emotion', r.predominant_emotion)}${field('Core need', r.core_need)}${field('Reactors', r.reactors)}</div></div>
    <div class="form-section"><h3>💝 Wounds &amp; History</h3><div class="detail-grid">
      ${field('Exiled parts', r.exiled_parts)}${field('Core unhealed wound', r.core_unhealed)}
      ${field('Reason for breakup / trauma', r.breakup_reason)}${field('Trauma / regret', r.trauma_regret)}
      ${r.notes ? field('Notes', r.notes) : ''}</div></div>
    ${SECTIONS.map(s => `<div class="form-section"><h3>${s.icon} ${esc(s.title)}</h3><div class="mini-bars">
      ${s.metrics.map(([f, label]) => `<div class="mini-bar"><span>${esc(label.replace(/ \(.*\)/, ''))}</span>
        <div class="mini-track"><div class="mini-fill" style="width:${r[f] * 10}%"></div></div><strong>${r[f]}/10</strong></div>`).join('')}
    </div></div>`).join('')}`;
}

// ---------- Compare ----------
function fillSelects() {
  const opts = (sel, preferType) => {
    const groups = ['Self', 'Partner'].map(t => {
      const rs = records.filter(r => r.person_type === t);
      return rs.length ? `<optgroup label="${t}">${rs.map(r => `<option value="${esc(r.id)}">${esc(r.partner_name || 'Unnamed')}</option>`).join('')}</optgroup>` : '';
    }).join('');
    $(sel).innerHTML = `<option value="">Choose a person…</option>${groups}`;
  };
  opts('#aSelect'); opts('#bSelect');
  const p = prefs();
  const a = p.a && byId(p.a) ? p.a : (records.find(r => r.person_type === 'Self') || {}).id || '';
  const b = p.b && byId(p.b) ? p.b : (records.find(r => r.person_type === 'Partner' && r.id !== a) || {}).id || '';
  $('#aSelect').value = a; $('#bSelect').value = b;
}

function scoreRing(score, tone) {
  const r = 70, c = 2 * Math.PI * r, off = c * (1 - score / 100);
  return `<svg class="score-ring" viewBox="0 0 170 170" role="img" aria-label="Compatibility index ${score} out of 100">
    <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#667eea"/><stop offset="1" stop-color="#764ba2"/></linearGradient></defs>
    <circle cx="85" cy="85" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="14"/>
    <circle cx="85" cy="85" r="${r}" fill="none" stroke="url(#ringGrad)" stroke-width="14" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 85 85)"/>
    <text x="85" y="88" text-anchor="middle" font-size="42" font-weight="800" fill="#1f2937">${score}</text>
    <text x="85" y="112" text-anchor="middle" font-size="13" fill="#6b7280">out of 100</text></svg>`;
}

function radar(rows) {
  const n = rows.length, cx = 240, cy = 215, R = 150;
  const pt = (i, v) => { const ang = -Math.PI / 2 + (2 * Math.PI * i) / n; return [cx + Math.cos(ang) * R * v / 10, cy + Math.sin(ang) * R * v / 10]; };
  const rings = [2, 4, 6, 8, 10].map(v => `<polygon points="${rows.map((_, i) => pt(i, v).join(',')).join(' ')}" fill="${v === 10 ? '#f9fafb' : 'none'}" stroke="#e5e7eb"/>`).join('');
  const spokes = rows.map((_, i) => { const [x, y] = pt(i, 10); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e5e7eb"/>`; }).join('');
  const poly = (key, color) => `<polygon points="${rows.map((r, i) => pt(i, r[key]).join(',')).join(' ')}" fill="${color}" fill-opacity="0.18" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>` +
    rows.map((r, i) => { const [x, y] = pt(i, r[key]); return `<circle cx="${x}" cy="${y}" r="3.5" fill="${color}"><title>${esc(r.label)}: ${r[key]}</title></circle>`; }).join('');
  const labels = rows.map((r, i) => {
    const [x, y] = pt(i, 11.6);
    const anchor = Math.abs(x - cx) < 10 ? 'middle' : x > cx ? 'start' : 'end';
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${esc(r.short)}</text>`;
  }).join('');
  return `<svg class="radar" viewBox="-30 0 540 430" role="img" aria-label="Radar chart comparing both people across ${n} dimensions">
    ${rings}${spokes}${poly('a', '#3b82f6')}${poly('b', '#9d4edd')}${labels}</svg>`;
}

function renderCompare() {
  fillSelects();
  const out = $('#chartDisplay');
  const hint = $('#compareHint');
  if (records.length < 2) {
    hint.textContent = '';
    out.innerHTML = `<div class="empty-state"><div class="icon">📊</div><p>You need at least two assessments to compare, ideally one for yourself and one for your partner.</p>
      <p><a class="btn btn-primary" href="#assess">New assessment</a> <button class="btn btn-secondary" data-act="sample">Try a sample couple</button></p></div>`;
    return;
  }
  const a = byId($('#aSelect').value), b = byId($('#bSelect').value);
  if (!a || !b) { hint.textContent = 'Choose two people to see their comparison.'; out.innerHTML = ''; return; }
  if (a.id === b.id) { hint.textContent = 'Pick two different assessments.'; out.innerHTML = ''; return; }
  hint.textContent = a.person_type === b.person_type ? `Note: both are "${a.person_type}" assessments. That works, but Self vs Partner is the usual comparison.` : '';
  prefs({ a: a.id, b: b.id });

  const s = scorePair(a, b);
  const ins = interpret(a, b, s);
  const na = esc(a.partner_name || 'Person A'), nb = esc(b.partner_name || 'Person B');
  const profile = (r, cls) => `<div class="comparison-card ${cls}"><h4>${esc(r.partner_name || 'Unnamed')} <span class="badge ${cls}">${esc(r.person_type)}</span></h4><dl>
    <div><dt>Main ego</dt><dd>${esc(r.main_ego || '—')}</dd></div>
    <div><dt>Attachment</dt><dd>${esc(r.attachment_pattern || '—')}</dd></div>
    <div><dt>Dominant centre</dt><dd>${esc(r.dominant_centre || '—')}</dd></div>
    <div><dt>Core need</dt><dd>${esc(r.core_need || '—')}</dd></div>
    <div><dt>Predominant emotion</dt><dd>${esc(r.predominant_emotion || '—')}</dd></div>
    <div><dt>Under stress</dt><dd>${esc(r.reactors || '—')}</dd></div></dl></div>`;
  const li = (rows, fmt) => rows.length ? `<ul>${rows.map(fmt).join('')}</ul>` : '<p class="muted small">None stand out.</p>';

  out.innerHTML = `
    <div class="score-hero">
      ${scoreRing(s.overall)}
      <div>
        <h3>${na} &amp; ${nb}</h3>
        <span class="score-band tone-${s.band.tone}">${esc(s.band.label)}</span>
        <div class="score-parts"><span>Average rating <strong>${s.mean.toFixed(1)}/10</strong></span>
          <span>Perception agreement <strong>${s.agreement}%</strong></span>
          <span>Self-rated overall <strong>${a.total_compatibility} / ${b.total_compatibility}</strong></span></div>
      </div>
    </div>

    <nav class="jump-nav no-print" aria-label="Jump to section">
      <button data-jump="profiles">Profiles</button><button data-jump="dims">Dimensions</button>
      <button data-jump="numbers">Strengths &amp; gaps</button>${ins.patterns.length ? '<button data-jump="patterns">Patterns</button>' : ''}
      ${ins.prompts.length ? '<button data-jump="talk">Talk about it</button>' : ''}</nav>

    <div class="comparison-grid" id="cmp-profiles">${profile(a, 'self')}${profile(b, 'partner')}</div>

    <h4 class="section-title" id="cmp-dims">Dimensions</h4>
    <div class="legend"><span class="l-self">${na}</span><span class="l-partner">${nb}</span><span class="muted">Right column = difference (red when 3+)</span></div>
    <div class="chart-row">
      <div>${radar(s.rows)}</div>
      <div>${s.rows.map(r => `<div class="metric-row"><span class="metric-name">${esc(r.short)}</span>
        <div class="bars" title="${esc(r.label)}: ${r.a} vs ${r.b}"><div class="bar self"><i style="width:${r.a * 10}%"></i></div><div class="bar partner"><i style="width:${r.b * 10}%"></i></div></div>
        <span class="gap ${r.gap >= 3 ? 'big' : ''}">${r.diff > 0 ? '+' : ''}${r.diff}</span></div>`).join('')}</div>
    </div>

    <h4 class="section-title">Categories</h4>
    <div class="cat-grid">${s.categories.map(c => `<div class="cat-card"><div class="name">${c.icon} ${esc(c.name)}</div>
      <div class="bars"><div class="bar self"><i style="width:${c.a * 10}%"></i></div><div class="bar partner"><i style="width:${c.b * 10}%"></i></div></div>
      <div class="vals"><span>${na}: <strong>${c.a.toFixed(1)}</strong></span><span>${nb}: <strong>${c.b.toFixed(1)}</strong></span></div></div>`).join('')}</div>

    <h4 class="section-title" id="cmp-numbers">What the numbers say</h4>
    <div class="insight-grid">
      <div class="insight green"><h5>💪 Shared strengths <span class="muted small">(both 7+)</span></h5>${li(ins.strengths, r => `<li>${esc(r.label)}: ${r.a} / ${r.b}</li>`)}</div>
      <div class="insight amber"><h5>🌱 Growth areas <span class="muted small">(average ≤ 5.5)</span></h5>${li(ins.growth, r => `<li>${esc(r.label)}: avg ${r.avg.toFixed(1)}</li>`)}</div>
      <div class="insight red"><h5>↔️ Perception gaps <span class="muted small">(3+ points apart)</span></h5>${li(ins.gaps, r => `<li>${esc(r.label)}: ${r.a} vs ${r.b}</li>`)}</div>
    </div>

    ${ins.patterns.length ? `<h4 class="section-title" id="cmp-patterns">Pattern insights</h4>${ins.patterns.map(p => `<div class="pattern"><h5>${esc(p.title)}</h5>
      ${p.body ? `<p>${esc(p.body)}</p>` : ''}
      ${p.strength ? `<p><strong>Strength:</strong> ${esc(p.strength)}</p>` : ''}
      ${p.challenge ? `<p><strong>Challenge:</strong> ${esc(p.challenge)}</p>` : ''}
      ${p.rec ? `<p><strong>Try:</strong> ${esc(p.rec)}</p>` : ''}</div>`).join('')}` : ''}

    ${ins.prompts.length ? `<h4 class="section-title" id="cmp-talk">Conversation starters</h4>
      <p class="muted small">Based on your lowest-rated areas and biggest gaps. Take turns answering; listen to understand, not to reply.</p>
      <ol class="prompts">${ins.prompts.map(q => `<li>${esc(q)}</li>`).join('')}</ol>` : ''}

    <p class="method">How the index is calculated: 80% from the average of all ${CHART_METRICS.length} ratings across both people, 20% from how closely the two sets of ratings agree. "Total Compatibility" is shown separately as each person's own overall impression.</p>
    <div class="report-actions"><button class="btn btn-primary" data-act="print">🖨️ Print / save as PDF</button></div>`;
}

// ---------- Learn ----------
const TOPIC_SHORT = { overview: 'Overview', ifs: 'No Bad Parts (IFS)', saboteurs: 'Saboteurs', conflict: 'Four Horsemen', archetypes: 'Archetypes',
  attachment: 'Attachment', wounds: 'Core wounds', needs: 'Needs', centres: 'Centres', eros: 'Eros & safety', debotton: 'Strengths → weaknesses', sources: 'Sources' };
const STEP_TOPICS = { 1: ['ifs', 'archetypes', 'saboteurs', 'conflict'], 2: ['needs', 'wounds', 'ifs'], 3: ['wounds'], 4: ['attachment', 'centres'],
  5: ['ifs', 'debotton'], 6: ['conflict'], 7: ['attachment', 'needs'], 8: ['eros'], 9: ['debotton'] };

function renderLearn() {
  $('#learnToc').innerHTML = LEARN.map(t => `<a href="#learn/${t.id}" data-topic="${t.id}">${t.icon} ${esc(TOPIC_SHORT[t.id] || t.title)}</a>`).join('');
  $('#learnBody').innerHTML = LEARN.map(t => `
    <article class="learn-topic" id="learn-${t.id}">
      <h3><span aria-hidden="true">${t.icon}</span> ${esc(t.title)}</h3>
      <p class="learn-lead">${esc(t.lead)}</p>
      <div class="learn-body">${t.body}</div>
      ${t.app ? `<div class="learn-app"><div><strong>In the app:</strong> ${esc(t.app)}</div>
        ${t.step !== undefined ? `<button type="button" class="btn btn-small btn-primary" data-act="goto-step" data-step="${t.step}">Go to this step →</button>` : ''}</div>` : ''}
      ${t.reflect ? `<div class="learn-reflect"><strong>Reflect together</strong><ul>${t.reflect.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div>` : ''}
      <a class="back-top" href="#learn">↑ Topics</a>
    </article>`).join('');
}

// ---------- Global wiring ----------
function refreshAll() {
  $('#recordCount').textContent = records.length || '';
  renderRecords();
  renderHome();
  const hash = location.hash.slice(1);
  if (hash.startsWith('compare')) renderCompare();
  if (hash.startsWith('record/')) renderDetail(decodeURIComponent(hash.split('/')[1]));
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-act]'); if (!btn) return;
  const { act, id } = btn.dataset;
  if (act === 'edit') startEdit(id);
  else if (act === 'compare') compareWith(id);
  else if (act === 'delete') { deleteRecord(id); if (location.hash.startsWith('#record/')) go('records'); }
  else if (act === 'print') window.print();
  else if (act === 'sample') addSample();
  else if (act === 'new') startNew(btn.dataset.type);
  else if (act === 'goto-step') { go('assess'); showStep(+btn.dataset.step, { focus: false }); }
});
document.addEventListener('click', e => {
  const j = e.target.closest('[data-jump]');
  if (j) { const t = $('#cmp-' + j.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});

function init() {
  load();
  renderGuide();
  renderLearn();
  const pendingDraft = readDraft();
  buildForm();
  resetForm();
  restoreDraft(pendingDraft);
  if (pendingDraft) saveDraft();
  $('#searchInput').addEventListener('input', renderRecords);
  $('#typeFilter').addEventListener('change', renderRecords);
  $('#sortSelect').value = prefs().sort || 'updated';
  $('#sortSelect').addEventListener('change', () => { prefs({ sort: $('#sortSelect').value }); renderRecords(); });
  $('#recordsList').addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    const card = e.target.closest('.record-card'); if (card) go('record/' + encodeURIComponent(card.dataset.id));
  });
  $('#sampleBtn').addEventListener('click', addSample);
  $('#home').addEventListener('click', e => {
    if (e.target.closest('#nextIdea')) { ideaIndex = (ideaIndex + 1) % IDEAS.length; renderIdea(); return; }
    const n = e.target.closest('.mandala .node');
    if (n) showCentre(n.classList.contains('active') ? null : n.dataset.centre);
  });
  $('#home').addEventListener('keydown', e => {
    const n = e.target.closest('.mandala .node');
    if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); showCentre(n.classList.contains('active') ? null : n.dataset.centre); }
  });
  $('#exportBtn').addEventListener('click', exportData);
  $('#importInput').addEventListener('change', e => { const f = e.target.files[0]; if (f) importData(f); e.target.value = ''; });
  $('#clearAllBtn').addEventListener('click', () => {
    if (!records.length) return;
    if (confirm(`Permanently delete all ${records.length} assessments from this browser? Export a backup first if you might want them.`)) { records = []; persist(); toast('All assessments deleted.'); }
  });
  const onPick = () => { prefs({ a: $('#aSelect').value, b: $('#bSelect').value }); renderCompare(); };
  $('#aSelect').addEventListener('change', onPick);
  $('#bSelect').addEventListener('change', onPick);
  $('#swapBtn').addEventListener('click', () => { const a = $('#aSelect').value; $('#aSelect').value = $('#bSelect').value; $('#bSelect').value = a; prefs({ a: $('#aSelect').value, b: $('#bSelect').value }); renderCompare(); });
  window.addEventListener('hashchange', route);
  refreshAll();
  route();
  if (!storageOk) toast('This browser is blocking storage, so assessments won\'t be kept after you close the page.', { error: true, timeout: 8000 });
}
init();
