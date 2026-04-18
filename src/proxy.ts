import { NextRequest, NextResponse } from 'next/server';

const proxy = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  console.log('TOKEN IN PROXY', token);
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = pathName.startsWith('/get-started');
  const isHomeRoute = pathName === '/';

  if (!token && !isAuthRoute && !isHomeRoute)
    return NextResponse.redirect(new URL('/get-started', request.url));

  if (token && (isAuthRoute || isHomeRoute))
    return NextResponse.redirect(new URL('/my-snippets', request.url));
};
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/my-snippets',
    '/profile',
  ],
};

export default proxy;
