// SVG chord diagram renderer
// frets array: index 0 = low E (string 6), index 5 = high e (string 1)
// fret values: -1 = muted (X), 0 = open (O), 1+ = absolute fret number

const SVG_NS = 'http://www.w3.org/2000/svg';
const D = {
  width: 116,
  height: 148,
  noteRowH: 16,    // extra height added when showNotes=true
  top: 32,
  left: 20,
  stringGap: 15,
  fretGap: 19,
  frets: 5,
  strings: 6,
  dotR: 6,
  nutH: 4,
};

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function renderChordDiagram(position, accentColor = '#2563eb', showNotes = false) {
  const { frets, fingers, baseFret, barre, label } = position;
  const gridW = D.stringGap * (D.strings - 1);
  const gridH = D.fretGap * D.frets;
  const x0 = D.left;
  const y0 = D.top;
  const totalH = D.height + (showNotes ? D.noteRowH : 0);

  const svg = svgEl('svg', {
    viewBox: `0 0 ${D.width} ${totalH}`,
    width: D.width,
    height: totalH,
    'font-family': 'Inter, system-ui, sans-serif',
  });

  // Nut or fret number label
  if (baseFret === 1) {
    svg.appendChild(svgEl('rect', {
      x: x0, y: y0 - D.nutH,
      width: gridW, height: D.nutH,
      fill: '#1e293b', rx: 1
    }));
  } else {
    const lbl = svgEl('text', {
      x: x0 + gridW + 6, y: y0 + 6,
      fill: '#64748b', 'font-size': '8', 'text-anchor': 'start'
    });
    lbl.textContent = baseFret + 'fr';
    svg.appendChild(lbl);
    svg.appendChild(svgEl('rect', {
      x: x0, y: y0 - 1, width: gridW, height: 1.5, fill: '#94a3b8'
    }));
  }

  // Fret lines
  for (let f = 0; f <= D.frets; f++) {
    svg.appendChild(svgEl('line', {
      x1: x0, y1: y0 + f * D.fretGap,
      x2: x0 + gridW, y2: y0 + f * D.fretGap,
      stroke: '#cbd5e1', 'stroke-width': f === 0 ? 1 : 0.7
    }));
  }

  // String lines
  for (let s = 0; s < D.strings; s++) {
    svg.appendChild(svgEl('line', {
      x1: x0 + s * D.stringGap, y1: y0,
      x2: x0 + s * D.stringGap, y2: y0 + gridH,
      stroke: '#94a3b8', 'stroke-width': 0.8
    }));
  }

  // Barre bar
  if (barre) {
    const bx = x0 + barre.fromString * D.stringGap;
    const bxEnd = x0 + barre.toString * D.stringGap;
    const by = y0 + (barre.fret - baseFret + 0.5) * D.fretGap;
    svg.appendChild(svgEl('rect', {
      x: bx, y: by - D.dotR,
      width: bxEnd - bx, height: D.dotR * 2,
      rx: D.dotR, fill: accentColor, opacity: 0.9
    }));
  }

  // String markers and finger dots
  for (let s = 0; s < D.strings; s++) {
    const fret = frets[s];
    const finger = fingers[s];
    const cx = x0 + s * D.stringGap;

    if (fret === -1) {
      // Muted X
      const my = y0 - 14;
      svg.appendChild(svgEl('line', { x1: cx-4, y1: my-4, x2: cx+4, y2: my+4, stroke: '#64748b', 'stroke-width': 1.5, 'stroke-linecap': 'round' }));
      svg.appendChild(svgEl('line', { x1: cx+4, y1: my-4, x2: cx-4, y2: my+4, stroke: '#64748b', 'stroke-width': 1.5, 'stroke-linecap': 'round' }));
    } else if (fret === 0) {
      // Open circle
      svg.appendChild(svgEl('circle', { cx, cy: y0 - 14, r: 4.5, fill: 'none', stroke: '#475569', 'stroke-width': 1.5 }));
      if (showNotes) {
        const note = getStringNote(s, 0);
        const nt = svgEl('text', { x: cx, y: y0 - 10, fill: '#475569', 'font-size': '6', 'text-anchor': 'middle', 'font-weight': '600' });
        nt.textContent = note;
        svg.appendChild(nt);
      }
    } else {
      // Finger dot
      const dotY = y0 + (fret - baseFret + 0.5) * D.fretGap;
      const onBarre = barre && fret === barre.fret && s >= barre.fromString && s <= barre.toString;

      if (!onBarre) {
        svg.appendChild(svgEl('circle', { cx, cy: dotY, r: D.dotR, fill: accentColor }));
      }

      if (showNotes) {
        const note = getStringNote(s, fret);
        const nt = svgEl('text', {
          x: cx, y: dotY + 3,
          fill: onBarre ? '#fff' : '#fff',
          'font-size': note && note.length > 1 ? '5.5' : '6.5',
          'text-anchor': 'middle', 'font-weight': '700'
        });
        nt.textContent = note || '';
        svg.appendChild(nt);
      } else if (finger > 0 && !onBarre) {
        const ft = svgEl('text', { x: cx, y: dotY + 3, fill: '#fff', 'font-size': '7', 'text-anchor': 'middle', 'font-weight': '600' });
        ft.textContent = finger;
        svg.appendChild(ft);
      }

      // Label on barre
      if (onBarre && showNotes) {
        const note = getStringNote(s, fret);
        const nt = svgEl('text', {
          x: cx, y: dotY + 3,
          fill: '#fff',
          'font-size': note && note.length > 1 ? '5.5' : '6.5',
          'text-anchor': 'middle', 'font-weight': '700'
        });
        nt.textContent = note || '';
        svg.appendChild(nt);
      } else if (onBarre && !showNotes && finger > 0) {
        const ft = svgEl('text', { x: cx, y: dotY + 3, fill: '#fff', 'font-size': '7', 'text-anchor': 'middle', 'font-weight': '600' });
        ft.textContent = finger;
        svg.appendChild(ft);
      }
    }
  }

  // Diagram label below frets
  const lbl = svgEl('text', {
    x: D.width / 2, y: D.height - 4,
    fill: '#94a3b8', 'font-size': '7.5', 'text-anchor': 'middle'
  });
  lbl.textContent = label;
  svg.appendChild(lbl);

  // Note name row at very bottom (when showNotes)
  if (showNotes) {
    const rowY = D.height + D.noteRowH - 4;
    for (let s = 0; s < D.strings; s++) {
      const fret = frets[s];
      const note = fret < 0 ? null : getStringNote(s, fret);
      const cx = x0 + s * D.stringGap;
      const el = svgEl('text', {
        x: cx, y: rowY,
        fill: fret === 0 ? '#94a3b8' : accentColor,
        'font-size': '7.5', 'text-anchor': 'middle', 'font-weight': '600'
      });
      el.textContent = note || '×';
      svg.appendChild(el);
    }
    // String name header above note row
    const headerY = D.height + 4;
    ['E','A','D','G','B','e'].forEach((name, s) => {
      const hdr = svgEl('text', {
        x: x0 + s * D.stringGap, y: headerY,
        fill: '#cbd5e1', 'font-size': '6.5', 'text-anchor': 'middle'
      });
      hdr.textContent = name;
      svg.appendChild(hdr);
    });
  }

  return svg;
}

function renderChordCard(chord, accentColor, showNotes) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chord-card';
  chord.positions.forEach(pos => {
    const frame = document.createElement('div');
    frame.className = 'diagram-frame';
    frame.appendChild(renderChordDiagram(pos, accentColor, showNotes));
    wrapper.appendChild(frame);
  });
  return wrapper;
}
