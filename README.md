# languagesafter60-website

Languages After 60 — a working record of what an experienced musician and
technologist is learning after 60, starting with Russian and piano.

> Keep your mind active. Find your voice. Learn something new.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, design tokens declared in `app/globals.css` |
| Persistence | `localStorage` only — no database, no accounts, no server runtime |
| Audio | Browser `speechSynthesis` (`ru-RU`), with graceful fallback |
| Package manager | npm (`package-lock.json`) |

There are no runtime dependencies beyond Next, React, and React DOM.

## Getting started

```bash
npm install
npm run dev
```

The site runs at <http://localhost:3000>.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build **and static export** — writes `out/` |
| `npm run preview` | Serve the exported `out/` as plain static files |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |

There is no `start` script: `next start` is not compatible with
`output: "export"`. Use `npm run preview` to check the built site locally.

## Deployment — Cloudflare Pages

The site is a static export (`output: "export"` in `next.config.ts`), so it
needs no Node runtime at request time.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | **22** — pinned in `.nvmrc` (Next 15 requires `^18.18.0 \|\| ^19.8.0 \|\| >=20.0.0`) |

`.nvmrc` pins Node 22 for both local development (`nvm use`) and the Cloudflare
Pages build. If a Pages project ignores it, set a `NODE_VERSION` environment
variable to `22` instead.

Cloudflare Pages resolves clean URLs to the exported `.html` files and serves
`404.html` for unknown paths, so no `_redirects` file is needed.

## Routes

| Route | Contents |
| --- | --- |
| `/` | What the project is, who Alex is, and the two active tracks |
| `/learn/russian` | Three beginner Russian lessons — the interactive course |
| `/music/piano` | The 90-day piano experiment and its weekly checkpoints |
| `/story/spanish` | What learning Spanish taught, and how it applies to Russian |
| `/about` | The project, its structure, and what it does not claim |

## Project structure

```
app/                     Routes (App Router)
components/              Presentation components
  russian/               The Russian course interface
lib/
  russian/lessons.ts     Lesson content — data only, no React
  russian/progress.ts    localStorage read/write, defensively wrapped
  russian/use-speech.ts  speechSynthesis hook with capability detection
  piano/plan.ts          The 90-day plan as data
  site.ts                Site constants and navigation
```

Content is kept out of presentation on purpose: lesson phrases, quiz questions,
and the piano plan can all be edited without touching layout code.

## Notes

- **Progress** is stored under the `la60.russian.progress.v1` key in the
  visitor's own browser. Nothing is transmitted anywhere.
- **Pronunciation playback** depends on the voices installed on the visitor's
  device. The interface detects three states — no speech synthesis at all, no
  Russian voice available, and ready — and explains the situation rather than
  presenting a control that silently does nothing.
- **Health claims.** This project makes no claim that language or music
  learning prevents, treats, or reverses any medical or cognitive condition.
  See `/about`.
