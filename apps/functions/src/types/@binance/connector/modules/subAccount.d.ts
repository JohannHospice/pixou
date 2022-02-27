export = SubAccount;
/**
 * API sub account endpoints
 * @module SubAccount
 * @param {*} superclass
 */
declare function SubAccount(superclass: any): {
    new (): {
        [x: string]: any;
        /**
          * Query Sub-account List(For Master Account)<br>
          *
          * GET /sapi/v1/sub-account/list<br>
          *
          * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-list-sapi-for-master-account}
          *
          * @param {object} [options]
          * @param {string} [options.email]
          * @param {string} [options.isFreeze] - true or false
          * @param {number} [options.page]
          * @param {number} [options.limit]
          * @param {number} [options.recvWindow] - The value cannot be greater than 60000
          */
        subAccountList(options?: {
            email?: string;
            isFreeze?: string;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Query Sub-account Transfer History(For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/sub/transfer/history<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-asset-transfer-history-sapi-for-master-account}
         *
         * @param {object} [options]
         * @param {string} [options.fromEmail]
         * @param {string} [options.toEmail]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.page]
         * @param {number} [options.limit]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountTransferHistory(options?: {
            fromEmail?: string;
            toEmail?: string;
            startTime?: number;
            endTime?: number;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
          * Query Sub-account Assets(For Master Account)<br>
          *
          * GET /sapi/v3/sub-account/assets<br>
          *
          * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-assets-for-master-account}
          *
          * @param {string} email
          * @param {object} [options]
          * @param {number} [options.recvWindow] - The value cannot be greater than 60000
          */
        subAccountAssets(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Sub-account Deposit Address (For Master Account)<br>
         *
         * GET /sapi/v1/capital/deposit/subAddress<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
         *
         * @param {string} email
         * @param {string} coin
         * @param {object} [options]
         * @param {string} [options.network]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountDepositAddress(email: string, coin: string, options?: {
            network?: string;
            recvWindow?: number;
        }): any;
        /**
         * Get Sub-account Deposit History (For Master Account)<br>
         *
         * GET /sapi/v1/capital/deposit/subHisrec<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {string} [options.coin]
         * @param {number} [options.status]
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit]
         * @param {number} [options.offset]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountDepositHistory(email: string, options?: {
            coin?: string;
            status?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            offset?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Sub-account's Status on Margin/Futures(For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/status<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-39-s-status-on-margin-futures-for-master-account}
         *
         * @param {object} [options]
         * @param {string} [options.email]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountStatus(options?: {
            email?: string;
            recvWindow?: number;
        }): any;
        /**
         * Enable Margin for Sub-account (For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/margin/enable<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-margin-for-sub-account-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountEnableMargin(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Detail on Sub-account's Margin Account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/margin/account<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountMarginAccount(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Summary of Sub-account's Margin Account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/margin/accountSummary<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountMarginAccountSummary(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Enable Futures for Sub-account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/futures/enable<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-futures-for-sub-account-for-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountEnableFutures(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Detail on Sub-account's Futures Account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/futures/account<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-futures-account-for-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountFuturesAccount(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Summary of Sub-account's Futures Account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/futures/accountSummary<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-summary-of-sub-account-39-s-futures-account-for-master-account}
         *
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountFuturesAccountSummary(options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Futures Postion-Risk of Sub-account (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/futures/positionRisk<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-futures-postion-risk-of-sub-account-for-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountFuturesPositionRisk(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Futures Transfer for Sub-account(For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/futures/transfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#futures-transfer-for-sub-account-for-master-account}
         *
         * @param {string} email
         * @param {string} asset
         * @param {number} amount
         * @param {number} type - 1: transfer from subaccount's spot account to its USDT-margined futures account
         * <br>2: transfer from subaccount's USDT-margined futures account to its spot account
         * <br>3: transfer from subaccount's spot account to its COIN-margined futures account
         * <br>4: transfer from subaccount's COIN-margined futures account to its spot account
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountFuturesTransfer(email: string, asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Margin Transfer for Sub-account(For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/margin/transfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-transfer-for-sub-account-for-master-account}
         *
         * @param {string} email
         * @param {string} asset
         * @param {number} amount
         * @param {number} type - 1: transfer from subaccount's spot account to margin account
         * <br>2: transfer from subaccount's margin account to its spot account
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
      
         */
        subAccountMarginTransfer(email: string, asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Transfer to Sub-account of Same Master（For Sub-account）<br>
         *
         * POST /sapi/v1/sub-account/transfer/subToSub<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-sub-account-of-same-master-for-sub-account}
         *
         * @param {string} toEmail
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountTransferToSub(toEmail: string, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Transfer to Master（For Sub-account）<br>
         *
         * POST /sapi/v1/sub-account/transfer/subToMaster<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-master-for-sub-account}
         *
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountTransferToMaster(asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Sub-account Transfer History (For Sub-account)<br>
         *
         * GET /sapi/v1/sub-account/transfer/subUserHistory<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-transfer-history-for-sub-account}
         *
         * @param {object} [options]
         * @param {string} [options.asset] - If not sent, result of all assets will be returned
         * @param {number} [options.type] - 1: transfer in, 2: transfer out
         * @param {number} [options.startTime]
         * @param {number} [options.endTime]
         * @param {number} [options.limit] - Default 500
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
      
         */
        subAccountTransferSubAccountHistory(options?: {
            asset?: string;
            type?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Query Sub-account Futures Asset Transfer History(For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/futures/internalTransfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-futures-asset-transfer-history-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
         * @param {object} [options]
         * @param {number} [options.startTime] - Default return the history with in 100 days
         * @param {number} [options.endTime] - Default return the history with in 100 days
         * @param {number} [options.page] - Default value: 1
         * @param {number} [options.limit] - Default value: 50, Max value: 500
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountFuturesAssetTransferHistory(email: string, futuresType: number, options?: {
            startTime?: number;
            endTime?: number;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Sub-account Futures Asset Transfer(For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/futures/internalTransfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-futures-asset-transfer-for-master-account}
         *
         * @param {string} fromEmail - Sender email
         * @param {string} toEmail - Recipient email
         * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
      
         */
        subAccountFuturesAssetTransfer(fromEmail: string, toEmail: string, futuresType: number, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Query Sub-account Spot Assets Summary (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/spotSummary<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-assets-summary-for-master-account}
         *
         * @param {object} [options]
         * @param {string} [options.email] - Sub account email
         * @param {number} [options.page] - default 1
         * @param {number} [options.size] - default 10, max 20
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountSpotSummary(options?: {
            email?: string;
            page?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        /**
         * Create a Virtual Sub-account(For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/virtualSubAccount<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#create-a-virtual-sub-account-for-master-account}
         *
         * @param {string} subAccountString
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountCreation(subAccountString: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Enable Leverage Token for Sub-account (For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/blvt/enable<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-leverage-token-for-sub-account-for-master-account}
         *
         * @param {string} email
         * @param {boolean} enableBlvt
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        subAccountLeverageToken(email: string, enableBlvt: boolean, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Deposit assets into the managed sub-account（For Investor Master Account)<br>
         *
         * POST /sapi/v1/managed-subaccount/deposit<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-assets-into-the-managed-sub-account-for-investor-master-account}
         *
         * @param {string} toEmail
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.recvWindow] - The value cannot be greater than 60000
         */
        managedSubAccountDeposit(toEmail: string, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Query managed sub-account asset details（For Investor Master Account)<br>
         *
         * GET /sapi/v1/managed-subaccount/asset<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-managed-sub-account-asset-details-for-investor-master-account}
         *
         * @param {string} email
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        managedSubAccountAssets(email: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Withdrawl assets from the managed sub-account（For Investor Master Account)<br>
         *
         * POST /sapi/v1/managed-subaccount/withdraw<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#withdrawl-assets-from-the-managed-sub-account-for-investor-master-account}
         *
         * @param {string} fromEmail
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {number} [options.transferDate] - Withdrawals is automatically occur on the transfer date(UTC0).
         * <br>If a date is not selected, the withdrawal occurs right now
         * @param {number} [options.recvWindow]
         */
        managedSubAccountWithdraw(fromEmail: string, asset: string, amount: number, options?: {
            transferDate?: number;
            recvWindow?: number;
        }): any;
        /**
         * Enable or Disable IP Restriction for a Sub-account API Key (For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/subAccountApi/ipRestriction<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-or-disable-ip-restriction-for-a-sub-account-api-key-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {string} subAccountApiKey
         * @param {boolean} ipRestrict - true or false
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountApiToggleIpRestriction(email: string, subAccountApiKey: string, ipRestrict: boolean, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Add IP List for a Sub-account API Key (For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/subAccountApi/ipRestriction/ipList<br>
         *
         * Before the usage of this endpoint, please ensure POST /sapi/v1/sub-account/subAccountApi/ipRestriction was used to enable the IP restriction.<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#add-ip-list-for-a-sub-account-api-key-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {string} subAccountApiKey
         * @param {string} ipAddress - Can be added in batches, separated by commas
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountApiAddIp(email: string, subAccountApiKey: string, ipAddress: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get IP Restriction for a Sub-account API Key (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/subAccountApi/ipRestriction<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-ip-restriction-for-a-sub-account-api-key-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {string} subAccountApiKey
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountApiGetIpRestriction(email: string, subAccountApiKey: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Delete IP List for a Sub-account API Key (For Master Account)<br>
         *
         * DELETE /sapi/v1/sub-account/subAccountApi/ipRestriction/ipList<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#delete-ip-list-for-a-sub-account-api-key-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {string} subAccountApiKey
         * @param {string} ipAddress - Can be added in batches, separated by commas
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountApiDeleteIp(email: string, subAccountApiKey: string, ipAddress: string, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Universal Transfer (For Master Account)<br>
         *
         * POST /sapi/v1/sub-account/universalTransfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#universal-transfer-for-master-account}
         *
         * @param {string} fromAccountType - "SPOT","USDT_FUTURE","COIN_FUTURE"
         * @param {string} toAccountType - "SPOT","USDT_FUTURE","COIN_FUTURE"
         * @param {string} asset
         * @param {number} amount
         * @param {object} [options]
         * @param {string} [options.fromEmail]
         * @param {string} [options.toEmail]
         * @param {string} [options.clientTranId] - Must be unique
         * @param {number} [options.recvWindow]
         */
        subAccountUniversalTransfer(fromAccountType: string, toAccountType: string, asset: string, amount: number, options?: {
            fromEmail?: string;
            toEmail?: string;
            clientTranId?: string;
            recvWindow?: number;
        }): any;
        /**
         * Query Universal Transfer History (For Master Account)<br>
         *
         * GET /sapi/v1/sub-account/universalTransfer<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#query-universal-transfer-history-for-master-account}
         *
         * @param {object} [options]
         * @param {string} [options.fromEmail]
         * @param {string} [options.toEmail]
         * @param {string} [options.clientTranId]
         * @param {string} [options.startTime]
         * @param {string} [options.endTime]
         * @param {string} [options.page] - Default 1
         * @param {string} [options.limit] - Default 500, Max 500
         * @param {number} [options.recvWindow]
         */
        subAccountUniversalTransferHistory(options?: {
            fromEmail?: string;
            toEmail?: string;
            clientTranId?: string;
            startTime?: string;
            endTime?: string;
            page?: string;
            limit?: string;
            recvWindow?: number;
        }): any;
        /**
         * Get Detail on Sub-account's Futures Account V2 (For Master Account)<br>
         *
         * GET /sapi/v2/sub-account/futures/account<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-futures-account-v2-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {number} futuresType - 1:USDT Margined Futures, 2:COIN Margined Futures
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountFuturesAccountV2(email: string, futuresType: number, options?: {
            recvWindow?: number;
        }): any;
        /**
         * Get Summary of Sub-account's Futures Account V2 (For Master Account)<br>
         *
         * GET /sapi/v2/sub-account/futures/accountSummary<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-summary-of-sub-account-39-s-futures-account-v2-for-master-account}
         *
         * @param {number} futuresType - 1:USDT Margined Futures, 2:COIN Margined Futures
         * @param {object} [options]
         * @param {number} [options.page] - default:1
         * @param {number} [options.limit] - default:10, max:20
         * @param {number} [options.recvWindow]
         */
        subAccountFuturesAccountSummaryV2(futuresType: number, options?: {
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        /**
         * Get Futures Position-Risk of Sub-account V2 (For Master Account)<br>
         *
         * GET /sapi/v2/sub-account/futures/positionRisk<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#get-futures-position-risk-of-sub-account-v2-for-master-account}
         *
         * @param {string} email - Sub-account email
         * @param {number} futuresType - 1:USDT Margined Futures, 2:COIN Margined Futures
         * @param {object} [options]
         * @param {number} [options.recvWindow]
         */
        subAccountFuturesPositionRiskV2(email: string, futuresType: number, options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
