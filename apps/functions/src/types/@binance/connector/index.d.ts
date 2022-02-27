declare module "@binance/connector" {
  export class Spot {
    constructor(apiKey?: string, apiSecret?: string, options?: {});

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
    coinInfo(options?: { recvWindow?: number }): any;
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
    accountSnapshot(
      type: string,
      options?: {
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
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
    disableFastWithdraw(options?: { recvWindow?: number }): any;
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
    enableFastWithdraw(options?: { recvWindow?: number }): any;
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
    withdraw(
      coin: string,
      address: string,
      amount: number,
      options?: {
        withdrawOrderId?: string;
        network?: string;
        addressTag?: string;
        transactionFeeFlag?: boolean;
        name?: string;
        walletType?: number;
        recvWindow?: number;
      }
    ): any;
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
    depositAddress(
      coin: string,
      options?: {
        network?: string;
        recvWindow?: number;
      }
    ): any;
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
    accountStatus(options?: { recvWindow?: number }): any;
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
    tradingStatus(options?: { recvWindow?: number }): any;
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
    dustTransfer(
      asset: any[],
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    assetDetail(options?: { asset?: string; recvWindow?: number }): any;
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
    tradeFee(options?: { symbol?: string; recvWindow?: number }): any;
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
    userUniversalTransfer(
      type: string,
      asset: string,
      amount: number,
      options?: {
        fromSymbol?: string;
        toSymbol?: string;
        recvWindow?: number;
      }
    ): any;
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
    userUniversalTransferHistory(
      type: string,
      options?: {
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        fromSymbol?: string;
        toSymbol?: string;
        recvWindow?: number;
      }
    ): any;
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
    apiPermissions(options?: { recvWindow?: number }): any;
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
    bnbConvertibleAssets(options?: { recvWindow?: number }): any;

    /**
     * Test New Order (TRADE)<br>
     *
     * POST /api/v3/order/test<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#test-new-order-trade}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {string} type
     * @param {object} [options]
     * @param {string} [options.timeInForce]
     * @param {number} [options.quantity]
     * @param {number} [options.quoteOrderQty]
     * @param {number} [options.price]
     * @param {string} [options.newClientOrderId] - A unique id among open orders. Automatically generated if not sent.
     * @param {number} [options.stopPrice] - Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
     * @param {number} [options.icebergQty] - Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
     * @param {string} [options.newOrderRespType] - Set the response JSON. ACK, RESULT, or FULL;
     *    MARKET and LIMIT order types default to FULL, all other orders default to ACK.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    newOrderTest(
      symbol: string,
      side: string,
      type: string,
      options?: {
        timeInForce?: string;
        quantity?: number;
        quoteOrderQty?: number;
        price?: number;
        newClientOrderId?: string;
        stopPrice?: number;
        icebergQty?: number;
        newOrderRespType?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * New Order (TRADE)<br>
     *
     * POST /api/v3/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {string} type
     * @param {object} [options]
     * @param {string} [options.timeInForce]
     * @param {number} [options.quantity]
     * @param {number} [options.quoteOrderQty]
     * @param {number} [options.price]
     * @param {string} [options.newClientOrderId]
     * @param {number} [options.stopPrice]
     * @param {number} [options.icebergQty]
     * @param {string} [options.newOrderRespType]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    newOrder(
      symbol: string,
      side: string,
      type: string,
      options?: {
        timeInForce?: string;
        quantity?: number;
        quoteOrderQty?: number;
        price?: number;
        newClientOrderId?: string;
        stopPrice?: number;
        icebergQty?: number;
        newOrderRespType?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Cancel Order (TRADE)<br>
     *
     * DELETE /api/v3/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {string} [options.newClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelOrder(
      symbol: string,
      options?: {
        orderId?: number;
        origClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Cancel all Open Orders on a Symbol (TRADE)<br>
     *
     * DELETE /api/v3/openOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade}
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelOpenOrders(
      symbol: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Order (USER_DATA)<br>
     *
     * GET /api/v3/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getOrder(
      symbol: string,
      options?: {
        orderId?: number;
        origClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Current Open Orders (USER_DATA)<br>
     *
     * GET /api/v3/openOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    openOrders(options?: { symbol?: string; recvWindow?: number }): any;
    /**
     * All Orders (USER_DATA)<br>
     *
     * GET /api/v3/allOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.orderId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit]
     * @param {string} [options.recvWindow] - The value cannot be greater than 60000
     */
    allOrders(
      symbol: string,
      options?: {
        orderId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: string;
      }
    ): any;
    /**
     * New OCO (TRADE)<br>
     *
     * POST /api/v3/order/oco<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#new-oco-trade}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {number} quantity
     * @param {number} price
     * @param {number} stopPrice
     * @param {object} [options]
     * @param {string} [options.listClientOrderId]
     * @param {string} [options.limitClientOrderId]
     * @param {number} [options.limitIcebergQty]
     * @param {string} [options.stopClientOrderId]
     * @param {number} [options.stopLimitPrice]
     * @param {number} [options.stopIcebergQty]
     * @param {string} [options.stopLimitTimeInForce]
     * @param {string} [options.newOrderRespType]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    newOCOOrder(
      symbol: string,
      side: string,
      quantity: number,
      price: number,
      stopPrice: number,
      options?: {
        listClientOrderId?: string;
        limitClientOrderId?: string;
        limitIcebergQty?: number;
        stopClientOrderId?: string;
        stopLimitPrice?: number;
        stopIcebergQty?: number;
        stopLimitTimeInForce?: string;
        newOrderRespType?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Cancel OCO (TRADE)<br>
     *
     * DELETE /api/v3/orderList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-oco-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.orderListId]
     * @param {string} [options.listClientOrderId]
     * @param {string} [options.newClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelOCOOrder(
      symbol: string,
      options?: {
        orderListId?: number;
        listClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query OCO (USER_DATA)<br>
     *
     * GET /api/v3/orderList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-oco-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.orderListId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getOCOOrder(options?: {
      orderListId?: number;
      origClientOrderId?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query all OCO (USER_DATA)<br>
     *
     * GET /api/v3/allOrderList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-all-oco-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.fromId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getOCOOrders(options?: {
      fromId?: number;
      startTime?: number;
      endTime?: number;
      limit?: number;
      recvWindow?: number;
    }): any;
    /**
     * Query Open OCO (USER_DATA)<br>
     *
     * GET /api/v3/openOrderList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-open-oco-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getOpenOCOOrders(options?: { recvWindow?: number }): any;
    /**
     * Account Information (USER_DATA)<br>
     *
     * GET /api/v3/account<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    account(options?: { recvWindow?: number }): any;
    /**
     * Account Trade List (USER_DATA)<br>
     *
     * GET /api/v3/myTrades<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.orderId] - This can only be used in combination with symbol.
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.fromId]
     * @param {number} [options.limit]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    myTrades(
      symbol: string,
      options?: {
        orderId?: number;
        startTime?: number;
        endTime?: number;
        fromId?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Current Order Count Usage (TRADE)<br>
     *
     * GET /api/v3/rateLimit/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-current-order-count-usage-trade}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    orderCount(options?: { recvWindow?: number }): any;

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
    subAccountAssets(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountDepositAddress(
      email: string,
      coin: string,
      options?: {
        network?: string;
        recvWindow?: number;
      }
    ): any;
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
    subAccountDepositHistory(
      email: string,
      options?: {
        coin?: string;
        status?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        offset?: number;
        recvWindow?: number;
      }
    ): any;
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
    subAccountStatus(options?: { email?: string; recvWindow?: number }): any;
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
    subAccountEnableMargin(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountMarginAccount(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountMarginAccountSummary(options?: { recvWindow?: number }): any;
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
    subAccountEnableFutures(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAccount(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAccountSummary(options?: { recvWindow?: number }): any;
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
    subAccountFuturesPositionRisk(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesTransfer(
      email: string,
      asset: string,
      amount: number,
      type: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountMarginTransfer(
      email: string,
      asset: string,
      amount: number,
      type: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountTransferToSub(
      toEmail: string,
      asset: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountTransferToMaster(
      asset: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAssetTransferHistory(
      email: string,
      futuresType: number,
      options?: {
        startTime?: number;
        endTime?: number;
        page?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAssetTransfer(
      fromEmail: string,
      toEmail: string,
      futuresType: number,
      asset: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountCreation(
      subAccountString: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountLeverageToken(
      email: string,
      enableBlvt: boolean,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    managedSubAccountDeposit(
      toEmail: string,
      asset: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    managedSubAccountAssets(
      email: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    managedSubAccountWithdraw(
      fromEmail: string,
      asset: string,
      amount: number,
      options?: {
        transferDate?: number;
        recvWindow?: number;
      }
    ): any;
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
    subAccountApiToggleIpRestriction(
      email: string,
      subAccountApiKey: string,
      ipRestrict: boolean,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountApiAddIp(
      email: string,
      subAccountApiKey: string,
      ipAddress: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountApiGetIpRestriction(
      email: string,
      subAccountApiKey: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountApiDeleteIp(
      email: string,
      subAccountApiKey: string,
      ipAddress: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountUniversalTransfer(
      fromAccountType: string,
      toAccountType: string,
      asset: string,
      amount: number,
      options?: {
        fromEmail?: string;
        toEmail?: string;
        clientTranId?: string;
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAccountV2(
      email: string,
      futuresType: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesAccountSummaryV2(
      futuresType: number,
      options?: {
        page?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
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
    subAccountFuturesPositionRiskV2(
      email: string,
      futuresType: number,
      options?: {
        recvWindow?: number;
      }
    ): any;

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
    savingsFlexibleUserLeftQuota(
      productId: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsPurchaseFlexibleProduct(
      productId: string,
      amount: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsFlexibleUserRedemptionQuota(
      productId: string,
      type: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsFlexibleRedeem(
      productId: string,
      amount: number,
      type: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsFlexibleProductPosition(
      asset: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsProductList(
      type: string,
      options?: {
        asset?: string;
        status?: string;
        isSortAsc?: boolean;
        sortBy?: string;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;
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
    savingsPurchaseCustomizedProject(
      projectId: string,
      lot: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    savingsCustomizedPosition(
      asset: string,
      options?: {
        projectId?: string;
        status?: string;
        recvWindow?: number;
      }
    ): any;
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
    savingsAccount(options?: { recvWindow?: number }): any;
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
    savingsPurchaseRecord(
      lendingType: string,
      options?: {
        asset?: string;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;
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
    savingsRedemptionRecord(
      lendingType: string,
      options?: {
        asset?: string;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;
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
    savingsInterestHistory(
      lendingType: string,
      options?: {
        asset?: string;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;

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

    /**
     * Get NFT Transaction History (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/transactions<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-transaction-history-user_data}
     *
     * @param {number} orderType - 0: purchase order, 1: sell order, 2: royalty income, 3: primary market order, 4: mint fee
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
    nftTransactionHistory(
      orderType: number,
      options?: {
        startTime?: number;
        endTime?: number;
        limit?: number;
        page?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Get NFT Deposit History(USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/deposit<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-deposit-history-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
    nftDepositHistory(options?: {
      startTime?: number;
      endTime?: number;
      limit?: number;
      page?: number;
      recvWindow?: number;
    }): any;
    /**
     * Get NFT Withdraw History (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/history/withdraw<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-withdraw-history-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
    nftWithdrawHistory(options?: {
      startTime?: number;
      endTime?: number;
      limit?: number;
      page?: number;
      recvWindow?: number;
    }): any;
    /**
     * Get NFT Asset (USER_DATA)<br>
     *
     * GET /sapi/v1/nft/user/getAsset<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-nft-asset-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.limit] - default 50, max 50
     * @param {number} [options.page] - default 1
     * @param {number} [options.recvWindow]
     *
     */
    nftAsset(options?: {
      limit?: number;
      page?: number;
      recvWindow?: number;
    }): any;

    /**
     * Acquiring Algorithm (MARKET_DATA)<br>
     *
     * GET /sapi/v1/mining/pub/algoList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#acquiring-algorithm-market_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningAlgoList(options?: { recvWindow?: number }): any;
    /**
     * Acquiring CoinName (MARKET_DATA)<br>
     *
     * GET /sapi/v1/mining/pub/coinList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#acquiring-coinname-market_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningCoinList(options?: { recvWindow?: number }): any;
    /**
     * Request for Detail Miner List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/worker/detail<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#request-for-detail-miner-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName - Mining account
     * @param {string} workerName
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningWorker(
      algo: string,
      userName: string,
      workerName: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Request for Miner List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/worker/list<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#request-for-miner-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName - Mining account
     * @param {object} [options]
     * @param {number} [options.pageIndex] - Page number，default is first page, 1
     * @param {number} [options.sort] - sort sequence (default = 0)
     *    <br> 0 positive sequence, 1 negative sequence
     * @param {number} [options.sortColumn] - Sort by (default 1): <br> 1: miner name,
     *    <br> 2: real-time computing power, <br> 3: daily average computing power,
     *    <br> 4: real-time rejection rate, <br> 5: last submission time
     * @param {number} [options.workerStatus] - miners status (default = 0)
     *    <br> 0 all, 1 valid, 2 invalid, 3 failure
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningWorkerList(
      algo: string,
      userName: string,
      options?: {
        pageIndex?: number;
        sort?: number;
        sortColumn?: number;
        workerStatus?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Revenue List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/payment/list<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#earnings-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName - Mining account
     * @param {object} [options]
     * @param {string} [options.coin]
     * @param {number} [options.startDate]
     * @param {number} [options.endDate]
     * @param {number} [options.pageIndex] - Page number，default is first page, 1
     * @param {number} [options.pageSize] - minimum 10, maximum 200
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningRevenueList(
      algo: string,
      userName: string,
      options?: {
        coin?: string;
        startDate?: number;
        endDate?: number;
        pageIndex?: number;
        pageSize?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Extra Bonus List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/payment/other<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#extra-bonus-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName
     * @param {object} [options]
     * @param {string} [options.coin]
     * @param {number} [options.startDate]
     * @param {number} [options.endDate]
     * @param {number} [options.pageIndex] - Page number，default is first page, 1
     * @param {number} [options.pageSize] - minimum 10, maximum 200
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningBonusList(
      algo: string,
      userName: string,
      options?: {
        coin?: string;
        startDate?: number;
        endDate?: number;
        pageIndex?: number;
        pageSize?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Hashrate Resale List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/hash-transfer/config/details/list<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-list-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.pageIndex] - Page number，default is first page, 1
     * @param {number} [options.pageSize] - minimum 10, maximum 200
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningHashrateResaleList(options?: {
      pageIndex?: number;
      pageSize?: number;
      recvWindow?: number;
    }): any;
    /**
     * Hashrate Resale Detail (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/hash-transfer/profit/details<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-detail-user_data}
     *
     * @param {number} configId - Mining ID
     * @param {string} userName - Mining Account
     * @param {object} [options]
     * @param {number} [options.pageIndex] - Page number，default is first page, 1
     * @param {number} [options.pageSize] - minimum 10, maximum 200
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningHashrateResaleDetail(
      configId: number,
      userName: string,
      options?: {
        pageIndex?: number;
        pageSize?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Hashrate Resale Request (USER_DATA)<br>
     *
     * POST /sapi/v1/mining/hash-transfer/config<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#hashrate-resale-request-user_data}
     *
     * @param {string} userName - Mining Account
     * @param {string} algo
     * @param {number} startDate
     * @param {number} endDate
     * @param {string} toPoolUser - Mining Account
     * @param {number} hashRate - Resale hashrate h/s must be transferred
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningHashrateResaleRequest(
      userName: string,
      algo: string,
      startDate: number,
      endDate: number,
      toPoolUser: string,
      hashRate: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Hashrate Resale Detail (USER_DATA)<br>
     *
     * POST /sapi/v1/mining/hash-transfer/config/cancel<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-hashrate-resale-configuration-user_data}
     *
     * @param {number} configId - Mining ID
     * @param {string} userName
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningHashrateResaleCancel(
      configId: number,
      userName: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Statistic List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/statistics/user/status<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#statistic-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName - Mining account
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningStatisticList(
      algo: string,
      userName: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Account List (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/statistics/user/list<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#account-list-user_data}
     *
     * @param {string} algo
     * @param {string} userName - Mining account
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningAccountList(
      algo: string,
      userName: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Mining Account Earning (USER_DATA)<br>
     *
     * GET /sapi/v1/mining/payment/uid<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#mining-account-earning-user_data}
     *
     * @param {string} algo - Algorithm(sha256)
     * @param {object} [options]
     * @param {number} [options.startDate] - Millisecond timestamp
     * @param {number} [options.endDate] - Millisecond timestamp
     * @param {number} [options.pageIndex] - Default 1
     * @param {number} [options.pageSize] - Min 10,Max 200
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    miningAccountEarning(
      algo: string,
      options?: {
        startDate?: number;
        endDate?: number;
        pageIndex?: number;
        pageSize?: number;
        recvWindow?: number;
      }
    ): any;

    /**
     * Test Connectivity<br>
     *
     * GET /api/v3/ping<br>
     *
     * Test connectivity to the Rest API.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#test-connectivity}
     */
    ping(): any;
    /**
     * Check Server Time<br>
     *
     * GET /api/v3/time<br>
     *
     * Test connectivity to the Rest API and get the current server time.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#check-server-time}
     *
     */
    time(): any;
    /**
     * Exchange Information<br>
     *
     * GET /api/v3/exchangeInfo<br>
     *
     * Current exchange trading rules and symbol information<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
     *
     * @param {object} [options]
     * @param {string} [options.symbol] - symbol
     * @param {Array} [options.symbols] - an array of symbols
     *
     */
    exchangeInfo(options?: { symbol?: string; symbols?: any[] }): any;
    /**
     * Order Book<br>
     *
     * GET /api/v3/depth<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#order-book}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 100; max 5000.
     *    Valid limits:[5, 10, 20, 50, 100, 500, 1000, 5000]
     */
    depth(
      symbol: string,
      options?: {
        limit?: number;
      }
    ): any;
    /**
     * Recent Trades List<br>
     *
     * GET /api/v3/trades<br>
     *
     * Get recent trades.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#recent-trades-list}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    trades(
      symbol: string,
      options?: {
        limit?: number;
      }
    ): any;
    /**
     * Old Trade Lookup<br>
     *
     * GET /api/v3/historicalTrades<br>
     *
     * Get older market trades.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#old-trade-lookup}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.limit] - Default 500; max 1000.
     * @param {number} [options.fromId] - Trade id to fetch from. Default gets most recent trades.
     */
    historicalTrades(
      symbol: string,
      options?: {
        limit?: number;
        fromId?: number;
      }
    ): any;
    /**
     * Compressed/Aggregate Trades List<br>
     *
     * GET /api/v3/aggTrades<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#compressed-aggregate-trades-list}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.fromId] - id to get aggregate trades from INCLUSIVE.
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    aggTrades(
      symbol: string,
      options?: {
        fromId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
      }
    ): any;
    /**
     * Kline/Candlestick Data<br>
     *
     * [
     *  [
     *    1499040000000,      // Open time
     *    "0.01634790",       // Open
     *    "0.80000000",       // High
     *    "0.01575800",       // Low
     *    "0.01577100",       // Close
     *    "148976.11427815",  // Volume
     *    1499644799999,      // Close time
     *    "2434.19055334",    // Quote asset volume
     *    308,                // Number of trades
     *    "1756.87402397",    // Taker buy base asset volume
     *    "28.46694368",      // Taker buy quote asset volume
     *    "17928899.62484339" // Ignore.
     *  ]
     * ]
     * GET /api/v3/klines<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data}
     *
     * @param {string} symbol
     * @param {string} interval
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 1000.
     */
    klines(
      symbol: string,
      interval: string,
      options?: {
        startTime?: number;
        endTime?: number;
        limit?: number;
      }
    ): any;
    /**
     * Current Average Price<br>
     *
     * GET /api/v3/avgPrice<br>
     *
     * Current average price for a symbol.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#current-average-price}
     *
     * @param {string} symbol
     */
    avgPrice(symbol: string): any;
    /**
     * 24hr Ticker Price Change Statistics<br>
     *
     * GET /api/v3/ticker/24hr<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics}
     *
     * @param {string} [symbol]
     */
    ticker24hr(symbol?: string): any;
    /**
     * Symbol Price Ticker<br>
     *
     * GET /api/v3/ticker/price<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker}
     *
     * @param {string} [symbol]
     */
    tickerPrice(symbol?: string): any;
    /**
     * Symbol Order Book Ticker<br>
     *
     * GET /api/v3/ticker/bookTicker<br>
     *
     * Best price/qty on the order book for a symbol or symbols.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker}
     *
     * @param {string} [symbol]
     */
    bookTicker(symbol?: string): any;

    /**
     * Cross Margin Account Transfer (MARGIN)<br>
     *
     * POST /sapi/v1/margin/transfer<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#cross-margin-account-transfer-margin}
     *
     * @param {string} asset
     * @param {number} amount
     * @param {number} type - 1: transfer from main account to margin account
     *    <br>2: transfer from margin account to main account
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginTransfer(
      asset: string,
      amount: number,
      type: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Margin Account Borrow (MARGIN)<br>
     *
     * POST /sapi/v1/margin/load<br>
     *
     * Apply for a loan.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-borrow-margin}
     *
     * @param {string} asset
     * @param {number} amount
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE
     * @param {string} [options.symbol] - isolated symbol
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginBorrow(
      asset: string,
      amount: number,
      options?: {
        isIsolated?: string;
        symbol?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Margin Account Repay(MARGIN)<br>
     *
     * POST /sapi/v1/margin/repay<br>
     *
     * Repay loan for margin account.<br>
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-repay-margin}
     *
     * @param {string} asset
     * @param {string} amount
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginRepay(
      asset: string,
      amount: string,
      options?: {
        isIsolated?: string;
        symbol?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Margin Asset (MARKET_DATA)<br>
     *
     * GET /sapi/v1/margin/asset<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-asset-market_data}
     *
     * @param {string} asset
     */
    marginAsset(asset: string): any;
    /**
     * Query Cross Margin Pair (MARKET_DATA)<br>
     *
     * GET /sapi/v1/margin/pair<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-pair-market_data}
     *
     * @param {string} symbol
     */
    marginPair(symbol: string): any;
    /**
     * Get All Margin Assets (MARKET_DATA)<br>
     *
     * GET /sapi/v1/margin/allAssets<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-margin-assets-market_data}
     */
    marginAllAssets(): any;
    /**
     * Get All Cross Margin Pairs (MARKET_DATA)<br>
     *
     * GET /sapi/v1/margin/allPairs<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-cross-margin-pairs-market_data}
     */
    marginAllPairs(): any;
    /**
     * Query Margin PriceIndex (MARKET_DATA)<br>
     *
     * GET /sapi/v1/margin/priceIndex<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-priceindex-market_data}
     *
     * @param {string} symbol
     */
    marginPairIndex(symbol: string): any;
    /**
     * Margin Account New Order (TRADE)<br>
     *
     * POST /sapi/v1/margin/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-new-order-trade}
     *
     * @param {string} symbol
     * @param {string} side - BUY or SELL
     * @param {string} type
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE
     * @param {number} [options.quantity]
     * @param {number} [options.quoteOrderQty]
     * @param {number} [options.price]
     * @param {number} [options.stopPrice] - Used with STOP_LOSS, STOP_LOSS_LIMIT,
     *    TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
     * @param {string} [options.newClientOrderId] - A unique id among open orders.
     *    Automatically generated if not sent.
     * @param {number} [options.icebergQty] - Used with LIMIT, STOP_LOSS_LIMIT,
     *    and TAKE_PROFIT_LIMIT to create an iceberg order.
     * @param {string} [options.newOrderRespType] - Set the response JSON. ACK, RESULT, or FULL;
     *    MARKET and LIMIT order types default to FULL, all other orders default to ACK.
     * @param {string} [options.sideEffectType] - NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY;
     *    default NO_SIDE_EFFECT.
     * @param {string} [options.timeInForce] - GTC, IOC, FOK
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    newMarginOrder(
      symbol: string,
      side: string,
      type: string,
      options?: {
        isIsolated?: string;
        quantity?: number;
        quoteOrderQty?: number;
        price?: number;
        stopPrice?: number;
        newClientOrderId?: string;
        icebergQty?: number;
        newOrderRespType?: string;
        sideEffectType?: string;
        timeInForce?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Margin Account Cancel Order (TRADE)<br>
     *
     * DELETE /sapi/v1/margin/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-order-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {string} [options.newClientOrderId] - Used to uniquely identify this cancel.
     *    Automatically generated by default.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelMarginOrder(
      symbol: string,
      options?: {
        isIsolated?: string;
        orderId?: number;
        origClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Margin Account Cancel all Open Orders on a Symbol (TRADE)<br>
     *
     * DELETE /sapi/v1/margin/openOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-all-open-orders-on-a-symbol-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelAllOpenMarginOrder(
      symbol: string,
      options?: {
        isIsolated?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Cross Margin Transfer History (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/transfer<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-cross-margin-transfer-history-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.asset]
     * @param {string} [options.type] - ROLL_IN, ROLL_OUT
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
     * @param {number} [options.size] - Default:10 Max:100
     * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginTransferHistory(options?: {
      asset?: string;
      type?: string;
      startTime?: number;
      endTime?: number;
      current?: number;
      size?: number;
      archived?: boolean;
      recvWindow?: number;
    }): any;
    /**
     * Query Loan Record (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/loan<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-loan-record-user_data}
     *
     * @param {string} asset
     * @param {object} [options]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.txId] - the tranId in POST /sapi/v1/margin/loan
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
     * @param {number} [options.size] - Default:10 Max:100
     * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginLoanRecord(
      asset: string,
      options?: {
        isolatedSymbol?: string;
        txId?: number;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        archived?: boolean;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Repay Record (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/repay<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-repay-record-user_data}
     *
     * @param {string} asset
     * @param {object} [options]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.txId] - return of /sapi/v1/margin/repay
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
     * @param {number} [options.size] - Default:10 Max:100
     * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginRepayRecord(
      asset: string,
      options?: {
        isolatedSymbol?: string;
        txId?: number;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        archived?: boolean;
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Interest History (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/interestHistory<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-interest-history-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.asset]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
     * @param {number} [options.size] - Default:10 Max:100
     * @param {boolean} [options.archived] - Default: false. Set to true for archived data from 6 months ago
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginInterestHistory(options?: {
      asset?: string;
      isolatedSymbol?: string;
      startTime?: number;
      endTime?: number;
      current?: number;
      size?: number;
      archived?: boolean;
      recvWindow?: number;
    }): any;
    /**
     * Get Force Liquidation Record (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/forceLiquidationRec<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-force-liquidation-record-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.current] - Currently querying page. Start from 1. Default:1
     * @param {number} [options.size] - Default:10 Max:100
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginForceLiquidationRecord(options?: {
      startTime?: number;
      endTime?: number;
      isolatedSymbol?: string;
      current?: number;
      size?: number;
      recvWindow?: number;
    }): any;
    /**
     * Query Cross Margin Account Details (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/account<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-account-details-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginAccount(options?: { recvWindow?: number }): any;
    /**
     * Query Margin Account's Order (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/order<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-order-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
     * @param {number} [options.orderId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginOrder(
      symbol: string,
      options?: {
        isIsolated?: string;
        orderId?: number;
        origClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Margin Account's Open Order (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/openOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-open-orders-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.symbol]
     * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginOpenOrders(options?: {
      symbol?: string;
      isIsolated?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query Margin Account's All Order (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/allOrders<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-all-orders-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - TRUE or FALSE, default "FALSE"
     * @param {number} [options.orderId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default 500; max 500.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginAllOrders(
      symbol: string,
      options?: {
        isIsolated?: string;
        orderId?: number;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Marign Account New OCO (TRADE)<br>
     *
     * POST /sapi/v1/margin/order/oco<br>
     *
     * - Price Restrictions:<br>
     * SELL: Limit Price > Last Price > Stop Price<br>
     * BUY: Limit Price < Last Price < Stop Price<br>
     * - Quantity Restrictions:<br>
     * Both legs must have the same quantity<br>
     * ICEBERG quantities however do not have to be the same.<br>
     * - Order Rate Limit:<br>
     * OCO counts as 2 orders against the order rate limit.<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#marign-account-new-oco-trade}
     *
     * @param {string} symbol
     * @param {string} side
     * @param {number} quantity
     * @param {number} price
     * @param {number} stopPrice
     * @param {object} [options]
     * @param {string} [options.isIsolated] - For isolated margin or not, "TRUE", "FALSE", default "FALSE"
     * @param {string} [options.listClientOrderId]
     * @param {string} [options.limitClientOrderId] - A unique Id for the limit order
     * @param {number} [options.limitIcebergQty]
     * @param {string} [options.stopClientOrderId] - A unique Id for the stop loss/stop loss limit leg.
     * @param {number} [options.stopLimitPrice] - If provided, stopLimitTimeInForce is required.
     * @param {number} [options.stopIcebergQty]
     * @param {string} [options.stopLimitTimeInForce] - GTC/ FOK/ IOC
     * @param {string} [options.newOrderRespType]
     * @param {string} [options.sideEffectType] - NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY; default NO_SIDE_EFFECT.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginOCOOrder(
      symbol: string,
      side: string,
      quantity: number,
      price: number,
      stopPrice: number,
      options?: {
        isIsolated?: string;
        listClientOrderId?: string;
        limitClientOrderId?: string;
        limitIcebergQty?: number;
        stopClientOrderId?: string;
        stopLimitPrice?: number;
        stopIcebergQty?: number;
        stopLimitTimeInForce?: string;
        newOrderRespType?: string;
        sideEffectType?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Margin Account Cancel OCO (TRADE)<br>
     *
     * DELETE /sapi/v1/margin/orderList<br>
     *
     * - Either orderListId or listClientOrderId must be provided<br>
     * - Canceling an individual leg will cancel the entire OCO<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-account-cancel-oco-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - For isolated margin or not, "TRUE", "FALSE", default "FALSE"
     * @param {number} [options.orderListId]
     * @param {string} [options.listClientOrderId]
     * @param {string} [options.newClientOrderId] - Used to uniquely identify this cancel. Automatically generated by default.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    cancelMarginOCOOrder(
      symbol: string,
      options?: {
        isIsolated?: string;
        orderListId?: number;
        listClientOrderId?: string;
        newClientOrderId?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Margin Account's OCO (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/orderList<br>
     *
     * Either orderListId or origClientOrderId must be provided<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-oco-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.isIsolated] - For isolated margin or not, "TRUE", "FALSE", default "FALSE"
     * @param {string} [options.symbol] - Mandatory for isolated margin, not supported for cross margin
     * @param {number} [options.orderListId]
     * @param {string} [options.origClientOrderId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getMarginOCOOrder(options?: {
      isIsolated?: string;
      symbol?: string;
      orderListId?: number;
      origClientOrderId?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query Marign Account's all OCO (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/allOrderList<br>
     *
     * Retrieves all OCO for a specific margin account based on provided optional parameters.<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-marign-account-39-s-all-oco-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.isIsolated] - For isolated margin or not, "TRUE", "FALSE", default "FALSE"
     * @param {string} [options.symbol] - Mandatory for isolated margin, not supported for cross margin
     * @param {number} [options.fromId] - If provided, neither startTime nor endTime can be sent
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - Default Value: 500; Max Value: 1000
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getMarginOCOOrders(options?: {
      isIsolated?: string;
      symbol?: string;
      fromId?: number;
      startTime?: number;
      endTime?: number;
      limit?: number;
      recvWindow?: number;
    }): any;
    /**
     * Query Margin Account's Open OCO (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/openOrderList<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-open-oco-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.isIsolated] - For isolated margin or not, "TRUE", "FALSE", default "FALSE"
     * @param {string} [options.symbol] - Mandatory for isolated margin, not supported for cross margin
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    getMarginOpenOCOOrders(options?: {
      isIsolated?: string;
      symbol?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query Margin Account's Trade List (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/myTrades<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-account-39-s-trade-list-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.isIsolated] - Default 500; max 500.
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.fromId] - TradeId to fetch from. Default gets most recent trades.
     * @param {number} [options.limit] - Default 500; max 1000.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginMyTrades(
      symbol: string,
      options?: {
        isIsolated?: string;
        startTime?: number;
        endTime?: number;
        fromId?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Max Borrow (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/maxBorrowable<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-max-borrow-user_data}
     *
     * @param {string} asset
     * @param {object} [options]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginMaxBorrowable(
      asset: string,
      options?: {
        isolatedSymbol?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Max Transfer-Out Amount (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/maxTransferable<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-max-transfer-out-amount-user_data}
     *
     * @param {string} asset
     * @param {object} [options]
     * @param {string} [options.isolatedSymbol]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginMaxTransferable(
      asset: string,
      options?: {
        isolatedSymbol?: string;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Margin Interest Rate History (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/interestRateHistory<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-margin-interest-rate-history-user_data}
     *
     * @param {string} asset
     * @param {object} [options]
     * @param {number} [options.vipLevel] - Default: user's vip level
     * @param {number} [options.startTime] - Default: 7 days ago
     * @param {number} [options.endTime] - Default: present. Maximum range: 1 months.
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    marginInterestRateHistory(
      asset: string,
      options?: {
        vipLevel?: number;
        startTime?: number;
        endTime?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Isolated Margin Account Transfer (MARGIN)<br>
     *
     * POST /sapi/v1/margin/isolated/transfer<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#isolated-margin-account-transfer-margin}
     *
     * @param {string} asset - asset, such as BTC
     * @param {string} symbol
     * @param {string} transFrom - "SPOT", "ISOLATED_MARGIN"
     * @param {string} transTo - "SPOT", "ISOLATED_MARGIN"
     * @param {number} amount
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginTransfer(
      asset: string,
      symbol: string,
      transFrom: string,
      transTo: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Isolated Margin Transfer History (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolated/transfer<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-isolated-margin-transfer-history-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.asset]
     * @param {string} [options.transFrom] - "SPOT", "ISOLATED_MARGIN"
     * @param {string} [options.transTo] - "SPOT", "ISOLATED_MARGIN"
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.current] - Current page, default 1
     * @param {number} [options.size] - Default 10, max 100
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginTransferHistory(
      symbol: string,
      options?: {
        asset?: string;
        transFrom?: string;
        transTo?: string;
        startTime?: number;
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Isolated Margin Account Info (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolated/account<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-account-info-user_data}
     *
     * @param {object} [options]
     * @param {string} [options.symbols] - Max 5 symbols can be sent; separated by ",". e.g. "BTCUSDT,BNBUSDT,ADAUSDT"
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginAccountInfo(options?: {
      symbols?: string;
      recvWindow?: number;
    }): any;
    /**
     * Disable Isolated Margin Account (TRADE)<br>
     *
     * DELETE /sapi/v1/margin/isolated/account<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#disable-isolated-margin-account-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    disableIsolatedMarginAccount(
      symbol: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Enable Isolated Margin Account (TRADE)<br>
     *
     * POST /sapi/v1/margin/isolated/account<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-isolated-margin-account-trade}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    enableIsolatedMarginAccount(
      symbol: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Query Enabled Isolated Margin Account Limit (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolated/accountLimit<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-enabled-isolated-margin-account-limit-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginAccountLimit(options?: { recvWindow?: number }): any;
    /**
     * Query Isolated Margin Symbol (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolated/pair<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-symbol-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginSymbol(
      symbol: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Get All Isolated Margin Symbol(USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolated/allPairs<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-all-isolated-margin-symbol-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginAllSymbols(options?: { recvWindow?: number }): any;
    /**
     * Query Cross Margin Fee Data (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/crossMarginData<br>
     *
     * Get cross margin fee data collection with any vip level or user's current specific data as https://www.binance.com/en/margin-fee
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-fee-data-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.vipLevel] - User's current specific margin data will be returned if vipLevel is omitted
     * @param {string} [options.coin]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    marginFee(options?: {
      vipLevel?: number;
      coin?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query Isolated Margin Fee Data (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolatedMarginData<br>
     *
     * Get isolated margin fee data collection with any vip level or user's current specific data as https://www.binance.com/en/margin-fee
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-fee-data-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.vipLevel] - User's current specific margin data will be returned if vipLevel is omitted
     * @param {string} [options.symbol]
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginFee(options?: {
      vipLevel?: number;
      symbol?: string;
      recvWindow?: number;
    }): any;
    /**
     * Query Isolated Margin Tier Data (USER_DATA)<br>
     *
     * GET /sapi/v1/margin/isolatedMarginTier<br>
     *
     * Get isolated margin tier data collection with any tier as https://www.binance.com/en/margin-data
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#query-isolated-margin-fee-data-user_data}
     *
     * @param {string} symbol
     * @param {object} [options]
     * @param {string} [options.tier] - All margin tier data will be returned if tier is omitted
     * @param {number} [options.recvWindow] - No more than 60000
     */
    isolatedMarginTier(
      symbol: string,
      options?: {
        tier?: string;
        recvWindow?: number;
      }
    ): any;

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
    loanHistory(
      asset: string,
      options?: {
        type?: string;
        startTime?: number;
        endTime?: number;
        limit?: number;
        recvWindow?: number;
      }
    ): any;

    /**
     * Create a Binance Code (USER_DATA)<br>
     *
     * POST /sapi/v1/giftcard/createCode<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#create-a-binance-code-user_data}
     *
     * @param {string} token - The coin type contained in the Binance Code
     * @param {number} amount - The amount of the coin
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    giftCardCreateCode(
      token: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Redeem a Binance Code (USER_DATA)<br>
     *
     * POST /sapi/v1/giftcard/redeemCode<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#redeem-a-binance-code-user_data}
     *
     * @param {string} code - Binance Code
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    giftCardRedeemCode(
      code: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Verify a Binance Code (USER_DATA)<br>
     *
     * GET /sapi/v1/giftcard/verify<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#verify-a-binance-code-user_data}
     *
     * @param {string} referenceNo - reference number
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    giftCardVerifyCode(
      referenceNo: string,
      options?: {
        recvWindow?: number;
      }
    ): any;

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
    futuresTransfer(
      asset: string,
      amount: number,
      type: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresTransferHistory(
      asset: string,
      startTime: number,
      options?: {
        endTime?: number;
        current?: number;
        size?: number;
        recvWindow?: number;
      }
    ): any;
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
    futuresLoanBorrow(
      coin: string,
      amount: number,
      collateralCoin: string,
      collateralAmount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresLoanRepay(
      coin: string,
      collateralCoin: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresLoanWallet(options?: { recvWindow?: number }): any;
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
    futuresLoanCalcAdjustLevel(
      loanCoin: string,
      collateralCoin: string,
      amount: number,
      direction: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresLoanCalcMaxAdjustAmount(
      loanCoin: string,
      collateralCoin: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresLoanAdjustCollateral(
      loanCoin: string,
      collateralCoin: string,
      amount: number,
      direction: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresCollateralRepayLimit(
      coin: string,
      collateralCoin: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresCollateralRepayQuote(
      coin: string,
      collateralCoin: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresCollateralRepay(
      quoteId: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    futuresCollateralRepayResult(
      quoteId: string,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    depositWithdrawalHistory(
      transactionType: number,
      options?: {
        beginTime?: number;
        endTime?: number;
        page?: number;
        rows?: number;
        recvWindow?: number;
      }
    ): any;
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
    paymentHistory(
      transactionType: number,
      options?: {
        beginTime?: number;
        endTime?: number;
        page?: number;
        rows?: number;
        recvWindow?: number;
      }
    ): any;

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
    convertTradeHistory(
      startTime?: number,
      endTime?: number,
      options?: {
        limit?: number;
        recvWindow?: number;
      }
    ): any;

    /**
     * Get C2C Trade History (USER_DATA)<br>
     *
     * GET /sapi/v1/c2c/orderMatch/listUserOrderHistory<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-c2c-trade-history-user_data}
     *
     * @param {string} tradeType - BUY, SELL
     * @param {object} [options]
     * @param {number} [options.startTimestamp] - The max interval between startTimestamp and endTimestamp is 30 days.<br>
     *     If startTimestamp and endTimestamp are not sent, the recent 30-day data will be returned.
     * @param {number} [options.endTimestamp]
     * @param {number} [options.page] - default 1
     * @param {number} [options.rows] - default 100, max 100
     * @param {number} [options.recvWindow]
     *
     */
    c2cTradeHistory(
      tradeType: string,
      options?: {
        startTimestamp?: number;
        endTimestamp?: number;
        page?: number;
        rows?: number;
        recvWindow?: number;
      }
    ): any;

    /**
     * List All Swap Pools (MARKET_DATA)<br>
     *
     * GET /sapi/v1/bswap/pools<br>
     *
     * Get metadata about all swap pools.<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#list-all-swap-pools-market_data}
     */
    bswapPools(): any;
    /**
     * Get liquidity information of a pool (USER_DATA)<br>
     *
     * GET /sapi/v1/bswap/liquidity<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-information-of-a-pool-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.poolId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapLiquidity(options?: { poolId?: number; recvWindow?: number }): any;
    /**
     * Add Liquidity (TRADE)<br>
     *
     * POST /sapi/v1/bswap/liquidityAdd<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#add-liquidity-trade}
     *
     * @param {number} poolId
     * @param {string} asset
     * @param {number} quantity
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapLiquidityAdd(
      poolId: number,
      asset: string,
      quantity: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Remove Liquidity (TRADE)<br>
     *
     * POST /sapi/v1/bswap/liquidityRemove<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#remove-liquidity-trade}
     *
     * @param {number} poolId
     * @param {string} type -`SINGLE` for single asset removal, `COMBINATION` for combination of all coins removal
     * @param {string} asset
     * @param {number} shareAmount
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapLiquidityRemove(
      poolId: number,
      type: string,
      asset: string,
      shareAmount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Liquidity Operation Record (USER_DATA)<br>
     *
     * GET /sapi/v1/bswap/liquidityOps<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-liquidity-operation-record-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.operationId]
     * @param {number} [options.poolId]
     * @param {string} [options.operation] -`ADD` or `REMOVE`
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 3, max 100
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapLiquidityOperationRecord(options?: {
      operationId?: number;
      poolId?: number;
      operation?: string;
      startTime?: number;
      endTime?: number;
      limit?: number;
      recvWindow?: number;
    }): any;
    /**
     * Request Quote (USER_DATA)<br>
     *
     * Request a quote for swap quote asset (selling asset) for base asset (buying asset),
     * essentially price/exchange rates. quoteQty is quantity of quote asset (to sell).<br>
     * Please be noted the quote is for reference only, the actual price will change
     * as the liquidity changes, it's recommended to swap immediate after request a quote
     * for slippage prevention.<br>
     *
     * GET /sapi/v1/bswap/quote<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#request-quote-user_data}
     *
     * @param {string} quoteAsset
     * @param {string} baseAsset
     * @param {number} quoteQty
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapRequestQuote(
      quoteAsset: string,
      baseAsset: string,
      quoteQty: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Swap (TRADE)<br>
     *
     * POST /sapi/v1/bswap/swap<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#swap-trade}
     *
     * @param {string} quoteAsset
     * @param {string} baseAsset
     * @param {number} quoteQty
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapSwap(
      quoteAsset: string,
      baseAsset: string,
      quoteQty: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Swap History (USER_DATA)<br>
     *
     * GET /sapi/v1/bswap/swap<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#swap-trade}
     *
     * @param {object} [options]
     * @param {string} [options.swapId]
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.status] - 0: pending for swap, 1: success, 2: failed
     * @param {string} [options.baseAsset]
     * @param {string} [options.quoteAsset]
     * @param {number} [options.limit] - default 3, max 100
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapSwapHistory(options?: {
      swapId?: string;
      startTime?: number;
      endTime?: number;
      status?: number;
      baseAsset?: string;
      quoteAsset?: string;
      limit?: number;
      recvWindow?: number;
    }): any;
    /**
     * Get Pool Configure (USER_DATA)
     *
     * GET /sapi/v1/bswap/poolConfigure<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-pool-configure-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.poolId]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapGetPoolConfig(options?: { poolId?: number; recvWindow?: number }): any;
    /**
     * Add Liquidity Preview (USER_DATA)
     *
     * GET /sapi/v1/bswap/addLiquidityPreview<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#add-liquidity-preview-user_data}
     *
     * @param {number} poolId
     * @param {string} type - "SINGLE" for adding a single token;"COMBINATION" for adding dual tokens
     * @param {string} quoteAsset
     * @param {number} quoteQty
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapAddLiquidityPreview(
      poolId: number,
      type: string,
      quoteAsset: string,
      quoteQty: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Remove Liquidity Preview (USER_DATA)
     *
     * GET /sapi/v1/bswap/removeLiquidityPreview<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#remove-liquidity-preview-user_data}
     *
     * @param {number} poolId
     * @param {string} type - Type is "SINGLE", remove and obtain a single token;Type is "COMBINATION", remove and obtain dual token.
     * @param {string} quoteAsset
     * @param {number} shareAmount
     * @param {object} [options]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapRemoveLiquidityPreview(
      poolId: number,
      type: string,
      quoteAsset: string,
      shareAmount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
    /**
     * Get Unclaimed Rewards Record (USER_DATA)
     *
     * GET /sapi/v1/bswap/unclaimedRewards<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-unclaimed-rewards-record-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.type] - 0: Swap rewards,1:Liquidity rewards, default to 0
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapUnclaimedRewards(options?: {
      type?: number;
      recvWindow?: number;
    }): any;
    /**
     * Claim rewards (TRADE)
     *
     * POST /sapi/v1/bswap/claimRewards<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#claim-rewards-trade}
     *
     * @param {object} [options]
     * @param {number} [options.type] - 0: Swap rewards,1:Liquidity rewards, default to 0
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapClaimRewards(options?: { type?: number; recvWindow?: number }): any;
    /**
     * Get Claimed History (USER_DATA)
     *
     * GET /sapi/v1/bswap/claimedHistory<br>
     *
     * {@link https://binance-docs.github.io/apidocs/spot/en/#get-claimed-history-user_data}
     *
     * @param {object} [options]
     * @param {number} [options.poolId]
     * @param {string} [options.assetRewards]
     * @param {number} [options.type] - 0: Swap rewards,1:Liquidity rewards, default to 0
     * @param {number} [options.startTime]
     * @param {number} [options.endTime]
     * @param {number} [options.limit] - default 3, max 100
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    bswapClaimedHistory(options?: {
      poolId?: number;
      assetRewards?: string;
      type?: number;
      startTime?: number;
      endTime?: number;
      limit?: number;
      recvWindow?: number;
    }): any;

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
    blvtInfo(options?: { tokenName?: string }): any;
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
    subscribeBlvt(
      tokenName: string,
      cost: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
    redeemBlvt(
      tokenName: string,
      amount: number,
      options?: {
        recvWindow?: number;
      }
    ): any;
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
  }
}
