# Project Dashboard

Setup

- npm i
- npm run dev
- npm run test

Features implemented (MVP)

- Routes: /, /projects, /projects/:id
- Projects list: search (debounced), filter by status, sort by last updated or open tasks
- Project detail: view tasks, toggle task status, add task (title required)
- Dark mode with persistence (localStorage)
- Basic accessibility: labeled inputs, focus outlines

Trade-offs / notes

- No backend: data fetched from /public/data JSON; new tasks are local-only.
- Minimal styling without Tailwind for simplicity.
