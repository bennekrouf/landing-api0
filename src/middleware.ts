import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Skip static files, API routes, and special paths
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.') ||
    url.pathname.startsWith('/.well-known') ||
    url.pathname === '/favicon.ico' ||
    url.pathname === '/robots.txt' ||
    url.pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Handle WWW redirect only
  if (url.hostname === 'www.api0.ai') {
    url.hostname = 'api0.ai';
    return NextResponse.redirect(url, 301);
  }

  // Let Next.js handle all routing naturally - only add trailing slash for production SEO
  if (process.env.NODE_ENV === 'production') {
    const hasTrailingSlash = url.pathname.endsWith('/');
    const isRoot = url.pathname === '/';

    // Add trailing slash to non-root paths that don't have one
    if (!isRoot && !hasTrailingSlash) {
      url.pathname += '/';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
