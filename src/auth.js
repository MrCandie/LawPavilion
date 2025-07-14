import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function updateUserProfile(profile = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is signed in");

  return await updateProfile(user, profile);
}
