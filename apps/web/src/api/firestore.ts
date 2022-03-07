import app from "./app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";

const firestore = getFirestore(app);

export async function getCities() {
  const citySnapshot = await getDocs(collection(firestore, "cities"));
  return citySnapshot.docs.map((doc) => doc.data());
}

export async function getUser() {
  // getDoc(collection(firestore, "users")).
  const citySnapshot = await getDocs(collection(firestore, "users"));
  // citySnapshot.query.
  return citySnapshot.docs.map((doc) => doc.data());
}
export async function createUser({
  email,
  firstName,
  lastName,
  uid,
}: {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  return setDoc(doc(firestore, "users", uid), {
    email,
    firstName,
    lastName,
  });
}
