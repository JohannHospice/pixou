import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import firebaseConfig from "../environments/environment";

const app = initializeApp(firebaseConfig);

const hostEmulator = process.env["REACT_APP_FUNCTIONS_EMULATOR_HOST"];

if (hostEmulator) {
  const [host, port] = hostEmulator.split(":");
  const functions = getFunctions(app);
  connectFunctionsEmulator(functions, host, Number(port));
}

export default app;
