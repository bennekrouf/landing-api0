import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Mayo",
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
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mayo" />
      </head>
      <body className="bg-gray-900 antialiased">{children}</body>
    </html>
  )
}
