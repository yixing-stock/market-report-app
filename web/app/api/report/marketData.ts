import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export type MarketData = {
  ticker: string;
  name: string;
  currency: string;
  price: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: number | null;
  volume: number | null;
  avgVolume: number | null;
  peRatio: number | null;
  fetchedAt: string;
  history: { date: string; close: number; volume: number }[];
};

type RawQuote = {
  longName?: string;
  shortName?: string;
  currency?: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  marketCap?: number;
  averageDailyVolume3Month?: number;
  trailingPE?: number;
};

export async function fetchMarketData(ticker: string): Promise<MarketData> {
  const symbol = ticker.toUpperCase();
  const quote = (await yahooFinance.quote(symbol)) as RawQuote | undefined;
  if (!quote || quote.regularMarketPrice == null) {
    throw new Error(`No market data found for "${symbol}"`);
  }
  const price = quote.regularMarketPrice;

  const now = new Date();
  const start = new Date(now);
  start.setMonth(start.getMonth() - 6);

  const chart = (await yahooFinance.chart(symbol, {
    period1: start,
    period2: now,
    interval: "1d",
  })) as { quotes?: { date: Date | string; close?: number | null; volume?: number | null }[] };

  const history = (chart.quotes ?? [])
    .filter((q) => q.close != null)
    .map((q) => ({
      date: (q.date instanceof Date ? q.date : new Date(q.date)).toISOString().slice(0, 10),
      close: q.close as number,
      volume: (q.volume ?? 0) as number,
    }));

  return {
    ticker: symbol,
    name: quote.longName ?? quote.shortName ?? symbol,
    currency: quote.currency ?? "USD",
    price,
    changePercent: quote.regularMarketChangePercent ?? 0,
    dayHigh: quote.regularMarketDayHigh ?? price,
    dayLow: quote.regularMarketDayLow ?? price,
    fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? price,
    fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? price,
    marketCap: quote.marketCap ?? null,
    volume: quote.regularMarketVolume ?? null,
    avgVolume: quote.averageDailyVolume3Month ?? null,
    peRatio: quote.trailingPE ?? null,
    fetchedAt: now.toISOString(),
    history,
  };
}
