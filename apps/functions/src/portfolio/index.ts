import Strategy from "../strategies";

export default class Portfolio {
  constructor(
    public strategy: Strategy,
    public coin: number = 0,
    public reserve: number = 0
  ) {}

  applyPerKliner(injectPerKline: number) {
    for (let index = 0; index < this.strategy.klines.length; index++) {
      this.reserve += injectPerKline;

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
    this.reserve += shortOperation(price, amount);
    this.coin -= amount;
  }

  long(price: number, amount: number) {
    this.coin += longOperation(price, amount);
    this.reserve -= amount;
  }
}
