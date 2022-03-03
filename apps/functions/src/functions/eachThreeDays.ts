import functions from "firebase-functions";
import { getActionFromBehavior, getCoinBehaviors } from "../libs/coinBehavior";

export default functions.pubsub
  .schedule("every 3 days")
  .onRun(async (context) => {
    console.log({ context });

    const coinBehaviors = getCoinBehaviors();

    const actionsForToday = await Promise.all(
      coinBehaviors.map(getActionFromBehavior)
    );

    console.log({ actionsForToday });
  });
