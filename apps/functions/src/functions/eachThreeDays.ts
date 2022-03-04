import { firestore } from "firebase-admin";
import functions from "firebase-functions";
import admin from "firebase-admin";

import { getActionFromBehavior, getCoinBehaviors } from "../libs/coinBehavior";
import { TransactionType } from "../libs/order";
import Exchange, { ORDER_SIDE } from "../libs/exchanges";

const app = admin.initializeApp();

export default functions.pubsub
  .schedule("every 3 days")
  .onRun(async (context) => {
    console.log({ context });

    const coinBehaviors = getCoinBehaviors();

    const portfolios = await firestore(app).collection(`/users/`).get();

    await Promise.all(
      coinBehaviors.map(async (coinBehavior) => {
        const order = await getActionFromBehavior(coinBehavior);
        if (!order) return;

        portfolios.forEach(async (document) => {
          const { reserve, coin } = await document
            .get(`portfolios/${coinBehavior.symbole}`)
            .data();

          const result = await newOrder({
            reserve,
            coin,
            symbole: coinBehavior.symbole,
            type: order.type,
            spot: coinBehavior.spot,
          });

          console.log({ result });
        });
      })
    );
  });

async function newOrder({
  reserve,
  coin,
  symbole,
  type,
  spot,
}: {
  reserve: number;
  coin: number;
  symbole: string;
  type: string;
  spot: Exchange;
}) {
  let quantity = 0;

  if (type === TransactionType.LONG) {
    quantity = reserve;
  }

  if (type === TransactionType.SHORT) {
    quantity = coin;
  }

  return spot.newOrder(symbole, ORDER_SIDE.MARKET, type, {
    quantity,
  });
}
