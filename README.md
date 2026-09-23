# Reid VanTrieste — Portfolio

Personal portfolio website for Reid W. VanTrieste — Computer Science student at Fairfield University (B.S., May 2026) with a focus on **Machine Learning / AI** and **Cybersecurity / SOC operations**.

🔗 **Live site:** [https://resume-nu-rose.vercel.app/](https://resume-nu-rose.vercel.app/)

---

## About

A single-page, game-like portfolio with a dark terminal aesthetic: a boot sequence, an interactive command terminal, and an orbital navigation wheel. It covers Reid's ML / AI work (GNN leak-detection capstone, NLP emotion classifier, deepfake detector) and SOC / security experience at Fairfield University.

All site content (projects, skills, courses, personal info) lives in `src/data/`.

---

## Local Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Deployment | Vercel (auto-deploy on push to `main`) |
| Fonts | Syne (display), JetBrains Mono (code/labels) |

---

## Design System

Dark terminal aesthetic — intentional, minimal, no fluff.

- **Background:** `#0a0d0f`
- **Primary accent (green):** `#2ec87a` — ML / AI work
- **Secondary accent (blue):** `#5ab4d6` — NLP / research
- **Tertiary accent (amber):** `#e8a83a` — SOC / security operations
- Left-border accent bars distinguish card types by role category
- Monospace labels on all metadata

---

## Structure

```
src/app/            layout, global styles, single page (/)
src/components/     BootOverlay, CmdTerminal, OrbitalWheel
src/data/           projects, skills, courses, personal info
```

---

## Contact

**Reid W. VanTrieste**
📧 Reidvantrieste@gmail.com
📞 610-314-1880
🔗 [linkedin.com/in/reidvantrieste](https://www.linkedin.com/in/reidvantrieste/)
📍 Philadelphia, PA area
