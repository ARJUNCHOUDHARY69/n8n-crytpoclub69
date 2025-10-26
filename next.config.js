/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel with CDN Integration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    // CDN optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable responsive images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression with CDN
  compress: true,
  // Optimize bundle for mobile
  swcMinify: true,
  // Enable static optimization
  output: 'standalone',
  // PWA and mobile optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  // CDN and caching headers
  async headers() {
    return [
      {
        source: '/api/crypto',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=600',
          },
        ],
      },
      {
        source: '/api/images',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=7200',
          },
        ],
      },
      {
        source: '/api/telegram',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ]
  },
  // Mobile and PWA optimizations
  async rewrites() {
    return [
      {
        source: '/cdn/:path*',
        destination: 'https://cdn.jsdelivr.net/:path*',
      },
    ]
  },
}

module.exports = nextConfig
