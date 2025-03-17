"use client";

import { ThemeProvider } from "./theme-provider";
import { useEffect, useState } from "react";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Ensure we don't render children until after hydration
  // to avoid theme flash and mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Add a minimal loader or return null to avoid hydration issues
    return <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="api0-theme">
      {children}
    </ThemeProvider>
  );
}
