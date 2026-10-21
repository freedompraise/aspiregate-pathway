const MIN_NGN_PER_USD = 100;
const MAX_NGN_PER_USD = 10_000;

/** Added to the mid-market rate. 3% is the middle of the 2–4% buffer used for volatile naira checkout. */
export const NAIRA_RATE_CUSHION = 0.03;

type CachedRate = { rate: number; expiresAt: number };

let memoryCache: CachedRate | null = null;

/** Whole naira Paystack should charge, expressed in kobo, including the rate cushion. */
export function usdToNgnKobo(priceUsd: number, ngnPerUsd: number): number {
  if (!Number.isFinite(priceUsd) || priceUsd < 0) {
    throw new Error("Invalid dollar amount");
  }
  if (!Number.isFinite(ngnPerUsd) || ngnPerUsd < MIN_NGN_PER_USD || ngnPerUsd > MAX_NGN_PER_USD) {
    throw new Error("Invalid exchange rate");
  }
  return Math.round(priceUsd * ngnPerUsd * (1 + NAIRA_RATE_CUSHION)) * 100;
}

export function usdToNaira(priceUsd: number, ngnPerUsd: number): number {
  return usdToNgnKobo(priceUsd, ngnPerUsd) / 100;
}

export function parseUsdToNgnRate(payload: unknown, now = Date.now()): { rate: number; expiresAt: number } {
  if (!payload || typeof payload !== "object") {
    throw new Error("Exchange rate response was empty.");
  }
  const data = payload as {
    result?: unknown;
    conversion_rates?: { NGN?: unknown };
    time_next_update_unix?: unknown;
  };
  const rate = data.conversion_rates?.NGN;
  if (data.result !== "success" || typeof rate !== "number" || !Number.isFinite(rate)) {
    throw new Error("Exchange rate response did not include naira.");
  }
  if (rate < MIN_NGN_PER_USD || rate > MAX_NGN_PER_USD) {
    throw new Error("Exchange rate was outside the expected range.");
  }
  const expiresAt =
    typeof data.time_next_update_unix === "number" && Number.isFinite(data.time_next_update_unix)
      ? data.time_next_update_unix * 1000
      : now + 6 * 60 * 60 * 1000;
  return { rate, expiresAt };
}

export function clearUsdNgnRateCache(): void {
  memoryCache = null;
}

export function readCachedUsdNgnRate(now = Date.now()): number | null {
  if (!memoryCache) return null;
  if (!Number.isFinite(memoryCache.rate) || memoryCache.rate <= 0) return null;
  if (memoryCache.expiresAt <= now) return null;
  return memoryCache.rate;
}

export function writeCachedUsdNgnRate(rate: number, expiresAt: number): void {
  memoryCache = { rate, expiresAt };
}

export function exchangeRateUrl(apiKey: string): string {
  return `https://v6.exchangerate-api.com/v6/${encodeURIComponent(apiKey)}/latest/USD`;
}

export async function getUsdToNgnRate(
  apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY?.trim() ?? "",
): Promise<number> {
  const cached = readCachedUsdNgnRate();
  if (cached != null) return cached;
  if (!apiKey) {
    throw new Error("Currency conversion is not configured.");
  }

  let response: Response;
  try {
    response = await fetch(exchangeRateUrl(apiKey));
  } catch {
    throw new Error("We couldn't load today's naira rate.");
  }
  if (!response.ok) {
    throw new Error("We couldn't load today's naira rate.");
  }

  const parsed = parseUsdToNgnRate(await response.json());
  writeCachedUsdNgnRate(parsed.rate, parsed.expiresAt);
  return parsed.rate;
}
