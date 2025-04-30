import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata = {
  title: {
    template: '%s | API0',
    default: 'api0 - Intelligent API Routing', // Used on the homepage
  },
  description: 'api0 - Modern API Routing and Management Platform',
  icons: {
    icon: '/icon.svg', // SVG favicon
    shortcut: '/favicon.ico', // Fallback for browsers that don't support SVG
    apple: '/apple-icon.png', // Optional: for iOS devices
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
<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>


      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="api0-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
