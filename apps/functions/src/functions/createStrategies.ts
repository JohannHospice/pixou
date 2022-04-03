import { CrinKline, TIME_PERIOD } from "../libs/exchanges/binance";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { SYMBOLS } from "../libs/constants";
import fetch from "cross-fetch";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");
admin.initializeApp();

const bucket = admin.storage().bucket();

const GET_COINGEKO = gql`
  query GetPixouCoin(
    $coins: String!
    $from: DateTime!
    $interval: interval!
    $withMarketcap: Boolean!
  ) {
    ohlc: ohlc(slug: $coins, from: $from, to: "utc_now", interval: $interval) {
      highPriceUsd
      lowPriceUsd
      closePriceUsd
      datetime
    }
    marketcap: getMetric(metric: "marketcap_usd") @include(if: $withMarketcap) {
      timeseriesData(
        slug: $coins
        from: $from
        to: "utc_now"
        interval: $interval
      ) {
        datetime
        value
      }
    }
  }
`;

export default async function (): Promise<void> {
  // config
  const interval = TIME_PERIOD.THREE_DAILY;
  const strategyName = "long-term-btc";
  const lastOrders = {};
  console.log("[config] prepared");
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "https://api.santiment.net/graphiql", fetch }),
  });
  // run
  await Promise.all(
    Object.keys(SYMBOLS).map(async (symbol) => {
      try {
        console.log(`[strategy ${symbol}] run`);

        const parsedKlines = await client
          .query({
            query: GET_COINGEKO,
            variables: {
              coins: SYMBOLS[symbol].santiment,
              from: `utc_now-${365 * 10}d`,
              interval: "3d",
              withMarketcap: false,
            },
          })
          .then((result): CrinKline[] => {
            return result.data.ohlc.map((ohlc) => ({
              close: ohlc.closePriceUsd,
              high: ohlc.highPriceUsd,
              low: ohlc.lowPriceUsd,
              closeTime: ohlc.datetime,
            }));
          });

        const strategy = new SuperIchimokuStrategy(parsedKlines);
        strategy.build();
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
        console.log(`[strategy ${symbol}] solved`);

        await bucket.file(`strategies/${strategyName}/symbols/${symbol}`).save(
          JSON.stringify({
            klines: strategy.klines,
            orders: strategy.orders,
            symbol: symbol,
            interval: interval,
            fullName: SYMBOLS[symbol].title,
            coinmarketcap: SYMBOLS[symbol].coinmarketcap,
          })
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
    lastOrderType: strategy.orders[strategy.orders.length - 1]
      ? strategy.orders[strategy.orders.length - 1].type
      : undefined,
    buyAndHoldCoin,
    buyAndHoldTotal,
    buyAndHoldRatio: buyAndHoldTotal / totalInjected,
    yearly: indexInjected / 12,
  };
}
