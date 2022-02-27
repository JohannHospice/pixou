import MACDStrategy from "./index";
import { describe, it, beforeAll } from "@jest/globals";
import {
  getInstance,
  PERIOD_WEEKLY,
  parseBinanceKlines,
  CrinKline,
} from "../../exchanges/binance";

import plotly from "plotly";

describe("Test de l'api binance", () => {
  const clientBinance = getInstance();
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let moon: MACDStrategy;

  beforeAll(async () => {
    const { data } = await clientBinance.klines(SYMBOL, PERIOD_WEEKLY, {
      startTime: new Date(2017, 0, 1).getTime(),
      endTime: new Date().getTime(),
    });

    klines = parseBinanceKlines(data);
  });

  it("should build macd", () => {
    moon = new MACDStrategy(klines);
  });

  it.skip("should give results", () => {
    console.log(moon.result());
  });

  it("should display strategy", (done: any) => {
    const plotlyInstance = plotly("process.env.PLOTLY_USERNAME", "***");
    plotlyInstance.plot(
      [
        {
          x: moon.klines.map(({ closeTime }) => closeTime),
          y: moon.klines.map(({ close }) => close),
          name: "Closes",
          type: "scatter",
        },
        {
          x: moon.klines.map(({ closeTime }) => closeTime),
          y: moon.ema100,
          name: "EMA100",
          type: "scatter",
        },
        {
          x: moon.klines.map(({ closeTime }) => closeTime),
          y: moon.macd.map(({ MACD }) => MACD),
          xaxis: "x2",
          yaxis: "y2",
          name: "MACD",
          type: "scatter",
        },
        {
          x: moon.klines.map(({ closeTime }) => closeTime),
          y: moon.macd.map(({ signal }) => signal),
          xaxis: "x2",
          yaxis: "y2",
          name: "SIGNAL",
          type: "scatter",
        },
        {
          x: moon.klines.map(({ closeTime }) => closeTime),
          y: moon.macd.map(({ histogram }) => histogram),
          xaxis: "x2",
          yaxis: "y2",
          name: "histogram",
          type: "scatter",
        },
      ],
      {
        filename: "date-axes",
        fileopt: "overwrite",
        layout: {
          yaxis: {
            domain: [0.25, 1],
          },
          xaxis: {
            domain: [0, 1],
          },
          yaxis2: {
            domain: [0, 0.25],
            anchor: "x2",
          },
          xaxis2: {
            domain: [0, 1],
            anchor: "y2",
          },
        },
      },
      function (err: any, msg: any) {
        console.log(msg);
        done();
      }
    );
  });
});
