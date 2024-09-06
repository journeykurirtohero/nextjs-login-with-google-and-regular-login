//lib/auth-server
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export async function generateToken(payload: { userId: string }, expiresIn: string): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return jwt;
}

export async function verifyToken(token: string): Promise<{ userId: string; username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload as { userId: string; username: string; role: string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}