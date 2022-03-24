import {
  BinanceSpot,
  parseBinanceKlines,
  TIME_PERIOD,
} from "../libs/exchanges/binance";
import Strategy from "../libs/strategies";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");
const SYMBOLES = [
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
  // "CROUSDT",
];
export default async function (): Promise<void> {
  admin.initializeApp();
  const bucket = admin.storage().bucket();

  const cryptoConfigs: Config[] = SYMBOLES.reduce(
    (acc, symbol) => [...acc, getConfig(symbol, TIME_PERIOD.THREE_DAILY)],
    []
  );
  const lastOrders = {};
  await Promise.all(
    cryptoConfigs.map(async (config) => {
      try {
        console.log(`[strategy ${config.symbole}] run`);

        const strategy = await runStrategy(config);
        console.log(`[strategy ${config.symbole}] solved`);

        bucket.file(`/strategy/symbols/${config.symbole}`).save(
          JSON.stringify({
            klines: strategy.klines,
            orders: strategy.orders,
            symbol: config.symbole,
            interval: config.interval,
          })
        );
        lastOrders[config.symbole] = {
          order: strategy.getLastOrder(),
          symbol: config.symbole,
          interval: config.interval,
        };

        console.log(`[strategy ${config.symbole}] saved`);
      } catch (error) {
        console.error(`[strategy ${config.symbole}] error: `, error.message);
      }
    })
  );
  await bucket.file("/strategy/lastOrders").save(JSON.stringify(lastOrders));
}

const spot = new BinanceSpot();
function getConfig(symbole: string, interval: any) {
  const now = Date.now();
  return {
    interval: interval,
    options: {
      startTime: now - 1000 * 3600 * 24 * 365 * 10,
      endTime: now,
    },
    Strategy: SuperIchimokuStrategy,
    spot,
    symbole,
  };
}

async function runStrategy(config: Config) {
  const strategy = await initStrategy(config);
  strategy.build();
  return strategy;
}

async function initStrategy({
  spot,
  symbole,
  interval,
  options,
  Strategy,
}: Config) {
  const { data: klines } = await spot.klines(symbole, interval, options);
  const crinKlines = parseBinanceKlines(klines);
  return new Strategy(crinKlines);
}

interface Config {
  symbole: string;
  interval: TIME_PERIOD;
  options: {
    startTime: number;
    endTime: number;
  };
  Strategy: typeof Strategy;
  spot: BinanceSpot;
  exchange?: BinanceSpot;
}
