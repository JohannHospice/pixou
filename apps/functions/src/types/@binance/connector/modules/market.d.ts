export = Market;
/**
 * API market endpoints
 * @module Market
 * @param {*} superclass
 */
declare function Market(superclass: any): {
    new (): {
        [x: string]: any;
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
        exchangeInfo(options?: {
            symbol?: string;
            symbols?: any[];
        }): any;
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
        depth(symbol: string, options?: {
            limit?: number;
        }): any;
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
        trades(symbol: string, options?: {
            limit?: number;
        }): any;
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
        historicalTrades(symbol: string, options?: {
            limit?: number;
            fromId?: number;
        }): any;
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
        aggTrades(symbol: string, options?: {
            fromId?: number;
            startTime?: number;
            endTime?: number;
            limit?: number;
        }): any;
        /**
         * Kline/Candlestick Data<br>
         *
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
        klines(symbol: string, interval: string, options?: {
            startTime?: number;
            endTime?: number;
            limit?: number;
        }): any;
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
    };
    [x: string]: any;
};
