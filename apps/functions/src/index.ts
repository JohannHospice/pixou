import functions from "firebase-functions";
import eachThreeDaysHandler from "./functions/eachThreeDays";

export const eachThreeDays = functions.pubsub
  .schedule("every 3 days")
  .onRun(eachThreeDaysHandler);
