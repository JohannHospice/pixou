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

describe("Stratégie Super Ichimoku", () => {
  const SYMBOL = "DOGEUSDT";
  let klines: CrinKline[];
  let ichimokuStrategy: SuperIchimokuStrategy;

  beforeAll(async () => {
    const momentNow = moment().subtract(9, "months");
    console.log(momentNow.toLocaleString());

    const { data } = await getInstance().klines(
      SYMBOL,
      TIME_PERIOD.FOUR_HOURLY,
      {
        startTime: momentNow
          .clone()
          .subtract(0.5 * 360 + 99 * 3, "days")
          .toDate(),
        endTime: momentNow.toDate().getDate(),
        limit: 1000,
      }
    );

    klines = parseBinanceKlines(data);
    console.log(klines[klines.length - 1].closeTime);
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
});
