# report_schema.md

## Canonical report structure

Every full report should contain these sections in this order:

1. metadata
2. market_data
3. benchmark_context
4. horizon_signals
5. debate_layer
6. agent_confidence_breakdown
7. narrative_change
8. scenario_matrix
9. macro_drivers
10. risk_watchlist
11. signal_summary
12. disclaimer

If a section cannot be fully populated, include it and state what is unavailable.
Do not silently omit required sections.

---

## 1. metadata

Required fields:
- ticker
- report_title
- report_date
- generated_at
- data_source
- currency
- timezone

Example structure:
```json
{
  "ticker": "NVDA",
  "report_title": "NVDA Market Dashboard",
  "report_date": "2026-04-19",
  "generated_at": "2026-04-19T10:30:00-07:00",
  "data_source": "Yahoo Finance MCP",
  "currency": "USD",
  "timezone": "America/Los_Angeles"
}