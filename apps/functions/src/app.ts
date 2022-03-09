import admin from "firebase-admin";
// This import is needed by admin.initializeApp() to get the project info (Database url, project id, etc)

export default admin.initializeApp();
