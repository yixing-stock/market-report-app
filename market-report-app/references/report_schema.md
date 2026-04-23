# report_schema.md

## Design Principle

This schema defines the structured data model for all reports.

It is:
- UI-agnostic
- consistent across single and multi-ticker reports
- optimized for dashboard rendering
- source-aware
- history-aware without forcing the user to open prior reports

It must NOT include:
- CSS classes
- colors
- layout instructions
- visual framework logic

---

## Top-level structure

Every report must include:

1. metadata  
2. market_data (single ticker) OR watchlist_summary (multi-ticker)  
3. horizon_signals  
4. research_agents  
5. debate_layer  
6. agent_confidence_breakdown  
7. narrative_change  
8. scenario_matrix  
9. macro_drivers  
10. risk_watchlist  
11. signal_summary  
12. disclaimer  

Optional:
- ticker_snapshot_card (multi-ticker)
- cross_ticker_comparison (multi-ticker)

---

## 1. metadata

Required fields:
- ticker OR tickers
- report_title
- report_date
- generated_at
- data_source
- currency
- timezone

Optional:
- prior_report_available (true/false)
- prior_report_reference
- generation_mode (single_ticker / watchlist)

---

## 2A. market_data (single ticker)

Required fields:
- last_price
- previous_close
- percent_change
- day_range
- fifty_two_week_range
- volume
- average_volume
- market_cap

Optional:
- pe_ratio
- beta
- dividend_yield

Rule:
Missing values must be null, never fabricated.

---

## 2B. watchlist_summary (multi-ticker)

Fields per ticker:
- ticker
- last_price
- percent_change
- direction_1d
- direction_5d
- direction_1mo
- direction_1y
- overall_confidence
- best_horizon
- primary_risk
- ranking_score
- conviction_label

Purpose:
Supports top-level comparison table in watchlist dashboards.

---

## 3. horizon_signals

Required horizons:
- 1D
- 5D
- 1mo
- 1Y

Each horizon must include:
- direction
- confidence
- trend_score
- momentum_score
- regime_score
- context_score
- expected_move_pct
- support_levels
- resistance_levels
- hold_label
- narrative

Allowed direction values:
- BUY
- LEAN BULLISH
- NEUTRAL
- LEAN BEARISH
- SELL

---

## 4. research_agents

Required entries:
- market_data_agent
- news_macro_agent
- institutional_agent
- technical_narrative_agent
- social_sentiment_agent

Each agent must include:

### Core fields
- stance
- score
- summary

### Notes block
- notes (array of short bullet-style notes)
- note_change_labels (array matching the notes, using:
  - UNCHANGED
  - IMPROVED
  - WEAKENED
  - NEW
  - REMOVED)

### Prior context snapshot
This is used so the user does not need to open prior reports.

Fields:
- prior_context_available (true/false)
- prior_context_snapshot_summary
- prior_key_points (array)
- prior_reference_date

Rule:
If the current notes refer to prior state, include enough prior context inline so the report is understandable on its own.

### Sources
- sources (array)

Each source object must include:
- title
- url
- source_type
- relevance
- note

Allowed source_type values:
- market_data
- news
- macro
- institutional
- blog
- trading_portal
- social
- company_filing
- official_release
- other

Allowed relevance values:
- high
- medium
- low

Rules:
- use 2 to 4 curated sources per agent when available
- do not dump excessive links
- source note should explain why the link matters
- sources should support the summary, not just exist as filler

Example source object:
```json
{
  "title": "Reuters - Fed officials signal patience on rates",
  "url": "https://example.com",
  "source_type": "news",
  "relevance": "high",
  "note": "Supports neutral-to-cautious macro stance for the current cycle."
}
