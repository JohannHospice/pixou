import {
  getStorage,
  ref,
  getDownloadURL,
  connectStorageEmulator,
  listAll,
} from "firebase/storage";
import app from "./app";

const storage = getStorage(app);

if (process.env["NODE_ENV"] === "localhost") {
  connectStorageEmulator(storage, "localhost", 9199);
}

export async function getStrategy(file: string) {
  const strategyRef = ref(storage, `/strategy/symbols/${file}`);
  const strategyUrl = await getDownloadURL(strategyRef);
  return fetch(strategyUrl)
    .then((response) => response.json())
    .then(({ orders, klines, symbol, interval }) => ({
      symbol,
      interval,
      filename: file,
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

export async function listStrategy() {
  const strategyRef = ref(storage, `/strategy/symbols`);
  return listAll(strategyRef)
    .then(({ items }) => items)
    .then((list) => list.map(({ name }) => name));
}
