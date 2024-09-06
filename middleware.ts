// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  console.log('Middleware - NextAuth Token:', token);
  console.log('Middleware - Current path:', request.nextUrl.pathname);
  console.log('Middleware - Token exists:', !!token);

  const authRequiredPaths = ['/dashboard', '/admin', '/profile'];
  const requiresAuth = authRequiredPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (requiresAuth && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Jika ini adalah rute admin, periksa apakah pengguna memiliki peran admin
  if (request.nextUrl.pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/profile'],
};