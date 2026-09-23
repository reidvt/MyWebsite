'use client';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS, type Project } from '@/data/projects';

const CX = 240, CY = 240;
const INNER_R = 108, OUTER_R = 195;
const featured = PROJECTS.filter(p => p.ring === 0);
const others = PROJECTS.filter(p => p.ring === 1);

interface Props {
  onAchievement: (id: string, label: string, msg: string, xp: number) => void;
}

export default function OrbitalWheel({ onAchievement }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);
  const rotRef = useRef(0);
  const spinRef = useRef(true);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<HTMLDivElement>(null);
  const spokesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    function updateWheel(rot: number) {
      const nodeEls = nodesRef.current?.querySelectorAll<HTMLDivElement>('.w-node');
      if (!nodeEls || !spokesRef.current) return;
      let spokesHtml = '';
      PROJECTS.forEach((p, i) => {
        const ring = p.ring === 0;
        const count = ring ? featured.length : others.length;
        const idx = ring ? featured.indexOf(p) : others.indexOf(p);
        const baseAngle = ring ? 0 : 15;
        const step = 360 / count;
        const angle = (idx * step + baseAngle + rot) * Math.PI / 180;
        const r = ring ? INNER_R : OUTER_R;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;
        const nd = nodeEls[i] as HTMLDivElement;
        if (nd) {
          nd.style.left = x + 'px';
          nd.style.top = y + 'px';
        }
        spokesHtml += `<line class="orbit-spoke" x1="${CX}" y1="${CY}" x2="${x}" y2="${y}"/>`;
      });
      spokesRef.current.innerHTML = spokesHtml;
    }

    function loop() {
      if (spinRef.current) rotRef.current += 0.1;
      updateWheel(rotRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleSelect(p: Project) {
    setSelected(p);
    spinRef.current = false;
    onAchievement('proj_' + p.id, 'MISSION_BRIEFING', p.shortTitle + ' mission accessed', 20);
  }

  function handleStageEnter() { spinRef.current = false; }
  function handleStageLeave() { if (!selected) spinRef.current = true; }

  const clrVar = (c: string) => c === 'green' ? 'var(--green)' : c === 'blue' ? 'var(--blue)' : 'var(--amber)';
  const stars = (diff: number) => '★'.repeat(diff) + '☆'.repeat(5 - diff);

  return (
    <>
      <div className="projects-layout">
        {/* WHEEL */}
        <div
          className="wheel-stage"
          id="wheel-stage"
          onMouseEnter={handleStageEnter}
          onMouseLeave={handleStageLeave}
        >
          <svg className="orbits-svg" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
            <circle className="orbit-ring" cx={CX} cy={CY} r={INNER_R} />
            <circle className="orbit-ring" cx={CX} cy={CY} r={OUTER_R} />
            <g ref={spokesRef} id="spokes"></g>
          </svg>
          <div className="wheel-hub"><span className="hub-txt">RVT</span></div>
          <div id="wheel-nodes" ref={nodesRef}>
            {PROJECTS.map(p => (
              <div
                key={p.id}
                className={`w-node${selected?.id === p.id ? ' sel' : ''}`}
                data-id={p.id}
                data-color={p.color}
                onClick={() => handleSelect(p)}
              >
                <div className="wn-dot" style={{ color: clrVar(p.color) }}>{p.monogram}</div>
                <div className="wn-label">{p.shortTitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div className="wheel-detail" id="wheel-detail">
          {!selected ? (
            <div className="det-empty" id="det-empty">
              <div className="det-icon">◎</div>
              <div>Click any node to inspect mission</div>
            </div>
          ) : (
            <div className="det-content show" id="det-content">
              <div className="det-top">
                <div className="det-title" style={{ color: clrVar(selected.color) }}>{selected.title}</div>
                {selected.status === 'public'
                  ? <span className="det-status pub">● Public</span>
                  : selected.status === 'private'
                  ? <span className="det-status priv">◆ Private</span>
                  : <span className="det-status pend">○ Repo Pending</span>}
              </div>
              <div className="det-org" style={{ color: clrVar(selected.color), opacity: 0.7 }}>{selected.org}</div>
              <p className="det-bio">{selected.bio}</p>
              {selected.metrics.length > 0 && (
                <div className="det-metrics">
                  {selected.metrics.map(m => (
                    <span key={m} className="det-metric" style={{ color: clrVar(selected.color), border: `1px solid ${clrVar(selected.color)}33` }}>{m}</span>
                  ))}
                </div>
              )}
              <div className="det-tech">
                {selected.tech.map(t => <span key={t} className="det-tech-tag">{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {selected.githubUrl
                    ? <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="det-link gh">GitHub ↗</a>
                    : <span className="det-link dis">{selected.status === 'private' ? 'Private Repo' : 'Repo Pending'}</span>}
                </div>
                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                  <span className="det-diff">{stars(selected.diff)}</span>
                  <span className="det-xp">+{selected.xp} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE LIST */}
      <div id="project-list">
        {PROJECTS.map(p => (
          <div key={p.id} className="proj-list-card" data-color={p.color}>
            <div className="plc-title">{p.title}</div>
            <div className="plc-desc">{p.bio.slice(0, 120)}…</div>
            <div className="plc-tags">
              {p.tech.slice(0, 4).map(t => <span key={t} className="plc-tag">{t}</span>)}
            </div>
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="plc-link">GitHub ↗</a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
