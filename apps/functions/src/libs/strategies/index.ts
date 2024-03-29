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

  getLastOrder(): Order | undefined {
    return this.getOrder(this.klines.length - 1);
  }

  build() {
    this.orders = this.getOrders();
  }

  // plot
  getTraces(): any[] {
    const longOrders = this.orders.filter(
      ({ type }) => type === TransactionType.LONG
    );
    const shortOrders = this.orders.filter(
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
      {
        x: this.orders.map((v) => v.closeTime),
        y: (() => {
          let sum = 0;
          let short = 0;
          let longI = 1;
          return this.orders.map(({ type, price }, i) => {
            if (type === TransactionType.LONG) {
              if (short !== 0) {
                sum += (short + price) / 2;
                short = 0;
              } else {
                sum += price;
              }
              longI++;
            }
            if (type === TransactionType.SHORT && short !== 0) {
              short = price;
            }
            const avg = sum / longI;
            return (price - avg) / price;
          });
        })(),
        name: "Strat",
        type: "scatter",
        fill: "tozeroy",
        yaxis: "y4",
      },
      // {
      //   x: this.klines.map(({ closeTime }) => closeTime),
      //   y: (() => {
      //     let sum = 0;
      //     return this.klines.map(({ close }, i) => {
      //       sum += close;
      //       return sum / (i + 1);
      //     });
      //   })(),
      //   name: "SimpleHLD",
      //   type: "scatter",
      //   fill: "tozeroy",
      //   yaxis: "y4",
      // },
    ];
  }

  getPlotLayout(): { [x: string]: any } {
    // console.log("median " + median(this.orders.map((order) => order.price)));
    return {};
  }
}

export function uniformLength(arr: any[][]): any[][] {
  const minLength = Math.min(...arr.map((a) => a.length));
  console.log(
    "Remain " +
      minLength +
      " periods from " +
      Math.max(...arr.map((a) => a.length))
  );

  return arr.map((a) => a.slice(a.length - minLength));
}

// function median(values: number[]): number {
//   if (values.length === 0) return NaN;

//   values.sort(function (a, b) {
//     return a - b;
//   });

//   var half = Math.floor(values.length / 2);

//   if (values.length % 2) return values[half];

//   return (values[half - 1] + values[half]) / 2.0;
// }
