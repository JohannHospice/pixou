export interface OrderData {
  type: TransactionType;
  price: number;
  stoploss?: number;
  profitTarget?: number;
  closeTime: Date;
  bet?: number;
}

export class Order implements OrderData {
  type: TransactionType;
  price: number;
  stoploss?: number | undefined;
  profitTarget?: number | undefined;
  closeTime: Date;
  bet?: number | undefined;

  constructor(data: OrderData) {
    this.type = data.type;
    this.price = data.price;
    this.stoploss = data.stoploss;
    this.profitTarget = data.profitTarget;
    this.closeTime = data.closeTime;
    this.bet = data.bet;
  }

  execute(balance: Balance): Balance {
    return transaction[this.type](this.price, balance);
  }
}
export enum TransactionType {
  LONG = "LONG",
  SHORT = "SHORT",
}

export const transaction = {
  [TransactionType.LONG]: (price: number, balance: Balance) => ({
    coin: balance.coin + longOperation(price, balance.reserve),
    reserve: 0,
  }),
  [TransactionType.SHORT]: (price: number, balance: Balance) => ({
    coin: 0,
    reserve: balance.reserve + shortOperation(price, balance.coin),
  }),
};

export const longOperation = (price: number, amount: number) => amount / price;
export const shortOperation = (price: number, amount: number) => amount * price;

export interface Balance {
  coin: number;
  reserve: number;
}
