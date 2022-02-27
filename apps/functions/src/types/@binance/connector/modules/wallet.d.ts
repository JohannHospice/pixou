export = Wallet;
/**
 * API wallet endpoints
 * @module Wallet
 * @param {*} superclass
 */
declare function Wallet(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * System Status (System)<br>
         *
         * GET /sapi/v1/system/status<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-sapi-system}
         */
        systemStatus(): any;
        /**
         * All Coins' Information (USER_DATA)<br>
         *
         * GET /sapi/v1/capital/config/getall<br>
         *
         * Get information of coins (available for deposit and withdraw) for user.<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         *
         */
        coinInfo(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Daily Account Snapshot (USER_DATA)<br>
         *
         * GET /sapi/v1/accountSnapshot<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#daily-account-snapshot-user_data}
         *
         * @param {string} type - "SPOT", "MARGIN", "FUTURES"
         * @param {object} [options]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - min 5, max 30, default 5
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        accountSnapshot(type: string, options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Disable Fast Withdraw Switch (USER_DATA)<br>
         *
         * GET /sapi/v1/account/disableFastWithdrawSwitch<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#disable-fast-withdraw-switch-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        disableFastWithdraw(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Enable Fast Withdraw Switch (USER_DATA)<br>
         *
         * GET /sapi/v1/account/enableFastWithdrawSwitch<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-fast-withdraw-switch-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        enableFastWithdraw(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Withdraw (USER_DATA)<br>
         *
         * POST /sapi/v1/capital/withdraw/apply<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#withdraw-user_data}
         *
         * @param {string} coin
         * @param {string} address
         * @param {number} amount
         * @param {object} [options]
         * @param {string} [options.withdrawOrderId] - client id for withdraw
         * @param {string} [options.network]
         * @param {string} [options.addressTag] - Secondary address identifier for coins like XRP,XMR etc.
         * @param {boolean} [options.transactionFeeFlag] - When making internal transfer, true for returning the fee to the destination account;
         * <br>false for returning the fee back to the departure account. Default false.
         * @param {string} [options.name] - Description of the address. Space in name should be encoded into %20.
         * @param {number} [options.walletType] - The wallet type for withdraw，0-spot wallet, 1-funding wallet. Default is spot wallet
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        withdraw(coin: string, address: string, amount: number, options?: {
            withdrawOrderId?: string;
            network?: string;
            addressTag?: string;
            transactionFeeFlag?: boolean;
            name?: string;
            walletType?: number;
            recvWindow?: number;
        }): any;
        /**
         * Deposit History(supporting network) (USER_DATA)<br>
         *
         * GET /sapi/v1/capital/deposit/hisrec<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-history-supporting-network-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.coin]
         * @param {number} [options.status] - 0:pending, 6:credited but cannot withdraw, 1:success
         * @param {number} [options.startTime] - Default: 90 days from current timestamp
         * @param {number} [options.endTime] - Default: present timestamp
         * @param {number} [options.offest]
         * @param {number} [options.limit]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        depositHistory(options?: {
            coin?: string;
            status?: number;
            startTime?: number;
            endTime?: number;
            offest?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Withdraw History(supporting network) (USER_DATA)<br>
         *
         * GET /sapi/v1/capital/withdraw/history<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#withdraw-history-supporting-network-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.coin]
         * @param {string} [options.withdrawOrderId]
         * @param {number} [options.status] - 0:Email Sent 1:Cancelled 2:Awaiting Approval 3:Rejected 4:Processing 5:Failure 6:Completed
         * @param {number} [options.startTime] - Default: 90 days from current timestamp
         * @param {number} [options.endTime] - Default: present timestamp
         * @param {number} [options.offest]
         * @param {number} [options.limit]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        withdrawHistory(options?: {
            coin?: string;
            withdrawOrderId?: string;
            status?: number;
            startTime?: number;
            endTime?: number;
            offest?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Deposit Address (supporting network) (USER_DATA)<br>
         *
         * GET /sapi/v1/capital/deposit/address<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-address-supporting-network-user_data}
         *
         * @param {string} coin
         * @param {object} [options]
         * @param {string} [options.network]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        depositAddress(coin: string, options?: {
            network?: string;
            recvWindow?: number;
        }): any;
        /**
         * Account Status (USER_DATA)<br>
         *
         * GET /sapi/v1/account/status<br>
         *
         * Fetch account status detail.<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#account-status-sapi-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         *
         */
        accountStatus(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Account API Trading Status (USER_DATA)<br>
         *
         * GET /sapi/v1/account/apiTradingStatus<br>
         *
         * Fetch account api trading status detail.<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#account-api-trading-status-sapi-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        tradingStatus(options?: {
            recvWindow?: number;
        }): any;
        /**
         * DustLog (USER_DATA)<br>
         *
         * GET /sapi/v1/asset/dribblet<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#dustlog-sapi-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        dustLog(options?: {
            startTime?: number;
            endTime?: number;
            recvWindow?: number;
        }): any;
        /**
         * Dust Transfer (USER_DATA)<br>
         *
         * POST /sapi/v1/asset/dust<br>
         *
         * Convert dust assets to BNB.<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#dust-transfer-user_data}
         *
         * @param {array} asset - The asset being converted
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        dustTransfer(asset: any[], options?: {
            recvWindow?: number;
        }): any;
        /**
         * Asset Dividend Record (USER_DATA)<br>
         *
         * GET /sapi/v1/asset/assetDividend<br>
         *
         * Query asset dividend record.<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#asset-dividend-record-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - Default 20, max 500
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        assetDevidendRecord(options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Asset Detail (USER_DATA)<br>
         *
         * GET /sapi/v1/asset/assetDetail<br>
         *
         * Fetch details of assets supported on Binance.<br>
         * Please get network and other deposit or withdraw details from GET /sapi/v1/capital/config/getall.<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#asset-detail-sapi-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        assetDetail(options?: {
            asset?: string;
            recvWindow?: number;
        }): any;
        /**
         * Trade Fee (USER_DATA)<br>
         *
         * GET /sapi/v1/asset/tradeFee<br>
         *
         * Fetch trade fee<br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-fee-sapi-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.symbol]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         *
         */
        tradeFee(options?: {
            symbol?: string;
            recvWindow?: number;
        }): any;
        /**
         * User Universal Transfer (USER_DATA)<br>
         *
         * POST /sapi/v1/asset/transfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#user-universal-transfer}
         *
         * @param {string} type
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {string} [options.fromSymbol] - must be sent when type are ISOLATEDMARGIN_MARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
         * @param {string} [options.toSymbol] - must be sent when type are MARGIN_ISOLATEDMARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        userUniversalTransfer(type: string, asset: string, amount: number, options?: {
            fromSymbol?: string;
            toSymbol?: string;
            recvWindow?: number;
        }): any;
        /**
         * Query User Universal Transfer History (USER_DATA)<br>
         *
         * GET /sapi/v1/asset/transfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-user-universal-transfer-history}
         *
         * @param {string} type
         * @param {object} [options]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.current]
         * @param {number} [options.size]
         * @param {string} [options.fromSymbol] - must be sent when type are ISOLATEDMARGIN_MARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
         * @param {string} [options.toSymbol] - must be sent when type are MARGIN_ISOLATEDMARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        userUniversalTransferHistory(type: string, options?: {
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            fromSymbol?: string;
            toSymbol?: string;
            recvWindow?: number;
        }): any;
        /**
         * Funding Wallet (USER_DATA)<br>
         *
         * POST /sapi/v1/asset/get-funding-asset<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data}
         *
         * @param {object} [options]
         * @param {string} [options.asset]
         * @param {string} [options.needBtcValuation] - true or false
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        fundingWallet(options?: {
            asset?: string;
            needBtcValuation?: string;
            recvWindow?: number;
        }): any;
        /**
         * API Key Permission (USER_DATA)<br>
         *
         * GET /sapi/v1/account/apiRestrictions<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        apiPermissions(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Assets That Can Be Converted Into BNB (USER_DATA)<br>
         *
         * POST /sapi/v1/asset/dust-btc<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#dustlog-user_data}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        bnbConvertibleAssets(options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
