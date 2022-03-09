import * as functions from "firebase-functions";
import eachThreeDaysHandler from "./functions/eachThreeDays";

export const eachThreeDays = functions
  .region("europe-west1")
  .pubsub.schedule("every 3 days")
  .onRun(eachThreeDaysHandler);
