// Note Reading — lessons, state, and drill logic

const NR_KEY = 'note-reading-v1';

// ── Lessons ───────────────────────────────────────────────────────────────────
// Each lesson is a self-contained teaching moment. User reads, sees examples,
// then answers 3 practice questions before the level unlocks for free drill.

const LESSONS = [
  {
    id: 'what-is-staff',
    title: 'The Staff',
    subtitle: 'Where music lives on paper',
    drillLevel: null, // intro lesson — no drill unlock
    steps: [
      {
        type: 'text',
        heading: 'Music is written on a staff',
        body: 'A staff is just 5 horizontal lines. Every note in a piece of music is a dot placed on or between those lines. The higher the dot, the higher the pitch.'
      },
      {
        type: 'staff-blank',
        heading: 'This is a treble clef staff',
        body: 'Guitar music is written in the treble clef. The symbol on the left (𝄞) is the treble clef — it marks which notes the lines represent. Every guitar method book, lead sheet, and piece of sheet music uses this.'
      },
      {
        type: 'text',
        heading: 'Lines and spaces',
        body: 'Notes sit either ON a line (the line goes through the middle of the note head), or IN a space (floating between two lines). We\'ll learn the lines first, then the spaces.'
      },
    ]
  },

  {
    id: 'lines',
    title: 'The 5 Lines',
    subtitle: 'Every Good Boy Does Fine',
    drillLevel: 1,
    steps: [
      {
        type: 'text',
        heading: 'Five lines, five notes',
        body: 'Each line represents a specific note. Reading from the BOTTOM line to the TOP line: E · G · B · D · F. Memorize the saying: <strong>E</strong>very <strong>G</strong>ood <strong>B</strong>oy <strong>D</strong>oes <strong>F</strong>ine.'
      },
      {
        type: 'staff-lines',
        heading: 'The 5 line notes',
        body: 'Hover or tap each note to see its name. Notice that G and B are open guitar strings — these are your anchor notes on the fretboard.',
        noteIds: ['E4','G4','B4','D5','F5'],
        labels: ['E','G','B','D','F'],
        mnemonic: 'Every Good Boy Does Fine'
      },
      {
        type: 'text',
        heading: 'Guitar connection',
        body: 'Two of the five line notes are open strings you already know: <strong>G4</strong> is your 3rd string open, <strong>B4</strong> is your 2nd string open. When you see these on the staff, you can play them without fretting.'
      },
    ],
    quiz: {
      noteIds: ['E4','G4','B4','D5','F5'],
      required: 5, // must get 5 correct to pass
    }
  },

  {
    id: 'spaces',
    title: 'The 4 Spaces',
    subtitle: 'FACE',
    drillLevel: 2,
    steps: [
      {
        type: 'text',
        heading: 'The spaces spell FACE',
        body: 'Between the 5 lines are 4 spaces. From the BOTTOM space to the TOP space: F · A · C · E. They literally spell the word FACE — easy to remember.'
      },
      {
        type: 'staff-spaces',
        heading: 'The 4 space notes',
        body: 'Tap each note to see its name. Notice: E5 (the top space) is your 1st string open (high e). Another anchor!',
        noteIds: ['F4','A4','C5','E5'],
        labels: ['F','A','C','E'],
        mnemonic: 'FACE'
      },
      {
        type: 'text',
        heading: 'Quick check',
        body: 'Lines (bottom→top): E G B D F — "<strong>E</strong>very <strong>G</strong>ood <strong>B</strong>oy <strong>D</strong>oes <strong>F</strong>ine." Spaces (bottom→top): F A C E — "FACE". Together that\'s all 9 notes in the staff: E F G A B C D E F.'
      },
    ],
    quiz: {
      noteIds: ['F4','A4','C5','E5'],
      required: 4,
    }
  },

  {
    id: 'open-strings',
    title: 'Open Strings on the Staff',
    subtitle: 'Your anchor points',
    drillLevel: null,
    steps: [
      {
        type: 'text',
        heading: 'Four open strings in the staff',
        body: 'Your four thinnest strings are all written within or just around the treble clef staff. These are your anchor points — notes you can play without fretting anything.'
      },
      {
        type: 'staff-open-strings',
        heading: 'Open strings on the staff',
        body: 'Your 4th, 3rd, 2nd, and 1st strings (D, G, B, and e) all land on the staff. Tap each to see where it falls.',
        noteIds: ['D4','G4','B4','E5'],
        labels: ['D string\nopen','G string\nopen','B string\nopen','e string\nopen'],
      },
      {
        type: 'text',
        heading: 'Why this matters for sight-reading',
        body: 'When you sight-read, you scan for open string notes first — they\'re landmarks. D4 (space below staff), G4 (2nd line), B4 (middle line), and E5 (4th space) are four reference points you never have to think about twice.'
      },
    ]
  },

  {
    id: 'full-staff',
    title: 'Full Staff',
    subtitle: 'Lines + spaces together',
    drillLevel: 3,
    steps: [
      {
        type: 'text',
        heading: 'Putting it all together',
        body: 'All 9 notes in the staff (no ledger lines yet): E · F · G · A · B · C · D · E · F. Notice it\'s just the musical alphabet — A B C D E F G — repeating. Every time you go up one step, you move to the next letter.'
      },
      {
        type: 'staff-all',
        heading: 'All 9 staff notes',
        body: 'Tap any note to see its name. Try to name each one before tapping.',
        noteIds: ['E4','F4','G4','A4','B4','C5','D5','E5','F5'],
      },
      {
        type: 'text',
        heading: 'Speed tip',
        body: 'Don\'t count from the bottom every time. Use your anchor notes: G4 (2nd line) and B4 (middle line) split the staff into thirds. If a note is between them, it\'s A4. If it\'s just above B4, it\'s C5. Work outward from anchors, not always from the bottom.'
      },
    ],
    quiz: {
      noteIds: ['E4','F4','G4','A4','B4','C5','D5','E5','F5'],
      required: 9,
    }
  },

  {
    id: 'middle-c',
    title: 'Middle C & Below',
    subtitle: 'The ledger line below the staff',
    drillLevel: 4,
    steps: [
      {
        type: 'text',
        heading: 'Notes can go below the staff too',
        body: 'When a note is too low for the staff, it gets its own short line called a <strong>ledger line</strong>. The most important one is Middle C — the first note below the staff in guitar music.'
      },
      {
        type: 'staff-ledger-below',
        heading: 'Middle C and notes below the staff',
        body: 'C4 sits on a ledger line just below E4 (the bottom line). D4 floats in the space between them. Tap each to confirm.',
        noteIds: ['C4','D4','E4'],
      },
      {
        type: 'text',
        heading: 'D string connection',
        body: 'D4 (the space just below the staff) is your open D string — your 4th string. In Melodic Rhythms, you\'ll play a lot of notes in this area. Watch for D4 (open D), E4 (D string fret 2), F4 (D string fret 3).'
      },
    ],
    quiz: {
      noteIds: ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5'],
      required: 8,
    }
  },

  {
    id: 'full-range',
    title: 'Full First-Position Range',
    subtitle: 'A3 through A5',
    drillLevel: 5,
    steps: [
      {
        type: 'text',
        heading: 'The A string and beyond',
        body: 'Below Middle C there\'s another important note: A3. This sits on a second ledger line below the staff, and it\'s your open A string (5th string). Below that (not covered here yet) is your low E string.'
      },
      {
        type: 'staff-full',
        heading: 'Complete first-position range',
        body: 'From A3 (open A string) up to A5 (high e, fret 5). This is the full range you\'ll see in the first chapters of Melodic Rhythms.',
        noteIds: ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5'],
      },
      {
        type: 'text',
        heading: 'You\'re ready to start sight-reading',
        body: 'Once you can name any of these notes instantly (under 2 seconds), you have the note-recognition foundation to work through Melodic Rhythms. Rhythm reading is the other half — we\'ll add that soon.'
      },
    ],
    quiz: {
      noteIds: ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5'],
      required: 10,
    }
  },
];

// ── Note Reading State ────────────────────────────────────────────────────────

const nrState = {
  screen: 'home',           // home | lesson | lesson-quiz | drill | drill-complete
  lessonId: null,
  lessonStep: 0,
  quizNotes: [],
  quizIndex: 0,
  quizCorrect: 0,
  quizAnswered: false,
  drillLevel: 1,
  drillQueue: [],
  drillIndex: 0,
  drillAnswered: false,
  drillCorrect: 0,
  drillTotal: 0,
  currentNoteId: null,
  progress: {},             // { noteId: { correct, total, streak } }
  unlockedLevels: new Set([1]),
};

function nrLoadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(NR_KEY)) || {};
    nrState.progress = saved.progress || {};
    nrState.unlockedLevels = new Set(saved.unlockedLevels || [1]);
  } catch { /* use defaults */ }
}

function nrSaveProgress() {
  localStorage.setItem(NR_KEY, JSON.stringify({
    progress: nrState.progress,
    unlockedLevels: [...nrState.unlockedLevels],
  }));
}

function nrRecord(noteId, correct) {
  const p = nrState.progress[noteId] || { correct: 0, total: 0, streak: 0 };
  p.total += 1;
  if (correct) { p.correct += 1; p.streak += 1; }
  else p.streak = 0;
  nrState.progress[noteId] = p;
  nrSaveProgress();
}

function nrAccuracy(noteId) {
  const p = nrState.progress[noteId];
  if (!p || p.total === 0) return null;
  return Math.round((p.correct / p.total) * 100);
}

function nrUnlockLevel(levelId) {
  nrState.unlockedLevels.add(levelId);
  nrSaveProgress();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function nrRender() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const s = document.getElementById('screen-note-reading');
  if (s) s.classList.add('active');

  const container = document.getElementById('nr-content');
  if (!container) return;
  container.innerHTML = '';

  if (nrState.screen === 'home')          nrRenderHome(container);
  else if (nrState.screen === 'lesson')   nrRenderLesson(container);
  else if (nrState.screen === 'lesson-quiz') nrRenderQuiz(container);
  else if (nrState.screen === 'drill')    nrRenderDrill(container);
  else if (nrState.screen === 'drill-complete') nrRenderDrillComplete(container);
}

// ── Home: lesson list ─────────────────────────────────────────────────────────

function nrRenderHome(container) {
  const h = document.createElement('div');
  h.innerHTML = `
    <div class="nr-topbar">
      <button class="nr-back-link" id="nr-to-main">← Back to main menu</button>
    </div>
    <div class="nr-hero">
      <h2 class="nr-title">Note Reading</h2>
      <p class="nr-subtitle">Learn to read treble clef — the first skill you need to sight-read <em>Melodic Rhythms for Guitar</em>.</p>
    </div>
    <div class="nr-section-label">LESSONS</div>
    <div class="nr-lesson-list" id="nr-lesson-list"></div>
    <div class="nr-section-label" style="margin-top:28px">PRACTICE DRILLS</div>
    <div class="nr-level-grid" id="nr-level-grid"></div>
  `;
  container.appendChild(h);

  // Build lesson list
  const list = container.querySelector('#nr-lesson-list');
  LESSONS.forEach(lesson => {
    const lessonLevels = LESSONS.filter(l => l.drillLevel).map(l => l.drillLevel);
    const unlocked = true; // all lessons accessible (no hard gates for beginners)
    const completed = lesson.quiz
      ? (nrState.unlockedLevels.has(lesson.drillLevel) && lesson.drillLevel > 1)
      : false;

    const row = document.createElement('button');
    row.className = 'nr-lesson-row' + (completed ? ' completed' : '');
    row.dataset.lessonId = lesson.id;
    row.innerHTML = `
      <div class="nr-lesson-icon">${completed ? '✓' : '📖'}</div>
      <div class="nr-lesson-info">
        <div class="nr-lesson-title">${lesson.title}</div>
        <div class="nr-lesson-sub">${lesson.subtitle}</div>
      </div>
      <div class="nr-lesson-arrow">›</div>
    `;
    row.addEventListener('click', () => nrStartLesson(lesson.id));
    list.appendChild(row);
  });

  // Build drill level grid
  const grid = container.querySelector('#nr-level-grid');
  NOTE_LEVELS.forEach(level => {
    const unlocked = nrState.unlockedLevels.has(level.id);
    const noteStats = level.ids.map(id => nrState.progress[id]);
    const mastered = level.ids.filter(id => (nrState.progress[id]?.streak || 0) >= 3).length;

    const card = document.createElement('button');
    card.className = 'nr-level-card' + (unlocked ? '' : ' locked');
    card.style.setProperty('--lv-color', level.color);
    card.innerHTML = `
      <div class="nr-lv-name">${level.name}</div>
      <div class="nr-lv-notes">${level.ids.length} notes</div>
      ${unlocked
        ? `<div class="nr-lv-mastered">${mastered}/${level.ids.length} mastered</div>`
        : `<div class="nr-lv-locked">🔒 Complete lesson first</div>`}
    `;
    if (unlocked) card.addEventListener('click', () => nrStartDrill(level.id));
    grid.appendChild(card);
  });

  container.querySelector('#nr-to-main')?.addEventListener('click', () => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-home')?.classList.add('active');
  });
}

// ── Lesson rendering ──────────────────────────────────────────────────────────

function nrStartLesson(lessonId) {
  nrState.lessonId = lessonId;
  nrState.lessonStep = 0;
  nrState.screen = 'lesson';
  nrRender();
}

function nrRenderLesson(container) {
  const lesson = LESSONS.find(l => l.id === nrState.lessonId);
  if (!lesson) return;

  const step = lesson.steps[nrState.lessonStep];
  const isLast = nrState.lessonStep === lesson.steps.length - 1;
  const total = lesson.steps.length;
  const current = nrState.lessonStep + 1;

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="nr-topbar">
      <button class="nr-back-link" id="nr-lesson-back">← Lessons</button>
      <span class="nr-step-count">${current} / ${total}</span>
    </div>
    <div class="nr-lesson-progress-bar">
      <div class="nr-lesson-progress-fill" style="width:${(current/total)*100}%"></div>
    </div>
    <div class="nr-lesson-body" id="nr-lesson-body"></div>
    <div class="nr-lesson-nav">
      <button class="btn-primary nr-next-btn" id="nr-step-next">
        ${isLast && lesson.quiz ? 'Take the quiz →' : isLast ? 'Done ✓' : 'Next →'}
      </button>
    </div>
  `;
  container.appendChild(wrap);

  // Render step content
  const body = wrap.querySelector('#nr-lesson-body');
  nrRenderStep(step, body, lesson);

  wrap.querySelector('#nr-lesson-back')?.addEventListener('click', () => {
    nrState.screen = 'home';
    nrRender();
  });

  wrap.querySelector('#nr-step-next')?.addEventListener('click', () => {
    if (isLast) {
      if (lesson.quiz) {
        nrStartQuiz(lesson);
      } else {
        nrState.screen = 'home';
        nrRender();
      }
    } else {
      nrState.lessonStep++;
      nrRender();
    }
  });
}

function nrRenderStep(step, container, lesson) {
  if (step.type === 'text') {
    container.innerHTML = `
      <h3 class="nr-step-heading">${step.heading}</h3>
      <p class="nr-step-body">${step.body}</p>
    `;
    return;
  }

  if (step.type === 'staff-blank') {
    container.innerHTML = `<h3 class="nr-step-heading">${step.heading}</h3><p class="nr-step-body">${step.body}</p>`;
    const staffWrap = document.createElement('div');
    staffWrap.className = 'nr-staff-wrap';
    staffWrap.appendChild(renderStaff(null, 'idle'));
    container.appendChild(staffWrap);
    return;
  }

  // Interactive step types — show labelled notes
  const noteIds = step.noteIds || [];
  container.innerHTML = `<h3 class="nr-step-heading">${step.heading}</h3><p class="nr-step-body">${step.body}</p>`;

  if (step.mnemonic) {
    const m = document.createElement('div');
    m.className = 'nr-mnemonic';
    m.textContent = step.mnemonic;
    container.appendChild(m);
  }

  // Show each note in a row
  const row = document.createElement('div');
  row.className = 'nr-demo-row';
  noteIds.forEach((id, i) => {
    const note = STAFF_NOTE_BY_ID[id];
    const card = document.createElement('div');
    card.className = 'nr-demo-card';

    const staffEl = renderStaff(id, 'correct');
    staffEl.style.opacity = '0.9';
    card.appendChild(staffEl);

    const label = document.createElement('div');
    label.className = 'nr-demo-label';
    label.innerHTML = `<strong>${note.name}${id.slice(1)}</strong>`;
    if (STAFF_NOTE_DESC[id]) {
      const desc = document.createElement('div');
      desc.className = 'nr-demo-desc';
      desc.textContent = STAFF_NOTE_DESC[id];
      card.appendChild(desc);
    }
    card.appendChild(label);

    // Guitar position
    const pos = GUITAR_NOTE_POSITIONS[id];
    if (pos && pos[0]) {
      const gp = document.createElement('div');
      gp.className = 'nr-demo-guitar' + (OPEN_STRINGS[id] ? ' open-string' : '');
      gp.textContent = pos[0].label;
      card.appendChild(gp);
    }

    row.appendChild(card);
  });
  container.appendChild(row);
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

function nrStartQuiz(lesson) {
  // Shuffle quiz notes, repeat as needed to hit `required`
  const pool = [...lesson.quiz.noteIds].sort(() => Math.random() - 0.5);
  nrState.quizNotes = pool;
  nrState.quizIndex = 0;
  nrState.quizCorrect = 0;
  nrState.quizAnswered = false;
  nrState.screen = 'lesson-quiz';
  nrRender();
}

function nrRenderQuiz(container) {
  const lesson = LESSONS.find(l => l.id === nrState.lessonId);
  const noteId = nrState.quizNotes[nrState.quizIndex];
  const note = STAFF_NOTE_BY_ID[noteId];
  const answered = nrState.quizAnswered;
  const isCorrect = answered ? (nrState._lastQuizAnswer === note.name) : null;
  const done = nrState.quizIndex >= nrState.quizNotes.length;
  const pct = Math.round((nrState.quizIndex / nrState.quizNotes.length) * 100);

  if (done) {
    const passed = nrState.quizCorrect >= (lesson?.quiz?.required || 3);
    if (passed && lesson?.drillLevel) nrUnlockLevel(lesson.drillLevel);
    container.innerHTML = `
      <div class="nr-quiz-result">
        <div class="nr-result-icon">${passed ? '🎉' : '📚'}</div>
        <div class="nr-result-title">${passed ? 'Quiz passed!' : 'Keep practicing'}</div>
        <div class="nr-result-score">${nrState.quizCorrect} / ${nrState.quizNotes.length} correct</div>
        <p class="nr-result-msg">${passed
          ? (lesson?.drillLevel ? `Level ${lesson.drillLevel} drill unlocked!` : 'Great work!')
          : 'Review the lesson and try again — no rush.'}</p>
        <div class="nr-result-actions">
          <button class="btn-primary" id="nr-quiz-done">Back to lessons</button>
          ${!passed ? `<button class="btn-ghost" id="nr-quiz-retry">Retry quiz</button>` : ''}
        </div>
      </div>
    `;
    container.querySelector('#nr-quiz-done')?.addEventListener('click', () => {
      nrState.screen = 'home';
      nrRender();
    });
    container.querySelector('#nr-quiz-retry')?.addEventListener('click', () => nrStartQuiz(lesson));
    return;
  }

  const answerState = answered ? (isCorrect ? 'correct' : 'wrong') : 'idle';
  const positions = GUITAR_NOTE_POSITIONS[noteId] || [];

  container.innerHTML = `
    <div class="nr-topbar">
      <button class="nr-back-link" id="nr-quiz-abort">← Exit quiz</button>
      <span class="nr-step-count">Quiz · ${nrState.quizIndex + 1} / ${nrState.quizNotes.length}</span>
    </div>
    <div class="nr-lesson-progress-bar">
      <div class="nr-lesson-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="nr-staff-wrap" id="nr-quiz-staff"></div>
    <div class="nr-quiz-prompt">${answered ? '' : 'What note is this?'}</div>
    ${answered ? `
      <div class="nr-answer-feedback ${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? `✓ Correct — <strong>${note.name}${noteId.slice(1)}</strong>` : `✗ That's <strong>${note.name}${noteId.slice(1)}</strong>`}
      </div>
      <div class="nr-staff-desc">${STAFF_NOTE_DESC[noteId] || ''}</div>
      <div class="nr-guitar-positions">
        ${positions.map(p => `<div class="nr-pos-pill ${p.label.includes('anchor') ? 'anchor' : ''}">${p.label}</div>`).join('')}
      </div>
      <button class="btn-primary nr-next-btn" id="nr-quiz-next">Next →</button>
    ` : `
      <div class="nr-note-btns" id="nr-note-btns"></div>
    `}
  `;

  container.querySelector('#nr-quiz-abort')?.addEventListener('click', () => {
    nrState.screen = 'home';
    nrRender();
  });

  // Staff SVG
  const staffWrap = container.querySelector('#nr-quiz-staff');
  if (staffWrap) staffWrap.appendChild(renderStaff(noteId, answerState));

  // Answer buttons
  const btns = container.querySelector('#nr-note-btns');
  if (btns) {
    ['A','B','C','D','E','F','G'].forEach(letter => {
      const b = document.createElement('button');
      b.className = 'nr-note-btn';
      b.textContent = letter;
      b.addEventListener('click', () => nrHandleQuizAnswer(letter));
      btns.appendChild(b);
    });
  }

  container.querySelector('#nr-quiz-next')?.addEventListener('click', () => {
    nrState.quizIndex++;
    nrState.quizAnswered = false;
    nrRender();
  });
}

function nrHandleQuizAnswer(letter) {
  const noteId = nrState.quizNotes[nrState.quizIndex];
  const note = STAFF_NOTE_BY_ID[noteId];
  const correct = letter === note.name;
  nrState._lastQuizAnswer = letter;
  nrState.quizAnswered = true;
  if (correct) nrState.quizCorrect++;
  nrRecord(noteId, correct);
  nrRender();
}

// ── Free Drill ────────────────────────────────────────────────────────────────

function nrStartDrill(levelId) {
  const level = NOTE_LEVELS.find(l => l.id === levelId);
  if (!level) return;

  const shuffled = [...level.ids].sort(() => Math.random() - 0.5);
  nrState.drillLevel = levelId;
  nrState.drillQueue = shuffled;
  nrState.drillIndex = 0;
  nrState.drillAnswered = false;
  nrState.drillCorrect = 0;
  nrState.drillTotal = 0;
  nrState.screen = 'drill';
  nrRender();
}

function nrRenderDrill(container) {
  const level = NOTE_LEVELS.find(l => l.id === nrState.drillLevel);
  const noteId = nrState.drillQueue[nrState.drillIndex];
  const note = STAFF_NOTE_BY_ID[noteId];
  const answered = nrState.drillAnswered;
  const pct = Math.round((nrState.drillIndex / nrState.drillQueue.length) * 100);

  if (nrState.drillIndex >= nrState.drillQueue.length) {
    nrState.screen = 'drill-complete';
    nrRender();
    return;
  }

  const isCorrect = answered ? (nrState._lastDrillAnswer === note.name) : null;
  const answerState = answered ? (isCorrect ? 'correct' : 'wrong') : 'idle';
  const positions = GUITAR_NOTE_POSITIONS[noteId] || [];
  const acc = nrAccuracy(noteId);

  container.innerHTML = `
    <div class="nr-topbar">
      <button class="nr-back-link" id="nr-drill-back">← Levels</button>
      <span class="nr-step-count">${level?.name} · ${nrState.drillIndex + 1}/${nrState.drillQueue.length}</span>
    </div>
    <div class="nr-lesson-progress-bar">
      <div class="nr-lesson-progress-fill" style="width:${pct}%; background:${level?.color || '#2563eb'}"></div>
    </div>
    <div class="nr-staff-wrap" id="nr-drill-staff"></div>
    ${level?.mnemonic ? `<div class="nr-mnemonic-hint" id="nr-mnemonic" style="display:none">${level.mnemonic}</div>` : ''}
    <div class="nr-quiz-prompt">${answered ? '' : 'Name this note'}</div>
    ${acc !== null ? `<div class="nr-note-history">Your history: ${acc}% correct</div>` : ''}
    ${answered ? `
      <div class="nr-answer-feedback ${isCorrect ? 'correct' : 'wrong'}">
        ${isCorrect ? `✓ <strong>${note.name}${noteId.slice(1)}</strong>` : `✗ That's <strong>${note.name}${noteId.slice(1)}</strong>`}
      </div>
      <div class="nr-staff-desc">${STAFF_NOTE_DESC[noteId] || ''}</div>
      <div class="nr-guitar-positions">
        ${positions.map(p => `<div class="nr-pos-pill ${p.label.includes('anchor') ? 'anchor' : ''}">${p.label}</div>`).join('')}
      </div>
      <button class="btn-primary nr-next-btn" id="nr-drill-next">Next →</button>
    ` : `
      <div class="nr-note-btns" id="nr-note-btns"></div>
      ${level?.mnemonic ? `<button class="nr-hint-btn" id="nr-hint-btn">Show mnemonic</button>` : ''}
    `}
  `;

  const staffWrap = container.querySelector('#nr-drill-staff');
  if (staffWrap) staffWrap.appendChild(renderStaff(noteId, answerState));

  const btns = container.querySelector('#nr-note-btns');
  if (btns) {
    ['A','B','C','D','E','F','G'].forEach(letter => {
      const b = document.createElement('button');
      b.className = 'nr-note-btn';
      b.textContent = letter;
      b.addEventListener('click', () => nrHandleDrillAnswer(letter));
      btns.appendChild(b);
    });
  }

  container.querySelector('#nr-drill-next')?.addEventListener('click', () => {
    nrState.drillIndex++;
    nrState.drillAnswered = false;
    nrRender();
  });

  container.querySelector('#nr-drill-back')?.addEventListener('click', () => {
    nrState.screen = 'home';
    nrRender();
  });

  container.querySelector('#nr-hint-btn')?.addEventListener('click', () => {
    const m = container.querySelector('#nr-mnemonic');
    if (m) m.style.display = 'block';
  });

  // Keyboard
  nrState._drillKeyHandler = (e) => {
    if (answered) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nrState.drillIndex++;
        nrState.drillAnswered = false;
        nrRender();
      }
    } else {
      const map = { a:'A', b:'B', c:'C', d:'D', e:'E', f:'F', g:'G' };
      const letter = map[e.key.toLowerCase()];
      if (letter) nrHandleDrillAnswer(letter);
    }
  };
  document.addEventListener('keydown', nrState._drillKeyHandler, { once: false });
}

function nrHandleDrillAnswer(letter) {
  const noteId = nrState.drillQueue[nrState.drillIndex];
  const note = STAFF_NOTE_BY_ID[noteId];
  const correct = letter === note.name;
  nrState._lastDrillAnswer = letter;
  nrState.drillAnswered = true;
  nrState.drillTotal++;
  if (correct) nrState.drillCorrect++;
  nrRecord(noteId, correct);

  // Leitner: if wrong, re-insert later in queue
  if (!correct) {
    const insertAt = Math.min(nrState.drillQueue.length, nrState.drillIndex + 3);
    nrState.drillQueue.splice(insertAt, 0, noteId);
  }

  nrRender();
}

function nrRenderDrillComplete(container) {
  const { drillCorrect, drillTotal, drillLevel } = nrState;
  const pct = drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : 0;
  const level = NOTE_LEVELS.find(l => l.id === drillLevel);

  container.innerHTML = `
    <div class="nr-quiz-result">
      <div class="nr-result-icon">🎵</div>
      <div class="nr-result-title">Drill complete!</div>
      <div class="nr-result-score">${drillCorrect} / ${drillTotal} correct (${pct}%)</div>
      <p class="nr-result-msg">${pct >= 80
        ? 'Great accuracy. Keep drilling until every note is instant — under 2 seconds per answer.'
        : 'Keep going. The goal is instant recognition — no counting from the bottom every time.'}</p>
      <div class="nr-result-actions">
        <button class="btn-primary" id="nr-drill-again">Drill again</button>
        <button class="btn-ghost" id="nr-drill-home">Back to lessons</button>
      </div>
    </div>
  `;

  container.querySelector('#nr-drill-again')?.addEventListener('click', () => nrStartDrill(drillLevel));
  container.querySelector('#nr-drill-home')?.addEventListener('click', () => {
    nrState.screen = 'home';
    nrRender();
  });
}

// ── Boot (called from app.js) ─────────────────────────────────────────────────

function initNoteReading() {
  nrLoadProgress();
}
