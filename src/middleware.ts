import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_COOKIE } from '@/i18n';

/** Whether the browser's first language is French (Accept-Language: fr-CH, fr;q=…). */
function prefersFrench(request: NextRequest): boolean {
  const first = (request.headers.get('accept-language') ?? '').split(',')[0]?.trim().toLowerCase() ?? '';
  return first === 'fr' || first.startsWith('fr-');
}

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


  // A French browser landing on the English home, pricing or use-cases page goes to the
  // French one, once: a language chosen with the switch (cookie) wins, and a
  // crawler, which sends no French Accept-Language, keeps the English page.
  if ((url.pathname === '/' || url.pathname === '/pricing' || url.pathname === '/use-cases') && !request.cookies.get(LANG_COOKIE) && prefersFrench(request)) {
    url.pathname = url.pathname === '/' ? '/fr' : `/fr${url.pathname}`;
    return NextResponse.redirect(url, 307);
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
