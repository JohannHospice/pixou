import {
  BinanceSpot,
  parseBinanceKlines,
  TIME_PERIOD,
} from "../libs/exchanges/binance";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");

const SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "ADAUSDT",
  "MATICUSDT",
  "AVAXUSDT",
  "ATOMUSDT",
  "BNBUSDT",
  "LUNAUSDT",
  "SOLUSDT",
  "DOTUSDT",
  "ICPUSDT",
  "APEUSDT",
  "LINKUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "EGLDUSDT",
  "LTCUSDT",
  "VETUSDT",
  "MATICUSDT",
  "DOGEUSDT",
  "NEARUSDT",
  "UNIUSDT",
  "ALGOUSDT",
  "XLMUSDT",
  "EOSUSDT",
  "NEOUSDT",
  "TFUELUSDT",
  "HOTUSDT",
  "QTUMUSDT",
  "AAVEUSDT",
  "CROUSDT",
];
export default async function (): Promise<void> {
  admin.initializeApp();
  const bucket = admin.storage().bucket();

  // config
  const spot = new BinanceSpot();
  const now = Date.now();
  const Strategy = SuperIchimokuStrategy;
  const interval = TIME_PERIOD.THREE_DAILY;
  const spotOptions = {
    startTime: now - 1000 * 3600 * 24 * 365 * 10,
    endTime: now,
  };
  const strategyName = "long-term-btc";
  const lastOrders = {};
  console.log("[config] prepared");

  // run
  await Promise.all(
    SYMBOLS.map(async (symbol) => {
      try {
        console.log(`[strategy ${symbol}] run`);

        const parsedKlines = await spot
          .klines(symbol, interval, spotOptions)
          .then(({ data }) => parseBinanceKlines(data));

        const strategy = new Strategy(parsedKlines);
        strategy.build();
        console.log(`[strategy ${symbol}] solved`);

        const detail = {
          symbol: symbol,
          interval: interval,
        };

        bucket.file(`strategies/${strategyName}/symbols/${symbol}`).save(
          JSON.stringify({
            klines: strategy.klines,
            orders: strategy.orders,
            ...detail,
          })
        );
        lastOrders[symbol] = {
          order: strategy.getLastOrder(),
          ...detail,
        };

        console.log(`[strategy ${symbol}] saved`);
      } catch (error) {
        console.error(`[strategy ${symbol}] error: `, error);
      }
    })
  );

  await bucket
    .file(`strategies/${strategyName}/lastorders`)
    .save(JSON.stringify(lastOrders));
  console.log("[strategy lastOrders] saved");
}
