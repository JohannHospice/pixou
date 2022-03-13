// import { firestore } from "firebase-admin";
// import app from "../app";
// import { TransactionType } from "../libs/order";
// import { ORDER_SIDE } from "../libs/exchanges";
import {
  BinanceSpot,
  parseBinanceKlines,
  TIME_PERIOD,
} from "../libs/exchanges/binance";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";
interface Config {
  symbole: string;
  interval: TIME_PERIOD;
  options: {
    startTime: number;
    endTime: number;
  };
  Strategy: typeof SuperIchimokuStrategy;
  spot: BinanceSpot;
  exchange?: BinanceSpot;
}

// exchange: new BinanceSpot(
//   process.env.BINANCE_API_KEY,
//   process.env.BINANCE_SECRET_KEY,
//   process.env.BINANCE_API_URL
// ),
export default async function (): Promise<any> {
  const now = Date.now();
  function getConfig(symbole: string) {
    return {
      interval: TIME_PERIOD.THREE_DAILY,
      options: {
        startTime: now - 1000 * 3600 * 24 * 365,
        endTime: now,
      },
      Strategy: SuperIchimokuStrategy,
      spot: new BinanceSpot(),
      symbole,
    };
  }
  const cryptoConfigs: Config[] = [
    getConfig("BTCUSDT"),
    getConfig("ETHUSDT"),
    getConfig("ADAUSDT"),
    getConfig("MATICUSDT"),
    getConfig("AVAXUSDT"),
    getConfig("ATOMUSDT"),
  ];

  // const fiatsCollection = await firestore(app)
  //   .collection(`/fiat-wallet/`)
  //   .get();
  // const cryptosCollection = firestore(app).collection(`/crypto-wallet/`);

  return Promise.all(
    cryptoConfigs.map(async (config) => {
      const order = await getOrderFrom(config);
      console.log(order);

      return { symbole: config.symbole, order };
      // if (!order) return;

      // const { symbole, exchange } = config;
      // return fiatsCollection.docs.map(async (fiatDocument) => {
      //   const fiatData = fiatDocument.data();
      //   const cryptoWalletRef = cryptosCollection.doc(
      //     `${fiatDocument.id}-${symbole}`
      //   );
      //   const cryptoData = (await cryptoWalletRef.get()).data();
      //   if (!cryptoData) {
      //     throw new Error("No CRYPTO");
      //   }

      //   if (order.type === TransactionType.LONG) {
      //     const response = await exchange.newOrder(
      //       symbole,
      //       ORDER_SIDE.MARKET,
      //       "LONG",
      //       {
      //         quantity: fiatData.amount,
      //       }
      //     );

      //     console.log(response);

      //     fiatDocument.ref.set({
      //       ...fiatData,
      //       amount: 0,
      //     });
      //     cryptoWalletRef.set({
      //       ...cryptoData,
      //       amount: 0,
      //     });
      //   }

      //   if (order.type === TransactionType.SHORT) {
      //     const response = exchange.newOrder(
      //       symbole,
      //       ORDER_SIDE.MARKET,
      //       order.type,
      //       {
      //         quantity: cryptoData.amount,
      //       }
      //     );

      //     console.log(response);

      //     cryptoWalletRef.set({
      //       ...cryptoData,
      //       amount: 0,
      //     });
      //     fiatDocument.ref.set({
      //       ...fiatData,
      //       amount: 0,
      //     });
      //   }
      // });
    })
  );
}

async function getOrderFrom({
  spot,
  symbole,
  interval,
  options,
  Strategy,
}: Config) {
  const { data: klines } = await spot.klines(symbole, interval, options);
  const crinKlines = parseBinanceKlines(klines);
  const strategy = new Strategy(crinKlines);

  return strategy.getLastOrder();
}
