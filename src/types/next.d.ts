// src/types/next.d.ts
// This file overrides problematic Next.js types that are causing conflicts

// Override for the main Next.js module
declare module 'next' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

// Override for Next.js server components
declare module 'next/dist/server/render' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

// Override for Next.js app types
declare module 'next/types' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

// Override for Next.js app router
declare module 'next/dist/server/app-render/app-render' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}
