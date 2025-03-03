import type { Metadata } from "next";
import "./globals.css";
import { ClientThemeProvider } from "@/components/theme/client-theme-provider";

export const metadata: Metadata = {
  title: "API Sensei",
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
        <meta name="apple-mobile-web-app-title" content="API Sensei" />
      </head>
      <body className="antialiased">
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
