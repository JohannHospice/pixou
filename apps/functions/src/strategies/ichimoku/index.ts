import { IchimokuCloud } from "technicalindicators";
import { IchimokuCloudOutput } from "technicalindicators/declarations/ichimoku/IchimokuCloud";
import Strategy, { Order, OrderType } from "..";
import { CrinKline } from "../../exchanges/binance";

export class IchimokuStrategy extends Strategy {
  ichimoku: IchimokuCloudOutput[] = [];

  constructor(klines: CrinKline[]) {
    super(klines);
    this.ichimoku = IchimokuCloud.calculate({
      high: this.klines.map((kline) => kline.high),
      low: this.klines.map((kline) => kline.low),
      displacement: 1,
      conversionPeriod: 9,
      basePeriod: 26,
      spanPeriod: 52,
    });
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
    if (this.isCloseAboveTheCloud(index) && this.isIchimokuBullish(index)) {
      return {
        type: OrderType.LONG,
        price: this.klines[index].close,
      };
    }

    if (this.isCloseBehindTheCloud(index)) {
      return {
        type: OrderType.SHORT,
        price: this.klines[index].close,
      };
    }

    return undefined;
  }

  isCloseBehindTheCloud(index: number): boolean {
    const { spanA } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close < spanA;
  }

  isCloseAboveTheCloud(index: number): boolean {
    const { spanA, spanB } = this.ichimoku[index];
    const { close } = this.klines[index];
    return close > spanA && close > spanB;
  }

  isIchimokuBullish(index: number): boolean {
    const { spanA, spanB } = this.ichimoku[index];
    return spanA > spanB;
  }
  isIchimokuBearish(index: number): boolean {
    const { spanA, spanB } = this.ichimoku[index];
    return spanA < spanB;
  }
}
