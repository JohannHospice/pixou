import * as functions from "firebase-functions";
// import eachThreeDaysHandler from "./functions/eachThreeDays";
import helloWorldHandler from "./functions/helloWorld";

// export const eachThreeDays = functions
//   .region("europe-west1")
//   .pubsub.schedule("every 3 days")
//   .onRun(eachThreeDaysHandler);

export const helloWorld = functions
  .region("europe-west1")
  .https.onCall(helloWorldHandler);
