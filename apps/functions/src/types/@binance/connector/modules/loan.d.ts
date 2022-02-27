export = Loan;
/**
 * API Crypto Loans endpoints
 * @module Loan
 * @param {*} superclass
 */
declare function Loan(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Crypto Loans Income History (USER_DATA)<br>
         *
         * GET /sapi/v1/loan/income<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-crypto-loans-income-history-user_data}
         *
         * @param {string} asset
         * @param {object} [options]
         * @param {string} [options.type] - All types will be returned by default.<br>
         *     Enum：borrowIn, collateralSpent, repayAmount, collateralReturn(Collateral return after repayment), addCollateral, removeCollateral, collateralReturnAfterLiquidation.
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 20, max 100
         * @param {number} [options.recvWindow]
         *
         */
        loanHistory(asset: string, options?: {
            type?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
