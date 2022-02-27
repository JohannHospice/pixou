export = Mining;
/**
 * API mining endpoints
 * @module Mining
 * @param {*} superclass
 */
declare function Mining(superclass: any): {
    new (): {
        [x: string]: any;
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
        miningAlgoList(options?: {
            recvWindow?: number;
        }): any;
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
        miningCoinList(options?: {
            recvWindow?: number;
        }): any;
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
        miningWorker(algo: string, userName: string, workerName: string, options?: {
            recvWindow?: number;
        }): any;
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
        miningWorkerList(algo: string, userName: string, options?: {
            pageIndex?: number;
            sort?: number;
            sortColumn?: number;
            workerStatus?: number;
            recvWindow?: number;
        }): any;
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
        miningRevenueList(algo: string, userName: string, options?: {
            coin?: string;
            startDate?: number;
            endDate?: number;
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
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
        miningBonusList(algo: string, userName: string, options?: {
            coin?: string;
            startDate?: number;
            endDate?: number;
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
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
        miningHashrateResaleDetail(configId: number, userName: string, options?: {
            pageIndex?: number;
            pageSize?: number;
            recvWindow?: number;
        }): any;
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
        miningHashrateResaleRequest(userName: string, algo: string, startDate: number, endDate: number, toPoolUser: string, hashRate: number, options?: {
            recvWindow?: number;
        }): any;
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
        miningHashrateResaleCancel(configId: number, userName: string, options?: {
            recvWindow?: number;
        }): any;
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
        miningStatisticList(algo: string, userName: string, options?: {
            recvWindow?: number;
        }): any;
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
        miningAccountList(algo: string, userName: string, options?: {
            recvWindow?: number;
        }): any;
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
