# Market Report Dashboard (Claude Skill Framework)

A structured multi-agent market analysis system designed to generate **dashboard-style HTML reports** instead of chat responses.

## 🚀 What this does

* Generates **multi-horizon stock analysis** (1D, 5D, 1mo, 1Y)
* Uses **multi-agent intelligence**:

  * Market Data
  * News & Macro
  * Institutional
  * Technical Narrative (TradingView/blogs)
  * Social Sentiment
* Includes:

  * Bull vs Bear debate
  * Confidence breakdown by agent
  * Scenario matrix
  * Narrative change detection
* Outputs a **standalone HTML dashboard**

## 🧠 Architecture

```
Scan
→ Multi-Agent Research
→ Debate Layer
→ Confidence Breakdown
→ Narrative Change
→ Signal Synthesis
→ Validation
→ HTML Render
```

## 📂 Files

* `SKILL.md` → Main orchestrator (used in Claude)
* `references/methodology.md` → Analysis framework
* `references/report_schema.md` → Output structure
* `templates/` → (optional) HTML templates
* `examples/` → Example outputs

## ⚙️ How to use in Claude

1. Create a Claude Project
2. Paste `SKILL.md` into the project instructions
3. Upload:

   * `methodology.md`
   * `report_schema.md`
4. Run:

```
Generate a dashboard report for NVDA
```

## ⚠️ Disclaimer

This project is for educational and analytical purposes only.
It does not provide financial advice or trading instructions.
