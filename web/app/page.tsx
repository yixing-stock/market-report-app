"use client";

import { useRef, useState } from "react";

type Status = "idle" | "running" | "done" | "error";

export default function Home() {
  const [ticker, setTicker] = useState("NVDA");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    if (!ticker.trim()) return;
    setStatus("running");
    setStatusMsg("Connecting…");
    setHtml("");
    setError("");

    let acc = "";
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ticker: ticker.trim(), notes: notes.trim() }),
      });
      if (!res.ok || !res.body) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split("\n\n");
        buf = events.pop() ?? "";
        for (const raw of events) {
          const lines = raw.split("\n");
          const evLine = lines.find((l) => l.startsWith("event: "));
          const dataLine = lines.find((l) => l.startsWith("data: "));
          if (!evLine || !dataLine) continue;
          const ev = evLine.slice(7).trim();
          const data = JSON.parse(dataLine.slice(6));
          if (ev === "status") {
            setStatusMsg(data.message);
          } else if (ev === "chunk") {
            acc += data.text;
            setHtml(acc);
          } else if (ev === "error") {
            throw new Error(data.message);
          } else if (ev === "done") {
            setStatus("done");
            setStatusMsg("Done");
          }
        }
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  function download() {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticker.toUpperCase()}-report.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Market Report</h1>
        <p className="text-sm text-zinc-400">
          Dashboard-style stock reports. Educational only. Not financial advice.
        </p>
      </header>

      <form onSubmit={generate} className="mb-6 flex flex-wrap gap-3">
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Ticker (e.g. NVDA)"
          className="w-40 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          disabled={status === "running"}
        />
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes (horizon, focus, etc.)"
          className="flex-1 min-w-[240px] rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          disabled={status === "running"}
        />
        <button
          type="submit"
          disabled={status === "running"}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
        >
          {status === "running" ? "Generating…" : "Generate"}
        </button>
        {status === "done" && (
          <button
            type="button"
            onClick={download}
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-400"
          >
            Download HTML
          </button>
        )}
      </form>

      {status !== "idle" && (
        <div className="mb-3 text-sm text-zinc-400">
          {status === "error" ? (
            <span className="text-red-400">Error: {error}</span>
          ) : (
            <span>Status: {statusMsg}</span>
          )}
        </div>
      )}

      <div className="h-[80vh] overflow-hidden rounded-lg border border-zinc-800 bg-white">
        <iframe
          ref={iframeRef}
          title="Report preview"
          srcDoc={html || "<div style='padding:2rem;font-family:sans-serif;color:#666'>Report preview will appear here.</div>"}
          className="h-full w-full"
          sandbox="allow-same-origin"
        />
      </div>
    </main>
  );
}
