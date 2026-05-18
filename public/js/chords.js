// Chord database with theory data
// frets: index 0 = low E string, index 5 = high e string
// fret values: -1 = muted, 0 = open, 1+ = absolute fret number

const CHORDS = [

  // ── Open Major ───────────────────────────────────────────────────────────

  {
    name: 'E Major', symbol: 'E', category: 'open-major',
    root: 'E', notes: ['E','G#','B'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'E shape',
    keyContext: [
      { key: 'E major', roman: 'I', role: 'home chord' },
      { key: 'A major', roman: 'V', role: 'tension chord' },
      { key: 'B major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'The low E and high e strings both ring open at the same note — that\'s why E major sounds so full and powerful. All 6 strings are used.',
    beginnerOrder: 3,
    positions: [
      { label: 'Open E', frets: [0,2,2,1,0,0], fingers: [0,2,3,1,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'A Major', symbol: 'A', category: 'open-major',
    root: 'A', notes: ['A','C#','E'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'A shape',
    keyContext: [
      { key: 'A major', roman: 'I', role: 'home chord' },
      { key: 'D major', roman: 'V', role: 'tension chord' },
      { key: 'E major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'Three fingers squeeze onto the same fret. Try barring strings 2–4 with one finger — it\'s the same sound and often easier.',
    beginnerOrder: 7,
    positions: [
      { label: 'Open A (3-finger)', frets: [-1,0,2,2,2,0], fingers: [0,0,2,3,4,0], baseFret: 1, barre: null },
      { label: 'Open A (barre 2nd)', frets: [-1,0,2,2,2,0], fingers: [0,0,1,1,1,0], baseFret: 1, barre: { fret: 2, fromString: 1, toString: 3 } }
    ]
  },

  {
    name: 'D Major', symbol: 'D', category: 'open-major',
    root: 'D', notes: ['D','F#','A'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'D shape',
    keyContext: [
      { key: 'D major', roman: 'I', role: 'home chord' },
      { key: 'G major', roman: 'V', role: 'tension chord' },
      { key: 'A major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'Only the top 4 strings are used — the low E and A strings are muted. The three fingers form a compact triangle shape.',
    beginnerOrder: 6,
    positions: [
      { label: 'Open D', frets: [-1,-1,0,2,3,2], fingers: [0,0,0,1,3,2], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'G Major', symbol: 'G', category: 'open-major',
    root: 'G', notes: ['G','B','D'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'G shape',
    keyContext: [
      { key: 'G major', roman: 'I', role: 'home chord' },
      { key: 'C major', roman: 'V', role: 'tension chord' },
      { key: 'D major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'Five of the six strings ring — including three open strings. That\'s why G major sounds so loud and full. One of the most used chords in pop and rock.',
    beginnerOrder: 4,
    positions: [
      { label: 'Open G (3-finger)', frets: [3,2,0,0,0,3], fingers: [2,1,0,0,0,3], baseFret: 1, barre: null },
      { label: 'Open G (4-finger)', frets: [3,2,0,0,3,3], fingers: [2,1,0,0,3,4], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'C Major', symbol: 'C', category: 'open-major',
    root: 'C', notes: ['C','E','G'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'C shape',
    keyContext: [
      { key: 'C major', roman: 'I', role: 'home chord' },
      { key: 'F major', roman: 'V', role: 'tension chord' },
      { key: 'G major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'C, E, and G are the notes in every C major chord on any instrument. Notice how each finger lands on a different string — the shape fans out diagonally.',
    beginnerOrder: 5,
    positions: [
      { label: 'Open C', frets: [-1,3,2,0,1,0], fingers: [0,3,2,0,1,0], baseFret: 1, barre: null }
    ]
  },

  // ── Open Minor ───────────────────────────────────────────────────────────

  {
    name: 'E Minor', symbol: 'Em', category: 'open-minor',
    root: 'E', notes: ['E','G','B'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Em shape',
    keyContext: [
      { key: 'E minor', roman: 'i', role: 'home chord' },
      { key: 'G major', roman: 'vi', role: 'relative minor' },
      { key: 'D major', roman: 'ii', role: 'stepping stone' },
    ],
    tip: 'Only two fingers needed — and all 6 strings ring. Em is in almost every beginner song. The G (minor 3rd) is what makes it sound sad instead of bright like E major.',
    beginnerOrder: 1,
    positions: [
      { label: 'Open Em', frets: [0,2,2,0,0,0], fingers: [0,2,3,0,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'A Minor', symbol: 'Am', category: 'open-minor',
    root: 'A', notes: ['A','C','E'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Am shape',
    keyContext: [
      { key: 'A minor', roman: 'i', role: 'home chord' },
      { key: 'C major', roman: 'vi', role: 'relative minor' },
      { key: 'G major', roman: 'ii', role: 'stepping stone' },
    ],
    tip: 'Am and C major share two notes (C and E) — that\'s why switching between them sounds so smooth. Notice the C is a minor 3rd, not a major 3rd like C# in A major.',
    beginnerOrder: 2,
    positions: [
      { label: 'Open Am', frets: [-1,0,2,2,1,0], fingers: [0,0,2,3,1,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'D Minor', symbol: 'Dm', category: 'open-minor',
    root: 'D', notes: ['D','F','A'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Dm shape',
    keyContext: [
      { key: 'D minor', roman: 'i', role: 'home chord' },
      { key: 'C major', roman: 'ii', role: 'stepping stone' },
      { key: 'A minor', roman: 'iv', role: 'subdominant minor' },
    ],
    tip: 'D major vs D minor: only one note changes — F# becomes F (one fret lower). That single half-step turns a bright chord into a sad one.',
    beginnerOrder: 8,
    positions: [
      { label: 'Open Dm', frets: [-1,-1,0,2,3,1], fingers: [0,0,0,2,3,1], baseFret: 1, barre: null }
    ]
  },

  // ── Barre Major ──────────────────────────────────────────────────────────

  {
    name: 'F Major', symbol: 'F', category: 'barre-major',
    root: 'F', notes: ['F','A','C'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'E shape (barre fret 1)',
    keyContext: [
      { key: 'F major', roman: 'I', role: 'home chord' },
      { key: 'C major', roman: 'IV', role: 'lift chord' },
      { key: 'Bb major', roman: 'V', role: 'tension chord' },
    ],
    tip: 'This is the E major shape moved up one fret, with your index finger acting as a new nut. The barre chord most beginners tackle first — it unlocks every major chord on the low strings.',
    beginnerOrder: 11,
    positions: [
      { label: 'F Barre (E shape)', frets: [1,1,2,3,3,1], fingers: [1,1,2,3,4,1], baseFret: 1, barre: { fret: 1, fromString: 0, toString: 5 } }
    ]
  },

  {
    name: 'Bb Major', symbol: 'Bb', category: 'barre-major',
    root: 'Bb', notes: ['Bb','D','F'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'A shape (barre fret 1)',
    keyContext: [
      { key: 'Bb major', roman: 'I', role: 'home chord' },
      { key: 'F major', roman: 'IV', role: 'lift chord' },
      { key: 'Eb major', roman: 'V', role: 'tension chord' },
    ],
    tip: 'The A major shape moved to fret 1. Very common in pop, R&B, and jazz. Bb is one fret below B major — the same shape, just slid down.',
    beginnerOrder: 14,
    positions: [
      { label: 'Bb Barre (A shape)', frets: [-1,1,3,3,3,1], fingers: [0,1,2,3,4,1], baseFret: 1, barre: { fret: 1, fromString: 1, toString: 5 } }
    ]
  },

  {
    name: 'B Major', symbol: 'B', category: 'barre-major',
    root: 'B', notes: ['B','D#','F#'],
    formula: 'Root + Major 3rd + Perfect 5th',
    cagedShape: 'A shape (barre fret 2)',
    keyContext: [
      { key: 'B major', roman: 'I', role: 'home chord' },
      { key: 'E major', roman: 'V', role: 'tension chord' },
      { key: 'F# major', roman: 'IV', role: 'lift chord' },
    ],
    tip: 'The A major shape at fret 2. Once you learn this fingering, slide it up or down to play any major chord — that\'s the power of barre chords.',
    beginnerOrder: 13,
    positions: [
      { label: 'B Barre (A shape)', frets: [-1,2,4,4,4,2], fingers: [0,1,2,3,4,1], baseFret: 2, barre: { fret: 2, fromString: 1, toString: 5 } }
    ]
  },

  // ── Barre Minor ──────────────────────────────────────────────────────────

  {
    name: 'F Minor', symbol: 'Fm', category: 'barre-minor',
    root: 'F', notes: ['F','Ab','C'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Em shape (barre fret 1)',
    keyContext: [
      { key: 'F minor', roman: 'i', role: 'home chord' },
      { key: 'Ab major', roman: 'vi', role: 'relative minor' },
      { key: 'C minor', roman: 'iv', role: 'subdominant' },
    ],
    tip: 'The Em shape moved to fret 1. Minor barre chords have the same darkness as open minor chords — but now you can move that feeling to any key.',
    beginnerOrder: 15,
    positions: [
      { label: 'Fm Barre (Em shape)', frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 1, barre: { fret: 1, fromString: 0, toString: 5 } }
    ]
  },

  {
    name: 'B Minor', symbol: 'Bm', category: 'barre-minor',
    root: 'B', notes: ['B','D','F#'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Am shape (barre fret 2)',
    keyContext: [
      { key: 'B minor', roman: 'i', role: 'home chord' },
      { key: 'D major', roman: 'vi', role: 'relative minor' },
      { key: 'A major', roman: 'ii', role: 'stepping stone' },
    ],
    tip: 'The Am shape at fret 2. Bm is extremely common in songs in D major or A major — you\'ll run into this chord constantly.',
    beginnerOrder: 12,
    positions: [
      { label: 'Bm Barre (Am shape)', frets: [-1,2,4,4,3,2], fingers: [0,1,3,4,2,1], baseFret: 2, barre: { fret: 2, fromString: 1, toString: 5 } }
    ]
  },

  {
    name: 'G Minor', symbol: 'Gm', category: 'barre-minor',
    root: 'G', notes: ['G','Bb','D'],
    formula: 'Root + Minor 3rd + Perfect 5th',
    cagedShape: 'Em shape (barre fret 3)',
    keyContext: [
      { key: 'G minor', roman: 'i', role: 'home chord' },
      { key: 'Bb major', roman: 'vi', role: 'relative minor' },
      { key: 'F major', roman: 'ii', role: 'stepping stone' },
    ],
    tip: 'Gm is the "sad version" of open G — same root note, but the Bb (minor 3rd) instead of B makes it sound dark instead of bright.',
    beginnerOrder: 16,
    positions: [
      { label: 'Gm Barre (Em shape)', frets: [3,5,5,3,3,3], fingers: [1,3,4,1,1,1], baseFret: 3, barre: { fret: 3, fromString: 0, toString: 5 } }
    ]
  },

  // ── Dominant 7th ─────────────────────────────────────────────────────────

  {
    name: 'G7', symbol: 'G7', category: 'dominant-7th',
    root: 'G', notes: ['G','B','D','F'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'G shape',
    keyContext: [
      { key: 'C major', roman: 'V7', role: 'strong tension → resolves to C' },
    ],
    tip: 'Play G7 then C major and listen to how it "snaps" home. The F note creates tension — it wants to resolve up to E in the C chord. This movement is the engine of Western music.',
    beginnerOrder: 9,
    positions: [
      { label: 'Open G7', frets: [3,2,0,0,0,1], fingers: [3,2,0,0,0,1], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'D7', symbol: 'D7', category: 'dominant-7th',
    root: 'D', notes: ['D','F#','A','C'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'D shape',
    keyContext: [
      { key: 'G major', roman: 'V7', role: 'strong tension → resolves to G' },
    ],
    tip: 'D7 almost always leads to G major. The C note on top creates tension that resolves when you move to G. You\'ll hear this in country, blues, and classic rock constantly.',
    beginnerOrder: 10,
    positions: [
      { label: 'Open D7', frets: [-1,-1,0,2,1,2], fingers: [0,0,0,2,1,3], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'E7', symbol: 'E7', category: 'dominant-7th',
    root: 'E', notes: ['E','G#','B','D'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'E shape',
    keyContext: [
      { key: 'A major', roman: 'V7', role: 'strong tension → resolves to A' },
    ],
    tip: 'E7 vs Em: the difference is G# vs G — just one fret. But G# makes it sound tense and expectant instead of sad. E7 pulls strongly toward A major.',
    beginnerOrder: 17,
    positions: [
      { label: 'Open E7', frets: [0,2,0,1,0,0], fingers: [0,2,0,1,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'A7', symbol: 'A7', category: 'dominant-7th',
    root: 'A', notes: ['A','C#','E','G'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'A shape',
    keyContext: [
      { key: 'D major', roman: 'V7', role: 'strong tension → resolves to D' },
    ],
    tip: 'A major + one extra note (G). That G is the "♭7" — it creates the tension that pulls toward D major. Dominant 7th chords always want to resolve to the chord a 4th higher.',
    beginnerOrder: 18,
    positions: [
      { label: 'Open A7', frets: [-1,0,2,0,2,0], fingers: [0,0,2,0,3,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'C7', symbol: 'C7', category: 'dominant-7th',
    root: 'C', notes: ['C','E','G','Bb'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'C shape',
    keyContext: [
      { key: 'F major', roman: 'V7', role: 'strong tension → resolves to F' },
    ],
    tip: 'C7 is C major with a Bb added. That Bb creates the tension that resolves to F major. This is the engine behind blues, jazz, and gospel chord progressions.',
    beginnerOrder: 19,
    positions: [
      { label: 'Open C7', frets: [-1,3,2,3,1,0], fingers: [0,3,2,4,1,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'B7', symbol: 'B7', category: 'dominant-7th',
    root: 'B', notes: ['B','D#','F#','A'],
    formula: 'Root + Major 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'B shape',
    keyContext: [
      { key: 'E major', roman: 'V7', role: 'strong tension → resolves to E' },
    ],
    tip: 'B7 is the classic gateway chord to E major. It appears everywhere in country, blues, and early rock \'n\' roll — whenever a song is in the key of E.',
    beginnerOrder: 20,
    positions: [
      { label: 'Open B7', frets: [-1,2,1,2,0,2], fingers: [0,2,1,3,0,4], baseFret: 1, barre: null }
    ]
  },

  // ── Major 7th ─────────────────────────────────────────────────────────────

  {
    name: 'Cmaj7', symbol: 'Cmaj7', category: 'major-7th',
    root: 'C', notes: ['C','E','G','B'],
    formula: 'Root + Major 3rd + Perfect 5th + Major 7th',
    cagedShape: 'C shape',
    keyContext: [
      { key: 'C major', roman: 'Imaj7', role: 'home chord (jazzy)' },
      { key: 'G major', roman: 'IVmaj7', role: 'lift chord (jazzy)' },
    ],
    tip: 'C major + B note. The B is just one fret below C (one half-step) — that closeness creates a warm, shimmering tension. Major 7th chords are the sound of jazz and indie pop.',
    beginnerOrder: 21,
    positions: [
      { label: 'Open Cmaj7', frets: [-1,3,2,0,0,0], fingers: [0,3,2,0,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Gmaj7', symbol: 'Gmaj7', category: 'major-7th',
    root: 'G', notes: ['G','B','D','F#'],
    formula: 'Root + Major 3rd + Perfect 5th + Major 7th',
    cagedShape: 'G shape',
    keyContext: [
      { key: 'G major', roman: 'Imaj7', role: 'home chord (jazzy)' },
      { key: 'D major', roman: 'IVmaj7', role: 'lift chord (jazzy)' },
    ],
    tip: 'Remove one finger from open G major and you get Gmaj7. It sounds softer and more introspective — like G major with a question mark at the end.',
    beginnerOrder: 22,
    positions: [
      { label: 'Open Gmaj7', frets: [3,2,0,0,0,2], fingers: [3,2,0,0,0,1], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Amaj7', symbol: 'Amaj7', category: 'major-7th',
    root: 'A', notes: ['A','C#','E','G#'],
    formula: 'Root + Major 3rd + Perfect 5th + Major 7th',
    cagedShape: 'A shape',
    keyContext: [
      { key: 'A major', roman: 'Imaj7', role: 'home chord (jazzy)' },
      { key: 'E major', roman: 'IVmaj7', role: 'lift chord (jazzy)' },
    ],
    tip: 'A major + G# note. That G# adds a warm sparkle. Amaj7 is very common in bossa nova, bedroom pop, and indie folk.',
    beginnerOrder: 23,
    positions: [
      { label: 'Open Amaj7', frets: [-1,0,2,1,2,0], fingers: [0,0,2,1,3,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Emaj7', symbol: 'Emaj7', category: 'major-7th',
    root: 'E', notes: ['E','G#','B','D#'],
    formula: 'Root + Major 3rd + Perfect 5th + Major 7th',
    cagedShape: 'E shape',
    keyContext: [
      { key: 'E major', roman: 'Imaj7', role: 'home chord (jazzy)' },
      { key: 'B major', roman: 'IVmaj7', role: 'lift chord (jazzy)' },
    ],
    tip: 'One of the most beautiful chords on guitar. The open B and high e strings ring freely, and the fretted G# and D# color the sound. Often used in ambient and indie music.',
    beginnerOrder: 24,
    positions: [
      { label: 'Open Emaj7', frets: [0,2,1,1,0,0], fingers: [0,3,1,2,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Dmaj7', symbol: 'Dmaj7', category: 'major-7th',
    root: 'D', notes: ['D','F#','A','C#'],
    formula: 'Root + Major 3rd + Perfect 5th + Major 7th',
    cagedShape: 'D shape',
    keyContext: [
      { key: 'D major', roman: 'Imaj7', role: 'home chord (jazzy)' },
      { key: 'A major', roman: 'IVmaj7', role: 'lift chord (jazzy)' },
    ],
    tip: 'The C# on top makes this chord float instead of land — it sounds unresolved in the best possible way. Common in jazz and any music that wants to sound sophisticated.',
    beginnerOrder: 25,
    positions: [
      { label: 'Open Dmaj7', frets: [-1,-1,0,2,2,2], fingers: [0,0,0,1,1,1], baseFret: 1, barre: { fret: 2, fromString: 3, toString: 5 } }
    ]
  },

  // ── Minor 7th ─────────────────────────────────────────────────────────────

  {
    name: 'Em7', symbol: 'Em7', category: 'minor-7th',
    root: 'E', notes: ['E','G','B','D'],
    formula: 'Root + Minor 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'Em shape',
    keyContext: [
      { key: 'G major', roman: 'vim7', role: 'relative minor (jazzy)' },
      { key: 'D major', roman: 'iim7', role: 'stepping stone (jazzy)' },
      { key: 'E minor', roman: 'im7', role: 'home chord (jazzy)' },
    ],
    tip: 'Em + the open D string = Em7. Zero or one finger needed. The D (minor 7th) makes it sound spacious and floating instead of just sad. Very common in pop and folk.',
    beginnerOrder: 26,
    positions: [
      { label: 'Open Em7', frets: [0,2,0,0,0,0], fingers: [0,1,0,0,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Am7', symbol: 'Am7', category: 'minor-7th',
    root: 'A', notes: ['A','C','E','G'],
    formula: 'Root + Minor 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'Am shape',
    keyContext: [
      { key: 'C major', roman: 'vim7', role: 'relative minor (jazzy)' },
      { key: 'G major', roman: 'iim7', role: 'stepping stone (jazzy)' },
      { key: 'A minor', roman: 'im7', role: 'home chord (jazzy)' },
    ],
    tip: 'Am + G note. The G (minor 7th) softens the sadness of Am into something more sophisticated. Am7 is everywhere in soul, R&B, and pop ballads.',
    beginnerOrder: 27,
    positions: [
      { label: 'Open Am7', frets: [-1,0,2,0,1,0], fingers: [0,0,2,0,1,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Dm7', symbol: 'Dm7', category: 'minor-7th',
    root: 'D', notes: ['D','F','A','C'],
    formula: 'Root + Minor 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'Dm shape',
    keyContext: [
      { key: 'C major', roman: 'iim7', role: 'stepping stone (jazzy)' },
      { key: 'F major', roman: 'vim7', role: 'relative minor (jazzy)' },
      { key: 'D minor', roman: 'im7', role: 'home chord (jazzy)' },
    ],
    tip: 'Dm + C note on top. The iim7 in C major — in jazz, Dm7 → G7 → Cmaj7 is the most common chord progression ever (ii–V–I). Learning Dm7 opens up jazz vocabulary.',
    beginnerOrder: 28,
    positions: [
      { label: 'Open Dm7', frets: [-1,-1,0,2,1,1], fingers: [0,0,0,2,1,1], baseFret: 1, barre: { fret: 1, fromString: 4, toString: 5 } }
    ]
  },

  {
    name: 'Bm7', symbol: 'Bm7', category: 'minor-7th',
    root: 'B', notes: ['B','D','F#','A'],
    formula: 'Root + Minor 3rd + Perfect 5th + Minor 7th (♭7)',
    cagedShape: 'Am shape (barre fret 2)',
    keyContext: [
      { key: 'D major', roman: 'vim7', role: 'relative minor (jazzy)' },
      { key: 'A major', roman: 'iim7', role: 'stepping stone (jazzy)' },
      { key: 'B minor', roman: 'im7', role: 'home chord (jazzy)' },
    ],
    tip: 'A lighter version of the Bm barre chord. The A (minor 7th) relieves some tension and makes the chord sound more open. Often substituted for plain Bm to add color.',
    beginnerOrder: 29,
    positions: [
      { label: 'Bm7 Barre', frets: [-1,2,4,2,3,2], fingers: [0,1,3,1,2,1], baseFret: 2, barre: { fret: 2, fromString: 1, toString: 5 } }
    ]
  },

  // ── Power Chords ──────────────────────────────────────────────────────────

  {
    name: 'E5', symbol: 'E5', category: 'power',
    root: 'E', notes: ['E','B'],
    formula: 'Root + Perfect 5th (no 3rd)',
    cagedShape: 'E root',
    keyContext: [],
    tip: 'No 3rd = no major or minor quality. Works over any chord in any key. Through distortion, the perfect 5th interval sounds massive because it\'s the most stable interval in music.',
    beginnerOrder: 30,
    positions: [
      { label: 'E Power', frets: [0,2,2,-1,-1,-1], fingers: [0,1,3,0,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'A5', symbol: 'A5', category: 'power',
    root: 'A', notes: ['A','E'],
    formula: 'Root + Perfect 5th (no 3rd)',
    cagedShape: 'A root',
    keyContext: [],
    tip: 'Same two-finger shape as E5, moved to the A string. The beauty of power chords: one shape, move it anywhere on the low strings for any root note.',
    beginnerOrder: 31,
    positions: [
      { label: 'A Power', frets: [-1,0,2,2,-1,-1], fingers: [0,0,1,3,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'G5', symbol: 'G5', category: 'power',
    root: 'G', notes: ['G','D'],
    formula: 'Root + Perfect 5th (no 3rd)',
    cagedShape: 'E root (fret 3)',
    keyContext: [],
    tip: 'E5 shape moved to fret 3. In punk and rock, entire songs are written with just power chords because they cut through distortion cleanly without sounding muddy.',
    beginnerOrder: 32,
    positions: [
      { label: 'G Power', frets: [3,5,5,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 3, barre: null }
    ]
  },

  {
    name: 'D5', symbol: 'D5', category: 'power',
    root: 'D', notes: ['D','A'],
    formula: 'Root + Perfect 5th (no 3rd)',
    cagedShape: 'A root (fret 5)',
    keyContext: [],
    tip: 'A5 shape at fret 5. Often played with an optional octave note (same note two frets higher) to make the power chord even thicker.',
    beginnerOrder: 33,
    positions: [
      { label: 'D Power', frets: [-1,-1,0,2,3,-1], fingers: [0,0,0,1,3,0], baseFret: 1, barre: null }
    ]
  },

  // ── Sus Chords ────────────────────────────────────────────────────────────

  {
    name: 'Dsus4', symbol: 'Dsus4', category: 'sus',
    root: 'D', notes: ['D','G','A'],
    formula: 'Root + Perfect 4th + Perfect 5th (no 3rd)',
    cagedShape: 'D shape (sus4)',
    keyContext: [],
    tip: 'The G (4th) replaces the F# (3rd) in D major. Dsus4 → D is one of the most satisfying resolutions in music — you\'ll hear it in countless intro riffs.',
    beginnerOrder: 34,
    positions: [
      { label: 'Open Dsus4', frets: [-1,-1,0,2,3,3], fingers: [0,0,0,1,3,4], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Dsus2', symbol: 'Dsus2', category: 'sus',
    root: 'D', notes: ['D','E','A'],
    formula: 'Root + Major 2nd + Perfect 5th (no 3rd)',
    cagedShape: 'D shape (sus2)',
    keyContext: [],
    tip: 'The E (2nd) replaces the 3rd. Dsus2 sounds wide and open — like something is about to happen. Common in acoustic pop for adding movement between Dsus2, D, and Dsus4.',
    beginnerOrder: 35,
    positions: [
      { label: 'Open Dsus2', frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,3,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Asus4', symbol: 'Asus4', category: 'sus',
    root: 'A', notes: ['A','D','E'],
    formula: 'Root + Perfect 4th + Perfect 5th (no 3rd)',
    cagedShape: 'A shape (sus4)',
    keyContext: [],
    tip: 'The D (4th) replaces the C# (3rd). Asus4 → A is a classic resolution. Sus chords create tension not from dissonance but from expectation — your ear waits for the 3rd to appear.',
    beginnerOrder: 36,
    positions: [
      { label: 'Open Asus4', frets: [-1,0,2,2,3,0], fingers: [0,0,1,2,3,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Asus2', symbol: 'Asus2', category: 'sus',
    root: 'A', notes: ['A','B','E'],
    formula: 'Root + Major 2nd + Perfect 5th (no 3rd)',
    cagedShape: 'A shape (sus2)',
    keyContext: [],
    tip: 'The B (2nd) replaces the 3rd. Asus2 sounds open and contemplative — like a question without an answer. Often used in intro riffs to delay revealing the major or minor quality.',
    beginnerOrder: 37,
    positions: [
      { label: 'Open Asus2', frets: [-1,0,2,2,0,0], fingers: [0,0,1,2,0,0], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Gsus4', symbol: 'Gsus4', category: 'sus',
    root: 'G', notes: ['G','C','D'],
    formula: 'Root + Perfect 4th + Perfect 5th (no 3rd)',
    cagedShape: 'G shape (sus4)',
    keyContext: [],
    tip: 'The C (4th) replaces the B (3rd) in G major. No B means no major/minor quality. Gsus4 → G is heard in countless rock anthems — it builds anticipation before landing on G major.',
    beginnerOrder: 38,
    positions: [
      { label: 'Open Gsus4', frets: [3,3,0,0,1,3], fingers: [2,3,0,0,1,4], baseFret: 1, barre: null }
    ]
  },

  {
    name: 'Esus4', symbol: 'Esus4', category: 'sus',
    root: 'E', notes: ['E','A','B'],
    formula: 'Root + Perfect 4th + Perfect 5th (no 3rd)',
    cagedShape: 'E shape (sus4)',
    keyContext: [],
    tip: 'The A (4th) replaces the G# (3rd). Esus4 → E major is a satisfying resolution — the ear expects the 3rd to arrive. Very common in guitar-driven rock and pop.',
    beginnerOrder: 39,
    positions: [
      { label: 'Open Esus4', frets: [0,2,2,2,0,0], fingers: [0,2,3,4,0,0], baseFret: 1, barre: null }
    ]
  },

];

const CATEGORIES = {
  'open-major':   { label: 'Open Major',    color: '#2563eb' },
  'open-minor':   { label: 'Open Minor',    color: '#7c3aed' },
  'barre-major':  { label: 'Barre Major',   color: '#059669' },
  'barre-minor':  { label: 'Barre Minor',   color: '#0891b2' },
  'dominant-7th': { label: 'Dominant 7th',  color: '#dc2626' },
  'major-7th':    { label: 'Major 7th',     color: '#db2777' },
  'minor-7th':    { label: 'Minor 7th',     color: '#9333ea' },
  'power':        { label: 'Power Chords',  color: '#64748b' },
  'sus':          { label: 'Sus Chords',    color: '#d97706' },
};

// Beginner learning path — sorted by beginnerOrder
const BEGINNER_PATH = [...CHORDS].sort((a, b) => (a.beginnerOrder || 99) - (b.beginnerOrder || 99));
