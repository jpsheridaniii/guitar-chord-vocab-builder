// Guitar Chord Vocabulary Builder — app logic

const STORAGE_KEY = 'chord-progress-v2';

// ── State ──────────────────────────────────────────────────────────────────

const state = {
  screen: 'setup',          // setup | drill | complete
  deck: [],                 // current session card queue
  index: 0,
  revealed: false,
  showNotes: false,          // toggle note names on diagrams
  selectedCategories: [],   // empty = all
  useBeginnerPath: false,
  progress: {},             // { chordName: { gotIt, total, streak, lastSeen } }
  session: { gotIt: 0, total: 0 },
};

// ── Storage ──────────────────────────────────────────────────────────────────

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function recordResult(chordName, grade) {
  const p = state.progress[chordName] || { gotIt: 0, total: 0, streak: 0, lastSeen: null };
  p.total += 1;
  state.session.total += 1;
  if (grade === 'gotit') {
    p.gotIt += 1;
    p.streak += 1;
    state.session.gotIt += 1;
  } else {
    p.streak = 0;
  }
  p.lastSeen = Date.now();
  state.progress[chordName] = p;
  saveProgress();
}

function masteryLevel(chordName) {
  const p = state.progress[chordName];
  if (!p || p.total === 0) return 'new';
  const rate = p.gotIt / p.total;
  if (p.streak >= 3) return 'mastered';
  if (rate >= 0.7) return 'familiar';
  if (p.total > 0) return 'learning';
  return 'new';
}

// ── Deck building ─────────────────────────────────────────────────────────────

function buildDeck() {
  let pool = CHORDS;
  if (state.selectedCategories.length > 0)
    pool = pool.filter(c => state.selectedCategories.includes(c.category));

  if (state.useBeginnerPath) {
    pool = [...pool].sort((a, b) => (a.beginnerOrder || 99) - (b.beginnerOrder || 99));
  } else {
    pool = [...pool].sort(() => Math.random() - 0.5);
  }

  // Leitner: track each card with a box
  state.deck = pool.map(chord => ({ chord, box: 1 }));
  state.index = 0;
  state.revealed = false;
  state.session = { gotIt: 0, total: 0 };
}

function currentCard() { return state.deck[state.index] || null; }

function advanceCard(grade) {
  const card = currentCard();
  if (!card) return;
  recordResult(card.chord.name, grade);

  // Leitner routing
  if (grade === 'gotit') {
    card.box = 3; // done this session
    state.deck.splice(state.index, 1); // remove from queue
  } else if (grade === 'getting') {
    card.box = 2;
    const insertAt = Math.min(state.deck.length, state.index + 5);
    state.deck.splice(state.index, 1);
    state.deck.splice(insertAt, 0, card);
  } else {
    card.box = 1;
    const insertAt = Math.min(state.deck.length, state.index + 2);
    state.deck.splice(state.index, 1);
    state.deck.splice(insertAt, 0, card);
  }

  if (state.deck.length === 0) {
    state.screen = 'complete';
  }
  state.revealed = false;
  render();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function render() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + state.screen)?.classList.add('active');
  if (state.screen === 'setup')    renderSetup();
  else if (state.screen === 'drill')    renderDrill();
  else if (state.screen === 'complete') renderComplete();
}

// ── Setup screen ──────────────────────────────────────────────────────────────

function renderSetup() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (state.selectedCategories.includes(key) ? ' selected' : '');
    btn.style.setProperty('--cat-color', cat.color);

    // Mastery summary for this category
    const catChords = CHORDS.filter(c => c.category === key);
    const mastered = catChords.filter(c => masteryLevel(c.name) === 'mastered').length;

    btn.innerHTML = `<span class="cat-label">${cat.label}</span><span class="cat-count">${mastered}/${catChords.length}</span>`;
    btn.addEventListener('click', () => {
      const idx = state.selectedCategories.indexOf(key);
      if (idx === -1) state.selectedCategories.push(key);
      else state.selectedCategories.splice(idx, 1);
      btn.classList.toggle('selected');
    });
    grid.appendChild(btn);
  });

  updateProgressSummary();

  // Path toggle state
  document.getElementById('path-beginner')?.classList.toggle('active', state.useBeginnerPath);
  document.getElementById('path-shuffle')?.classList.toggle('active', !state.useBeginnerPath);
}

function updateProgressSummary() {
  const el = document.getElementById('progress-summary');
  if (!el) return;

  const all = CHORDS;
  const studied = all.filter(c => (state.progress[c.name]?.total || 0) > 0);
  const mastered = all.filter(c => masteryLevel(c.name) === 'mastered');
  const familiar = all.filter(c => masteryLevel(c.name) === 'familiar');

  if (studied.length === 0) {
    el.innerHTML = `<strong>Welcome!</strong> You haven't drilled any chords yet — start with the Beginner Path to learn chords in the most useful order.`;
    return;
  }

  el.innerHTML = `
    <span class="stat-pill mastered">${mastered.length} mastered</span>
    <span class="stat-pill familiar">${familiar.length} familiar</span>
    <span class="stat-pill learning">${studied.length - mastered.length - familiar.length} learning</span>
    <span class="stat-pill total">of ${all.length} chords</span>
  `;
}

// ── Drill screen ──────────────────────────────────────────────────────────────

function renderDrill() {
  const card = currentCard();
  if (!card) { state.screen = 'complete'; render(); return; }
  const chord = card.chord;
  const cat = CATEGORIES[chord.category];
  const color = cat?.color || '#2563eb';

  // Progress bar
  const done = state.session.total;
  const total = done + state.deck.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${done} done · ${state.deck.length} left`;

  // Chord name + category
  document.getElementById('chord-name').textContent = chord.name;
  const badge = document.getElementById('chord-category');
  badge.textContent = cat?.label || chord.category;
  badge.style.background = color + '18';
  badge.style.color = color;

  // Mastery badge
  const level = masteryLevel(chord.name);
  const masteryBadge = document.getElementById('mastery-badge');
  const masteryLabels = { new: 'New', learning: 'Learning', familiar: 'Familiar', mastered: '★ Mastered' };
  masteryBadge.textContent = masteryLabels[level];
  masteryBadge.className = 'mastery-badge level-' + level;

  // Note toggle button
  document.getElementById('btn-notes-toggle').textContent = state.showNotes ? 'Show fingers' : 'Show notes';

  // Diagram + theory strip
  const diagramArea = document.getElementById('diagram-area');
  const theoryStrip = document.getElementById('theory-strip');
  const revealSection = document.getElementById('reveal-section');
  const answerSection = document.getElementById('answer-section');

  const toolbar = document.getElementById('diagram-toolbar');

  if (state.revealed) {
    diagramArea.innerHTML = '';
    diagramArea.appendChild(renderChordCard(chord, color, state.showNotes));
    diagramArea.classList.add('visible');
    toolbar.classList.add('visible');
    renderTheoryStrip(chord, color);
    theoryStrip.classList.add('visible');
    revealSection.classList.add('hidden');
    answerSection.classList.remove('hidden');
  } else {
    diagramArea.innerHTML = '';
    diagramArea.classList.remove('visible');
    toolbar.classList.remove('visible');
    theoryStrip.classList.remove('visible');
    theoryStrip.innerHTML = '';
    revealSection.classList.remove('hidden');
    answerSection.classList.add('hidden');
  }
}

function renderTheoryStrip(chord, color) {
  const el = document.getElementById('theory-strip');

  // Notes
  const notesBadges = chord.notes.map(n =>
    `<span class="note-badge" style="background:${color}18;color:${color};border-color:${color}40">${n}</span>`
  ).join('');

  // Key context
  let keyHtml = '';
  if (chord.keyContext && chord.keyContext.length > 0) {
    const pills = chord.keyContext.map(k =>
      `<span class="key-pill"><strong>${k.roman}</strong> in ${k.key}</span>`
    ).join('');
    keyHtml = `<div class="theory-row"><span class="theory-label">Found in</span>${pills}</div>`;
  } else {
    keyHtml = `<div class="theory-row"><span class="theory-label">Key context</span><span class="key-pill neutral">Works in any key — no 3rd, no major/minor quality</span></div>`;
  }

  // CAGED shape
  const cagedHtml = chord.cagedShape
    ? `<span class="theory-label">Shape</span><span class="caged-pill">${chord.cagedShape}</span>`
    : '';

  el.innerHTML = `
    <div class="theory-row notes-row">
      <span class="theory-label">Notes</span>
      <div class="notes-list">${notesBadges}</div>
    </div>
    <div class="theory-row formula-row">
      <span class="theory-label">Formula</span>
      <span class="formula-text">${chord.formula}</span>
    </div>
    ${keyHtml}
    <div class="theory-row shape-row">${cagedHtml}</div>
    <div class="tip-row">
      <span class="tip-icon">💡</span>
      <p class="tip-text">${chord.tip}</p>
    </div>
  `;

  // Glossary links: wrap any known term in the tip
  el.querySelectorAll('.tip-text').forEach(el => {
    GLOSSARY.forEach(({ term }) => {
      el.innerHTML = el.innerHTML.replace(
        new RegExp(`\\b(${escapeRegex(term)})\\b`, 'i'),
        `<button class="gloss-link" data-term="${term}">$1</button>`
      );
    });
  });
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── Complete screen ───────────────────────────────────────────────────────────

function renderComplete() {
  const { gotIt, total } = state.session;
  const pct = total > 0 ? Math.round((gotIt / total) * 100) : 0;
  document.getElementById('complete-total').textContent = total;
  document.getElementById('complete-gotit').textContent = gotIt;
  document.getElementById('complete-pct').textContent = pct + '%';

  // Mastery breakdown
  const mastered = CHORDS.filter(c => masteryLevel(c.name) === 'mastered').length;
  document.getElementById('complete-mastered').textContent = mastered + ' / ' + CHORDS.length + ' chords mastered overall';
}

// ── Actions ───────────────────────────────────────────────────────────────────

function startSession() {
  buildDeck();
  if (state.deck.length === 0) { alert('No chords match the selected categories.'); return; }
  state.screen = 'drill';
  render();
}

function revealDiagram() {
  state.revealed = true;
  render();
}

function toggleNotes() {
  state.showNotes = !state.showNotes;
  if (state.revealed) renderDrill();
}

function goSetup() { state.screen = 'setup'; render(); }

function goHome() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-home')?.classList.add('active');
  updateHomeProgress();
}

function updateHomeProgress() {
  const el = document.getElementById('home-progress');
  if (!el) return;
  const total = CHORDS.length;
  const mastered = CHORDS.filter(c => masteryLevel(c.name) === 'mastered').length;
  const nrStudied = Object.values(nrState?.progress || {}).filter(p => p.total > 0).length;
  const nrTotal = STAFF_NOTES.length;

  el.innerHTML = `
    <div class="home-stat"><span class="hs-val">${mastered}/${total}</span><span class="hs-lbl">chords mastered</span></div>
    <div class="home-stat"><span class="hs-val">${nrStudied}/${nrTotal}</span><span class="hs-lbl">notes studied</span></div>
  `;
}

function resetProgress() {
  if (!confirm('Reset all your practice history? This cannot be undone.')) return;
  state.progress = {};
  saveProgress();
  renderSetup();
}

// ── Glossary panel ────────────────────────────────────────────────────────────

function showGlossary() {
  document.getElementById('glossary-panel').classList.add('open');
  document.getElementById('glossary-overlay').classList.add('open');
}

function hideGlossary() {
  document.getElementById('glossary-panel').classList.remove('open');
  document.getElementById('glossary-overlay').classList.remove('open');
}

function openGlossaryTerm(term) {
  const entry = GLOSSARY.find(g => g.term.toLowerCase() === term.toLowerCase());
  if (!entry) { showGlossary(); return; }

  const panel = document.getElementById('glossary-panel');
  panel.classList.add('open');

  // Scroll to term
  const items = panel.querySelectorAll('.gloss-item');
  items.forEach(item => {
    item.classList.remove('highlight');
    if (item.dataset.term === entry.term) {
      item.classList.add('highlight');
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
}

function buildGlossaryPanel() {
  const list = document.getElementById('glossary-list');
  if (!list) return;
  list.innerHTML = '';
  GLOSSARY.forEach(({ term, def }) => {
    const item = document.createElement('div');
    item.className = 'gloss-item';
    item.dataset.term = term;
    item.innerHTML = `<div class="gloss-term">${term}</div><div class="gloss-def">${def}</div>`;
    list.appendChild(item);
  });
}

// ── Keyboard ──────────────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (document.getElementById('glossary-panel')?.classList.contains('open')) {
    if (e.key === 'Escape') hideGlossary();
    return;
  }
  if (state.screen !== 'drill') return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!state.revealed) revealDiagram(); }
  if (state.revealed) {
    if (e.key === '1') advanceCard('gotit');
    if (e.key === '2') advanceCard('getting');
    if (e.key === '3') advanceCard('stilll');
    if (e.key === 'n') toggleNotes();
  }
});

// ── Event delegation for glossary links ──────────────────────────────────────

document.addEventListener('click', e => {
  if (e.target.classList.contains('gloss-link')) {
    openGlossaryTerm(e.target.dataset.term);
  }
});

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  state.progress = loadProgress();
  buildGlossaryPanel();
  initNoteReading();
  updateHomeProgress();

  // The app starts on screen-home (set active in HTML)
  // Chord drill state starts at 'setup' but we don't render it until navigated

  // Home navigation
  document.getElementById('go-note-reading')?.addEventListener('click', () => {
    nrState.screen = 'home';
    nrRender();
  });
  document.getElementById('go-chord-drill')?.addEventListener('click', () => {
    state.progress = loadProgress();
    state.screen = 'setup';
    render();
  });

  // Chord drill wiring
  document.getElementById('btn-start')?.addEventListener('click', startSession);
  document.getElementById('btn-reveal')?.addEventListener('click', revealDiagram);
  document.getElementById('btn-gotit')?.addEventListener('click', () => advanceCard('gotit'));
  document.getElementById('btn-getting')?.addEventListener('click', () => advanceCard('getting'));
  document.getElementById('btn-stilll')?.addEventListener('click', () => advanceCard('stilll'));
  document.getElementById('btn-back')?.addEventListener('click', goSetup);
  document.getElementById('btn-again')?.addEventListener('click', () => { state.screen = 'setup'; render(); });
  document.getElementById('btn-complete-home')?.addEventListener('click', goHome);
  document.getElementById('btn-reset-progress')?.addEventListener('click', resetProgress);
  document.getElementById('btn-notes-toggle')?.addEventListener('click', toggleNotes);
  document.getElementById('chord-drill-home')?.addEventListener('click', goHome);

  // Glossary
  document.getElementById('btn-glossary')?.addEventListener('click', showGlossary);
  document.getElementById('glossary-close')?.addEventListener('click', hideGlossary);
  document.getElementById('glossary-overlay')?.addEventListener('click', hideGlossary);

  // Chord drill path toggle
  document.getElementById('path-beginner')?.addEventListener('click', () => {
    state.useBeginnerPath = true;
    document.getElementById('path-beginner').classList.add('active');
    document.getElementById('path-shuffle').classList.remove('active');
  });
  document.getElementById('path-shuffle')?.addEventListener('click', () => {
    state.useBeginnerPath = false;
    document.getElementById('path-shuffle').classList.add('active');
    document.getElementById('path-beginner').classList.remove('active');
  });
});
