import { describe, it, beforeAll } from "@jest/globals";
import IchimokuStrategy from "./index";
import { plotStrategy } from "../../crinplot";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  TIME_PERIOD,
} from "../../exchanges/binance";

describe.skip("Stratégie Ichimoku", () => {
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let ichimokuStrategy: IchimokuStrategy;

  beforeAll(async () => {
    const { data } = await getInstance().klines(SYMBOL, TIME_PERIOD.DAILY, {
      endTime: new Date().getTime(),
      limit: 2000,
    });

    klines = parseBinanceKlines(data);
  });

  it("should build Ichimoku", () => {
    ichimokuStrategy = new IchimokuStrategy(klines);
  });

  it.skip("should give results", () => {
    console.log(ichimokuStrategy.result());
  });

  it("should display strategy", async () => {
    plotStrategy(ichimokuStrategy);
  });
});
