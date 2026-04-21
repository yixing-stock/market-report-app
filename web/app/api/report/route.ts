import Anthropic from "@anthropic-ai/sdk";
import { promises as fs } from "node:fs";
import path from "node:path";
import { demoHtml } from "./demo";

export const runtime = "nodejs";
export const maxDuration = 300;

const SPEC_DIR = path.join(process.cwd(), "..", "market-report-app");

let cachedSpec: string | null = null;
async function loadSpec(): Promise<string> {
  if (cachedSpec) return cachedSpec;
  const files = [
    "CLAUDE.md",
    "references/methodology.md",
    "references/report_schema.md",
  ];
  const parts = await Promise.all(
    files.map(async (f) => {
      const body = await fs.readFile(path.join(SPEC_DIR, f), "utf8");
      return `<file path="${f}">\n${body}\n</file>`;
    }),
  );
  cachedSpec = parts.join("\n\n");
  return cachedSpec;
}

const SYSTEM_INSTRUCTIONS = `You are the Market Report agent.

You are given a strict methodology and schema in the reference files below. Follow them exactly.

When the user provides a ticker, produce a single self-contained HTML document (no markdown, no prose outside the HTML) that:
- renders a dashboard-style stock market report following report_schema.md
- applies the methodology in methodology.md
- uses the web_search tool to gather current market data, news, and macro context
- is a complete HTML document starting with <!DOCTYPE html> and ending with </html>
- styles itself with inline <style> (dark theme, card-based dashboard layout, responsive grid)
- always includes the disclaimer "Educational only. Not financial advice."

Do not output anything other than the HTML document.`;

export async function POST(req: Request) {
  const { ticker, notes } = (await req.json()) as {
    ticker?: string;
    notes?: string;
  };
  if (!ticker || typeof ticker !== "string") {
    return new Response(JSON.stringify({ error: "Missing ticker" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const encoder = new TextEncoder();

  if (!apiKey) {
    const html = demoHtml(ticker);
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
          );
        };
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        send("status", { message: "Demo mode (no API key) — loading sample…" });
        await sleep(400);
        send("status", { message: "Rendering sample dashboard…" });
        const chunkSize = 400;
        for (let i = 0; i < html.length; i += chunkSize) {
          send("chunk", { text: html.slice(i, i + chunkSize) });
          await sleep(30);
        }
        send("done", { demo: true });
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache, no-transform",
        connection: "keep-alive",
      },
    });
  }

  const client = new Anthropic({ apiKey });
  const spec = await loadSpec();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
        );
      };

      try {
        send("status", { message: "Loading methodology…" });

        const resp = await client.messages.stream({
          model: "claude-opus-4-7",
          max_tokens: 16000,
          system: [
            { type: "text", text: SYSTEM_INSTRUCTIONS },
            {
              type: "text",
              text: spec,
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: 8,
            } as unknown as Anthropic.Messages.Tool,
          ],
          messages: [
            {
              role: "user",
              content: `Generate a market report for ticker: ${ticker.toUpperCase()}${
                notes ? `\n\nAdditional context from user: ${notes}` : ""
              }`,
            },
          ],
        });

        for await (const event of resp) {
          if (event.type === "content_block_start") {
            const blockType = (event.content_block as { type: string }).type;
            if (blockType === "server_tool_use" || blockType === "web_search_tool_result") {
              send("status", { message: "Searching the web…" });
            } else if (blockType === "text") {
              send("status", { message: "Writing report…" });
            }
          } else if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            send("chunk", { text: event.delta.text });
          }
        }

        const final = await resp.finalMessage();
        send("done", {
          usage: final.usage,
          stop_reason: final.stop_reason,
        });
      } catch (err) {
        send("error", {
          message: err instanceof Error ? err.message : String(err),
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    },
  });
}
