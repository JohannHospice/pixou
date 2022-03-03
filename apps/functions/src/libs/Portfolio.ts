import { longOperation, Order, shortOperation, TransactionType } from "./order";
import Strategy from "./strategies";

// invest each period
export default class Portfolio {
  totalInjected: number = 0;
  constructor(
    public strategy: Strategy,
    public coin: number = 0,
    public reserve: number = 0
  ) {}

  apply(injectPerKline: number) {
    for (let index = 0; index < this.strategy.klines.length; index++) {
      this.computeReserve(injectPerKline);
      this.totalInjected += injectPerKline;

      const order = this.strategy.getOrder(index);
      if (order) {
        this.executeOrder(order);
      }
    }
  }

  executeOrder(order: Order) {
    if (order.type === TransactionType.LONG) {
      this.long(order.price, this.reserve);
    }
    if (order.type === TransactionType.SHORT) {
      this.short(order.price, this.coin);
    }
  }

  short(price: number, amount: number) {
    this.computeReserve(shortOperation(price, amount));
    this.computeCoin(-amount);
  }

  long(price: number, amount: number) {
    this.computeCoin(longOperation(price, amount));
    this.computeReserve(-amount);
  }

  computeReserve(amount: number) {
    this.reserve += amount;
  }
  computeCoin(amount: number) {
    this.coin += amount;
  }

  getTotal(lastPrice: number) {
    return shortOperation(lastPrice, this.coin) + this.reserve;
  }
}
