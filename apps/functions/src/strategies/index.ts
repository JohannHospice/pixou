import { CrinKline } from "../exchanges/binance";
import { Order, TransactionType } from "../order";

export default class Strategy {
  klines: CrinKline[] = [];
  orders: Order[] = [];

  constructor(klines: CrinKline[]) {
    this.klines = klines;
  }

  getOrders(): Order[] {
    throw new Error("Function not implemented.");
  }

  getOrder(index: number): Order | undefined {
    throw new Error("Function not implemented.");
  }

  // plot
  getTraces(): any[] {
    const orders = this.getOrders();
    const longOrders = orders.filter(
      ({ type }) => type === TransactionType.LONG
    );
    const shortOrders = orders.filter(
      ({ type }) => type === TransactionType.SHORT
    );
    return [
      {
        x: this.klines.map(({ closeTime }) => closeTime),
        y: this.klines.map(({ close }) => close),
        name: "Closes",
        type: "scatter",
      },
      {
        x: longOrders.map(({ closeTime }) => closeTime),
        y: longOrders.map(({ price }) => price),
        error_y: {
          type: "data",
          visible: true,
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
        marker: {
          color: "green",
        },
        // hovertemplate = "%{label}: <br>Popularity: %{percent} </br> %{text}")
      },
      {
        x: shortOrders.map(({ closeTime }) => closeTime),
        y: shortOrders.map(({ price }) => price),
        error_y: {
          type: "data",
          visible: true,
          symmetric: false,
          array: shortOrders.map(({ profitTarget, price }) =>
            profitTarget ? price - profitTarget : undefined
          ),
          arrayminus: shortOrders.map(({ stoploss, price }) =>
            stoploss ? stoploss - price : undefined
          ),
        },
        name: "SHORT",
        mode: "markers",
        type: "scatter",
        marker: {
          color: "red",
        },
      },
    ];
  }

  getPlotLayout(): { [x: string]: string | { [x: string]: any } } {
    throw new Error("Function not implemented.");
  }
}

export function uniformLength(arr: any[][]) {
  const minLength = Math.min(...arr.map((a) => a.length));
  console.log("removed " + minLength + " periods");

  return arr.map((a) => a.slice(a.length - minLength));
}
