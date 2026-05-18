// Staff note data, guitar positions, and SVG staff renderer
// Written pitch notation (guitar notation = sounding pitch + 1 octave)

// Staff lines y-positions (treble clef): top = F5, bottom = E4
const STAFF_LINE_Y = [20, 32, 44, 56, 68];
const NOTE_X = 155; // x-position of note head in staff SVG

// All notes in range, y = pixel position on staff (viewBox height 108)
const STAFF_NOTES = [
  { id: 'A3',  name: 'A', y: 92 },  // 2nd ledger below
  { id: 'B3',  name: 'B', y: 86 },  // space below middle C
  { id: 'C4',  name: 'C', y: 80 },  // middle C — 1st ledger below
  { id: 'D4',  name: 'D', y: 74 },  // space below staff
  { id: 'E4',  name: 'E', y: 68 },  // 1st line (bottom)
  { id: 'F4',  name: 'F', y: 62 },  // 1st space
  { id: 'G4',  name: 'G', y: 56 },  // 2nd line
  { id: 'A4',  name: 'A', y: 50 },  // 2nd space
  { id: 'B4',  name: 'B', y: 44 },  // 3rd line (middle)
  { id: 'C5',  name: 'C', y: 38 },  // 3rd space
  { id: 'D5',  name: 'D', y: 32 },  // 4th line
  { id: 'E5',  name: 'E', y: 26 },  // 4th space
  { id: 'F5',  name: 'F', y: 20 },  // 5th line (top)
  { id: 'G5',  name: 'G', y: 14 },  // space above top
  { id: 'A5',  name: 'A', y:  8 },  // 1st ledger above
];

const STAFF_NOTE_BY_ID = Object.fromEntries(STAFF_NOTES.map(n => [n.id, n]));

// Open strings (written pitch in guitar notation → string name)
const OPEN_STRINGS = {
  'D4': '4th string (D), open',
  'G4': '3rd string (G), open',
  'B4': '2nd string (B), open',
  'E5': '1st string (high e), open',
  'A3': '5th string (A), open',   // sounds A2
};

// Guitar first-position locations for each written note
// str: 1=high e, 6=low E — fret 0 = open
const GUITAR_NOTE_POSITIONS = {
  'A3':  [{ str: 5, fret: 0, label: '5th string (A), open ← anchor' }],
  'B3':  [{ str: 5, fret: 2, label: '5th string (A), fret 2' }],
  'C4':  [{ str: 5, fret: 3, label: '5th string (A), fret 3' }],
  'D4':  [{ str: 4, fret: 0, label: '4th string (D), open ← anchor' }],
  'E4':  [{ str: 4, fret: 2, label: '4th string (D), fret 2' }],
  'F4':  [{ str: 4, fret: 3, label: '4th string (D), fret 3' }],
  'G4':  [{ str: 3, fret: 0, label: '3rd string (G), open ← anchor' }],
  'A4':  [{ str: 3, fret: 2, label: '3rd string (G), fret 2' }],
  'B4':  [{ str: 2, fret: 0, label: '2nd string (B), open ← anchor' },
          { str: 3, fret: 4, label: '3rd string (G), fret 4' }],
  'C5':  [{ str: 2, fret: 1, label: '2nd string (B), fret 1' },
          { str: 3, fret: 5, label: '3rd string (G), fret 5' }],
  'D5':  [{ str: 2, fret: 3, label: '2nd string (B), fret 3' }],
  'E5':  [{ str: 1, fret: 0, label: '1st string (high e), open ← anchor' },
          { str: 2, fret: 5, label: '2nd string (B), fret 5' }],
  'F5':  [{ str: 1, fret: 1, label: '1st string (high e), fret 1' }],
  'G5':  [{ str: 1, fret: 3, label: '1st string (high e), fret 3' }],
  'A5':  [{ str: 1, fret: 5, label: '1st string (high e), fret 5' }],
};

// Mnemonic descriptions for each note's staff position
const STAFF_NOTE_DESC = {
  'E4': 'Bottom line — Every (Good Boy Does Fine)',
  'G4': '2nd line — (Every) Good (Boy Does Fine)',
  'B4': 'Middle line — (Every Good) Boy (Does Fine)',
  'D5': '4th line — (Every Good Boy) Does (Fine)',
  'F5': 'Top line — (Every Good Boy Does) Fine',
  'F4': '1st space — F (ACE)',
  'A4': '2nd space — (F) A (CE)',
  'C5': '3rd space — (FA) C (E)',
  'E5': '4th space — (FAC) E',
  'C4': 'Middle C — 1st ledger line below the staff',
  'D4': 'Space just below the staff',
  'A3': '2nd ledger below — open A string',
  'B3': 'Space between 1st and 2nd ledger below',
  'G5': 'Space above the top line',
  'A5': '1st ledger line above the staff',
};

// Drill levels
const NOTE_LEVELS = [
  {
    id: 1, name: 'Lines', color: '#2563eb',
    ids: ['E4','G4','B4','D5','F5'],
    mnemonic: 'Every Good Boy Does Fine',
    hint: 'The 5 lines of the staff, bottom to top. G4 and B4 are open strings!'
  },
  {
    id: 2, name: 'Spaces', color: '#7c3aed',
    ids: ['F4','A4','C5','E5'],
    mnemonic: 'FACE',
    hint: 'The 4 spaces between the lines. E5 is the open 1st string!'
  },
  {
    id: 3, name: 'Full Staff', color: '#059669',
    ids: ['E4','F4','G4','A4','B4','C5','D5','E5','F5'],
    mnemonic: null,
    hint: 'All 9 notes between the staff lines — no ledger lines yet'
  },
  {
    id: 4, name: '+ Ledger Lines', color: '#d97706',
    ids: ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5'],
    mnemonic: 'C4 = middle C (1st ledger below)',
    hint: 'Adds middle C, D below the staff, and notes above the staff'
  },
  {
    id: 5, name: 'Full Range', color: '#dc2626',
    ids: ['A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5'],
    mnemonic: null,
    hint: 'Complete first-position range. A3 = open 5th string!'
  },
];

// ── SVG Staff Renderer ────────────────────────────────────────────────────────

const SVG_W = 260, SVG_H = 108;
const STAFF_LEFT = 46, STAFF_RIGHT = 238;

function _svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// Returns ledger line y-positions needed for a note at cy
function _ledgersFor(cy) {
  const lines = [];
  if (cy >= 80) lines.push(80); // C4 (middle C ledger)
  if (cy >= 92) lines.push(92); // A3 (2nd ledger below)
  if (cy <=  8) lines.push(8);  // A5 (1st ledger above)
  return lines;
}

function renderStaff(noteId, answerState = 'idle') {
  // answerState: 'idle' | 'correct' | 'wrong'
  const noteData = STAFF_NOTE_BY_ID[noteId] || null;

  const svg = _svgEl('svg', {
    viewBox: `0 0 ${SVG_W} ${SVG_H}`,
    width: SVG_W, height: SVG_H,
  });

  // Treble clef character — sits with curl around G line (y=56)
  const clef = _svgEl('text', {
    x: '4', y: '78',
    'font-size': '72',
    'font-family': 'Georgia, "Times New Roman", serif',
    fill: '#1e293b',
  });
  clef.textContent = '\u{1D11E}'; // 𝄞
  svg.appendChild(clef);

  // Staff lines
  STAFF_LINE_Y.forEach(y => {
    svg.appendChild(_svgEl('line', {
      x1: STAFF_LEFT, y1: y, x2: STAFF_RIGHT, y2: y,
      stroke: '#334155', 'stroke-width': '1.2',
    }));
  });

  if (!noteData) return svg;

  const cy = noteData.y;
  const noteColor = answerState === 'correct' ? '#16a34a'
                  : answerState === 'wrong'   ? '#dc2626'
                  : '#1e293b';

  // Ledger lines
  _ledgersFor(cy).forEach(ly => {
    svg.appendChild(_svgEl('line', {
      x1: NOTE_X - 14, y1: ly, x2: NOTE_X + 14, y2: ly,
      stroke: '#334155', 'stroke-width': '1.2',
    }));
  });

  // Note head (filled ellipse, slight tilt)
  svg.appendChild(_svgEl('ellipse', {
    cx: NOTE_X, cy,
    rx: '7', ry: '5.5',
    transform: `rotate(-15 ${NOTE_X} ${cy})`,
    fill: noteColor,
  }));

  // Stem — up for notes below B4 (middle line, y=44); down for B4 and above
  const stemUp = cy > 44;
  const stemX  = stemUp ? NOTE_X + 6 : NOTE_X - 6;
  const stemY1 = stemUp ? cy - 4     : cy + 4;
  const stemY2 = stemUp ? cy - 34    : cy + 34;
  svg.appendChild(_svgEl('line', {
    x1: stemX, y1: stemY1, x2: stemX, y2: stemY2,
    stroke: noteColor, 'stroke-width': '1.5',
  }));

  return svg;
}
