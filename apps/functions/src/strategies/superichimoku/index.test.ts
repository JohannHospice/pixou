import { describe, it, beforeAll } from "@jest/globals";
import SuperIchimokuStrategy from "./index";
import { plotStrategy } from "../../crinplot";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  TIME_PERIOD,
} from "../../exchanges/binance";

describe("Stratégie Super Ichimoku", () => {
  const SYMBOL = "ETHUSDT";
  let klines: CrinKline[];
  let ichimokuStrategy: SuperIchimokuStrategy;

  beforeAll(async () => {
    const { data } = await getInstance().klines(SYMBOL, TIME_PERIOD.DAILY, {
      endTime: new Date().getTime(),
      limit: 2000,
    });

    klines = parseBinanceKlines(data);
  });

  it("should build Ichimoku", () => {
    ichimokuStrategy = new SuperIchimokuStrategy(klines);
  });

  it.skip("should give results", () => {
    console.log(ichimokuStrategy.result());
  });

  it("should display strategy", async () => {
    plotStrategy(ichimokuStrategy);
  });
});
