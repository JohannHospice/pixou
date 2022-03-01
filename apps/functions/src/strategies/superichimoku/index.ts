import { EMA, IchimokuCloud, MACD, RSI } from "technicalindicators";
import Strategy, { uniformLength } from "..";
import { CrinKline } from "../../exchanges/binance";
import MACDStrategy from "../macd";
import { Order, TransactionType } from "../../order";

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
    let once = false;
    if (
      this.isRSIBehindEma(index) &&
      // this.isCloseBehindTheCloud(index) &&
      // this.isMACDBehindSignal(index) &&
      this.rsi[index] > 50 &&
      this.isMACDBehindSignal(index)
    ) {
      if (!once) return this.createShort(index);
      once = true;
    } else {
      once = false;
      if (
        index % 3 === 0 &&
        this.isCloseAboveTheCloud(index) &&
        this.isCloseAboveEMA100(index)
      ) {
        return this.createLong(index);
      }
    }

    return undefined;
  }

  createShort(index: number): Order {
    return {
      type: TransactionType.SHORT,
      price: this.klines[index].close,
      closeTime: this.klines[index].closeTime,
    };
  }
  createLong(index: number): Order {
    return {
      type: TransactionType.LONG,
      price: this.klines[index].close,
      closeTime: this.klines[index].closeTime,
    };
  }

  isCloseAboveEMA100(index: number): boolean {
    return this.ema100[index] > this.klines[index].close;
  }

  isMACDBehindSignal(index: number): boolean {
    const { MACD, signal } = this.macd[index];
    if (MACD && signal) {
      return MACD < signal;
    }
    return false;
  }

  isRSIBehindEma(index: number): boolean {
    return this.rsi[index] < this.ema14[index];
  }

  isCloseBehindTheCloud(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close < spanA || close < spanB;
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
    const closeTimes = this.klines.map(({ closeTime }) => closeTime);
    return [
      ...super.getTraces(),
      {
        x: closeTimes,
        y: this.ichimoku.map((ichimoku) => ichimoku.spanA),
        type: "scatter",
        name: "spanA",
      },
      {
        x: closeTimes,
        y: this.ichimoku.map((ichimoku) => ichimoku.spanB),
        type: "scatter",
        name: "spanB",
      },
      {
        x: closeTimes,
        y: this.ema100,
        name: "EMA100",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.macd.map(({ MACD }) => MACD),
        yaxis: "y2",
        name: "MACD",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.macd.map(({ signal }) => signal),
        yaxis: "y2",
        name: "SIGNAL",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.macd.map(({ histogram }) => histogram),
        yaxis: "y2",
        name: "HISTOGRAM",
        type: "bar",
      },
      {
        x: closeTimes,
        y: this.rsi,
        yaxis: "y3",
        name: "RSI",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.klines.map(() => 70),
        yaxis: "y3",
        type: "scatter",
        name: "UpperBand",
        mode: "lines",
      },
      {
        x: closeTimes,
        y: this.klines.map(() => 50),
        yaxis: "y3",
        type: "scatter",
        name: "MiddleBand",
        mode: "lines",
      },
      {
        x: closeTimes,
        y: this.klines.map(() => 30),
        yaxis: "y3",
        type: "scatter",
        name: "LowerBand",
        mode: "lines",
      },
      {
        x: closeTimes,
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
      ...super.getPlotLayout(),
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
