import { EMA, IchimokuCloud, MACD, RSI } from "technicalindicators";
import Strategy, { uniformLength } from "..";
import { CrinKline } from "../../exchanges/binance";
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
  ema21: number[] = [];
  ema50: number[] = [];
  ema100: number[] = [];
  ema200: number[] = [];

  rsiEma14: number[] = [];
  closes: number[] = [];
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
      ema21Uniform,
      ema50Uniform,
      ema100Uniform,
      // ema200Uniform,
      ichimokuUniform,
      rsiUniform,
      ema14Uniform,
    ] = uniformLength([
      klines,
      MACD.calculate({
        values: klines.map(({ close }) => close),
        fastPeriod: 12, // 5,
        slowPeriod: 26, // 8,
        signalPeriod: 9, // 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      }),
      EMA.calculate({
        values: klines.map(({ close }) => close),
        period: 21,
      }),
      EMA.calculate({
        values: klines.map(({ close }) => close),
        period: 50,
      }),
      EMA.calculate({
        values: klines.map(({ close }) => close),
        period: 100,
      }),
      // EMA.calculate({
      //   values: klines.map(({ close }) => close),
      //   period: 200,
      // }),
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

    this.ema21 = ema21Uniform;
    this.ema50 = ema50Uniform;
    this.ema100 = ema100Uniform;
    // this.ema200 = ema200Uniform;

    this.klines = klinesUniform;
    this.macd = macdUniform;
    this.rsi = rsiUniform;
    this.ichimoku = ichimokuUniform;
    this.klines = klinesUniform;
    this.rsiEma14 = ema14Uniform;
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
    const canLong = this.isIndexMod(index, 10); // THREEDAILY

    // bypass sell
    if (this.isRSIBehind(index, 36)) {
      if (canLong) {
        return this.createLong(index);
      }
      return undefined;
    }

    if (
      this.isMACDBehindSignal(index) &&
      this.isRSIBehindEma(index) &&
      this.isCloseOutsideTheCloud(index) &&
      this.isMACDHistogramGapReduced(index) &&
      this.isInsideTheCloud(index, this.ema21[index]) &&
      this.isInsideTheCloud(index, this.ema50[index]) &&
      !this.isInsideTheCloud(index, this.ema100[index])
    ) {
      return this.createShort(index);
    }

    if (canLong) {
      return this.createLong(index);
    }
    return undefined;
  }

  // index
  isIndexMod(index: number, n: number): boolean {
    return index % n === 0;
  }
  // rsi
  isRSIDifferenceNeglectible(index: number) {
    return (
      (this.rsi[index] > this.rsiEma14[index]
        ? this.rsi[index] - this.rsiEma14[index]
        : this.rsiEma14[index] - this.rsi[index]) < 0.5
    );
  }
  isRSIAbove(index: number, value: number): boolean {
    return this.rsi[index] > value;
  }
  isRSIBehind(index: number, value: number): boolean {
    return this.rsi[index] < value;
  }
  isRSIAboveEma(index: number): boolean {
    return this.rsi[index] > this.rsiEma14[index];
  }
  isRSIBehindEma(index: number): boolean {
    return this.rsi[index] < this.rsiEma14[index];
  }
  // ema100
  isCloseBehindEMA100(index: number): boolean {
    return this.ema100[index] > this.klines[index].close;
  }

  // macd
  isMACDBehindSignal(index: number): boolean {
    const { MACD, signal } = this.macd[index];
    return MACD && signal ? MACD < signal : false;
  }
  isMACDAboveSignal(index: number): boolean {
    return !this.isMACDBehindSignal(index);
  }
  isMACDHistogramGapReduced(index: number): boolean {
    if (index === 0) return false;
    const { histogram: h1 } = this.macd[index];
    const { histogram: h2 } = this.macd[index - 1];
    return h1 && h2 ? Math.abs(h1) < Math.abs(h2) : false;
  }

  // ichimoku
  isCloseOutsideTheCloud(index: number): boolean {
    const { close } = this.klines[index];
    return this.isOutsideTheCloud(index, close);
  }
  isInsideTheCloud(index: number, close: number): boolean {
    return !this.isOutsideTheCloud(index, close);
  }
  isOutsideTheCloud(index: number, close: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    return (
      (spanA > spanB && spanB > close) ||
      (spanB > spanA && spanA > close) ||
      (spanA < spanB && spanB < close) ||
      (spanB < spanA && spanA < close)
    );
  }

  isCloseAboveTheCloud(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close > spanA && close > spanB;
  }
  isCloseBehindTheCloud(index: number): boolean {
    if (!this.ichimoku[index]) return false;
    const { spanA, spanB } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close < spanA || close < spanB;
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

  // order
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
        y: this.rsiEma14,
        name: "EMA14",
        type: "scatter",
        yaxis: "y3",
      },
      {
        x: closeTimes,
        y: this.ema200,
        name: "EMA200",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.ema50,
        name: "EMA500",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.ema21,
        name: "EMA21",
        type: "scatter",
      },
    ];
  }
  getPlotLayout(): { [x: string]: any } {
    const ysection = 0.3;
    const ymargin = 0.1;
    return {
      ...super.getPlotLayout(),
      dragmode: "pan",
      hovermode: "x",
      autosize: true,
      title: {
        text: "Ichimoku Cloud",
        font: {
          family: "Open sans, verdana, Roboto, Courier New, Arial, monospace",
          size: 24,
        },
        xref: "paper",
        x: 0.05,
      },
      yaxis: {
        domain: [ysection * 2 + ymargin, 1],
        type: "log",
        dragmode: "pan",
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
