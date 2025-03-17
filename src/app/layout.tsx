import type { Metadata } from "next";
import "./globals.css";
import { ClientThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "api0",
  description: "AI Bridge to Enterprise systems",
  icons: {
    icon: [
      { url: '/favicon/favicon.jpg' },
      { url: '/favicon/icon.png' },
    ],
    apple: [
      { url: '/favicon/apple-icon.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/favicon/apple-icon.png',
      },
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="api0" />
        {/* Add script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('api0-theme');
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else if (storedTheme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else if (storedTheme === 'system' || !storedTheme) {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.classList.add(systemTheme);
                    document.documentElement.setAttribute('data-theme', systemTheme);
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
