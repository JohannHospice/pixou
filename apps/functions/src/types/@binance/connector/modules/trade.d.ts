export = Trade;
/**
 * API trade endpoints
 * @module Trade
 * @param {*} superclass
 */
declare function Trade(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Test New Order (TRADE)<br>
         *
         * POST /api/v3/order/test<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#test-new-order-trade}
         *
         * @param {string} symbol
         * @param {string} side
         * @param {string} type
         * @param {object} [options]
         * @param {string} [options.timeInForce]
         * @param {number} [options.quantity]
         * @param {number} [options.quoteOrderQty]
         * @param {number} [options.price]
         * @param {string} [options.newClientOrderId] - A unique id among open orders. Automatically generated if not sent.
         * @param {number} [options.stopPrice] - Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
         * @param {number} [options.icebergQty] - Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
         * @param {string} [options.newOrderRespType] - Set the response JSON. ACK, RESULT, or FULL;
         *    MARKET and LIMIT order types default to FULL, all other orders default to ACK.
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        newOrderTest(symbol: string, side: string, type: string, options?: {
            timeInForce?: string;
            quantity?: number;
            quoteOrderQty?: number;
            price?: number;
            newClientOrderId?: string;
            stopPrice?: number;
            icebergQty?: number;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        /**
         * New Order (TRADE)<br>
         *
         * POST /api/v3/order<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade}
         *
         * @param {string} symbol
         * @param {string} side
         * @param {string} type
         * @param {object} [options]
         * @param {string} [options.timeInForce]
         * @param {number} [options.quantity]
         * @param {number} [options.quoteOrderQty]
         * @param {number} [options.price]
         * @param {string} [options.newClientOrderId]
         * @param {number} [options.stopPrice]
         * @param {number} [options.icebergQty]
         * @param {string} [options.newOrderRespType]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        newOrder(symbol: string, side: string, type: string, options?: {
            timeInForce?: string;
            quantity?: number;
            quoteOrderQty?: number;
            price?: number;
            newClientOrderId?: string;
            stopPrice?: number;
            icebergQty?: number;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        /**
         * Cancel Order (TRADE)<br>
         *
         * DELETE /api/v3/order<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.orderId]
         * @param {string} [options.origClientOrderId]
         * @param {string} [options.newClientOrderId]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        cancelOrder(symbol: string, options?: {
            orderId?: number;
            origClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        /**
         * Cancel all Open Orders on a Symbol (TRADE)<br>
         *
         * DELETE /api/v3/openOrders<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade}
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        cancelOpenOrders(symbol: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Query Order (USER_DATA)<br>
         *
         * GET /api/v3/order<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.orderId]
         * @param {string} [options.origClientOrderId]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        getOrder(symbol: string, options?: {
            orderId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        /**
         * Current Open Orders (USER_DATA)<br>
         *
         * GET /api/v3/openOrders<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.symbol]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        openOrders(options?: {
            symbol?: string;
            recvWindow?: number;
        }): any;
        /**
         * All Orders (USER_DATA)<br>
         *
         * GET /api/v3/allOrders<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.orderId]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit]
         * @param {string} [options.recvWindow] - The value cannot be greater than 60000
         */
        allOrders(symbol: string, options?: {
            orderId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: string;
        }): any;
        /**
         * New OCO (TRADE)<br>
         *
         * POST /api/v3/order/oco<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#new-oco-trade}
         *
         * @param {string} symbol
         * @param {string} side
         * @param {number} quantity
         * @param {number} price
         * @param {number} stopPrice
         * @param {object} [options]
         * @param {string} [options.listClientOrderId]
         * @param {string} [options.limitClientOrderId]
         * @param {number} [options.limitIcebergQty]
         * @param {string} [options.stopClientOrderId]
         * @param {number} [options.stopLimitPrice]
         * @param {number} [options.stopIcebergQty]
         * @param {string} [options.stopLimitTimeInForce]
         * @param {string} [options.newOrderRespType]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        newOCOOrder(symbol: string, side: string, quantity: number, price: number, stopPrice: number, options?: {
            listClientOrderId?: string;
            limitClientOrderId?: string;
            limitIcebergQty?: number;
            stopClientOrderId?: string;
            stopLimitPrice?: number;
            stopIcebergQty?: number;
            stopLimitTimeInForce?: string;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        /**
         * Cancel OCO (TRADE)<br>
         *
         * DELETE /api/v3/orderList<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-oco-trade}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.orderListId]
         * @param {string} [options.listClientOrderId]
         * @param {string} [options.newClientOrderId]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        cancelOCOOrder(symbol: string, options?: {
            orderListId?: number;
            listClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        /**
         * Query OCO (USER_DATA)<br>
         *
         * GET /api/v3/orderList<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-oco-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.orderListId]
         * @param {string} [options.origClientOrderId]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        getOCOOrder(options?: {
            orderListId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        /**
         * Query all OCO (USER_DATA)<br>
         *
         * GET /api/v3/allOrderList<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-all-oco-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.fromId]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        getOCOOrders(options?: {
            fromId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Query Open OCO (USER_DATA)<br>
         *
         * GET /api/v3/openOrderList<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-open-oco-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        getOpenOCOOrders(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Account Information (USER_DATA)<br>
         *
         * GET /api/v3/account<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        account(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Account Trade List (USER_DATA)<br>
         *
         * GET /api/v3/myTrades<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data}
         *
         * @param {string} symbol
         * @param {object} [options]
         * @param {number} [options.orderId] - This can only be used in combination with symbol.
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.fromId]
         * @param {number} [options.limit]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        myTrades(symbol: string, options?: {
            orderId?: number;
            startTime?: number;
            endTime?: number;
            fromId?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Query Current Order Count Usage (TRADE)<br>
         *
         * GET /api/v3/rateLimit/order<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-current-order-count-usage-trade}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        orderCount(options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
