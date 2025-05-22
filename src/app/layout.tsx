import "./globals.css";
import "./svg.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToAnchor from "@/components/ScrollToAnchor";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | API0',
    default: 'API0 - Intelligent API Routing',
  },
  description: 'API0 - Modern API Routing and Management Platform',
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
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
<script defer data-domain="api0.ai" src="https://plausible.io/js/script.outbound-links.js"></script>
<script 
  dangerouslySetInnerHTML={{
    __html: `
      window.plausible = window.plausible || function() { 
        (window.plausible.q = window.plausible.q || []).push(arguments) 
      }
    `,
  }}
/>

      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="api0-theme">
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <ScrollToAnchor />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
