export = Fiat;
/**
 * API fiat endpoints
 * @module Fiat
 * @param {*} superclass
 */
declare function Fiat(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Fiat Deposit/Withdraw History (USER_DATA)<br>
         *
         * GET /sapi/v1/fiat/orders<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fiat-deposit-withdraw-history-user_data}
         *
         * @param {number} transactionType - 0: deposit, 1: withdraw
         * @param {object} [options]
         * @param {number} [options.beginTime] - If beginTime and endTime are not sent, the recent 30-day data will be returned.
         * @param {number} [options.endTime]
         * @param {number} [options.page] - default 1
         * @param {number} [options.rows] - default 100, max 500
         * @param {number} [options.recvWindow]
         */
        depositWithdrawalHistory(transactionType: number, options?: {
            beginTime?: number;
            endTime?: number;
            page?: number;
            rows?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Fiat Payments History (USER_DATA)<br>
         *
         * GET /sapi/v1/fiat/payments<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fiat-payments-history-user_data}
         *
         * @param {number} transactionType - 0: buy, 1: sell
         * @param {object} [options]
         * @param {number} [options.beginTime] - If beginTime and endTime are not sent, the recent 30-day data will be returned.
         * @param {number} [options.endTime]
         * @param {number} [options.page] - default 1
         * @param {number} [options.rows] - default 100, max 500
         * @param {number} [options.recvWindow]
         */
        paymentHistory(transactionType: number, options?: {
            beginTime?: number;
            endTime?: number;
            page?: number;
            rows?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
