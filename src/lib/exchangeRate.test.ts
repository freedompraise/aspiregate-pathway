import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearUsdNgnRateCache,
  getUsdToNgnRate,
  parseUsdToNgnRate,
  readCachedUsdNgnRate,
  usdToNaira,
  usdToNgnKobo,
  writeCachedUsdNgnRate,
} from "./exchangeRate";

describe("usdToNgnKobo", () => {
  it("adds a 3% cushion, then rounds to the nearest naira", () => {
    expect(usdToNgnKobo(152.5, 1332.6841)).toBe(20_933_100);
    expect(usdToNaira(152.5, 1332.6841)).toBe(209_331);
    expect(usdToNaira(60, 1332.6841)).toBe(82_360);
  });

  it("rejects amounts and rates that should never be charged", () => {
    expect(() => usdToNgnKobo(-1, 1332)).toThrow(/dollar amount/);
    expect(() => usdToNgnKobo(152.5, 1)).toThrow(/exchange rate/);
    expect(() => usdToNgnKobo(152.5, 50_000)).toThrow(/exchange rate/);
  });
});

describe("parseUsdToNgnRate", () => {
  it("reads the naira rate and the next update time", () => {
    const parsed = parseUsdToNgnRate({
      result: "success",
      conversion_rates: { NGN: 1332.6841 },
      time_next_update_unix: 1_792_627_202,
    });
    expect(parsed.rate).toBe(1332.6841);
    expect(parsed.expiresAt).toBe(1_792_627_202_000);
  });

  it("rejects a payload without a usable naira rate", () => {
    expect(() => parseUsdToNgnRate({ result: "error" })).toThrow(/naira/);
    expect(() => parseUsdToNgnRate({ result: "success", conversion_rates: { NGN: 10 } })).toThrow(/range/);
  });
});

describe("getUsdToNgnRate", () => {
  afterEach(() => {
    clearUsdNgnRateCache();
    vi.unstubAllGlobals();
  });

  it("fetches once and then reuses the cached rate", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: "success",
        conversion_rates: { NGN: 1400 },
        time_next_update_unix: Math.floor(Date.now() / 1000) + 3600,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getUsdToNgnRate("test-key")).resolves.toBe(1400);
    await expect(getUsdToNgnRate("test-key")).resolves.toBe(1400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(readCachedUsdNgnRate()).toBe(1400);
  });

  it("ignores an expired cache", () => {
    writeCachedUsdNgnRate(1400, Date.now() - 1000);
    expect(readCachedUsdNgnRate()).toBeNull();
  });
});
