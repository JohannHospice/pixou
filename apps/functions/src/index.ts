import * as functions from "firebase-functions";
import createStrategies from "./functions/createStrategies";

export const updateStrategies = functions
  .region("europe-west1")
  .pubsub.schedule("every 1 days")
  .onRun(async (context) => {
    console.log("run", context);

    await createStrategies();

    console.log("end");
  });

export const refreshOrders = functions
  .region("europe-west1")
  .https.onRequest(
    async (request: functions.https.Request, response: functions.Response) => {
      await createStrategies();
      response.send("done");
    }
  );
