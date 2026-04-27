# reid-portfolio-v2

Full portfolio site for Reid VanTrieste — CS @ Fairfield '26. Sister site to the one-page resume site (`resume-reidvt`). Built as a multi-page Next.js app with Tailwind, TypeScript, and Framer Motion.

Live: _deploy target is `reidvantrieste.dev` (or `projects.reidvantrieste.dev`)_ · Deployed on Vercel

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom design tokens — see `tailwind.config.ts`)
- **Framer Motion** (all animation — no CSS keyframe hacks besides the cursor blink)

## Pages

```
/              hero + animated terminal intro + featured projects
/projects      all 8 projects with filterable tags, expandable detail modals
/skills        skills matrix grouped by domain (ML, security, web, systems, foundations)
/education     course grid with per-course skill breakdown (click to expand)
/contact       contact form + direct links (email, phone, LinkedIn, GitHub)
```

## Design system

Strict dark-terminal aesthetic. No gradients, no glows, no big border radii. All card types get a 3px left-border accent bar color-coded by domain:

| Accent | Hex       | Meaning                 |
| ------ | --------- | ----------------------- |
| green  | `#2ec87a` | ML / active             |
| blue   | `#5ab4d6` | NLP / web / research    |
| amber  | `#e8a83a` | Security / SOC / systems |

Fonts: `Syne` (display + body) · `JetBrains Mono` (labels, metadata, code).

## Data

All project, skill, and course content lives in `src/data/`:

- `personal.ts` — name, email, phone, socials, resume paths
- `projects.ts` — the 8 projects (single source of truth)
- `skills.ts` — skill groups + proficiency levels for the skills matrix
- `courses.ts` — Fairfield coursework + per-course skills

Update these files to change site content. Nothing is hardcoded inside components.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push this repo to GitHub as a new repo (e.g. `reid-portfolio-v2` or `portfolio-full`) under the `reidvt` account.
2. Import the repo into Vercel on the `reidvts-projects` account.
3. Vercel will auto-detect Next.js — no config needed.
4. Set the production domain to `reidvantrieste.dev` (or a subdomain) in Vercel → Project → Settings → Domains.
5. Subsequent pushes to `main` auto-deploy.

**Do not** overwrite or redirect the existing `resume-reidvt` project — this is a second, separate Vercel project.

## TODO before shipping

- [ ] Drop `resume-ml.pdf` and `resume-security.pdf` into `public/` (placeholders are referenced but not committed)
- [ ] Confirm GitHub handle `reidvt` and update `src/data/personal.ts` if different
- [ ] Add real GitHub repo URLs to `src/data/projects.ts` (currently `githubStatus: "tbd"` for most)
- [ ] Optional: wire up a real contact form backend (currently falls back to `mailto:`) — Resend, Formspree, or a Next.js API route
- [ ] Optional: add OG image to `public/og.png` and reference it in `src/app/layout.tsx` metadata

## File map

```
src/
  app/
    layout.tsx            — root layout, loads Nav + Footer + globals.css
    page.tsx              — home
    globals.css           — design tokens, scrollbar, cursor, grid bg
    projects/page.tsx
    skills/page.tsx
    education/page.tsx
    contact/page.tsx
  components/
    Nav.tsx               — sticky nav, scroll blur, mobile hamburger
    Footer.tsx
    TerminalHero.tsx      — typewriter effect cycling 4 roles
    AnimatedSection.tsx   — Framer Motion whileInView wrapper
    FeaturedProjects.tsx  — client bridge for home-page featured grid
    ProjectsGrid.tsx      — filter + grid + modal controller
    ProjectCard.tsx
    ProjectFilter.tsx
    ProjectModal.tsx
    SkillBar.tsx
    CourseCard.tsx        — expandable
    ContactForm.tsx
  data/
    personal.ts
    projects.ts
    skills.ts
    courses.ts
  lib/
    utils.ts              — cn(), accent color helpers
```
