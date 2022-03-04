import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

export function sign(title: string) {
  logEvent(analytics, title);
}
