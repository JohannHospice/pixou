import { firestore } from "firebase-admin";
import functions from "firebase-functions";
import admin from "firebase-admin";

import { getActionFromBehavior, getCoinBehaviors } from "../libs/coinBehavior";
import { TransactionType } from "../libs/order";
import { ORDER_SIDE } from "../libs/exchanges";

export default functions.pubsub
  .schedule("every 3 days")
  .onRun(async (context) => {
    console.log({ context });

    const coinBehaviors = getCoinBehaviors();

    const actionsForToday = await Promise.all(
      coinBehaviors.map(async (coinBehavior) => {
        return {
          coinBehavior,
          order: await getActionFromBehavior(coinBehavior),
        };
      })
    );

    console.log({ actionsForToday });

    const app = admin.initializeApp();

    const finances = await firestore(app).collection(`/finance/`).get();

    finances.forEach(async (document) => {
      const { reserve }: { reserve: number } = Object(document.data());
      actionsForToday.forEach((action) => {
        if (action.order) {
          if (action.order.type === TransactionType.LONG) {
            action.coinBehavior.spot.newOrder(
              action.coinBehavior.symbole,
              ORDER_SIDE.MARKET,
              action.order.type,
              {
                quantity: reserve,
              }
            );
          }
        }
      });
    });
  });

async function getUserFinance(userId: string) {
  const app = admin.initializeApp();

  const userFinanceData = await firestore(app)
    .doc(`/finance/${userId}/`)
    .get()
    .then((doc) => doc.data());

  if (!userFinanceData) throw new Error(`No user finance on '${userId}'`);

  return userFinanceData;
}
