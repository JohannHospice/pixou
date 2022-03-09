import Strategy, { uniformLength } from "..";
import { MACD, EMA } from "technicalindicators";
import { CrinKline } from "../../exchanges/binance";
import { Order, TransactionType } from "../../order";
export default class MACDStrategy extends Strategy {
  macd: {
    MACD?: number;
    signal?: number;
    histogram?: number;
  }[] = [];
  ema100: number[] = [];
  closes: number[] = [];
  profitTargetRatio = 1.5;
  static periodEMA = 100;
  static fastPeriod = 12;
  constructor(klines: CrinKline[]) {
    super(klines);
    const [klinesUniform, macdUniform, emaUniform] = uniformLength([
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
    ]);

    this.closes = klinesUniform.map(({ close }) => close);
    this.klines = klinesUniform;
    this.macd = macdUniform;
    this.ema100 = emaUniform;

    console.log(this.closes.length, this.macd.length, this.ema100.length);
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
    if (index < 1 || this.isInMACDRange(index) || this.isMACDUndefined(index)) {
      return undefined;
    }

    if (
      this.isTrendUp(index) &&
      this.isMACDBullish(index) &&
      this.isMACDBearish(index - 1)
    ) {
      const swingLowIndex = this.nearestSwingLowIndex(index);
      if (!swingLowIndex) return undefined;
      return new Order({
        closeTime: this.klines[index].closeTime,
        type: TransactionType.LONG,
        price: this.closes[index],
        stoploss: this.closes[swingLowIndex],
        profitTarget:
          this.closes[index] +
          (this.closes[index] - this.closes[swingLowIndex]) *
            this.profitTargetRatio,
      });
    }

    if (
      this.isTrendDown(index) &&
      this.isMACDBearish(index) &&
      this.isMACDBullish(index - 1)
    ) {
      const swingHighIndex = this.nearestSwingHighIndex(index);
      if (!swingHighIndex) return undefined;
      return new Order({
        closeTime: this.klines[index].closeTime,
        type: TransactionType.SHORT,
        price: this.closes[index],
        stoploss: this.closes[swingHighIndex],
        profitTarget:
          this.closes[index] -
          (this.closes[swingHighIndex] - this.closes[index]) *
            this.profitTargetRatio,
      });
    }

    return undefined;
  }

  isTrendUp(index: number): boolean {
    return this.closes[index] > this.ema100[index];
  }

  isTrendDown(index: number): boolean {
    return this.closes[index] < this.ema100[index];
  }

  isMACDBullish(index: number): boolean {
    const { MACD, signal } = this.macd[index];
    if (!MACD || !signal) throw new Error("MACD or signal is undefined");
    return MACD > signal;
  }

  isMACDBearish(index: number): boolean {
    const { MACD, signal } = this.macd[index];
    if (!MACD || !signal) throw new Error("MACD or signal is undefined");
    return MACD < signal;
  }

  isMACDUndefined(index: number): boolean {
    const { MACD, signal } = this.macd[index];
    return MACD === undefined || signal === undefined;
  }

  isInMACDRange(index: number): boolean {
    return index >= this.macd.length;
  }

  nearestSwingLowIndex(index: number): number | undefined {
    let swingLowIndex = index;
    for (let j = index; j > 0 && j > index - MACDStrategy.fastPeriod; j--) {
      if (this.closes[j] < this.closes[swingLowIndex]) {
        swingLowIndex = j;
      }
    }
    return swingLowIndex === index ? undefined : swingLowIndex;
  }

  nearestSwingHighIndex(index: number): number | undefined {
    let swingHighIndex = index;
    for (let j = index; j > 0 && j > index - MACDStrategy.fastPeriod; j--) {
      if (this.closes[j] > this.closes[swingHighIndex]) {
        swingHighIndex = j;
      }
    }
    return swingHighIndex === index ? undefined : swingHighIndex;
  }

  getTraces() {
    return [
      ...super.getTraces(),
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
    ];
  }

  getPlotLayout() {
    const ysection = 0.25;
    const ymargin = 0.05;
    return {
      title: {
        text: "Strategy MACD",
        font: {
          family: "Open sans, verdana, Roboto, Courier New, Arial, monospace",
          size: 24,
        },
        xref: "paper",
        x: 0.05,
      },
      hovermode: "x",
      yaxis: {
        domain: [ysection + ymargin / 2, 1],
        type: "log",
        autorange: true,
      },
      xaxis: {
        domain: [0, 1],
      },
      yaxis2: {
        domain: [0, ysection - ymargin / 2],
        anchor: "x2",
      },
      xaxis2: {
        domain: [0, 1],
        anchor: "y2",
      },
    };
  }
}
