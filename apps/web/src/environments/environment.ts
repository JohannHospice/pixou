// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
const environment = JSON.parse(
  process.env["REACT_APP_FIREBASE_CONFIG"] || "{}"
);
export default environment;
