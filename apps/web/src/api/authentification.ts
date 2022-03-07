import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./app";
import { createUser } from "./firestore";

const auth = getAuth(app);
auth.useDeviceLanguage();

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log(userCredential);

  return userCredential.user;
}

// in backend
export async function register({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUser({
    uid: userCredential.user.uid,
    email: userCredential.user.email || "",
    firstName,
    lastName,
  });

  return userCredential.user;
}

export function getLoggedUser(userObserver: (user: User | null) => void) {
  return onAuthStateChanged(auth, userObserver);
}

export function logout() {
  return signOut(auth);
}

export default auth;
