import { describe, it, beforeAll } from "@jest/globals";
import plotly from "plotly";
import MACDStrategy from "./index";
import { OrderType } from "..";
import {
  getInstance,
  parseBinanceKlines,
  CrinKline,
  PERIOD_DAILY,
} from "../../exchanges/binance";

describe("Stratégie MACD", () => {
  const clientBinance = getInstance();
  const SYMBOL = "BTCUSDT";
  let klines: CrinKline[];
  let moon: MACDStrategy;

  beforeAll(async () => {
    const { data } = await clientBinance.klines(SYMBOL, PERIOD_DAILY, {
      startTime: new Date(2015, 0, 1).getTime(),
      endTime: new Date().getTime(),
    });

    klines = parseBinanceKlines(data);
    console.log(klines[0]);
  });

  it("should build macd", () => {
    moon = new MACDStrategy(klines);
  });

  it.skip("should give results", () => {
    console.log(moon.result());
  });

  it("should display strategy", (done: any) => {
    const plotlyInstance = plotly(
      process.env.PLOTLY_USERNAME,
      process.env.PLOTLY_API_KEY
    );
    const orders = moon.getOrders();
    const longOrders = orders.filter(({ type }) => type === OrderType.LONG);
    const shortOrders = orders.filter(({ type }) => type === OrderType.SHORT);

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
          x: longOrders.map(({ closeTime }) => closeTime),
          y: longOrders.map(({ price }) => price),
          error_y: {
            type: "data",
            symmetric: false,
            array: longOrders.map(({ profitTarget, price }) =>
              profitTarget ? profitTarget - price : undefined
            ),
            arrayminus: longOrders.map(({ stoploss, price }) =>
              stoploss ? price - stoploss : undefined
            ),
          },
          name: "LONG",
          mode: "markers",
          type: "scatter",
        },
        {
          x: shortOrders.map(({ closeTime }) => closeTime),
          y: shortOrders.map(({ price }) => price),
          error_y: {
            type: "data",
            symmetric: false,
            array: longOrders.map(({ profitTarget, price }) =>
              profitTarget ? price - profitTarget : undefined
            ),
            arrayminus: longOrders.map(({ stoploss, price }) =>
              stoploss ? stoploss - price : undefined
            ),
          },
          name: "SHORT",
          mode: "markers",
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
        // {
        //   x: moon.klines.map(({ closeTime }) => closeTime),
        //   y: moon.macd.map(({ histogram }) => histogram),
        //   xaxis: "x2",
        //   yaxis: "y2",
        //   name: "histogram",
        //   type: "scatter",
        // },
      ],
      {
        filename: "date-test",
        fileopt: "overwrite",
        layout: {
          yaxis: {
            domain: [0.25, 1],
            type: "log",
            autorange: true,
          },
          xaxis: {
            domain: [0, 1],
          },
          yaxis2: {
            domain: [0, 0.25],
            anchor: "x2",
            type: "log",
            autorange: "",
          },
          xaxis2: {
            domain: [0, 1],
            anchor: "y2",
          },
        },
      },
      function (err: any, msg: any) {
        console.log(msg.url);
        done();
      }
    );
  });
});
