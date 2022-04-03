import * as functions from "firebase-functions";
import createStrategies from "./functions/createStrategies";

export const updateStrategiesEveryDay = functions
  .region("europe-west1")
  .pubsub.schedule("0 0 */1 * *")
  .timeZone("Etc/UTC")
  .onRun(async (context) => {
    console.log("run", context);

    await createStrategies();

    console.log("end");
  });

// export const updateStrategiesOnRequest = functions
//   .region("europe-west1")
//   .https.onRequest(
//     async (request: functions.https.Request, response: functions.Response) => {
//       await createStrategies();
//       response.send("done");
//     }
//   );
