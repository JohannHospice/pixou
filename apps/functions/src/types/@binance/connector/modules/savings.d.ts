export = Savings;
/**
 * API savings endpoints
 * @module Savings
 * @param {*} superclass
 */
declare function Savings(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Get Flexible Product List (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/daily/product/list<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-product-list-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.status] - "ALL", "SUBSCRIBABLE", "UNSUBSCRIBABLE"; default "ALL"
         * @param {string} [options.featured] - "ALL", "true"; default "ALL"
         * @param {number} [options.current] - Current query page. Default: 1, Min: 1
         * @param {number} [options.size] - Default: 50, Max: 100
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsFlexibleProducts(options?: {
            status?: string;
            featured?: string;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Left Daily Purchase Quota of Flexible Product (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/daily/userLeftQuota<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-left-daily-purchase-quota-of-flexible-product-user_data}
         *
         * @param {string} productId
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsFlexibleUserLeftQuota(productId: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Purchase Flexible Product (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/daily/purchase<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#purchase-flexible-product-user_data}
         *
         * @param {string} productId
         * @param {string} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsPurchaseFlexibleProduct(productId: string, amount: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Left Daily Redemption Quota of Flexible Product (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/daily/userRedemptionQuota<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-left-daily-redemption-quota-of-flexible-product-user_data}
         *
         * @param {string} productId
         * @param {string} type - "FAST", "NORMAL"
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsFlexibleUserRedemptionQuota(productId: string, type: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Redeem Flexible Product (USER_DATA)<br>
         *
         * POST /sapi/v1/lending/daily/redeem<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-flexible-product-user_data}
         *
         * @param {string} productId
         * @param {number} amount
         * @param {string} type - "FAST", "NORMAL"
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsFlexibleRedeem(productId: string, amount: number, type: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Flexible Product Position (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/daily/token/position<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-flexible-product-position-user_data}
         *
         * @param {string} asset
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsFlexibleProductPosition(asset: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Fixed and Activity Project List(USER_DATA)<br>
         *
         * GET /sapi/v1/lending/project/list<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fixed-and-activity-project-list-user_data}
         *
         * @param {string} type - "ACTIVITY", "CUSTOMIZED_FIXED"
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {string} [options.status] - "ALL", "SUBSCRIBABLE", "UNSUBSCRIBABLE"; default "ALL"
         * @param {boolean} [options.isSortAsc] - default "true"
         * @param {string} [options.sortBy] - "START_TIME", "LOT_SIZE", "INTEREST_RATE", "DURATION"; default "START_TIME"
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.size] - Default:10, Max:100
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsProductList(type: string, options?: {
            asset?: string;
            status?: string;
            isSortAsc?: boolean;
            sortBy?: string;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Purchase Fixed/Activity Project (USER_DATA)<br>
         *
         * POST /sapi/v1/lending/customizedFixed/purchase<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#purchase-fixed-activity-project-user_data}
         *
         * @param {string} projectId
         * @param {number} lot
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsPurchaseCustomizedProject(projectId: string, lot: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Fixed/Activity Project Position (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/project/position/list<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-fixed-activity-project-position-user_data}
         *
         * @param {string} asset
         * @param {object} [options]
         * @param {string} [options.projectId]
         * @param {string} [options.status] - "HOLDING", "REDEEMED"
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsCustomizedPosition(asset: string, options?: {
            projectId?: string;
            status?: string;
            recvWindow?: number;
        }): any;
        /**
         * Lending Account (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/union/account<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#lending-account-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsAccount(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Purchase Record (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/union/purchaseRecord<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-purchase-record-user_data}
         *
         * @param {string} lendingType - "DAILY" for flexible,
         *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.size] - Default:10, Max:100
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsPurchaseRecord(lendingType: string, options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Redemption Record (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/union/redemptionRecord<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-redemption-record-user_data}
         *
         * @param {string} lendingType - "DAILY" for flexible,
         *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.size] - Default:10, Max:100
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsRedemptionRecord(lendingType: string, options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Interest History (USER_DATA)<br>
         *
         * GET /sapi/v1/lending/union/interestHistory<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-interest-history-user_data-2}
         *
         * @param {string} lendingType - "DAILY" for flexible,
         *    "ACTIVITY" for activity, "CUSTOMIZED_FIXED" for fixed
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
         * @param {number} [options.size] - Default:10, Max:100
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        savingsInterestHistory(lendingType: string, options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
