import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// This import is needed by admin.initializeApp() to get the project info (Database url, project id, etc)

admin.initializeApp();

console.log(functions.config());

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(
  (request: any, response: any) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);
