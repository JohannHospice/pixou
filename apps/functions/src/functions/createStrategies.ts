import {
  BinanceSpot,
  parseBinanceKlines,
  TIME_PERIOD,
} from "../libs/exchanges/binance";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");
admin.initializeApp();

const bucket = admin.storage().bucket();
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
  // config
  const spot = new BinanceSpot();
  const now = Date.now();
  const Strategy = SuperIchimokuStrategy;
  const interval = TIME_PERIOD.THREE_DAILY;
  const spotOptions = {
    // startTime: now - 1000 * 3600 * 24 * 365 * 10,
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

        bucket.file(`strategies/${strategyName}/symbols/${symbol}`).save(
          JSON.stringify({
            klines: strategy.klines,
            orders: strategy.orders,
            symbol: symbol,
            interval: interval,
          })
        );
        lastOrders[symbol] = buildPortfolio(
          {
            klines: strategy.klines,
            orders: strategy.orders,
            filename: symbol,
            symbol,
            interval,
          },
          100,
          30 / 3
        );

        console.log(`[strategy ${symbol}] saved`);
      } catch (error) {
        console.error(`[strategy ${symbol}] error: `, error.message);
      }
    })
  );

  console.log("[strategy lastOrders] prepare");
  await bucket
    .file(`strategies/${strategyName}/lastorders`)
    .save(JSON.stringify(lastOrders));
  console.log("[strategy lastOrders] saved");
}

export function buildPortfolio(
  strategy: any,
  injectPerKline: number,
  eachKlines: number
): any {
  let balance = {
    coin: 0,
    reserve: 0,
  };
  let totalInjected = 0;
  let indexInjected = 0;
  let buyAndHoldCoin = 0;
  for (let index = 0; index < strategy.klines.length; index++) {
    if (index % eachKlines === 0) {
      balance.reserve += injectPerKline;
      totalInjected += injectPerKline;
      indexInjected++;
      buyAndHoldCoin += injectPerKline / strategy.klines[index].close;
    }
    const order = strategy.orders[index];
    if (order) {
      balance =
        order.type === "LONG"
          ? {
              coin: balance.coin + balance.reserve / order.price,
              reserve: 0,
            }
          : {
              coin: 0,
              reserve: balance.reserve + order.price * balance.coin,
            };
    }
  }
  let total = 0;
  let buyAndHoldTotal = 0;
  if (strategy.klines[strategy.klines.length - 1]) {
    total =
      strategy.klines[strategy.klines.length - 1].close * balance.coin +
      balance.reserve;
    buyAndHoldTotal =
      strategy.klines[strategy.klines.length - 1].close * buyAndHoldCoin;
  }
  const ratio = total / totalInjected;

  return {
    filename: strategy.filename,
    name: strategy.symbol,
    interval: strategy.interval,
    coin: balance.coin,
    reserve: balance.reserve,
    injected: totalInjected,
    total: total,
    ratio: ratio,
    ratioInPercent: ratio,
    performanceHODL: total / buyAndHoldTotal,
    indexInjected,
    injectPerKline,
    lastOrderType: strategy.orders[strategy.orders.length - 1].type,
    buyAndHoldCoin,
    buyAndHoldTotal,
    buyAndHoldRatio: buyAndHoldTotal / totalInjected,
    yearly: indexInjected / 12,
  };
}
