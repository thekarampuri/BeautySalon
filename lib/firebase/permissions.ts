import { verifyServerSession } from './session';

export async function requireAdminSession() {
  const session = await verifyServerSession();
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }
  return session;
}
