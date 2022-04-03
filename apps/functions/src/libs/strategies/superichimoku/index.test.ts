import { describe, it, beforeAll } from "@jest/globals";
import * as moment from "moment";
import SuperIchimokuStrategy from "./index";
import { plotStrategy } from "../../crinplot";
import Portfolio from "../../portfolio";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  TIME_PERIOD,
  BinanceSpot,
} from "../../exchanges/binance";

describe.skip("Stratégie Super Ichimoku", () => {
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let ichimokuStrategy: SuperIchimokuStrategy;

  beforeAll(async () => {
    const momentNow = moment().subtract(1, "years");
    console.log(momentNow);

    const { data } = await getInstance().klines(
      SYMBOL,
      TIME_PERIOD.THREE_DAILY,
      {
        startTime: momentNow
          .clone()
          .subtract(0.5 * 360 + 99 * 3, "days")
          .toDate(),
        endTime: momentNow.toDate(),
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
    const total = portfolio.getTotal(
      ichimokuStrategy.klines[ichimokuStrategy.klines.length - 1].close
    );
    console.log(
      JSON.stringify(
        {
          balance: portfolio.balance,
          total,
          totalInjected: portfolio.totalInjected,
          ratio: total / portfolio.totalInjected,
        },
        null,
        2
      )
    );
  });

  it.skip("should give results", () => {
    // console.log(ichimokuStrategy.result());
  });
  it("should display strategy", async () => {
    plotStrategy(ichimokuStrategy);
  });
  it.skip("should display btc dom", async () => {
    // const spot = new BinanceSpot();
    const { data } = await new BinanceSpot().exchangeInfo();

    console.log(data);
  });
});
