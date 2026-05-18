// Theory utilities — note calculation, glossary

// Open string notes (index 0 = low E, 5 = high e), semitone indices from C
const OPEN_INDICES = [4, 9, 2, 7, 11, 4]; // E A D G B E
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const OPEN_NOTE_NAMES = ['E','A','D','G','B','E']; // for display only

function getStringNote(stringIdx, fret) {
  if (fret < 0) return null; // muted
  return NOTE_NAMES[(OPEN_INDICES[stringIdx] + fret) % 12];
}

function getPositionNotes(frets) {
  return frets.map((fret, idx) => getStringNote(idx, fret));
}

const GLOSSARY = [
  {
    term: 'Root',
    def: 'The note the chord is named after. In a G major chord, the root is G. The root gives the chord its "home base."'
  },
  {
    term: 'Major chord',
    def: 'A chord that sounds bright, happy, or resolved. It\'s built by stacking a major 3rd (4 frets) + perfect 5th (7 frets) above the root.'
  },
  {
    term: 'Minor chord',
    def: 'A chord that sounds dark, sad, or tense. Like a major chord but with the 3rd lowered by one fret (minor 3rd = 3 frets above the root).'
  },
  {
    term: 'Major 3rd',
    def: '4 half-steps (frets) above the root. This interval is what gives major chords their bright, happy quality.'
  },
  {
    term: 'Minor 3rd',
    def: '3 half-steps above the root — one fret lower than a major 3rd. This small difference is what makes a chord sound minor (sad/dark).'
  },
  {
    term: 'Perfect 5th',
    def: '7 half-steps above the root. Present in almost every chord. It adds fullness and stability — the two notes ring very well together.'
  },
  {
    term: 'Major 7th',
    def: '11 half-steps above the root — just one fret below the octave. Adding it to a major chord creates a warm, jazzy shimmer (Cmaj7, Gmaj7).'
  },
  {
    term: 'Minor 7th (♭7)',
    def: '10 half-steps above the root — two frets below the octave. Used in dominant 7th chords (G7) to create tension, and in minor 7th chords (Am7) to add richness.'
  },
  {
    term: 'Dominant 7th',
    def: 'A major chord + a minor 7th. Written as just "7" (G7, D7). Creates strong tension that "wants" to resolve to the chord a 4th above it — G7 → C, D7 → G.'
  },
  {
    term: 'Suspended chord (sus)',
    def: 'The 3rd is replaced by a 2nd or 4th. No major or minor quality — sounds floating, unresolved. Usually resolves to the major or minor version of the same root chord.'
  },
  {
    term: 'Power chord',
    def: 'Just root + perfect 5th. No 3rd means no major/minor quality — it works over any key. Sounds huge through distortion because the 5th is the most stable interval.'
  },
  {
    term: 'Barre chord',
    def: 'Your index finger presses all 6 strings flat at one fret, acting as a movable nut. This lets you play any open chord shape anywhere on the neck.'
  },
  {
    term: 'Open chord',
    def: 'A chord that uses at least one open (unfretted) string. Usually easier for beginners and sounds fuller because open strings ring freely.'
  },
  {
    term: 'Key',
    def: 'A set of 7 notes that sound good together. The chords built from those notes are the "natural" chords of that key. Songs usually stay within one key (or move between a few).'
  },
  {
    term: 'CAGED system',
    def: 'Five chord shapes (C, A, G, E, D) that cover the entire fretboard. Every major chord is one of these shapes moved to a different fret. Learning CAGED unlocks the whole neck.'
  },
  {
    term: 'Tonic (I chord)',
    def: 'The "home" chord in a key — named after the key itself. C major is the I chord in the key of C. Songs often start and end on the I chord because it feels resolved.'
  },
  {
    term: 'Dominant (V chord)',
    def: 'The 5th chord in a key. Creates strong tension and "wants" to resolve back to the I chord. The V7 version (e.g., G7 in C major) is even more tense.'
  },
  {
    term: 'Subdominant (IV chord)',
    def: 'The 4th chord in a key. Sounds warm and uplifting — moving from I to IV is the sound of countless pop and gospel songs.'
  },
];
