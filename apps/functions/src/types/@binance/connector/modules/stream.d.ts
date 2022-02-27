export = Stream;
/**
 * API stream endpoints
 * @module Stream
 * @param {*} superclass
 */
declare function Stream(superclass: any): {
    new (): {
        [x: string]: any;
        /**
         * Create a ListenKey (USER_STREAM)<br>
         *
         * POST /api/v3/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
         */
        createListenKey(): any;
        /**
         * Ping/Keep-alive a ListenKey (USER_STREAM)<br>
         *
         * PUT /api/v3/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
         *
         * @param {string} listenKey
         */
        renewListenKey(listenKey: string): any;
        /**
         * Close a ListenKey (USER_STREAM)<br>
         *
         * DELETE /api/v3/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot}
         *
         * @param {string} listenKey
         */
        closeListenKey(listenKey: string): any;
        /**
         * Create a Margin ListenKey (USER_STREAM)<br>
         *
         * POST /sapi/v1/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
         *
         */
        createMarginListenKey(): any;
        /**
         * Ping/Keep-alive a Margin ListenKey (USER_STREAM)<br>
         *
         * PUT /sapi/v1/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
         *
         * @param {string} listenKey
         */
        renewMarginListenKey(listenKey: string): any;
        /**
         * Close a Margin ListenKey (USER_STREAM)<br>
         *
         * DELETE /sapi/v1/userDataStream<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-margin}
         *
         * @param {string} listenKey
         */
        closeMarginListenKey(listenKey: string): any;
        /**
         * Create an Isolated Margin ListenKey (USER_STREAM)<br>
         *
         * POST /sapi/v1/userDataStream/isolated<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
         *
         * @param {string} symbol
         */
        createIsolatedMarginListenKey(symbol: string): any;
        /**
         * Ping/Keep-alive an Isolated Margin ListenKey (USER_STREAM)<br>
         *
         * PUT /sapi/v1/userDataStream/isolated<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
         *
         * @param {string} symbol
         * @param {string} listenKey
         */
        renewIsolatedMarginListenKey(symbol: string, listenKey: string): any;
        /**
         * Close an Isolated Margin ListenKey (USER_STREAM)<br>
         *
         * DELETE /sapi/v1/userDataStream/isolated<br>
         *
         * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-isolated-margin}
         *
         * @param {string} symbol
         * @param {string} listenKey
         */
        closeIsolatedMarginListenKey(symbol: string, listenKey: string): any;
    };
    [x: string]: any;
};
