'use client';

import { useEffect } from 'react';

// Carries a visitor's source over to the app. The dashboard records where a new
// account came from, but a visitor who reads api0.ai first arrives there with
// "api0.ai" as the referrer. So we keep this site's first touch (the referrer
// and any utm_* tags) and add it to links to app.api0.ai as ?ref= and ?utm_*=.

const KEY = 'api0.firstTouch';
const APP_HOST = 'app.api0.ai';
const TAGS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const MAX_AGE_MS = 2 * 24 * 60 * 60 * 1000;

type Touch = { at: number; params: Record<string, string> };

function readTouch(): Touch | null {
  try {
    const raw = localStorage.getItem(KEY);
    const touch = raw ? (JSON.parse(raw) as Touch) : null;
    return touch && Date.now() - touch.at < MAX_AGE_MS ? touch : null;
  } catch {
    return null;
  }
}

function captureTouch() {
  if (readTouch()) return;
  const params: Record<string, string> = {};
  const query = new URLSearchParams(window.location.search);
  for (const tag of TAGS) {
    const value = query.get(tag);
    if (value) params[tag] = value;
  }
  try {
    const host = document.referrer ? new URL(document.referrer).host : '';
    if (host && host !== window.location.host) params.ref = host.replace(/^www\./, '');
  } catch {
    // Not a URL: no referrer to keep.
  }
  if (Object.keys(params).length === 0) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), params }));
  } catch {
    // Storage blocked: the source is simply not carried.
  }
}

export default function AppLinkSource() {
  useEffect(() => {
    captureTouch();

    // At click time, so links rendered later are covered too.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (url.host !== APP_HOST) return;
      const touch = readTouch();
      if (!touch) return;
      for (const [key, value] of Object.entries(touch.params)) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      }
      link.href = url.toString();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
