export = Futures;
/**
 * API futures endpoints
 * @module Futures
 * @param {*} superclass
 */
declare function Futures(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * New Futures Account Transfer (USER_DATA)
         *
         * Execute transfer between spot account and futures account.
         *
         * POST /sapi/v1/futures/transfer
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#new-future-account-transfer-user_data}
         *
         * @param {string} asset - The asset being transferred, e.g., USDT
         * @param {number} amount - The amount to be transferred
         * @param {number} type - 1: transfer from spot account to USDT-Ⓜ futures account.
         * <br>2: transfer from USDT-Ⓜ futures account to spot account.
         * <br>3: transfer from spot account to COIN-Ⓜ futures account.
         * <br>4: transfer from COIN-Ⓜ futures account to spot account.
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresTransfer(asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Futures Account Transaction History List (USER_DATA)
         *
         * GET /sapi/v1/futures/transfer
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-future-account-transaction-history-list-user_data}
         *
         * @param {string} asset
         * @param {number} startTime
         * @param {object} [options]
         * @param {number} [options.endTime]
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.size] - Default:10 Max:100
         * @param {number} [options.recvWindow]
         */
        futuresTransferHistory(asset: string, startTime: number, options?: {
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Borrow For Cross-Collateral (TRADE)
         *
         * POST /sapi/v1/futures/loan/borrow
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#borrow-for-cross-collateral-trade}
         *
         * @param {string} coin
         * @param {number} amount - mandatory when collateralAmount is empty
         * @param {string} collateralCoin
         * @param {number} collateralAmount - mandatory when amount is empty
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanBorrow(coin: string, amount: number, collateralCoin: string, collateralAmount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Borrow History (USER_DATA)
         *
         * GET /sapi/v1/futures/loan/borrow/history
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-borrow-history-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.coin]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 500, max 1000
         * @param {number} [options.recvWindow]
         */
        futuresLoanBorrowHistory(options?: {
            coin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Repay For Cross-Collateral (TRADE)
         *
         * POST /sapi/v1/futures/loan/repay
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#repay-for-cross-collateral-trade}
         *
         * @param {string} coin
         * @param {string} collateralCoin
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanRepay(coin: string, collateralCoin: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Repayment History (USER_DATA)
         *
         * GET /sapi/v1/futures/loan/repay/history
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-repayment-history-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.coin]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 500, max 1000
         * @param {number} [options.recvWindow]
         */
        futuresLoanRepayHistory(options?: {
            coin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Wallet (USER_DATA)
         *
         * GET /sapi/v2/futures/loan/wallet
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-wallet-v2-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanWallet(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Information (USER_DATA)
         *
         * GET /sapi/v2/futures/loan/configs
         *
         * all loan and collateral data will be returned if loanCoin or collateralCoin is not sent
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-information-v2-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.loanCoin]
         * @param {string} [options.collateralCoin]
         * @param {number} [options.recvWindow]
         */
        futuresLoanConfigs(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            recvWindow?: number;
        }): any;
        /**
         * Calculate Rate After Adjust Cross-Collateral LTV (USER_DATA)
         *
         * GET /sapi/v2/futures/loan/calcAdjustLevel
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#calculate-rate-after-adjust-cross-collateral-ltv-v2-user_data}
         *
         * @param {string} loanCoin
         * @param {string} collateralCoin
         * @param {number} amount
         * @param {string} direction - "ADDITIONAL", "REDUCED"
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanCalcAdjustLevel(loanCoin: string, collateralCoin: string, amount: number, direction: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Max Amount for Adjust Cross-Collateral LTV (USER_DATA)
         *
         * GET /sapi/v2/futures/loan/calcMaxAdjustAmount
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-max-amount-for-adjust-cross-collateral-ltv-v2-user_data}
         *
         * @param {string} loanCoin
         * @param {string} collateralCoin
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanCalcMaxAdjustAmount(loanCoin: string, collateralCoin: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Adjust Cross-Collateral LTV (TRADE)
         *
         * POST /sapi/v2/futures/loan/adjustCollateral
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#adjust-cross-collateral-ltv-v2-trade}
         *
         * @param {string} loanCoin
         * @param {string} collateralCoin
         * @param {number} amount
         * @param {string} direction - "ADDITIONAL", "REDUCED"
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresLoanAdjustCollateral(loanCoin: string, collateralCoin: string, amount: number, direction: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Adjust Cross-Collateral LTV History (USER_DATA)
         *
         * GET /sapi/v1/futures/loan/adjustCollateral/history
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#adjust-cross-collateral-ltv-history-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.loanCoin]
         * @param {string} [options.collateralCoin]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 500, max 1000
         * @param {number} [options.recvWindow]
         *
         * All data will be returned if loanCoin or collateralCoin is not sent
         */
        futuresLoanAdjustCollateralHistory(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Liquidation History (USER_DATA)
         *
         * GET /sapi/v1/futures/loan/liquidationHistory
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#adjust-cross-collateral-ltv-history-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.loanCoin]
         * @param {string} [options.collateralCoin]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - default 500, max 1000
         * @param {number} [options.recvWindow]
         */
        futuresLoanLiquidationHistory(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Check Collateral Repay Limit (USER_DATA)
         *
         * Check the maximum and minimum limit when repay with collateral.
         *
         * GET /sapi/v1/futures/loan/collateralRepayLimit
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#check-collateral-repay-limit-user_data}
         *
         * @param {string} coin
         * @param {string} collateralCoin
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresCollateralRepayLimit(coin: string, collateralCoin: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Collateral Repay Quote (USER_DATA)
         *
         * Get quote before repay with collateral is mandatory, the quote will be valid within 25 seconds.
         *
         * GET /sapi/v1/futures/loan/collateralRepay
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-collateral-repay-quote-user_data}
         *
         * @param {string} coin
         * @param {string} collateralCoin
         * @param {number} amount - repay amount
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresCollateralRepayQuote(coin: string, collateralCoin: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Repay with Collateral (USER_DATA)
         *
         * Repay with collateral. Get quote before repay with collateral is mandatory, the quote will be valid within 25 seconds.
         *
         * POST /sapi/v1/futures/loan/collateralRepay
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#repay-with-collateral-user_data}
         *
         * @param {string} quoteId
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresCollateralRepay(quoteId: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Collateral Repayment Result (USER_DATA)
         *
         * Check collateral repayment result.
         *
         * GET /sapi/v1/futures/loan/collateralRepayResult
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#collateral-repayment-result-user_data}
         *
         * @param {string} quoteId
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        futuresCollateralRepayResult(quoteId: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Cross-Collateral Interest History (USER_DATA)
         *
         * GET /sapi/v1/futures/loan/interestHistory
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-collateral-interest-history-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.collateralCoin]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.limit] - Default:500 Max:1000
         * @param {number} [options.recvWindow]
         */
        futuresLoanInterestHistory(options?: {
            collateralCoin?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
