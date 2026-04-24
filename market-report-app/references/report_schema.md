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
```

---

## 5. debate_layer

Required entries:
- bull_agent
- bear_agent
- adjudicator_agent

Each agent must include:
- arguments (array of short bullet-style points)
- weaknesses (short note on where the case breaks down)

Adjudicator must also include:
- verdict (which side is better supported)
- unresolved_uncertainty (what remains unclear)
- confidence_impact (how the debate affects the overall confidence score)

---

## 6. agent_confidence_breakdown

Required entries (one per agent):
- market_data_agent
- news_macro_agent
- institutional_agent
- technical_narrative_agent
- social_sentiment_agent
- bull_agent
- bear_agent
- adjudicator_agent

Each entry must include:
- stance (bullish / bearish / neutral / mixed)
- score (0–100)
- rationale (one-line explanation)

Rule:
Confidence scores must be consistent with the evidence described in the research_agents section.
Do not assign high scores when evidence is thin or missing.

---

## 7. narrative_change

Required fields:
- classification (strengthening / weakening / unchanged / rotating / diverging)
- prior_direction
- prior_confidence
- prior_dominant_narrative
- current_direction
- current_confidence
- current_dominant_narrative
- key_changes (array — what specifically changed)
- prior_report_date

Rules:
- If no prior report exists, set classification to "unavailable" and state this explicitly
- Do not fabricate prior context
- Key changes must use explicit labels: UNCHANGED / IMPROVED / WEAKENED / NEW / REMOVED

---

## 8. scenario_matrix

Required scenarios:
- bull
- base
- bear
- tail_risk

Each scenario must include:
- label (bull / base / bear / tail_risk)
- target_price_range (e.g. "$7,300 – $7,500")
- probability (approximate percentage, e.g. "~25%")
- time_horizon (REQUIRED — explicit window the scenario applies to, e.g. "1–3 months")
- trigger (the condition that must materialize for this scenario to activate)
- narrative (short explanation of the path)

Rules:
- All four scenario probabilities must sum to approximately 100%
- time_horizon must be explicitly stated on every scenario — never implicit or buried in narrative prose
- Prefer a consistent time_horizon across all scenarios where possible
- Avoid false precision in price targets — use ranges, not single points
- Base case is usually the highest-probability scenario unless evidence is strongly asymmetric
- Tail risk should be low-probability (typically ≤10%) but high-impact

Example scenario object:
```json
{
  "label": "bull",
  "target_price_range": "$7,300 – $7,500",
  "probability": "~25%",
  "time_horizon": "1–3 months",
  "trigger": "ATH breakout + Fed pivot signal + strong earnings",
  "narrative": "ES=F clears $7,161.50 decisively on volume. Fed hints at rate cut path. Bull case targets $7,300–$7,500 within 1–3 months."
}
```

---

## 9. macro_drivers

Required fields:
- drivers (array)

Each driver must include:
- name (short label)
- detail (one to two sentence explanation)
- direction_impact (bullish / bearish / neutral)

Rules:
- Include 3–6 drivers
- Drivers should be macro, policy, or sector-level — not stock-specific technicals
- Order by impact significance (most impactful first)

---

## 10. risk_watchlist

Required fields:
- risks (array)

Each risk must include:
- name (short label)
- level (HIGH / MEDIUM / LOW)
- note (optional short context)

Rules:
- Include 4–8 risks
- Order by level (HIGH first)
- Do not list risks unsupported by evidence in the report

---

## 11. signal_summary

Required fields:
- overall_direction
- overall_confidence
- best_supported_horizon
- narrative_change_label
- key_points (array of 4–7 summary bullets)

Rules:
- overall_direction and overall_confidence must match the adjudicator_agent verdict
- key_points must be consistent with the detailed sections above
- Do not introduce new claims in signal_summary that are not supported elsewhere in the report

---

## 12. disclaimer

Required text (must appear verbatim or equivalent):
"Educational only. Not financial advice."

Full disclaimer must also include:
- Statement that the report is for informational purposes only
- Statement that it does not constitute investment advice or a recommendation to buy or sell
- Acknowledgment that past performance does not guarantee future results
- Note that data may be delayed
- Note that confidence scores are analytical estimates, not mathematical certainties
