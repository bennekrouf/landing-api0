import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
        {/* Script below provides a quick initial theme application for reduced flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('api0-theme');
                  if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
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
        <ThemeProvider defaultTheme="system" storageKey="api0-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
