export var Blvt: (superclass: any) => {
    new (): {
        [x: string]: any;
        blvtInfo(options?: {
            tokenName?: string;
        }): any;
        subscribeBlvt(tokenName: string, cost: number, options?: {
            recvWindow?: number;
        }): any;
        blvtSubscriptionRecord(options?: {
            tokenName?: string;
            id?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        redeemBlvt(tokenName: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
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
export var Bswap: (superclass: any) => {
    new (): {
        [x: string]: any;
        bswapPools(): any;
        bswapLiquidity(options?: {
            poolId?: number;
            recvWindow?: number;
        }): any;
        bswapLiquidityAdd(poolId: number, asset: string, quantity: number, options?: {
            recvWindow?: number;
        }): any;
        bswapLiquidityRemove(poolId: number, type: string, asset: string, shareAmount: number, options?: {
            recvWindow?: number;
        }): any;
        bswapLiquidityOperationRecord(options?: {
            operationId?: number;
            poolId?: number;
            operation?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        bswapRequestQuote(quoteAsset: string, baseAsset: string, quoteQty: number, options?: {
            recvWindow?: number;
        }): any;
        bswapSwap(quoteAsset: string, baseAsset: string, quoteQty: number, options?: {
            recvWindow?: number;
        }): any;
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
        bswapGetPoolConfig(options?: {
            poolId?: number;
            recvWindow?: number;
        }): any;
        bswapAddLiquidityPreview(poolId: number, type: string, quoteAsset: string, quoteQty: number, options?: {
            recvWindow?: number;
        }): any;
        bswapRemoveLiquidityPreview(poolId: number, type: string, quoteAsset: string, shareAmount: number, options?: {
            recvWindow?: number;
        }): any;
        bswapUnclaimedRewards(options?: {
            type?: number;
            recvWindow?: number;
        }): any;
        bswapClaimRewards(options?: {
            type?: number;
            recvWindow?: number;
        }): any;
        bswapClaimedHistory(options?: {
            poolId?: number;
            assetRewards?: string;
            type?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var SubAccount: (superclass: any) => {
    new (): {
        [x: string]: any;
        subAccountList(options?: {
            email?: string;
            isFreeze?: string;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        subAccountTransferHistory(options?: {
            fromEmail?: string;
            toEmail?: string;
            startTime?: number;
            endTime?: number;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        subAccountAssets(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountDepositAddress(email: string, coin: string, options?: {
            network?: string;
            recvWindow?: number;
        }): any;
        subAccountDepositHistory(email: string, options?: {
            coin?: string;
            status?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            offset?: number;
            recvWindow?: number;
        }): any;
        subAccountStatus(options?: {
            email?: string;
            recvWindow?: number;
        }): any;
        subAccountEnableMargin(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountMarginAccount(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountMarginAccountSummary(options?: {
            recvWindow?: number;
        }): any;
        subAccountEnableFutures(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountFuturesAccount(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountFuturesAccountSummary(options?: {
            recvWindow?: number;
        }): any;
        subAccountFuturesPositionRisk(email: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountFuturesTransfer(email: string, asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountMarginTransfer(email: string, asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountTransferToSub(toEmail: string, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountTransferToMaster(asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountTransferSubAccountHistory(options?: {
            asset?: string;
            type?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        subAccountFuturesAssetTransferHistory(email: string, futuresType: number, options?: {
            startTime?: number;
            endTime?: number;
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        subAccountFuturesAssetTransfer(fromEmail: string, toEmail: string, futuresType: number, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountSpotSummary(options?: {
            email?: string;
            page?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        subAccountCreation(subAccountString: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountLeverageToken(email: string, enableBlvt: boolean, options?: {
            recvWindow?: number;
        }): any;
        managedSubAccountDeposit(toEmail: string, asset: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        managedSubAccountAssets(email: string, options?: {
            recvWindow?: number;
        }): any;
        managedSubAccountWithdraw(fromEmail: string, asset: string, amount: number, options?: {
            transferDate?: number;
            recvWindow?: number;
        }): any;
        subAccountApiToggleIpRestriction(email: string, subAccountApiKey: string, ipRestrict: boolean, options?: {
            recvWindow?: number;
        }): any;
        subAccountApiAddIp(email: string, subAccountApiKey: string, ipAddress: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountApiGetIpRestriction(email: string, subAccountApiKey: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountApiDeleteIp(email: string, subAccountApiKey: string, ipAddress: string, options?: {
            recvWindow?: number;
        }): any;
        subAccountUniversalTransfer(fromAccountType: string, toAccountType: string, asset: string, amount: number, options?: {
            fromEmail?: string;
            toEmail?: string;
            clientTranId?: string;
            recvWindow?: number;
        }): any;
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
        subAccountFuturesAccountV2(email: string, futuresType: number, options?: {
            recvWindow?: number;
        }): any;
        subAccountFuturesAccountSummaryV2(futuresType: number, options?: {
            page?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        subAccountFuturesPositionRiskV2(email: string, futuresType: number, options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Market: (superclass: any) => {
    new (): {
        [x: string]: any;
        ping(): any;
        time(): any;
        exchangeInfo(options?: {
            symbol?: string;
            symbols?: any[];
        }): any;
        depth(symbol: string, options?: {
            limit?: number;
        }): any;
        trades(symbol: string, options?: {
            limit?: number;
        }): any;
        historicalTrades(symbol: string, options?: {
            limit?: number;
            fromId?: number;
        }): any;
        aggTrades(symbol: string, options?: {
            fromId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
        }): any;
        klines(symbol: string, interval: string, options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
        }): any;
        avgPrice(symbol: string): any;
        ticker24hr(symbol?: string): any;
        tickerPrice(symbol?: string): any;
        bookTicker(symbol?: string): any;
    };
    [x: string]: any;
};
export var Trade: (superclass: any) => {
    new (): {
        [x: string]: any;
        newOrderTest(symbol: string, side: string, type: string, options?: {
            timeInForce?: string;
            quantity?: number;
            quoteOrderQty?: number;
            price?: number;
            newClientOrderId?: string;
            stopPrice?: number;
            icebergQty?: number;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        newOrder(symbol: string, side: string, type: string, options?: {
            timeInForce?: string;
            quantity?: number;
            quoteOrderQty?: number;
            price?: number;
            newClientOrderId?: string;
            stopPrice?: number;
            icebergQty?: number;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        cancelOrder(symbol: string, options?: {
            orderId?: number;
            origClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        cancelOpenOrders(symbol: string, options?: {
            recvWindow?: number;
        }): any;
        getOrder(symbol: string, options?: {
            orderId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        openOrders(options?: {
            symbol?: string;
            recvWindow?: number;
        }): any;
        allOrders(symbol: string, options?: {
            orderId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: string;
        }): any;
        newOCOOrder(symbol: string, side: string, quantity: number, price: number, stopPrice: number, options?: {
            listClientOrderId?: string;
            limitClientOrderId?: string;
            limitIcebergQty?: number;
            stopClientOrderId?: string;
            stopLimitPrice?: number;
            stopIcebergQty?: number;
            stopLimitTimeInForce?: string;
            newOrderRespType?: string;
            recvWindow?: number;
        }): any;
        cancelOCOOrder(symbol: string, options?: {
            orderListId?: number;
            listClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        getOCOOrder(options?: {
            orderListId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        getOCOOrders(options?: {
            fromId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        getOpenOCOOrders(options?: {
            recvWindow?: number;
        }): any;
        account(options?: {
            recvWindow?: number;
        }): any;
        myTrades(symbol: string, options?: {
            orderId?: number;
            startTime?: number;
            endTime?: number;
            fromId?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        orderCount(options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Wallet: (superclass: any) => {
    new (): {
        [x: string]: any;
        systemStatus(): any;
        coinInfo(options?: {
            recvWindow?: number;
        }): any;
        accountSnapshot(type: string, options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        disableFastWithdraw(options?: {
            recvWindow?: number;
        }): any;
        enableFastWithdraw(options?: {
            recvWindow?: number;
        }): any;
        withdraw(coin: string, address: string, amount: number, options?: {
            withdrawOrderId?: string;
            network?: string;
            addressTag?: string;
            transactionFeeFlag?: boolean;
            name?: string;
            walletType?: number;
            recvWindow?: number;
        }): any;
        depositHistory(options?: {
            coin?: string;
            status?: number;
            startTime?: number;
            endTime?: number;
            offest?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
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
        depositAddress(coin: string, options?: {
            network?: string;
            recvWindow?: number;
        }): any;
        accountStatus(options?: {
            recvWindow?: number;
        }): any;
        tradingStatus(options?: {
            recvWindow?: number;
        }): any;
        dustLog(options?: {
            startTime?: number;
            endTime?: number;
            recvWindow?: number;
        }): any;
        dustTransfer(asset: any[], options?: {
            recvWindow?: number;
        }): any;
        assetDevidendRecord(options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        assetDetail(options?: {
            asset?: string;
            recvWindow?: number;
        }): any;
        tradeFee(options?: {
            symbol?: string;
            recvWindow?: number;
        }): any;
        userUniversalTransfer(type: string, asset: string, amount: number, options?: {
            fromSymbol?: string;
            toSymbol?: string;
            recvWindow?: number;
        }): any;
        userUniversalTransferHistory(type: string, options?: {
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            fromSymbol?: string;
            toSymbol?: string;
            recvWindow?: number;
        }): any;
        fundingWallet(options?: {
            asset?: string;
            needBtcValuation?: string;
            recvWindow?: number;
        }): any;
        apiPermissions(options?: {
            recvWindow?: number;
        }): any;
        bnbConvertibleAssets(options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Margin: (superclass: any) => {
    new (): {
        [x: string]: any;
        marginTransfer(asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        marginBorrow(asset: string, amount: number, options?: {
            isIsolated?: string;
            symbol?: string;
            recvWindow?: number;
        }): any;
        marginRepay(asset: string, amount: string, options?: {
            isIsolated?: string;
            symbol?: string;
            recvWindow?: number;
        }): any;
        marginAsset(asset: string): any;
        marginPair(symbol: string): any;
        marginAllAssets(): any;
        marginAllPairs(): any;
        marginPairIndex(symbol: string): any;
        newMarginOrder(symbol: string, side: string, type: string, options?: {
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
        }): any;
        cancelMarginOrder(symbol: string, options?: {
            isIsolated?: string;
            orderId?: number;
            origClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        cancelAllOpenMarginOrder(symbol: string, options?: {
            isIsolated?: string;
            recvWindow?: number;
        }): any;
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
        marginLoanRecord(asset: string, options?: {
            isolatedSymbol?: string;
            txId?: number;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            archived?: boolean;
            recvWindow?: number;
        }): any;
        marginRepayRecord(asset: string, options?: {
            isolatedSymbol?: string;
            txId?: number;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            archived?: boolean;
            recvWindow?: number;
        }): any;
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
        marginForceLiquidationRecord(options?: {
            startTime?: number;
            endTime?: number;
            isolatedSymbol?: string;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        marginAccount(options?: {
            recvWindow?: number;
        }): any;
        marginOrder(symbol: string, options?: {
            isIsolated?: string;
            orderId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        marginOpenOrders(options?: {
            symbol?: string;
            isIsolated?: string;
            recvWindow?: number;
        }): any;
        marginAllOrders(symbol: string, options?: {
            isIsolated?: string;
            orderId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        marginOCOOrder(symbol: string, side: string, quantity: number, price: number, stopPrice: number, options?: {
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
        }): any;
        cancelMarginOCOOrder(symbol: string, options?: {
            isIsolated?: string;
            orderListId?: number;
            listClientOrderId?: string;
            newClientOrderId?: string;
            recvWindow?: number;
        }): any;
        getMarginOCOOrder(options?: {
            isIsolated?: string;
            symbol?: string;
            orderListId?: number;
            origClientOrderId?: string;
            recvWindow?: number;
        }): any;
        getMarginOCOOrders(options?: {
            isIsolated?: string;
            symbol?: string;
            fromId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        getMarginOpenOCOOrders(options?: {
            isIsolated?: string;
            symbol?: string;
            recvWindow?: number;
        }): any;
        marginMyTrades(symbol: string, options?: {
            isIsolated?: string;
            startTime?: number;
            endTime?: number;
            fromId?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        marginMaxBorrowable(asset: string, options?: {
            isolatedSymbol?: string;
            recvWindow?: number;
        }): any;
        marginMaxTransferable(asset: string, options?: {
            isolatedSymbol?: string;
            recvWindow?: number;
        }): any;
        marginInterestRateHistory(asset: string, options?: {
            vipLevel?: number;
            startTime?: number;
            endTime?: number;
            recvWindow?: number;
        }): any;
        isolatedMarginTransfer(asset: string, symbol: string, transFrom: string, transTo: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        isolatedMarginTransferHistory(symbol: string, options?: {
            asset?: string;
            transFrom?: string;
            transTo?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        isolatedMarginAccountInfo(options?: {
            symbols?: string;
            recvWindow?: number;
        }): any;
        disableIsolatedMarginAccount(symbol: string, options?: {
            recvWindow?: number;
        }): any;
        enableIsolatedMarginAccount(symbol: string, options?: {
            recvWindow?: number;
        }): any;
        isolatedMarginAccountLimit(options?: {
            recvWindow?: number;
        }): any;
        isolatedMarginSymbol(symbol: string, options?: {
            recvWindow?: number;
        }): any;
        isolatedMarginAllSymbols(options?: {
            recvWindow?: number;
        }): any;
        marginFee(options?: {
            vipLevel?: number;
            coin?: string;
            recvWindow?: number;
        }): any;
        isolatedMarginFee(options?: {
            vipLevel?: number;
            symbol?: string;
            recvWindow?: number;
        }): any;
        isolatedMarginTier(symbol: string, options?: {
            tier?: string;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Mining: (superclass: any) => {
    new (): {
        [x: string]: any;
        miningAlgoList(options?: {
            recvWindow?: number;
        }): any;
        miningCoinList(options?: {
            recvWindow?: number;
        }): any;
        miningWorker(algo: string, userName: string, workerName: string, options?: {
            recvWindow?: number;
        }): any;
        miningWorkerList(algo: string, userName: string, options?: {
            pageIndex?: number;
            sort?: number;
            sortColumn?: number;
            workerStatus?: number;
            recvWindow?: number;
        }): any;
        miningRevenueList(algo: string, userName: string, options?: {
            coin?: string;
            startDate?: number;
            endDate?: number;
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
        miningBonusList(algo: string, userName: string, options?: {
            coin?: string;
            startDate?: number;
            endDate?: number;
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
        miningHashrateResaleList(options?: {
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
        miningHashrateResaleDetail(configId: number, userName: string, options?: {
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
        miningHashrateResaleRequest(userName: string, algo: string, startDate: number, endDate: number, toPoolUser: string, hashRate: number, options?: {
            recvWindow?: number;
        }): any;
        miningHashrateResaleCancel(configId: number, userName: string, options?: {
            recvWindow?: number;
        }): any;
        miningStatisticList(algo: string, userName: string, options?: {
            recvWindow?: number;
        }): any;
        miningAccountList(algo: string, userName: string, options?: {
            recvWindow?: number;
        }): any;
        miningAccountEarning(algo: string, options?: {
            startDate?: number;
            endDate?: number;
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Savings: (superclass: any) => {
    new (): {
        [x: string]: any;
        savingsFlexibleProducts(options?: {
            status?: string;
            featured?: string;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        savingsFlexibleUserLeftQuota(productId: string, options?: {
            recvWindow?: number;
        }): any;
        savingsPurchaseFlexibleProduct(productId: string, amount: string, options?: {
            recvWindow?: number;
        }): any;
        savingsFlexibleUserRedemptionQuota(productId: string, type: string, options?: {
            recvWindow?: number;
        }): any;
        savingsFlexibleRedeem(productId: string, amount: number, type: string, options?: {
            recvWindow?: number;
        }): any;
        savingsFlexibleProductPosition(asset: string, options?: {
            recvWindow?: number;
        }): any;
        savingsProductList(type: string, options?: {
            asset?: string;
            status?: string;
            isSortAsc?: boolean;
            sortBy?: string;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        savingsPurchaseCustomizedProject(projectId: string, lot: number, options?: {
            recvWindow?: number;
        }): any;
        savingsCustomizedPosition(asset: string, options?: {
            projectId?: string;
            status?: string;
            recvWindow?: number;
        }): any;
        savingsAccount(options?: {
            recvWindow?: number;
        }): any;
        savingsPurchaseRecord(lendingType: string, options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        savingsRedemptionRecord(lendingType: string, options?: {
            asset?: string;
            startTime?: number;
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
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
export var Stream: (superclass: any) => {
    new (): {
        [x: string]: any;
        createListenKey(): any;
        renewListenKey(listenKey: string): any;
        closeListenKey(listenKey: string): any;
        createMarginListenKey(): any;
        renewMarginListenKey(listenKey: string): any;
        closeMarginListenKey(listenKey: string): any;
        createIsolatedMarginListenKey(symbol: string): any;
        renewIsolatedMarginListenKey(symbol: string, listenKey: string): any;
        closeIsolatedMarginListenKey(symbol: string, listenKey: string): any;
    };
    [x: string]: any;
};
export var Websocket: (superclass: any) => {
    new (options: any): {
        [x: string]: any;
        wsURL: any;
        reconnectDelay: number;
        aggTradeWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        tradeWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        klineWS(symbol: string, interval: string, callbacks: any): {
            closeInitiated: boolean;
        };
        miniTickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        tickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        bookTickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        partialBookDepth(symbol: string, levels: string, speed: string, callbacks: any): {
            closeInitiated: boolean;
        };
        diffBookDepth(symbol: string, speed: string, callbacks: any): {
            closeInitiated: boolean;
        };
        userData(listenKey: string, callbacks: any): {
            closeInitiated: boolean;
        };
        combinedStreams(streams: any[], callbacks: any): {
            closeInitiated: boolean;
        };
        subscribe(url: any, callbacks: any): {
            closeInitiated: boolean;
        };
        unsubscribe(wsRef: import("ws")): void;
    };
    [x: string]: any;
};
export var Futures: (superclass: any) => {
    new (): {
        [x: string]: any;
        futuresTransfer(asset: string, amount: number, type: number, options?: {
            recvWindow?: number;
        }): any;
        futuresTransferHistory(asset: string, startTime: number, options?: {
            endTime?: number;
            current?: number;
            size?: number;
            recvWindow?: number;
        }): any;
        futuresLoanBorrow(coin: string, amount: number, collateralCoin: string, collateralAmount: number, options?: {
            recvWindow?: number;
        }): any;
        futuresLoanBorrowHistory(options?: {
            coin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        futuresLoanRepay(coin: string, collateralCoin: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        futuresLoanRepayHistory(options?: {
            coin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        futuresLoanWallet(options?: {
            recvWindow?: number;
        }): any;
        futuresLoanConfigs(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            recvWindow?: number;
        }): any;
        futuresLoanCalcAdjustLevel(loanCoin: string, collateralCoin: string, amount: number, direction: string, options?: {
            recvWindow?: number;
        }): any;
        futuresLoanCalcMaxAdjustAmount(loanCoin: string, collateralCoin: string, options?: {
            recvWindow?: number;
        }): any;
        futuresLoanAdjustCollateral(loanCoin: string, collateralCoin: string, amount: number, direction: string, options?: {
            recvWindow?: number;
        }): any;
        futuresLoanAdjustCollateralHistory(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        futuresLoanLiquidationHistory(options?: {
            loanCoin?: string;
            collateralCoin?: string;
            startTime?: number;
            endTime?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
        futuresCollateralRepayLimit(coin: string, collateralCoin: string, options?: {
            recvWindow?: number;
        }): any;
        futuresCollateralRepayQuote(coin: string, collateralCoin: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        futuresCollateralRepay(quoteId: string, options?: {
            recvWindow?: number;
        }): any;
        futuresCollateralRepayResult(quoteId: string, options?: {
            recvWindow?: number;
        }): any;
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
export var Fiat: (superclass: any) => {
    new (): {
        [x: string]: any;
        depositWithdrawalHistory(transactionType: number, options?: {
            beginTime?: number;
            endTime?: number;
            page?: number;
            rows?: number;
            recvWindow?: number;
        }): any;
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
export var C2C: (superclass: any) => {
    new (): {
        [x: string]: any;
        c2cTradeHistory(tradeType: string, options?: {
            startTimestamp?: number;
            endTimestamp?: number;
            page?: number;
            rows?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Loan: (superclass: any) => {
    new (): {
        [x: string]: any;
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
export var Pay: (superclass: any) => {
    new (): {
        [x: string]: any;
        payHistory(options?: {
            startTimestamp?: number;
            endTimestamp?: number;
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Convert: (superclass: any) => {
    new (): {
        [x: string]: any;
        convertTradeHistory(startTime?: number, endTime?: number, options?: {
            limit?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var Rebate: (superclass: any) => {
    new (): {
        [x: string]: any;
        rebateSpotHistory(options?: {
            startTime?: number;
            endTime?: number;
            page?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var NFT: (superclass: any) => {
    new (): {
        [x: string]: any;
        nftTransactionHistory(orderType: number, options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
            page?: number;
            recvWindow?: number;
        }): any;
        nftDepositHistory(options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
            page?: number;
            recvWindow?: number;
        }): any;
        nftWithdrawHistory(options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
            page?: number;
            recvWindow?: number;
        }): any;
        nftAsset(options?: {
            limit?: number;
            page?: number;
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
export var GiftCard: (superclass: any) => {
    new (): {
        [x: string]: any;
        giftCardCreateCode(token: string, amount: number, options?: {
            recvWindow?: number;
        }): any;
        giftCardRedeemCode(code: string, options?: {
            recvWindow?: number;
        }): any;
        giftCardVerifyCode(referenceNo: string, options?: {
            recvWindow?: number;
        }): any;
    };
    [x: string]: any;
};
