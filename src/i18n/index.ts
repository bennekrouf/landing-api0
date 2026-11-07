// src/i18n/index.ts
//
// The landing page in English (/, /pricing) and French (/fr, /fr/pricing).
// The guides are in both (/guides, /fr/guides). The blog and the legal pages
// stay in English. A language's copy lives in
// its own file (en.ts, fr.ts); both follow the `Copy` shape of en.ts, so a
// string missing in French fails the build.

import { en } from './en';
import { fr } from './fr';
import guidePairs from '@/data/guide-pairs.json';

export type Lang = 'en' | 'fr';
export type Copy = typeof en;

export const LANGS: Lang[] = ['en', 'fr'];

export function copyFor(lang: Lang): Copy {
  return lang === 'fr' ? fr : en;
}

/** The language a path is in: /fr and below is French. */
export function langOf(pathname: string | null | undefined): Lang {
  return pathname === '/fr' || pathname?.startsWith('/fr/') ? 'fr' : 'en';
}

/** A page's path in `lang`: home, pricing, use cases and guides are translated; others stay English. */
export type LocalPage = '/' | '/pricing' | '/use-cases' | '/guides';

const LOCAL_PAGES: string[] = ['/', '/pricing', '/use-cases', '/guides'];

/** The same guide in the other language: guides are paired by number. */
const pairs = guidePairs as { en?: string; fr?: string }[];

export function localePath(lang: Lang, path: LocalPage): string {
  if (lang === 'en') return path;
  return path === '/' ? '/fr' : `/fr${path}`;
}

/** The same page in the other language, for the language switch. */
export function otherLangPath(pathname: string): { lang: Lang; href: string } | null {
  const lang = langOf(pathname);
  const bare = lang === 'fr' ? pathname.replace(/^\/fr/, '') || '/' : pathname;
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const guide = /^\/guides\/([^/]+)\/?$/.exec(bare);
  if (guide) {
    const slug = pairs.find((p) => p[lang] === guide[1])?.[other];
    return slug ? { lang: other, href: `${localePath(other, '/guides')}/${slug}` } : null;
  }
  if (!LOCAL_PAGES.includes(bare)) return null;
  return { lang: other, href: localePath(other, bare as LocalPage) };
}

/** The cookie a chosen language is kept in, so the middleware does not redirect again. */
export const LANG_COOKIE = 'api0-lang';
