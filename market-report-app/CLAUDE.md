# Market Report App

## Purpose

This repository generates structured, dashboard-style stock market reports as HTML artifacts.

The system is designed to help the user:
- understand what a stock or watchlist is doing
- explain why it may be doing it
- compare multiple time horizons
- inspect bull vs bear cases
- review confidence by agent
- inspect supporting research links
- track scenario analysis
- understand what changed since the prior cycle without opening a previous report
- present outputs in a professional, Bloomberg-inspired dashboard style

This repository is for analytical reporting only.

Do NOT:
- place trades
- provide execution instructions
- simulate brokerage workflows
- recommend position sizing
- give direct financial advice
- claim certainty when evidence is mixed
- treat sentiment, blogs, or trading portals as authoritative facts

Always include:
"Educational only. Not financial advice."

---

## Core References

Always follow:

- `references/methodology.md`
- `references/report_schema.md`

These files define:
- how analysis should be performed
- how outputs should be structured

Do not invent a different methodology or schema unless explicitly asked to revise the framework.

---

## Required Workflow

For any report-generation task, follow this sequence:

1. Gather available market data for the requested ticker or tickers
2. Apply the methodology in `references/methodology.md`
3. Build a structured internal report object matching `references/report_schema.md`
4. Validate the report for consistency and unsupported claims
5. Render the final result as a clean standalone HTML dashboard when asked for an artifact or when using command mode

Do not skip the structured report object step.

---

## Evidence Hierarchy

Prioritize evidence in this order:

1. price behavior and market data
2. benchmark / sector context
3. macro and event context
4. technical structure
5. institutional interpretation
6. technical-narrative commentary from trading portals or blogs
7. sentiment and social narratives

Lower-quality narrative sources must not override stronger evidence from price, benchmark, macro, or official releases.

---

## Multi-Agent Requirements

Use the following internal agents when enough information is available.

### Research agents
- Market Data Agent
- News & Macro Agent
- Institutional Agent
- Technical Narrative Agent
- Social Sentiment Agent

### Debate agents
- Bull Agent
- Bear Agent
- Adjudicator Agent

Use these agents to improve reasoning, not to create fake precision.

---

## Source Collection Rules

For each research agent, collect curated supporting sources when available.

### Required source behavior
- attach 2 to 4 curated sources per agent when available
- prefer high-signal links over many links
- include title, URL, source type, relevance, and short note
- ensure the source note explains why the source matters
- do not attach filler links
- do not attach duplicate links unless there is a strong reason

### Reliability rules
Prefer:
- official releases
- market data sources
- major financial news
- primary company materials
- institutional-quality summaries

Use lower-confidence sources only as secondary context:
- blogs
- trading portals
- social sentiment pages

Never let weaker source tiers override stronger evidence.

---

## Inline Prior Context Rules

If a note refers to prior state, the report must remain understandable without opening previous reports.

### Required behavior
When referencing prior state:
- include explicit change labels such as:
  - UNCHANGED
  - IMPROVED
  - WEAKENED
  - NEW
  - REMOVED
- include a short prior context snapshot inside the current report
- include enough prior context that the user does not need to look up older reports

### Bad example
- "No new catalyst"
- "Risk still unresolved"

### Good example
- "No new catalyst (UNCHANGED since prior cycle)"
- "Iran risk remains unresolved (UNCHANGED)"
- "No new macro releases since the last update"

### Prior context snapshot behavior
For each agent, when prior context exists, include:
- short prior summary
- prior key points
- prior reference date

If no prior context exists:
- state that prior context is unavailable
- do not fabricate history

---

## Output Style

Outputs should be:
- concise
- structured
- professional
- dashboard-like
- explicit about uncertainty
- compact rather than overly chatty

Avoid long conversational prose unless the user explicitly asks for deeper explanation.

---

## Required Report Sections

Every full report should aim to include:

- metadata
- market data snapshot or watchlist summary
- benchmark context when useful
- multi-horizon signals
- research agents section
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

## Validation Rules

Before finalizing any report:
- remove execution language
- remove unsupported claims
- acknowledge missing data explicitly
- ensure confidence matches evidence
- ensure the summary matches the detailed sections
- ensure the disclaimer is present
- ensure weaker sources do not override stronger sources
- ensure the structured report object aligns with the schema
- ensure source links are attached where available
- ensure prior-state references are self-contained and understandable

If prior-report context does not exist, state that narrative change is unavailable instead of fabricating it.

---

## Bloomberg-Style Dashboard UI Rules

When rendering HTML dashboards, use a Bloomberg-inspired interface style.

Design goals:
- dark background
- compact information-dense layout
- professional financial-terminal feel
- fast scanning for one or many tickers
- minimal decoration
- strong visual hierarchy

Visual style:
- background: near-black or dark charcoal
- panels: slightly lighter dark gray
- text: off-white / light gray
- accent colors:
  - green for bullish / positive
  - muted green for lean bullish
  - amber for neutral / caution
  - orange for lean bearish
  - red for bearish / negative
  - blue only for metadata or informational labels
- avoid gradients, playful consumer-app styling, and oversized rounded cards
- prefer crisp borders and compact spacing

Typography:
- clean sans-serif
- small-to-medium font sizes
- strong headers
- uppercase labels where useful
- tight but readable spacing

Layout:
- table-first for watchlists
- compact metric row near the top
- clear comparison across horizons
- concise ticker panels
- avoid excessive prose blocks

Do not:
- imitate Bloomberg branding or logos
- use cluttered neon hacker aesthetics
- make the page look like a retail consumer finance app
- overuse charts when tables communicate more effectively

---

## Research Agent UI Rules

In HTML, the research agent section should support source inspection and self-contained context.

### Required UI behavior
For each agent panel, show:
- agent name
- stance badge
- score
- summary
- notes
- prior context snapshot when available
- expandable sources section

### Source expansion behavior
Use collapsible sections for sources.
Preferred implementation:
- native HTML `<details>` and `<summary>`
- no heavy JavaScript required

### Example UI pattern
Each agent should have an expandable area such as:
- View sources
- View prior context
- View notes

### Notes behavior
Notes should be understandable standalone.
Do not write vague updates that require reading older reports.

### Preferred note style
- bullet-based
- compact
- explicitly labeled with change markers when relevant

---

## Rendering Rules

When rendering HTML:
- produce a complete standalone HTML file
- use inline CSS unless otherwise requested
- use no external libraries unless explicitly requested
- optimize for desktop viewing first
- prefer CSS grid and flexbox
- make files easy to open locally in a browser
- prefer compact tables and panels over long narrative cards
- ensure links are clickable and open in a new tab where appropriate

### Single ticker page structure
1. Header bar
2. Key metrics row
3. Multi-horizon signal strip
4. Research agents section with expandable sources
5. Debate panel
6. Confidence breakdown panel
7. Scenario matrix
8. Macro drivers and risk watchlist
9. Disclaimer footer

### Watchlist page structure
1. Header bar
2. Ranked watchlist summary table
3. Ticker snapshot grid
4. Cross-ticker comparison panel
5. Shared macro drivers
6. Compact per-ticker breakdowns
7. Research agent summaries where useful
8. Disclaimer footer

---

## File Safety Rules (Strict — No Overwrite)

When creating HTML reports:

- NEVER overwrite existing HTML files
- ALWAYS create a new versioned file
- DO NOT create a base report file without a numeric suffix
- if an existing file path is already present, create the next numbered version instead

### Single ticker naming convention

Use:

`examples/<TICKER>_report_YYYYMMDD_<N>.html`

Example:

`examples/NVDA_report_20260422_1.html`

### Watchlist naming convention

Use:

`examples/watchlist_report_YYYYMMDD_<N>.html`

Example:

`examples/watchlist_report_20260422_1.html`

### Versioning logic

When generating a report:

1. Determine today's date in `YYYYMMDD` format
2. Check existing files for the same ticker and date
3. Find the highest existing version number
4. Increment by 1
5. If no file exists for that ticker/date, start at `_1`

Examples:
- `NVDA_report_20260422_1.html`
- `NVDA_report_20260422_2.html`
- `NVDA_report_20260422_3.html`

Same logic for watchlists:
- `watchlist_report_20260422_1.html`
- `watchlist_report_20260422_2.html`

### Template files

For reusable templates, default path is:

`templates/report_template.html`

If that file already exists and a new template is being created rather than updated explicitly, create:
- `templates/report_template_v2.html`
- `templates/report_template_v3.html`

### Exception

Only overwrite an existing file if the user explicitly says:
- "overwrite"
- "replace"
- "update existing file"

Otherwise, always create a new version.

---

## File Creation Rules

When creating files:
- create missing folders if needed
- prefer saving report artifacts into `examples/`
- prefer saving reusable page layouts into `templates/`
- do not overwrite important files unless explicitly instructed
- preserve prior report history through naming conventions

Recommended paths:
- single report: `examples/<TICKER>_report_YYYYMMDD_<N>.html`
- watchlist report: `examples/watchlist_report_YYYYMMDD_<N>.html`
- reusable template: `templates/report_template.html`

---

## Command Interface

You support simplified user commands.

When a command is used, execute it directly instead of asking unnecessary follow-up questions.

Commands are case-insensitive and may include extra spaces.

---

### Command: report <TICKER>

Example:
`report NVDA`

When the user inputs:
`report <TICKER>`

You must:

1. Parse the ticker symbol
2. Read:
   - `CLAUDE.md`
   - `references/methodology.md`
   - `references/report_schema.md`
3. Run the full workflow:
   - Scan
   - Multi-Agent Research
   - Multi-Agent Debate
   - Confidence Breakdown
   - Narrative Change Detection
   - Signal Synthesis
   - Validation
4. Build the structured report object using `references/report_schema.md`
5. Render a clean standalone HTML dashboard
6. Save output using the strict versioned naming rule:
   - `examples/<TICKER>_report_YYYYMMDD_<N>.html`
7. Return:
   - file path
   - one-line summary with direction and confidence

By default, render single-ticker reports in a Bloomberg-inspired professional dashboard style unless the user requests otherwise.

---

### Command: watchlist <TICKERS>

Example:
`watchlist NVDA, TSLA, MSFT`

When the user inputs:
`watchlist <TICKERS>`

You must:

1. Parse all ticker symbols
2. Generate a full structured report object for each ticker using the standard methodology
3. Create a combined dashboard that includes:
   - a ranked watchlist summary table
   - one ticker snapshot card per ticker
   - direction and confidence comparison across all tickers
   - best-supported horizon per ticker
   - primary risks per ticker
   - compact bull/base/bear style summary per ticker when space allows
   - shared macro cross-currents if relevant
4. Save the combined dashboard using the strict versioned naming rule:
   - `examples/watchlist_report_YYYYMMDD_<N>.html`
5. Also, when useful, save individual ticker reports using:
   - `examples/<TICKER>_report_YYYYMMDD_<N>.html`
6. Return:
   - combined output path
   - ranked list of tickers by overall confidence or strength of setup

### Watchlist ranking rules
For watchlists:
- compare tickers on overall confidence
- compare best-supported horizon
- compare primary direction
- highlight strongest and weakest setups
- keep the top section compact and scannable

### Watchlist output requirements
The combined watchlist dashboard should include:
- title and timestamp
- watchlist summary table
- ranked signal overview
- ticker cards or compact sections
- key macro cross-currents affecting multiple names
- disclaimer

By default, render watchlist dashboards in a Bloomberg-inspired dark terminal style unless the user requests a different design language.

---

### Command: build-template

Example:
`build-template`

When the user inputs:
`build-template`

You must:
1. Read `references/report_schema.md`
2. Create or update a reusable dashboard template
3. Default path:
   - `templates/report_template.html`
4. Ensure the template supports all major schema sections for both:
   - single ticker reports
   - multi-ticker watchlists
5. Use a Bloomberg-inspired dashboard layout with:
   - summary cards
   - ranked tables
   - labeled sections
   - room for multi-horizon signals
   - room for research agents with expandable sources
   - room for prior context snapshot
   - room for debate layer
   - room for confidence breakdown
   - room for scenario matrix
   - room for macro drivers and risks
6. If `templates/report_template.html` already exists and the user did not explicitly ask to overwrite it, create a new versioned template file instead
7. Return the saved file path

---

### Command: debug-report <TICKER>

Example:
`debug-report NVDA`

When the user inputs:
`debug-report <TICKER>`

You must:
1. Generate the structured report object only
2. Do not render HTML unless explicitly asked
3. Show all major fields from `references/report_schema.md`
4. Highlight:
   - missing data
   - weak evidence areas
   - sections with lower confidence
   - unresolved debate points
   - missing sources if expected
5. Return the structured object in a readable JSON-style format

---

### Command: show-schema

Example:
`show-schema`

When the user inputs:
`show-schema`

You must:
- summarize the current report structure from `references/report_schema.md`
- explain required sections briefly
- identify optional areas that improve dashboard rendering

---

### Command: show-method

Example:
`show-method`

When the user inputs:
`show-method`

You must:
- summarize the methodology from `references/methodology.md`
- explain the multi-agent workflow
- explain how confidence is formed
- explain how narrative change is handled

---

## Command Parsing Rules

When a command is used:
- treat the first token as the command
- treat the rest as command arguments
- be forgiving about spaces after commas
- normalize tickers to uppercase unless there is a clear reason not to
- if a ticker list is supplied, split on commas

Examples:
- `report nvda` → `NVDA`
- `watchlist nvda, tsla, msft` → `NVDA`, `TSLA`, `MSFT`

You may also interpret close variants naturally when user intent is obvious, such as:
- `generate report NVDA`
- `create report NVDA`

These should map to:
- `report <TICKER>`

---

## Single-Ticker Synthesis Rules

For a single ticker report:
- produce a full multi-horizon analysis
- make the research agent layer visible
- include source-backed agent summaries
- include inline prior context where relevant
- make the debate layer visible
- include confidence by agent
- include scenario matrix
- include narrative change if available
- keep the final summary compact and decision-oriented without execution language

---

## Multi-Ticker Synthesis Rules

For watchlist mode:
- maintain consistency of methodology across all tickers
- do not let one ticker’s narrative spill into another unless shared macro context clearly applies
- make cross-ticker comparisons easy to scan
- prefer compact visuals and tables over long prose
- if space is tight, summarize per-ticker debate in compact bullets
- note shared macro drivers once at the top rather than repeating them excessively

---

## Missing-Data Behavior

If some data is unavailable:
- continue with the report when there is enough evidence
- mark unavailable fields explicitly
- reduce confidence appropriately
- do not fabricate analyst, macro, or sentiment inputs
- state when watchlist comparison is limited by uneven data quality
- if sources are unavailable for a specific agent, state that clearly instead of fabricating citations

---

## Revision Behavior

If asked to improve or revise an existing artifact:
- inspect the current file first
- preserve useful structure unless asked for a redesign
- improve clarity, layout, consistency, and schema alignment
- keep file paths stable when possible unless file safety rules require a new version

---

## Preferred Confirmation Style

For command responses, after saving files, use short confirmations such as:

- `Report generated: examples/NVDA_report_20260422_1.html`
- `Watchlist generated: examples/watchlist_report_20260422_1.html`
- `Template updated: templates/report_template.html`

Optionally include one extra line with a brief summary.

---

## Final Reminder

This repository is for analytical dashboard generation only.

It is not for:
- live trade execution
- brokerage automation
- position sizing
- direct financial advice

Always preserve:

"Educational only. Not financial advice."
