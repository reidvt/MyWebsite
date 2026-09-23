'use client';
import { useRef, useState, useEffect } from 'react';
import { SKILLS_DATA } from '@/data/skills';

const CMDS = ['help', 'ls', 'cd', 'whoami', 'skills', 'ping', 'git log', 'clear', 'sudo', 'matrix', 'coffee', 'theme', 'exit'];

type Line = [string, string]; // [cssClass, text]

interface Props {
  onAchievement: (id: string, label: string, msg: string, xp: number) => void;
  onAddXp: (n: number) => void;
  onThemeToggle: () => void;
  onMatrix: () => void;
}

export default function CmdTerminal({ onAchievement, onAddXp, onThemeToggle, onMatrix }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const [outLines, setOutLines] = useState<Line[]>([]);
  const [outOpen, setOutOpen] = useState(false);
  const historyRef = useRef<string[]>([]);
  const histIdxRef = useRef(-1);
  const firstCmdRef = useRef(true);

  function showOut(lines: Line[]) {
    setOutLines(lines);
    setOutOpen(true);
  }
  function closeOut() { setOutOpen(false); }

  const handlers: Record<string, () => void> = {
    help() { setHelpOpen(true); onAchievement('help', 'HELP_ACCESSED', 'Command reference opened', 10); },
    ls() {
      showOut([
        ['cg', 'drwxr-xr-x  about/'],
        ['cg', 'drwxr-xr-x  projects/    (9 missions)'],
        ['cg', 'drwxr-xr-x  experience/'],
        ['cg', 'drwxr-xr-x  education/'],
        ['cg', 'drwxr-xr-x  skills/'],
        ['cg', 'drwxr-xr-x  contact/'],
        ['', ''],
        ['ca', 'Total: 6 directories, 1 operator'],
      ]);
    },
    whoami() {
      showOut([
        ['cg', 'reid vantrieste'],
        ['', 'uid=1000(reid) gid=1000(ml-engineers) groups=soc-analysts,ai-researchers'],
        ['', 'shell: /usr/bin/python3'],
        ['', 'clearance: LEVEL-3 (ML + Security)'],
        ['ca', 'status: SEEKING OPPORTUNITIES — May 2026'],
      ]);
      onAchievement('whoami', 'IDENTITY_CONFIRMED', 'System user identified', 20);
    },
    skills() {
      const lines: Line[] = [['cg', '=== SKILL MATRIX ==='], ['', ' ']];
      SKILLS_DATA.forEach(s => {
        lines.push(['ca', `[${s.cat.toUpperCase()}]`]);
        s.items.forEach(i => {
          const b = '█'.repeat(Math.round(i.v / 10)) + '░'.repeat(10 - Math.round(i.v / 10));
          lines.push(['', `  ${i.n.padEnd(20)} ${b} ${i.v}%`]);
        });
      });
      showOut(lines);
      onAchievement('skills_cmd', 'MATRIX_PRINTED', 'Skill matrix printed', 20);
    },
    ping() {
      showOut([
        ['cg', 'PING contact@reidvantrieste'],
        ['', ''],
        ['cb', 'EMAIL    →  Reidvantrieste@gmail.com'],
        ['cb', 'LINKEDIN →  linkedin.com/in/reidvantrieste'],
        ['cg', 'GITHUB   →  github.com/reidvantrieste'],
        ['ca', 'PHONE    →  610-314-1880'],
        ['ca', 'CITY     →  Philadelphia, PA area'],
        ['', ''],
        ['cg', '[OPEN TO REMOTE/HYBRID — May 2026]'],
      ]);
      onAchievement('ping', 'CONTACT_PINGED', 'Secure channel established', 25);
    },
    'git log'() {
      showOut([
        ['cg', 'commit a7f3d2e  HEAD → main'],
        ['ca', 'Date: Sep 2026'],
        ['', '    feat: ship portfolio v3 with orbital project wheel'],
        ['', ''],
        ['cg', 'commit 4b8c91a'],
        ['ca', 'Date: Aug 2026'],
        ['', '    feat: add GNN leak detection to capstone'],
        ['', ''],
        ['cg', 'commit 2e5a10f'],
        ['ca', 'Date: May 2026'],
        ['', '    chore: graduate Fairfield University'],
        ['', ''],
        ['cg', 'commit 9d1b33c'],
        ['ca', 'Date: Sep 2025'],
        ['', '    feat: join SOC + start ML capstone concurrently'],
      ]);
      onAchievement('git', 'GIT_ARCHAEOLOGY', 'Dug through commit history', 15);
    },
    clear() { closeOut(); setHelpOpen(false); },
    sudo() {
      showOut([
        ['cr', '[sudo] password for visitor:'],
        ['cr', 'Sorry, user visitor is not in the sudoers file.'],
        ['ca', 'This incident has been reported. (jk — nice try)'],
      ]);
      onAchievement('sudo', 'SUDO_DENIED', 'Permission denied. Nice try.', 50);
    },
    matrix() { onMatrix(); onAchievement('matrix', 'MATRIX_MODE', 'You know kung fu', 100); },
    coffee() {
      showOut([
        ['ca', '☕ Brewing...'],
        ['', ''],
        ['', 'Reid runs on caffeine, curiosity, and PyTorch.'],
        ['cg', '[COFFEE_READY] — +10 productivity, +5 jitter'],
      ]);
      onAddXp(10);
    },
    theme() { onThemeToggle(); },
    exit() {
      showOut([
        ['cr', "logout: not a real shell. You can't leave."],
        ['ca', "(try closing the tab? we both know you won't)"],
      ]);
    },
  };

  function runCmd(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    historyRef.current.unshift(raw);
    histIdxRef.current = -1;
    if (firstCmdRef.current) {
      firstCmdRef.current = false;
      onAchievement('first_cmd', 'FIRST_COMMAND', 'Terminal activated', 25);
    }
    if (cmd.startsWith('sudo ')) { handlers.sudo(); return; }
    if (cmd.startsWith('cd ')) {
      const t = cmd.slice(3).trim();
      const el = document.getElementById(t);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); onAchievement('nav_cmd', 'NAVIGATED', 'Jumped to: ' + t, 5); }
      else showOut([['cr', `cd: no such directory: ${t}`], ['', 'try: about, projects, experience, education, skills, contact']]);
      return;
    }
    if (handlers[cmd]) { handlers[cmd](); return; }
    showOut([['cr', `command not found: ${cmd}`], ['ca', 'try: help']]);
  }

  useEffect(() => {
    function handleKeypress(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (!['INPUT', 'TEXTAREA', 'BUTTON'].includes(tag)) {
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCmd(e.currentTarget.value);
      e.currentTarget.value = '';
      setHint('');
    }
    if (e.key === 'Escape') {
      closeOut();
      setHelpOpen(false);
      e.currentTarget.value = '';
      setHint('');
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = historyRef.current;
      if (histIdxRef.current < h.length - 1) histIdxRef.current++;
      if (inputRef.current) inputRef.current.value = h[histIdxRef.current] || '';
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdxRef.current = Math.max(-1, histIdxRef.current - 1);
      if (inputRef.current) inputRef.current.value = histIdxRef.current >= 0 ? historyRef.current[histIdxRef.current] : '';
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const v = e.currentTarget.value.trim().toLowerCase();
      const m = CMDS.find(c => c.startsWith(v) && c !== v);
      if (m && inputRef.current) inputRef.current.value = m;
      setHint('');
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.trim().toLowerCase();
    const m = CMDS.find(c => c.startsWith(v) && c !== v && v.length > 0);
    setHint(m ? m.slice(v.length) : '');
  }

  return (
    <>
      {/* CMD HELP */}
      <div id="cmd-help" className={helpOpen ? 'open' : ''}>
        <div className="hp-t">AVAILABLE COMMANDS</div>
        {[
          ['help', 'show this panel'],
          ['ls', 'list sections'],
          ['cd [section]', 'navigate to section'],
          ['whoami', 'system info'],
          ['skills', 'skills summary'],
          ['ping', 'contact info'],
          ['git log', 'recent commits'],
          ['sudo [cmd]', 'nice try'],
          ['matrix', '?'],
          ['theme', 'toggle light/dark'],
          ['exit', 'try it'],
        ].map(([cmd, desc]) => (
          <div key={cmd} className="hp-r">
            <span className="hp-c">{cmd}</span>
            <span className="hp-d">{desc}</span>
          </div>
        ))}
        <div className="hp-x" id="help-close" onClick={() => setHelpOpen(false)}>[ ESC to close ]</div>
      </div>

      {/* OUTPUT PANEL */}
      <div id="cmd-out" className={outOpen ? 'open' : ''}>
        {outLines.map((([cls, txt], i) => (
          <div key={i} className={`cout-l ${cls}`}>{txt}</div>
        )))}
        {outOpen && <div className="cout-x" onClick={closeOut}>[ ESC to close ]</div>}
      </div>

      {/* TERMINAL BAR */}
      <div id="cmd-terminal">
        <span className="cmd-prompt">reid@portfolio:~$&nbsp;</span>
        <input
          id="cmd-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="type 'help' for commands"
          onKeyDown={handleKeyDown}
          onChange={handleInput}
        />
        <span id="cmd-hint">{hint}</span>
      </div>
    </>
  );
}
