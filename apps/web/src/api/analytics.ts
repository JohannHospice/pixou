import { logEvent, getAnalytics } from "firebase/analytics";
import app from "./app";
export const analytics = getAnalytics(app);

export function logLogin() {
  logEvent(analytics, "login-email-password");
}
