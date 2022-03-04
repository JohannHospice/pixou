import {
  Balance,
  longOperation,
  shortOperation,
  TransactionType,
} from "./order";
import Strategy from "./strategies";

// invest each period
export default class Portfolio {
  totalInjected: number = 0;
  constructor(
    public strategy: Strategy,
    public balance: Balance = {
      coin: 0,
      reserve: 0,
    }
  ) {}

  apply(injectPerKline: number) {
    for (let index = 0; index < this.strategy.klines.length; index++) {
      this.computeReserve(injectPerKline);
      this.totalInjected += injectPerKline;

      const order = this.strategy.getOrder(index);
      if (order) {
        this.balance = order.execute(this.balance);
      }
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
    this.balance.reserve += amount;
  }
  computeCoin(amount: number) {
    this.balance.coin += amount;
  }

  getTotal(lastPrice: number) {
    return shortOperation(lastPrice, this.balance.coin) + this.balance.reserve;
  }
}
