
## `references/methodology.md`

```md
# methodology.md

## Objective

The objective is not to trade.

The objective is to produce a disciplined market report that helps the user understand:
- what the stock is doing
- why it may be doing it
- what scenarios are plausible
- how confidence changes across time horizons
- what changed from the prior report if prior context exists

---

## Method overview

Use this pipeline:

Scan
→ Multi-Agent Research
→ Multi-Agent Debate
→ Confidence Breakdown
→ Narrative Change Detection
→ Signal Synthesis
→ Validation

---

## 1. Scan

Purpose:
Quickly identify the stock’s current market state.

Questions:
- Is price trending, reversing, ranging, breaking out, or breaking down?
- Is volatility calm, elevated, or stressed?
- Is the move mostly stock-specific, sector-driven, or macro-driven?
- Is there enough evidence for a full report?

Output:
A concise market-state snapshot.

---

## 2. Multi-Agent Research

Purpose:
Build context using multiple source types without treating all sources equally.

### Research agents

#### A. Market Data Agent
Role:
- interpret price action
- identify trend structure
- identify abnormal movement
- compare with benchmark or sector when useful

Weight:
Highest

#### B. News & Macro Agent
Role:
- identify economic, policy, earnings, or geopolitical drivers
- detect whether macro context supports or weakens the move

Weight:
Very high

#### C. Institutional Agent
Role:
- summarize analyst or institutional-style interpretation when supported
- identify broader market positioning themes

Weight:
High

#### D. Technical Narrative Agent
Role:
- summarize common technical narratives from chart-focused communities, trading portals, or blogs
- detect crowded chart interpretations

Weight:
Medium-low

Rule:
Treat these as interpretation, not fact.

#### E. Social Sentiment Agent
Role:
- detect crowd optimism, fear, or crowded positioning
- identify retail-style narrative pressure

Weight:
Low

Rule:
Sentiment must never override stronger evidence from price, macro, or confirmed catalysts.

---

## Source hierarchy

When evidence conflicts, use this order:

1. Market Data
2. News & Macro
3. Institutional
4. Technical Narrative
5. Social Sentiment

Lower-tier sources may adjust confidence, but should not define the primary direction on their own.

---

## 3. Multi-Agent Debate

Purpose:
Force the system to test both sides before concluding.

### Bull Agent
Task:
- argue the strongest upside case
- identify supporting evidence
- identify upside triggers
- identify weaknesses in the bull case

### Bear Agent
Task:
- argue the strongest downside case
- identify supporting evidence
- identify downside triggers
- identify weaknesses in the bear case

### Adjudicator Agent
Task:
- compare the bull and bear cases
- decide which side is better supported
- identify unresolved uncertainty
- explain how the debate affects confidence

Rules:
- all agents must use evidence
- no invented catalysts
- no fake certainty
- the adjudicator must explicitly state uncertainty when evidence is mixed

---

## 4. Confidence Breakdown

Purpose:
Show where confidence comes from.

Each of these should provide:
- stance
- confidence score from 0 to 100
- short rationale

Required agent confidence entries:
- Market Data Agent
- News & Macro Agent
- Institutional Agent
- Technical Narrative Agent
- Social Sentiment Agent
- Bull Agent
- Bear Agent
- Adjudicator Agent

Allowed stance values:
- bullish
- bearish
- neutral
- mixed

Important:
This is a transparency layer, not a claim of mathematical precision.

---

## 5. Narrative Change Detection

Purpose:
Track what changed relative to the last report.

If a prior report exists, compare:
- direction
- confidence
- dominant narrative
- major risks
- key support and resistance
- trend and volatility state

Classify the relationship as:
- strengthening
- weakening
- unchanged
- rotating
- diverging

Definitions:
- strengthening = same thesis, stronger evidence
- weakening = same thesis, weaker evidence
- unchanged = little meaningful change
- rotating = thesis changed in character
- diverging = price and narrative are moving in different directions

If prior report context does not exist:
- explicitly state that narrative change is unavailable

Do not fabricate prior context.

---

## 6. Signal Synthesis

Purpose:
Translate the evidence into a clear multi-horizon report.

Required horizons:
- 1D
- 5D
- 1mo
- 1Y

For each horizon, evaluate four pillars.

### A. Trend score (35%)
Questions:
- Is the directional structure constructive or deteriorating?
- Is price behaving well relative to key levels?
- Is relative strength improving or weakening?

### B. Momentum score (25%)
Questions:
- Is the move accelerating, fading, or stabilizing?
- Is there follow-through?
- Are short- and medium-term signals aligned?

### C. Regime score (20%)
Questions:
- Is the volatility environment supportive or disruptive?
- Is the current regime stable or headline-sensitive?
- Does the current regime increase or reduce confidence?

### D. Context score (20%)
Questions:
- Are macro, sector, and narrative drivers supportive?
- Are higher-quality agents aligned?
- Is there meaningful disagreement across agents?

### Confidence formula
Overall confidence should be guided by:

- Trend: 35%
- Momentum: 25%
- Regime: 20%
- Context: 20%

This does not require rigid arithmetic in every case, but the final confidence must be consistent with these weights.

---

## Direction labels

Use only:
- BUY
- LEAN BULLISH
- NEUTRAL
- LEAN BEARISH
- SELL

Suggested mapping:
- BUY = strong positive evidence alignment
- LEAN BULLISH = moderately positive but imperfect alignment
- NEUTRAL = mixed evidence
- LEAN BEARISH = moderately negative but imperfect alignment
- SELL = strong negative evidence alignment

---

## Confidence bands

- 70–100 = strong evidence alignment
- 60–69 = moderate alignment
- 50–59 = mixed evidence
- below 50 = weak signal

---

## 7. Scenario Matrix

Purpose:
Represent uncertainty honestly.

Create:
- bull
- base
- bear
- tail risk

Each scenario should include:
- target price or range
- approximate probability
- trigger
- short narrative

Rules:
- avoid false precision
- probabilities should be directionally reasonable
- base case is usually the default highest-probability case unless evidence is strongly asymmetric
- tail risk should be low-probability but high-impact

---

## 8. Validation

Before finalizing the report, check:
- are all required sections present?
- are all confidence levels plausible?
- are there unsupported claims?
- is missing data acknowledged?
- is the summary consistent with the details?
- is execution language absent?
- is the disclaimer present?

---

## Design principles

1. Evidence over hype
2. Structure over indicator overload
3. Uncertainty over fake certainty
4. Multi-horizon thinking over one big call
5. Stronger sources override weaker sources
6. Debate improves synthesis
7. Dashboard clarity matters