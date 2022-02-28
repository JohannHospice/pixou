import { IchimokuCloud } from "technicalindicators";
import Strategy, { Order, OrderType, uniformLength2 } from "..";
import { CrinKline } from "../../exchanges/binance";

export default class IchimokuStrategy extends Strategy {
  ichimoku: {
    conversion: number;
    base: number;
    spanA: number;
    spanB: number;
  }[] = [];

  constructor(klines: CrinKline[]) {
    super(klines);
    const [klinesUniform, ichimokuUniform] = uniformLength2([
      klines,
      IchimokuCloud.calculate({
        high: this.klines.map((kline) => kline.high),
        low: this.klines.map((kline) => kline.low),
        displacement: 1,
        conversionPeriod: 9,
        basePeriod: 26,
        spanPeriod: 52,
      }),
    ]);

    this.ichimoku = ichimokuUniform;
    this.klines = klinesUniform;
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
      ...super.getTraces(),
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
    ];
  }

  getPlotLayout(): { [x: string]: string | { [x: string]: any } } {
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
        domain: [0, 1],
        type: "log",
        autorange: true,
      },
      xaxis: {
        domain: [0, 1],
      },
    };
  }
}
