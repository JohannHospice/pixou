export = C2C;
/**
 * API C2C endpoints
 * @module C2C
 * @param {*} superclass
 */
declare function C2C(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get C2C Trade History (USER_DATA)<br>
         *
         * GET /sapi/v1/c2c/orderMatch/listUserOrderHistory<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-c2c-trade-history-user_data}
         *
         * @param {string} tradeType - BUY, SELL
         * @param {object} [options]
         * @param {number} [options.startTimestamp] - The max interval between startTimestamp and endTimestamp is 30 days.<br>
         *     If startTimestamp and endTimestamp are not sent, the recent 30-day data will be returned.
         * @param {number} [options.endTimestamp]
         * @param {number} [options.page] - default 1
         * @param {number} [options.rows] - default 100, max 100
         * @param {number} [options.recvWindow]
         *
         */
        c2cTradeHistory(tradeType: string, options?: {
            startTimestamp?: number;
            endTimestamp?: number;
            page?: number;
            rows?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
