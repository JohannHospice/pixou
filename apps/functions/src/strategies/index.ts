import { CrinKline } from "../exchanges/binance";

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

  result() {
    let cash = 1;
    let coin = 0;
    let orderWatch: Order[] = [];

    this.klines.forEach((kline, index) => {
      const order = this.getOrder(index);
      if (order) {
        open(order, cash);
      }

      orderWatch.forEach((order, orderWatchIndex) => {
        if (order.type === OrderType.LONG) {
          if (order.stoploss && kline.close <= order.stoploss) {
            close(orderWatchIndex, kline);
          }
          if (order.profitTarget && kline.close >= order.profitTarget) {
            close(orderWatchIndex, kline);
          }
        }

        if (order.type === OrderType.SHORT) {
          if (order.stoploss && kline.close > order.stoploss) {
            close(orderWatchIndex, kline);
          }

          if (order.profitTarget && kline.close < order.profitTarget) {
            close(orderWatchIndex, kline);
          }

          if (
            !order.stoploss &&
            !order.profitTarget &&
            orderWatch[orderWatchIndex - 1].type === OrderType.LONG
          ) {
            close(orderWatchIndex, kline);
            orderWatch.splice(orderWatchIndex - 2, 1);
          }
        }
      });
    });

    return {
      initialCash: 1,
      coin,
      cash,
      total: cash + coin * this.klines[this.klines.length - 1].close,
    };

    function open(order: Order, cashBet: number) {
      coin += cashBet / order.price;
      cash -= cashBet;
      orderWatch.push({ ...order, bet: coin });
    }

    function close(orderWatchIndex: number, kline: CrinKline) {
      console.log(orderWatch, orderWatchIndex, orderWatch[orderWatchIndex]);
      const { bet, price, type } = orderWatch[orderWatchIndex];

      if (bet === undefined) {
        throw new Error("Order bet is not defined.");
      }

      cash +=
        type === OrderType.LONG
          ? bet * kline.close
          : bet * (price + price - kline.close);
      coin -= bet;

      orderWatch.splice(orderWatchIndex, 1);
    }
  }
  // plot
  getTraces(): any[] {
    const orders = this.getOrders();
    const longOrders = orders.filter(({ type }) => type === OrderType.LONG);
    const shortOrders = orders.filter(({ type }) => type === OrderType.SHORT);
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

export enum OrderType {
  LONG = "long",
  SHORT = "short",
}

export interface Order {
  type: OrderType;
  price: number;
  stoploss?: number;
  profitTarget?: number;
  closeTime: Date;
  bet?: number;
}

export function uniformLength2<X, Y>(arr: [X[], Y[]]): [X[], Y[]] {
  const [a, b] = arr;
  const minLength = Math.min(a.length, b.length);
  return [a.slice(a.length - minLength), b.slice(b.length - minLength)];
}

export function uniformLength3<X, Y, Z>(arr: [X[], Y[], Z[]]): [X[], Y[], Z[]] {
  const [a, b, c] = arr;
  const minLength = Math.min(a.length, b.length, c.length);
  return [
    a.slice(a.length - minLength),
    b.slice(b.length - minLength),
    c.slice(c.length - minLength),
  ];
}

export function uniformLength4<X, Y, Z, O>(
  arr: [X[], Y[], Z[], O[]]
): [X[], Y[], Z[], O[]] {
  const [a, b, c, o] = arr;
  const minLength = Math.min(a.length, b.length, c.length);
  return [
    a.slice(a.length - minLength),
    b.slice(b.length - minLength),
    c.slice(c.length - minLength),
    o.slice(o.length - minLength),
  ];
}
export function uniformLength5<X, Y, Z, O, P>(
  arr: [X[], Y[], Z[], O[], P[]]
): [X[], Y[], Z[], O[], P[]] {
  const [a, b, c, o, p] = arr;
  const minLength = Math.min(a.length, b.length, c.length);
  return [
    a.slice(a.length - minLength),
    b.slice(b.length - minLength),
    c.slice(c.length - minLength),
    o.slice(o.length - minLength),
    p.slice(p.length - minLength),
  ];
}

export function uniformLength(arr: any[][]) {
  const minLength = Math.min(...arr.map((a) => a.length));
  console.log("removed " + minLength + " periods");

  return arr.map((a) => a.slice(a.length - minLength));
}
