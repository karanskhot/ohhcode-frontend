import { NextRequest, NextResponse } from 'next/server';

const proxy = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const pathName = request.nextUrl.pathname;

  // --- 1. API PROXY LOGIC ---
  // If the request starts with /api, send it to Spring Boot
  if (pathName.startsWith('/api')) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    const targetUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      backendUrl,
    );

    return NextResponse.rewrite(targetUrl);
  }

  // --- 2. AUTH REDIRECT LOGIC (Your existing code) ---
  const isAuthRoute = pathName.startsWith('/get-started');
  const isHomeRoute = pathName === '/';

  if (!token && !isAuthRoute && !isHomeRoute)
    return NextResponse.redirect(new URL('/get-started', request.url));

  if (token && (isAuthRoute || isHomeRoute))
    return NextResponse.redirect(new URL('/my-snippets', request.url));
};

export const config = {
  matcher: [
    // Remove 'api' from the negative lookahead so the proxy can handle /api routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export default proxy;
