# Market Report App

## Purpose
This repository generates dashboard-style stock market reports as structured artifacts.

The goal is:
- understand the stock
- explain the drivers
- compare multiple time horizons
- present the result in a dashboard-style HTML output

This repository is for analysis only.

Do not:
- place trades
- provide execution instructions
- provide broker-specific workflows
- use bankroll sizing or position sizing
- claim certainty when evidence is mixed

Always include:
"Educational only. Not financial advice."

---

## Core references

Always follow these files:

- `references/methodology.md` for analysis rules
- `references/report_schema.md` for required report structure

Do not invent a different methodology or structure unless explicitly asked to revise the framework.

---

## Required workflow

For any market-report task, follow this sequence:

1. Gather available market data for the requested ticker
2. Apply the methodology in `references/methodology.md`
3. Build a structured internal report object matching `references/report_schema.md`
4. Validate the report for consistency and unsupported claims
5. Render the final result as a clean standalone HTML dashboard when asked for an artifact

Do not skip the structured report object step.

---

## Analysis priorities

Prioritize:
1. price behavior
2. benchmark / sector context
3. macro and event context
4. technical structure
5. sentiment and external narratives

Lower-quality narrative sources must not override stronger evidence from price or macro data.

---

## Multi-agent requirements

Use the following internal agents when enough information is available:

- Market Data Agent
- News & Macro Agent
- Institutional Agent
- Technical Narrative Agent
- Social Sentiment Agent

Then run:
- Bull Agent
- Bear Agent
- Adjudicator Agent

Use these to improve reasoning, not to create fake precision.

---

## Output style

Outputs should be:
- concise
- structured
- professional
- dashboard-like
- explicit about uncertainty

Avoid long conversational prose unless the user asks for explanation.

---

## Required report sections

Every full report should aim to include:

- metadata
- market data snapshot
- multi-horizon signals
- debate layer
- confidence breakdown
- narrative change
- scenario matrix
- macro drivers
- risk watchlist
- signal summary
- disclaimer

Follow the exact required fields in `references/report_schema.md`.

---

## Validation rules

Before finalizing any report:
- remove execution language
- remove unsupported claims
- acknowledge missing data
- ensure confidence matches evidence
- ensure the summary matches the detailed sections
- ensure the disclaimer is present

If prior-report context does not exist, state that narrative change is unavailable instead of fabricating it.