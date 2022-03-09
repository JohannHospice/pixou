import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export default function (
  request: functions.https.Request,
  response: functions.Response<any>
): void {
  console.log(functions.config());
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
}
