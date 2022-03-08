import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import app from "./app";

const firestore = getFirestore(app);

// user

export async function getUser(uid: string) {
  const docSnap = await getDoc(doc(firestore, "users", uid));
  return docSnap.data();
}

export async function updateUser(uid: string, data: any) {
  return updateDoc(doc(firestore, "users/" + uid), data);
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
    createdAt: new Date(),
  });
}

//
