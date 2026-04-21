export function demoHtml(ticker: string): string {
  const T = ticker.toUpperCase();
  const date = new Date().toISOString().slice(0, 10);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${T} Market Dashboard (Demo)</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; font-family: ui-sans-serif, system-ui, sans-serif; background:#0b0d10; color:#e6e8eb; }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 28px; }
  .banner { background:#3b2a00; border:1px solid #8a6a00; color:#ffd98a; padding:10px 14px; border-radius:8px; font-size:13px; margin-bottom:20px; }
  header h1 { margin:0 0 4px; font-size:26px; }
  header .sub { color:#9aa3ad; font-size:13px; }
  .grid { display:grid; grid-template-columns: repeat(12, 1fr); gap:14px; margin-top:20px; }
  .card { background:#14171c; border:1px solid #1f242b; border-radius:12px; padding:16px; }
  .card h3 { margin:0 0 10px; font-size:13px; text-transform:uppercase; letter-spacing:.08em; color:#9aa3ad; }
  .col-4 { grid-column: span 4; } .col-6 { grid-column: span 6; } .col-8 { grid-column: span 8; } .col-12 { grid-column: span 12; }
  .metric { font-size:28px; font-weight:600; }
  .up { color:#5ee6a7; } .down { color:#ff6b7a; } .muted { color:#9aa3ad; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { text-align:left; padding:8px 6px; border-bottom:1px solid #1f242b; }
  th { color:#9aa3ad; font-weight:500; }
  .pill { display:inline-block; padding:3px 8px; border-radius:999px; font-size:11px; border:1px solid #2a313a; color:#c5ccd5; }
  .bar { height:6px; background:#1f242b; border-radius:999px; overflow:hidden; }
  .bar > span { display:block; height:100%; background:#5ee6a7; }
  footer { margin-top:24px; font-size:12px; color:#9aa3ad; }
</style>
</head>
<body>
<div class="wrap">
  <div class="banner">Demo mode — this is sample output. Set <code>ANTHROPIC_API_KEY</code> in <code>web/.env.local</code> for a real report.</div>
  <header>
    <h1>${T} Market Dashboard</h1>
    <div class="sub">Report date ${date} · Currency USD · Data: mock</div>
  </header>

  <div class="grid">
    <div class="card col-4">
      <h3>Last price</h3>
      <div class="metric">$482.31</div>
      <div class="up">+2.14% today</div>
    </div>
    <div class="card col-4">
      <h3>vs S&amp;P 500 (30d)</h3>
      <div class="metric up">+4.8%</div>
      <div class="muted">Outperforming benchmark</div>
    </div>
    <div class="card col-4">
      <h3>52W range</h3>
      <div class="metric">$312 – $520</div>
      <div class="bar"><span style="width:76%"></span></div>
    </div>

    <div class="card col-8">
      <h3>Multi-horizon signals</h3>
      <table>
        <tr><th>Horizon</th><th>Direction</th><th>Confidence</th><th>Notes</th></tr>
        <tr><td>1 week</td><td class="up">Bullish</td><td><span class="pill">Medium</span></td><td>Momentum breakout above 50-day</td></tr>
        <tr><td>1 month</td><td class="up">Bullish</td><td><span class="pill">Medium</span></td><td>Sector rotation tailwind</td></tr>
        <tr><td>3 months</td><td class="muted">Neutral</td><td><span class="pill">Low</span></td><td>Earnings catalyst uncertain</td></tr>
        <tr><td>12 months</td><td class="up">Bullish</td><td><span class="pill">Medium</span></td><td>Structural demand trend intact</td></tr>
      </table>
    </div>

    <div class="card col-4">
      <h3>Confidence breakdown</h3>
      <table>
        <tr><td>Price / technical</td><td>High</td></tr>
        <tr><td>Macro context</td><td>Medium</td></tr>
        <tr><td>News flow</td><td>Medium</td></tr>
        <tr><td>Sentiment</td><td>Low</td></tr>
      </table>
    </div>

    <div class="card col-6">
      <h3>Bull case</h3>
      <ul>
        <li>Revenue growth sustained above consensus for 3 quarters</li>
        <li>Buyback authorization recently expanded</li>
        <li>Technical structure: higher highs, higher lows on weekly</li>
      </ul>
    </div>
    <div class="card col-6">
      <h3>Bear case</h3>
      <ul>
        <li>Valuation at 92nd percentile of 5-year range</li>
        <li>Rising short interest in past two weeks</li>
        <li>Sector-wide margin pressure from input costs</li>
      </ul>
    </div>

    <div class="card col-12">
      <h3>Scenario matrix (3-month)</h3>
      <table>
        <tr><th>Scenario</th><th>Probability</th><th>Implication</th></tr>
        <tr><td>Upside breakout</td><td>35%</td><td>New 52-week high on earnings beat</td></tr>
        <tr><td>Range-bound</td><td>45%</td><td>Consolidation near current levels</td></tr>
        <tr><td>Downside</td><td>20%</td><td>Retest of 200-day moving average</td></tr>
      </table>
    </div>

    <div class="card col-12">
      <h3>Signal summary</h3>
      <p>Price action and macro context lean constructive, but valuation and sentiment warrant caution. Confidence is <b>Medium</b>. Narrative change vs prior report: unavailable (no prior report on file).</p>
    </div>
  </div>

  <footer>Educational only. Not financial advice.</footer>
</div>
</body>
</html>`;
}
