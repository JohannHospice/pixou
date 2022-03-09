import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export default functions.https.onRequest((request, response) => {
  console.log(functions.config());
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
