export = Rebate;
/**
 * API Rebate endpoints
 * @module Rebate
 * @param {*} superclass
 */
declare function Rebate(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Spot Rebate History Records (USER_DATA)<br>
         *
         * GET /sapi/v1/rebate/taxQuery<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-spot-rebate-history-records-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.page] - Default 1
         * @param {number} [options.recvWindow]
         *
         */
        rebateSpotHistory(options?: {
            startTime?: number;
            endTime?: number;
            page?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
