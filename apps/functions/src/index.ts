import * as functions from "firebase-functions";
import eachThreeDaysHandler from "./functions/eachThreeDays";

export const updateStrategies = functions
  .region("europe-west1")
  .pubsub.schedule("every 1 days")
  .onRun(async (context) => {
    console.log("run", context);

    await eachThreeDaysHandler();

    console.log("end");
  });
