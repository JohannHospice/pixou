import { getPerformance } from "firebase/performance";
import app from "./app";

export const performance = getPerformance(app);
