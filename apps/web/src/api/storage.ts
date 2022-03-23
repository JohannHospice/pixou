import {
  getStorage,
  ref,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import app from "./app";

const storage = getStorage(app);

if (window.location.hostname === "localhost") {
  connectStorageEmulator(storage, "localhost", 9199);
}

export async function getStrategy(symbol: string) {
  const strategyRef = ref(storage, `/strategy/${symbol}`);
  const strategyUrl = await getDownloadURL(strategyRef);
  return fetch(strategyUrl)
    .then((response) => response.json())
    .then(({ orders, klines }) => ({
      klines: klines.map((obj) => ({
        ...obj,
        closeTime: new Date(obj.closeTime),
      })),
      orders: orders.map((obj) => ({
        ...obj,
        closeTime: new Date(obj.closeTime),
      })),
    }));
}
