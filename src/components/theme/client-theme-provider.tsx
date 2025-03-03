"use client";

import { ThemeProvider } from "./theme-provider";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="apisensei-theme">
      {children}
    </ThemeProvider>
  );
}
