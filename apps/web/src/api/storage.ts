import {
  getStorage,
  ref,
  getDownloadURL,
  connectStorageEmulator,
  listAll,
} from "firebase/storage";
import app from "./app";

const storage = getStorage(app);

const hostEmulator = process.env["REACT_APP_FIREBASE_STORAGE_EMULATOR_HOST"];

if (hostEmulator) {
  const [host, port] = hostEmulator.split(":");
  connectStorageEmulator(storage, host, Number(port));
}
const BUCKET_STRATEGY_PATH = "strategies/long-term-btc";
const BUCKET_STRATEGY_SYMBOLS_PATH = `${BUCKET_STRATEGY_PATH}/symbols`;

export async function getStrategy(symbol: string) {
  const strategyUrl = await getDownloadURL(
    ref(storage, `${BUCKET_STRATEGY_SYMBOLS_PATH}/${symbol}`)
  );
  return fetch(strategyUrl)
    .then((response) => response.json())
    .then(({ orders, klines, symbol, interval, fullName, coinmarketcap }) => ({
      symbol,
      interval,
      fullName,
      filename: symbol,
      coinmarketcap: coinmarketcap,
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
  return listAll(ref(storage, BUCKET_STRATEGY_SYMBOLS_PATH)).then(({ items }) =>
    items.map(({ name }) => name)
  );
}

export async function getResume() {
  const strategyUrl = await getDownloadURL(
    ref(storage, `${BUCKET_STRATEGY_PATH}/lastorders`)
  );
  return fetch(strategyUrl).then((response) => response.json());
}
