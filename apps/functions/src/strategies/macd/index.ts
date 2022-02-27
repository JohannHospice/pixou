import Strategy, { Order, OrderType } from "..";
import { MACD, EMA } from "technicalindicators";
import { CrinKline } from "../../exchanges/binance";

export default class MACDStrategy extends Strategy {
  macd: {
    MACD?: number;
    signal?: number;
    histogram?: number;
  }[] = [];
  ema100: number[] = [];
  closes: number[] = [];
  profitTargetRatio = 1.5;

  constructor(klines: CrinKline[]) {
    super(klines);
    this.closes = this.klines.map(({ close }) => close);
    this.macd = MACD.calculate({
      values: this.closes,
      fastPeriod: 12, // 5,
      slowPeriod: 26, // 8,
      signalPeriod: 9, // 3,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    });

    this.ema100 = EMA.calculate({
      values: this.closes,
      period: 100,
    });
  }

  getOrders(): Order[] {
    const orders = [];
    for (let i = 0; i < this.closes.length; i++) {
      const order = this.getOrder(i);

      if (order) {
        orders.push(order);
      }
    }
    return orders;
  }

  getOrder(index: number): Order | undefined {
    if (this.isInMACDRange(index) || this.isMACDUndefined(index)) {
      return undefined;
    }

    if (this.isTrendUp(index) && this.isMACDBullish(index)) {
      const swingLowIndex = this.nearestSwingLowIndex(index);
      if (!swingLowIndex) return undefined;
      return {
        closeTime: this.klines[index].closeTime,
        type: OrderType.LONG,
        price: this.closes[index],
        stoploss: this.closes[swingLowIndex],
        profitTarget:
          this.closes[index] +
          (this.closes[index] - this.closes[swingLowIndex]) *
            this.profitTargetRatio,
      };
    }

    if (this.isTrendDown(index) && this.isMACDBearish(index)) {
      const swingHighIndex = this.nearestSwingHighIndex(index);
      if (!swingHighIndex) return undefined;
      return {
        closeTime: this.klines[index].closeTime,
        type: OrderType.SHORT,
        price: this.closes[index],
        stoploss: this.closes[swingHighIndex],
        profitTarget:
          this.closes[index] -
          (this.closes[swingHighIndex] - this.closes[index]) *
            this.profitTargetRatio,
      };
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
    for (let swingLowIndex = index; swingLowIndex > 0; swingLowIndex--) {
      if (this.closes[swingLowIndex] < this.closes[swingLowIndex - 1]) {
        return swingLowIndex;
      }
    }
    return undefined;
  }

  nearestSwingHighIndex(index: number): number | undefined {
    for (let swingLowIndex = index; swingLowIndex > 0; swingLowIndex--) {
      if (this.closes[swingLowIndex] > this.closes[swingLowIndex - 1]) {
        return swingLowIndex;
      }
    }
    return undefined;
  }
}
