'use client';
import { useEffect, useRef } from 'react';

const BOOT_LINES = [
  { t: 'BIOS v3.0.1 — SYSTEMS INITIALIZING...', c: 'dm', d: 0 },
  { t: 'CPU: ANOMALY_DETECT_ENGINE × 8 cores ........ OK', c: '', d: 160 },
  { t: 'MEM: 32 GB — TRAINING_DATA_CACHE ............. OK', c: '', d: 300 },
  { t: 'GPU: 25 GB VRAM × 2 — DDP_READY ............. OK', c: 'gn', d: 440 },
  { t: 'LOADING: pytorch_geometric.module ...........', c: 'dm', d: 580 },
  { t: 'LOADING: splunk_soc.connector [AUTH] ........', c: 'dm', d: 720 },
  { t: 'LOADING: reid.portfolio.exe ..................', c: '', d: 860 },
  { t: 'SECURITY_CLEARANCE: LEVEL-3 [GRANTED] .......', c: 'am', d: 1000 },
  { t: 'ALL SYSTEMS GO', c: 'gn', d: 1140 },
];

export default function BootOverlay({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<HTMLDivElement>(null);
  const wlRef = useRef<HTMLDivElement>(null);
  const enRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = linesRef.current;
    const bar = barRef.current;
    const st = stRef.current;
    const wl = wlRef.current;
    const en = enRef.current;
    const ov = overlayRef.current;
    if (!lines || !bar || !st || !wl || !en || !ov) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach(({ t, c, d }) => {
      timers.push(setTimeout(() => {
        const ln = document.createElement('div');
        ln.className = 'bl' + (c ? ' ' + c : '');
        ln.textContent = t;
        lines.appendChild(ln);
      }, d));
    });

    let pct = 0;
    const bi = setInterval(() => {
      pct = Math.min(pct + 2, 100);
      bar.style.width = pct + '%';
      if (st) st.textContent = 'Loading... ' + pct + '%';
      if (pct >= 100) {
        clearInterval(bi);
        wl.classList.add('show');
        timers.push(setTimeout(() => en.classList.add('show'), 400));
      }
    }, 16);

    function dismiss() {
      if (!ov) return;
      ov.classList.add('done');
      timers.push(setTimeout(() => {
        ov.style.display = 'none';
        onDone();
      }, 550));
      document.removeEventListener('keydown', dismiss);
      ov.removeEventListener('click', dismiss);
    }

    timers.push(setTimeout(() => {
      document.addEventListener('keydown', dismiss);
      ov.addEventListener('click', dismiss);
      timers.push(setTimeout(dismiss, 2200));
    }, 1700));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(bi);
      document.removeEventListener('keydown', dismiss);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="boot-overlay" ref={overlayRef}>
      <div id="boot-term">
        <div id="bl" ref={linesRef}></div>
        <div className="bp-wrap"><div id="bp" ref={barRef}></div></div>
        <div className="bst" ref={stRef}>&nbsp;</div>
        <div className="bwl" ref={wlRef}>REID VANTRIESTE</div>
        <div className="ben" ref={enRef}>[ PRESS ANY KEY OR WAIT ]</div>
      </div>
    </div>
  );
}
