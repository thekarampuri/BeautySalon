import { signInWithEmailAndPassword, signOut as firebaseSignOut, UserCredential } from 'firebase/auth';
import { auth } from './client';

export async function loginAdmin(email: string, pass: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, pass);
}

export async function logoutAdmin(): Promise<void> {
  return await firebaseSignOut(auth);
}
