import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedCourseRoutes = [/^\/courses\/[^/]+$/];
const authRoutes = ['/login', '/register'];

function hasSessionCookie(request: NextRequest): boolean {
  const cookies = request.cookies.getAll();
  return cookies.some(
    (c) => c.name.startsWith('better-auth') && c.value.length > 0,
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = hasSessionCookie(request);

  if (protectedCourseRoutes.some((re) => re.test(pathname)) && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authRoutes.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(
      new URL('/dashboard/student', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/courses/:path*', '/login', '/register'],
};
