import type { MarketData } from "./marketData";

function fmt(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function fmtCap(n: number | null) {
  if (n == null) return "—";
  if (n >= 1e12) return `$${fmt(n / 1e12, 2)}T`;
  if (n >= 1e9) return `$${fmt(n / 1e9, 2)}B`;
  if (n >= 1e6) return `$${fmt(n / 1e6, 2)}M`;
  return `$${fmt(n, 0)}`;
}

export function demoHtml(md: MarketData): string {
  const date = new Date().toISOString().slice(0, 10);
  const changeClass = md.changePercent >= 0 ? "up" : "down";
  const changeSign = md.changePercent >= 0 ? "+" : "";
  const rangePct = Math.max(
    0,
    Math.min(
      100,
      ((md.price - md.fiftyTwoWeekLow) /
        Math.max(md.fiftyTwoWeekHigh - md.fiftyTwoWeekLow, 1e-9)) *
        100,
    ),
  );

  const first = md.history[0]?.close ?? md.price;
  const sixMoPct = ((md.price - first) / first) * 100;
  const sixMoClass = sixMoPct >= 0 ? "up" : "down";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${md.ticker} Market Dashboard (Demo)</title>
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
  <div class="banner">Demo mode — prices are live from Yahoo Finance, but the analysis below is a sample template. Set <code>ANTHROPIC_API_KEY</code> in <code>web/.env.local</code> for real AI analysis.</div>
  <header>
    <h1>${md.ticker} · ${md.name}</h1>
    <div class="sub">Report date ${date} · ${md.currency} · Data: Yahoo Finance</div>
  </header>

  <div class="grid">
    <div class="card col-4">
      <h3>Last price</h3>
      <div class="metric">$${fmt(md.price)}</div>
      <div class="${changeClass}">${changeSign}${fmt(md.changePercent)}% today</div>
    </div>
    <div class="card col-4">
      <h3>6-month return</h3>
      <div class="metric ${sixMoClass}">${sixMoPct >= 0 ? "+" : ""}${fmt(sixMoPct)}%</div>
      <div class="muted">From $${fmt(first)} → $${fmt(md.price)}</div>
    </div>
    <div class="card col-4">
      <h3>52W range</h3>
      <div class="metric">$${fmt(md.fiftyTwoWeekLow)} – $${fmt(md.fiftyTwoWeekHigh)}</div>
      <div class="bar"><span style="width:${rangePct.toFixed(0)}%"></span></div>
    </div>

    <div class="card col-4">
      <h3>Market cap</h3>
      <div class="metric">${fmtCap(md.marketCap)}</div>
    </div>
    <div class="card col-4">
      <h3>P/E (trailing)</h3>
      <div class="metric">${md.peRatio != null ? fmt(md.peRatio) : "—"}</div>
    </div>
    <div class="card col-4">
      <h3>Volume</h3>
      <div class="metric">${md.volume != null ? md.volume.toLocaleString() : "—"}</div>
      <div class="muted">Avg 3mo: ${md.avgVolume != null ? md.avgVolume.toLocaleString() : "—"}</div>
    </div>

    <div class="card col-12">
      <h3>Signal summary (sample text)</h3>
      <p>This is placeholder analysis. With an API key set, Claude will generate a full multi-horizon analysis, bull/bear debate, scenario matrix, and confidence breakdown based on the live data above.</p>
    </div>
  </div>

  <footer>Educational only. Not financial advice.</footer>
</div>
</body>
</html>`;
}
