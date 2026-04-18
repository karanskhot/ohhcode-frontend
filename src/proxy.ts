import { NextRequest, NextResponse } from 'next/server';

const proxy = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const pathName = request.nextUrl.pathname;

  // --- 1. API PROXY LOGIC ---
  if (pathName.startsWith('/api')) {
    let backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    // Defensive check: Ensure backendUrl starts with http (Crucial for Railway)
    if (!backendUrl.startsWith('http')) {
      backendUrl = `http://${backendUrl}`;
    }

    try {
      const targetUrl = new URL(
        request.nextUrl.pathname + request.nextUrl.search,
        backendUrl,
      );
      return NextResponse.rewrite(targetUrl);
    } catch (e) {
      console.error('Invalid Backend URL:', backendUrl);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      );
    }
  }

  // --- 2. AUTH REDIRECT LOGIC ---
  const isAuthRoute = pathName.startsWith('/get-started');
  const isHomeRoute = pathName === '/';

  // If no token and not on an auth/home page, go to get-started
  if (!token && !isAuthRoute && !isHomeRoute) {
    return NextResponse.redirect(new URL('/get-started', request.url));
  }

  // If logged in and trying to go to login/home, go to snippets
  if (token && (isAuthRoute || isHomeRoute)) {
    return NextResponse.redirect(new URL('/my-snippets', request.url));
  }
};

export const config = {
  matcher: [
    // Match everything EXCEPT static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export default proxy;
