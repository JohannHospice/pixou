import { describe, it, beforeAll } from "@jest/globals";
import MACDStrategy from "./index";
import { plotStrategy } from "../../crinplot";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  TIME_PERIOD,
} from "../../exchanges/binance";

describe("Stratégie MACD", () => {
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let macdStrategy: MACDStrategy;

  beforeAll(async () => {
    const { data } = await getInstance().klines(SYMBOL, TIME_PERIOD.WEEKLY, {
      endTime: new Date().getTime(),
      limit: 2000,
    });

    klines = parseBinanceKlines(data);
  });

  it("should build macd", () => {
    macdStrategy = new MACDStrategy(klines);
  });

  it.skip("should give results", () => {
    console.log(macdStrategy.result());
  });

  it("should display strategy", async () => {
    const url = await plotStrategy(macdStrategy);
    console.log({ url });
  });
});
