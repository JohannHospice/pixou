import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  ReportHandler,
} from "web-vitals";

export default function reportWebVitals(onPerfEntry?: ReportHandler) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}
