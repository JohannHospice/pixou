export interface Order {
  type: TransactionType;
  price: number;
  stoploss?: number;
  profitTarget?: number;
  closeTime: Date;
  bet?: number;
}

export enum TransactionType {
  LONG = "LONG",
  SHORT = "SHORT",
}

export const longOperation = (price: number, amount: number) => amount / price;
export const shortOperation = (price: number, amount: number) => amount * price;
