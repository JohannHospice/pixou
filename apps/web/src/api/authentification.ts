import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import app from "./app";
import { createUser, getUser } from "./firestore";

const auth = getAuth(app);
auth.useDeviceLanguage();

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const userFirestore = await getUser(userCredential.user.uid);

  return {
    ...userFirestore,
    ...userCredential.user,
  };
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

  const userFirestore = {
    uid: userCredential.user.uid,
    email: userCredential.user.email || "",
    firstName,
    lastName,
  };

  await createUser(userFirestore);

  return {
    ...userFirestore,
    ...userCredential.user,
  };
}

export function getLoggedUser(userObserver: (user: User | null) => void) {
  return onAuthStateChanged(auth, userObserver);
}

export function logout() {
  return signOut(auth);
}

export async function resetPassword({ email }: { email: string }) {
  const actionCodeSettings = undefined;
  // {
  //   url: "https://www.example.com/?email=" + email,
  //   handleCodeInApp: true,
  // }
  return sendPasswordResetEmail(auth, email, actionCodeSettings);
}

export async function confirmResetPassword({
  oobCode,
  password,
}: {
  oobCode: string;
  password: string;
}) {
  return confirmPasswordReset(auth, oobCode, password);
}

export default auth;
