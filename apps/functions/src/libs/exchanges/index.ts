export default class Exchange {
  klines(
    symbol: string,
    interval: string,
    options?: {
      startTime?: number | undefined;
      endTime?: number | undefined;
    }
  ): Promise<{
    data: any;
  }> {
    throw new Error("not implemented");
  }
  newOrder(
    symbole: string,
    side: string,
    type: string,
    options?: {
      price?: number;
      quantity?: number;
      timeInForce?: string;
      quoteOrderQty?: number;
      newClientOrderId?: string;
      stopPrice?: number;
      icebergQty?: number;
      newOrderRespType?: string;
      recvWindow?: number;
    }
  ): Promise<any> {
    throw new Error("not implemented");
  }
}
export enum ORDER_SIDE {
  MARKET = "MARKET",
  STOP_LOSS = "STOP_LOSS",
  TAKE_PROFIT = "TAKE_PROFIT",
  LIMIT = "LIMIT",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
}
