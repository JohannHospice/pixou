import app from "./app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firestore = getFirestore(app);

export async function getCities() {
  const citySnapshot = await getDocs(collection(firestore, "cities"));
  return citySnapshot.docs.map((doc) => doc.data());
}
