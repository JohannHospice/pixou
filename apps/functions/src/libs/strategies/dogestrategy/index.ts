import * as moment from "moment";
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
  dayInterval: number;
  constructor(klines: CrinKline[]) {
    super(klines);
    this.dayInterval = moment(this.klines[1].closeTime).diff(
      this.klines[0].closeTime,
      "days"
    );

    const closes = klines.map(({ close }) => close);
    const rsi = RSI.calculate({
      values: closes,
      period: 14,
    });
    const [
      klinesUniform,
      macdUniform,
      ema21Uniform,
      ema50Uniform,
      ichimokuUniform,
      rsiUniform,
      ema14Uniform,
    ] = uniformLength([
      klines,
      MACD.calculate({
        values: closes,
        fastPeriod: 12, // 5,
        slowPeriod: 26, // 8,
        signalPeriod: 9, // 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      }),
      EMA.calculate({
        values: closes,
        period: 21,
      }),
      EMA.calculate({
        values: closes,
        period: 50,
      }),
      IchimokuCloud.calculate({
        high: this.klines.map((kline) => kline.high),
        low: this.klines.map((kline) => kline.low),
        displacement: 1,
        conversionPeriod: 9,
        basePeriod: 26,
        spanPeriod: 52,
      }),
      rsi,
      EMA.calculate({
        values: rsi,
        period: 14,
      }),
    ]);

    this.ema21 = ema21Uniform;
    this.ema50 = ema50Uniform;
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
    const canShort = (index: number) =>
      this.getMACD(index).histogram < this.getMACD(index - 1).histogram &&
      this.getMACD(index).histogram > 0 &&
      this.rsi[index] > 35;

    try {
      if (canShort(index)) {
        return this.createShort(index);
      }
    } catch (error) {}
    return this.createLong(index);
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
  getMACD(index: number) {
    if (index >= this.macd.length) {
      throw new Error(`${index} above ${this.macd.length}`);
    }
    return this.macd[index];
  }
  isMACDBehindSignal(index: number): boolean {
    if (index >= this.macd.length) {
      throw new Error(`${index} above ${this.macd.length}`);
    }
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
    return new Order({
      type: TransactionType.SHORT,
      price: this.klines[index].close,
      closeTime: this.klines[index].closeTime,
    });
  }
  createLong(index: number): Order {
    return new Order({
      type: TransactionType.LONG,
      price: this.klines[index].close,
      closeTime: this.klines[index].closeTime,
    });
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
        y: this.rsiEma14,
        name: "EMA14",
        type: "scatter",
        yaxis: "y3",
      },
      {
        x: closeTimes,
        y: this.ema21,
        name: "EMA21",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.ema50,
        name: "EMA50",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.ema100,
        name: "EMA100",
        type: "scatter",
      },
      {
        x: closeTimes,
        y: this.ema200,
        name: "EMA200",
        type: "scatter",
        visible: "legendonly",
      },
      //
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
      //
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
    ];
  }
  getPlotLayout(): { [x: string]: any } {
    const ymargin = 0.02;
    const layouts = [
      {
        type: "log",
        autorange: true,
      },
      {},
      {},
      {
        // type: "log",
        // autorange: false,
      },
    ];
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
      ...layouts.reduce((acc, config, i) => {
        const id = i + 1;
        return {
          ...acc,
          [`yaxis${i === 0 ? "" : id}`]: {
            domain: getDomainY(
              Math.abs(i - layouts.length) - 1,
              layouts.length,
              ymargin
            ),
            anchor: i === 0 ? undefined : `x${id}`,
            ...config,
          },
          [`xaxis${i === 0 ? "" : id}`]: {
            domain: [0, 1],
            anchor: i === 0 ? undefined : `y${id}`,
          },
        };
      }, {}),
    };
  }
}

function getDomainY(index: number, size: number, margin: number) {
  if (index >= size - 1) return [index / size + margin, 1];
  if (index === 0) return [0, (index + 1) / size];
  return [index / size + margin, (index + 1) / size];
}
