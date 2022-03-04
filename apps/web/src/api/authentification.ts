import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./app";

export async function authentification(email: string, password: string) {
  const auth = getAuth(app);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  console.log(userCredential);

  return userCredential.user;
}
