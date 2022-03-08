import { logEvent, getAnalytics } from "firebase/analytics";
import app from "./app";
export const analytics = getAnalytics(app);

export function logLogin() {
  logEvent(analytics, "auth-login-email-password");
}

export function logLogout() {
  logEvent(analytics, "auth-logout");
}

export function logRegister() {
  logEvent(analytics, "auth-register");
}
