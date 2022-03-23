import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "./app";

const storage = getStorage(app);

export async function getStrategy(symbol: string) {
  const strategyRef = ref(storage, `/strategy/${symbol}`);
  const strategyUrl = await getDownloadURL(strategyRef);
  return fetch(strategyUrl).then((response) => response.json());
}
