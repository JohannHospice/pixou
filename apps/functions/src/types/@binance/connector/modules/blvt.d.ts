export = Blvt;
/**
 * API blvt endpoints
 * @module Blvt
 * @param {*} superclass
 */
declare function Blvt(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get BLVT Info (MARKET_DATA)<br>
         *
         * GET /sapi/v1/blvt/tokenInfo<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-blvt-info-market_data}
         *
         * @param {object} [options]
         * @param {string} [options.tokenName]
         */
        blvtInfo(options?: {
            tokenName?: string;
        }): any;
        /**
         * Subscribe BLVT (USER_DATA)<br>
         *
         * POST /sapi/v1/blvt/subscribe<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#subscribe-blvt-user_data}
         *
         * @param {string} tokenName
         * @param {number} cost
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subscribeBlvt(tokenName: string, cost: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Query Subscription Record (USER_DATA)<br>
         *
         * GET /sapi/v1/blvt/subscribe/record<br>
         *
         * Only the data of the latest 90 days is available<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-subscription-record-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.tokenName]
         * @param {number} [options.id]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 1000, max 1000
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         *
         */
        blvtSubscriptionRecord(options?: {
            tokenName?: string;
            id?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Subscribe BLVT (USER_DATA)<br>
         *
         * POST /sapi/v1/blvt/redeem<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-blvt-user_data}
         *
         * @param {string} tokenName
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        redeemBlvt(tokenName: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Query Redemption Record (USER_DATA)<br>
         *
         * GET /sapi/v1/blvt/redeem/record<br>
         *
         * Only the data of the latest 90 days is available<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-redemption-record-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.tokenName]
         * @param {number} [options.id]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 1000, max 1000
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        blvtRedemptionRecord(options?: {
            tokenName?: string;
            id?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
