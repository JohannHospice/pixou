import { EMA, IchimokuCloud, MACD, RSI } from "technicalindicators";
import Strategy, { Order, OrderType, uniformLength } from "..";
import { CrinKline } from "../../exchanges/binance";
import MACDStrategy from "../macd";

export default class SuperIchimokuStrategy extends Strategy {
  ichimoku: {
    conversion: number;
    base: number;
    spanA: number;
    spanB: number;
  }[] = [];
  macd: {
    MACD?: number;
    signal?: number;
    histogram?: number;
  }[] = [];
  ema100: number[] = [];
  ema14: number[] = [];
  closes: number[] = [];
  profitTargetRatio = 1.5;
  static periodEMA = 100;
  static fastPeriod = 12;
  rsi: number[] = [];

  constructor(klines: CrinKline[]) {
    super(klines);
    this.rsi = RSI.calculate({
      values: klines.map(({ close }) => close),
      period: 14,
    });
    const [
      klinesUniform,
      macdUniform,
      emaUniform,
      ichimokuUniform,
      rsiUniform,
      ema14Uniform,
    ] = uniformLength([
      klines,
      MACD.calculate({
        values: klines.map(({ close }) => close),
        fastPeriod: MACDStrategy.fastPeriod, // 5,
        slowPeriod: 26, // 8,
        signalPeriod: 9, // 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      }),
      EMA.calculate({
        values: klines.map(({ close }) => close),
        period: MACDStrategy.periodEMA,
      }),
      IchimokuCloud.calculate({
        high: this.klines.map((kline) => kline.high),
        low: this.klines.map((kline) => kline.low),
        displacement: 1,
        conversionPeriod: 9,
        basePeriod: 26,
        spanPeriod: 52,
      }),
      this.rsi,
      EMA.calculate({
        values: this.rsi,
        period: 14,
      }),
    ]);

    this.klines = klinesUniform;
    this.macd = macdUniform;
    this.ema100 = emaUniform;
    this.rsi = rsiUniform;
    this.ichimoku = ichimokuUniform;
    this.klines = klinesUniform;
    this.ema14 = ema14Uniform;
  }

  getOrders(): Order[] {
    const orders = [];
    for (let i = 0; i < this.klines.length; i++) {
      const order = this.getOrder(i);
      if (order) {
        orders.push(order);
      }
    }
    return orders;
  }

  getOrder(index: number): Order | undefined {
    if (index === 0) return undefined;

    if (
      this.isCloseAboveTheCloud(index) &&
      this.isIchimokuBullish(index)
      //  && this.isCloseBehindTheCloud(index - 1)
    ) {
      return {
        type: OrderType.LONG,
        price: this.klines[index].close,
        closeTime: this.klines[index].closeTime,
      };
    }

    if (
      this.isCloseBehindTheCloud(index)
      // && this.isCloseAboveTheCloud(index - 1)
    ) {
      return {
        type: OrderType.SHORT,
        price: this.klines[index].close,
        closeTime: this.klines[index].closeTime,
      };
    }

    return undefined;
  }

  isCloseBehindTheCloud(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close < spanA;
  }

  isCloseAboveTheCloud(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close > spanA && close > spanB;
  }

  isIchimokuBullish(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    return spanA > spanB;
  }

  isIchimokuBearish(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    return spanA < spanB;
  }

  getTraces(): any[] {
    return [
      super.getTraces()[0],
      {
        x: this.klines.map((kline) => kline.closeTime),
        y: this.ichimoku.map((ichimoku) => ichimoku.spanA),
        type: "scatter",
        name: "spanA",
      },
      {
        x: this.klines.map((kline) => kline.closeTime),
        y: this.ichimoku.map((ichimoku) => ichimoku.spanB),
        type: "scatter",
        name: "spanB",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.ema100,
        name: "EMA100",
        type: "scatter",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.macd.map(({ MACD }) => MACD),
        yaxis: "y2",
        name: "MACD",
        type: "scatter",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.macd.map(({ signal }) => signal),
        yaxis: "y2",
        name: "SIGNAL",
        type: "scatter",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.macd.map(({ histogram }) => histogram),
        yaxis: "y2",
        name: "HISTOGRAM",
        type: "bar",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.rsi,
        yaxis: "y3",
        name: "RSI",
        type: "scatter",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.klines.map(() => 70),
        yaxis: "y3",
        type: "scatter",
        name: "UpperBand",
        mode: "lines",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.klines.map(() => 50),
        yaxis: "y3",
        type: "scatter",
        name: "MiddleBand",
        mode: "lines",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.klines.map(() => 30),
        yaxis: "y3",
        type: "scatter",
        name: "LowerBand",
        mode: "lines",
      },
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.ema14,
        name: "EMA14",
        type: "scatter",
        yaxis: "y3",
      },
    ];
  }

  getPlotLayout(): { [x: string]: string | { [x: string]: any } } {
    const ysection = 0.3;
    const ymargin = 0.1;
    return {
      title: {
        text: "Ichimoku Cloud",
        font: {
          family: "Open sans, verdana, Roboto, Courier New, Arial, monospace",
          size: 24,
        },
        xref: "paper",
        x: 0.05,
      },
      hovermode: "x",
      yaxis: {
        domain: [ysection * 2 + ymargin, 1],
        type: "log",
        autorange: true,
      },
      xaxis: {
        domain: [0, 1],
      },
      yaxis2: {
        domain: [ysection + ymargin / 2, ysection * 2 + ymargin / 2],
        anchor: "x2",
      },
      xaxis2: {
        domain: [0, 1],
        anchor: "y2",
      },
      yaxis3: {
        domain: [0, ysection],
        anchor: "x3",
      },
      xaxis3: {
        domain: [0, 1],
        anchor: "y3",
      },
    };
  }
}
