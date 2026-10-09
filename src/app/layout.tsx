import "./globals.css";
import "./svg.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToAnchor from "@/components/ScrollToAnchor";

import PlausibleProvider from 'next-plausible'
import { Metadata } from 'next';

const SITE_TITLE = 'API0 - Intelligence on demand for any backend';
const SITE_DESCRIPTION =
  'Add an intelligent interface to any backend. Import your API and your team uses it from Claude, Telegram or WhatsApp, in plain language. No rewrite, fully in the cloud.';

// What LinkedIn, X, Slack and the rest show when api0.ai is shared. The image
// is a static file (public/og.png, 1200×630): a link preview must never depend
// on a route that can fail. Pages with their own image (blog posts) override it.
const SHARE_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'api0 — Add an intelligent interface to any backend',
};

export const metadata: Metadata = {
  // Resolves every relative URL below; without it Next falls back to localhost.
  metadataBase: new URL('https://api0.ai'),
  title: {
    template: '%s | API0',
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'API0',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
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
      </head>
      <body className="antialiased">
        <PlausibleProvider domain="api0.ai" trackOutboundLinks>

          <ThemeProvider defaultTheme="light" storageKey="api0-theme">
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <ScrollToAnchor />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </PlausibleProvider>

      </body>
    </html>
  )
}
