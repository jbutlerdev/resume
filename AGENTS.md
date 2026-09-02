# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

A personal portfolio / resume website for Jeremiah Butler ([jbutler.dev](https://jbutler.dev)).
A single-page React app based on the [Tim Baker react-resume-template](https://github.com/tbakerx/react-resume-template).

All content is data-driven: the resume, portfolio, and header/footer copy come from
`public/resumeData.json`, loaded at runtime and split into React components.

## Stack

- **React 18** + **react-scripts 5.0.1** (CRA 5, webpack 5)
- **react-ga 3** — Google Analytics pageview on mount
- Static layout assets in `public/` (legacy HTML-template CSS/JS: flexslider, magnific-popup, etc.)

No build-time code splitting, no backend, no server-side anything. It's a static site.

## Commands

Run from the repo root.

```bash
npm install            # install deps (node_modules is gitignored)
npm start              # dev server with hot reload → http://localhost:3000
npm run build          # production build → build/
npm test               # single smoke test (src/App.test.js, jsdom)
```

Dev server needs `node_modules` present and port 3000 free. If a stale background
server is on 3000: `pkill -f react-scripts`.

## Layout

```
public/            Static assets served as-is
  index.html       HTML shell; React mounts into <div id="root">
  resumeData.json  THE content — all resume/portfolio/site text lives here
  css/ js/ images/  legacy template assets (do not edit unless asked)
  manifest.json    PWA manifest
src/               React app
  index.js         entry point — createRoot + render <App/>
  App.js           root component; fetches /resumeData.json, wires up GA
  App.test.js      smoke test
  Components/      Header, About, Resume, Portfolio, Footer (each renders a slice of the data)
  App.css, index.css
docs/              previous committed production build output (gitignored in spirit; not source)
Dockerfile         multi-stage: node:20 `npm ci` + build → nginx:alpine serving build/
build-app.sh       legacy podman build helper (predates the current Dockerfile)
```

## How changes usually work

- **Edit content**: change `public/resumeData.json`. The React components read from
  `data.main`, `data.resume`, and `data.portfolio` (see `src/App.js`).
- **Edit look/structure**: the `src/Components/*.js` class components and the
  CSS in `public/css/`.
- Components are intentionally simple presentational `Component` classes taking
  a `data` prop. Keep new components in the same shape unless asked otherwise.

## Gotchas / conventions

- `react-scripts start` uses **CRA conventions**: `public/index.html` is the HTML
  template (not `index.html` at root); assets in `public/` are copied through.
- `react-ga` is initialized in `App.js` with a hardcoded UA id — do not log real
  user identifiers; only pageview/`event` calls.
- `public/` contains an old jQuery 1.10.2 CDN reference and template JS
  (`flexslider`, `waypoints`, etc.). These are leftover from the HTML template;
  the React app does **not** depend on jQuery. Leave them unless told to clean up.
- Production deploys to GitHub Pages (`CNAME` = `jbutler.dev`); the `docs/` folder
  mirrors the built site. Rebuild with `npm run build` before committing deploy artifacts
  only when explicitly asked to update the deployable build.

## Recent modernization (branch `modernize-deps`)

- Upgraded react/react-dom 16 → 18.3.1, react-scripts 1 → 5.0.1, react-ga 2 → 3.
- Dropped jQuery (single `$.ajax` call replaced with `fetch`).
- `ReactDOM.render` → `createRoot`.
- Removed stale CRA-3 service-worker registration.
- Dockerfile simplified to `node:20` + `npm ci` + `nginx:alpine`.
