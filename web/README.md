# Market Report — Web App

Next.js frontend for the market-report prompt spec in `../market-report-app/`.

## Setup

```bash
cd web
cp .env.local.example .env.local   # then paste your ANTHROPIC_API_KEY
npm install
npm run dev
```

Open http://localhost:3000.

## How it works

- `app/api/report/route.ts` reads the three spec files (`CLAUDE.md`, `references/methodology.md`, `references/report_schema.md`) and sends them as a cached system prompt to Claude Opus 4.7.
- The model uses the built-in `web_search` tool for live market data.
- The model returns a single self-contained HTML document, streamed back to the page and rendered in a sandboxed iframe.
- First call warms the prompt cache; subsequent calls re-use it (~90% cost reduction on the system prompt).

## Deploy

Works out of the box on Vercel. Set `ANTHROPIC_API_KEY` as an env var. Note `maxDuration = 300` in the API route — needs Pro plan for anything over 60s.
