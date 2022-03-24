import * as functions from "firebase-functions";
import eachThreeDaysHandler from "./functions/eachThreeDays";
import helloWorldHandler from "./functions/helloWorld";

export const eachThreeDays = functions
  .region("europe-west1")
  .pubsub.schedule("every 1 days")
  .onRun(async (context) => {
    console.log("run", context);

    await eachThreeDaysHandler();
    console.log("end");
  });

export const refreshOrders = functions
  .region("europe-west1")
  .https.onRequest(
    async (request: functions.https.Request, response: functions.Response) => {
      await eachThreeDaysHandler();
      response.send("done");
    }
  );
