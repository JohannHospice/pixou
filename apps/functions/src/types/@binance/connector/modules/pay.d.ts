export = Pay;
/**
 * API Pay endpoints
 * @module Pay
 * @param {*} superclass
 */
declare function Pay(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Pay Trade History (USER_DATA)<br>
         *
         * GET /sapi/v1/pay/transactions<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-pay-trade-history-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.startTimestamp]
         * @param {number} [options.endTimestamp]
         * @param {number} [options.limit] - default 100, max 100
         * @param {number} [options.recvWindow]
         *
         */
        payHistory(options?: {
            startTimestamp?: number;
            endTimestamp?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
