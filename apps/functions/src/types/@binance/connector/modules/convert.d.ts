export = Convert;
/**
 * API Convert endpoints
 * @module Convert
 * @param {*} superclass
 */
declare function Convert(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Convert Trade History (USER_DATA)<br>
         *
         * GET /sapi/v1/convert/tradeFlow<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-convert-trade-history-user_data}
         *
         * @param {number} [startTime]
         * @param {number} [endTime]
         * @param {object} [options]
         * @param {number} [options.limit] - Default 100, Max 1000
         * @param {number} [options.recvWindow]
         *
         */
        convertTradeHistory(startTime?: number, endTime?: number, options?: {
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
