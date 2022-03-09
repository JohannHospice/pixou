export = Websocket;
/**
 * API websocket endpoints
 * @module Websocket
 * @param {*} superclass
 */
declare function Websocket(superclass: any): {
    new (options: any): {
        [x: string]: any;
        wsURL: any;
        reconnectDelay: number;
        /**
         * Aggregate Trade Streams<br>
         *
         * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.<br>
         *
         * Stream Name: &lt;symbol&gt;@aggTrade <br>
         * Update Speed: Real-time<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams}
         *
         * @param {string} symbol
         */
        aggTradeWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Trade Streams<br>
         *
         * The Trade Streams push raw trade information; each trade has a unique buyer and seller.<br>
         *
         * Stream Name: &lt;symbol&gt;@trade <br>
         * Update Speed: Real-time<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-streams}
         *
         * @param {string} symbol
         */
        tradeWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Kline/Candlestick Streams<br>
         *
         * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.<br>
         *
         * Stream Name: &lt;symbol&gt;@kline_&lt;interval&gt; <br>
         * Update Speed: 2000ms <br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams}
         *
         * @param {string} symbol
         * @param {string} interval - m -> minutes; h -> hours; d -> days; w -> weeks; M -> months:<br>
         *     1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
         */
        klineWS(symbol: string, interval: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Individual symbol or all symbols mini ticker<br>
         *
         * 24hr rolling window mini-ticker statistics.<br>
         * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs<br>
         *
         * Stream Name: &lt;symbol&gt;@miniTicker or !miniTicker@arr <br>
         * Update Speed: 1000ms <br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream}
         * <br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-mini-tickers-stream}
         *
         * @param {string} [symbol]
         */
        miniTickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Individual symbol or all symbols ticker<br>
         *
         * 24hr rollwing window ticker statistics for a single symbol.<br>
         * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.<br>
         *
         * Stream Name: &lt;symbol&gt;@ticker or !ticker@arr <br>
         * Update Speed: 1000ms<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-ticker-streams}
         * <br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-tickers-stream}
         *
         * @param {string} [symbol]
         *
         */
        tickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Individual symbol or all symbols book ticker<br>
         *
         * Pushes any update to the best bid or ask's price or quantity in real-time.<br>
         *
         * Stream Name: &lt;symbol&gt;@bookTicker or !bookTicker <br>
         * Update Speed: Real-time<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams}
         * <br>
         * {@link https://binance-docs.github.io/apidocs/spot/en/#all-book-tickers-stream}
         *
         * @param {string} [symbol]
         */
        bookTickerWS(symbol: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Partial Book Depth Streams<br>
         *
         * Top bids and asks, Valid are 5, 10, or 20.<br>
         *
         * Stream Names: &lt;symbol&gt;@depth&lt;levels&gt; or &lt;symbol&gt;@depth&lt;levels&gt;@100ms. <br>
         * Update Speed: 1000ms or 100ms<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#partial-book-depth-streams}
         *
         * @param {string} symbol
         * @param {string} levels - 5, 10, or 20
         * @param {string} speed - 1000ms or 100ms
         *
         */
        partialBookDepth(symbol: string, levels: string, speed: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Diff. Depth Stream<br>
         *
         * Order book price and quantity depth updates used to locally manage an order book.<br>
         *
         * Stream Names: &lt;symbol&gt;@depth or &lt;symbol&gt;@depth@100ms <br>
         * Update Speed: 1000ms or 100ms<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream}
         *
         * @param {string} symbol
         * @param {string} speed - 1000ms or 100ms
         *
         */
        diffBookDepth(symbol: string, speed: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Listen to User data stream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#user-data-streams}
         *
         * @param {string} listenKey
         */
        userData(listenKey: string, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Listen to market streams<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams}
         *
         * @param {array} streams
         *
         * e.g. client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@ticker'], callbacks)
         */
        combinedStreams(streams: any[], callbacks: any): {
            closeInitiated: boolean;
        };
        subscribe(url: any, callbacks: any): {
            closeInitiated: boolean;
        };
        /**
         * Unsubscribe the stream <br>
         *
         * @param {WebSocketClient} wsRef - websocket client instance created by ws package
         */
        unsubscribe(wsRef: WebSocketClient): void;
    };
    [x: string]: any;
};
import WebSocketClient = require("ws");
