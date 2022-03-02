import { describe, it, beforeAll } from "@jest/globals";
import SuperIchimokuStrategy from "./index";
import { plotStrategy } from "../../crinplot";
import Portfolio from "../../portfolio";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  TIME_PERIOD,
} from "../../exchanges/binance";

describe("Stratégie Super Ichimoku", () => {
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let ichimokuStrategy: SuperIchimokuStrategy;

  beforeAll(async () => {
    const { data } = await getInstance().klines(
      SYMBOL,
      TIME_PERIOD.THREE_DAILY,
      {
        // startTime: ,
        endTime: new Date().getTime(),
        limit: 2000,
      }
    );

    klines = parseBinanceKlines(data);
  });

  it("should build Ichimoku", () => {
    ichimokuStrategy = new SuperIchimokuStrategy(klines);
    ichimokuStrategy.build();
  });

  it("apply portfolio", () => {
    const portfolio = new Portfolio(ichimokuStrategy);
    portfolio.apply(100);
    console.log(
      `coin: ${portfolio.coin}\nreserve: ${portfolio.reserve}\ntotalInjected: ${
        portfolio.totalInjected
      }\ntotal: ${portfolio.getTotal(
        ichimokuStrategy.klines[ichimokuStrategy.klines.length - 1].close
      )}\nratio: ${
        portfolio.getTotal(
          ichimokuStrategy.klines[ichimokuStrategy.klines.length - 1].close
        ) / portfolio.totalInjected
      }`
    );
  });

  it.skip("should give results", () => {
    // console.log(ichimokuStrategy.result());
  });

  it("should display strategy", async () => {
    plotStrategy(ichimokuStrategy);
  });
});
