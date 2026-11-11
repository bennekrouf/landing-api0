/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api0.ai'], // Add your domain for image optimization
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Guide 01 covered Claude, Teams and WhatsApp; each channel now has its own
  // guide (07 Teams, 08 WhatsApp, 09 Telegram), and 01 is about Claude only.
  async redirects() {
    return [
      { source: '/guides/your-api-in-claude-teams-whatsapp', destination: '/guides/your-api-in-claude', permanent: true },
      { source: '/fr/guides/api-dans-claude-teams-whatsapp', destination: '/fr/guides/ton-api-dans-claude', permanent: true },
      { source: '/downloads/guides/en/api0-guide-01-your-api-in-claude-teams-whatsapp.pdf', destination: '/downloads/guides/en/api0-guide-01-your-api-in-claude.pdf', permanent: true },
      { source: '/downloads/guides/fr/api0-guide-01-api-dans-claude-teams-whatsapp.pdf', destination: '/downloads/guides/fr/api0-guide-01-ton-api-dans-claude.pdf', permanent: true },
    ];
  },
  // Generate OG images at build time to improve performance
  async rewrites() {
    return [
      {
        source: '/og-image/:path*',
        destination: '/api/og-image/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
