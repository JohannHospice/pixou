import { firestore } from "firebase-admin";
import functions from "firebase-functions";
import admin from "firebase-admin";
import { TransactionType } from "../libs/order";
import { ORDER_SIDE } from "../libs/exchanges";
import { BinanceSpot, TIME_PERIOD } from "../libs/exchanges/binance";
import SuperIchimokuStrategy from "../libs/strategies/superichimoku";

const app = admin.initializeApp();

export default functions.pubsub.schedule("every 3 days").onRun(eachThreeDays);

export async function eachThreeDays(context: any) {
  console.log({ context });
  const now = Date.now();

  const cryptoConfigs = [
    {
      symbole: "BTCUSDT",
      interval: TIME_PERIOD.THREE_DAILY,
      options: {
        startTime: now - 1000 * 3600 * 24 * 7,
        endTime: now,
      },
      Strategy: SuperIchimokuStrategy,
      spot: new BinanceSpot(),
      exchange: new BinanceSpot(
        process.env.BINANCE_API_KEY,
        process.env.BINANCE_SECRET_KEY,
        process.env.BINANCE_API_URL
      ),
    },
  ];

  const fiatsCollection = await firestore(app)
    .collection(`/fiat-wallet/`)
    .get();
  const cryptosCollection = firestore(app).collection(`/crypto-wallet/`);

  await Promise.all(
    cryptoConfigs.map(
      async ({ spot, symbole, interval, options, Strategy, exchange }) => {
        const { data: klines } = await spot.klines(symbole, interval, options);
        const strategy = new Strategy(klines);

        const order = strategy.getOrder(klines.length - 1);
        if (!order) return;

        return fiatsCollection.docs.map(async (fiatDocument) => {
          const fiatData = fiatDocument.data();
          const cryptoWalletRef = cryptosCollection.doc(
            `${fiatDocument.id}-${symbole}`
          );
          const cryptoData = (await cryptoWalletRef.get()).data();
          if (!cryptoData) {
            throw new Error("No CRYPTO");
          }

          if (order.type === TransactionType.LONG) {
            const response = await exchange.newOrder(
              symbole,
              ORDER_SIDE.MARKET,
              "LONG",
              {
                quantity: fiatData.amount,
              }
            );

            console.log(response);

            fiatDocument.ref.set({
              ...fiatData,
              amount: 0,
            });
            cryptoWalletRef.set({
              ...cryptoData,
              amount: 0,
            });
          }

          if (order.type === TransactionType.SHORT) {
            const response = exchange.newOrder(
              symbole,
              ORDER_SIDE.MARKET,
              order.type,
              {
                quantity: cryptoData.amount,
              }
            );

            console.log(response);

            cryptoWalletRef.set({
              ...cryptoData,
              amount: 0,
            });
            fiatDocument.ref.set({
              ...fiatData,
              amount: 0,
            });
          }
        });
      }
    )
  );
}
