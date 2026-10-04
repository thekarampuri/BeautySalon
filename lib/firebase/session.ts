import { cookies } from 'next/headers';
import { adminAuth, adminDb } from './admin';

const SESSION_COOKIE_NAME = '__session';
const EXPIRES_IN_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function createSessionCookie(idToken: string): Promise<string> {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: EXPIRES_IN_MS });
  return sessionCookie;
}

export async function verifyServerSession(): Promise<{ uid: string; email?: string; role: 'admin' | 'staff' } | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    const uid = decodedToken.uid;

    // Check profiles collection in Firestore for role
    const profileDoc = await adminDb.collection('profiles').doc(uid).get();
    if (!profileDoc.exists) return null;

    const profileData = profileDoc.data();
    return {
      uid,
      email: decodedToken.email,
      role: profileData?.role === 'admin' ? 'admin' : 'staff',
    };
  } catch (error) {
    return null;
  }
}
