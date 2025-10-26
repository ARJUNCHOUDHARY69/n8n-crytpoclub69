import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import PriceTicker from '@/components/PriceTicker'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#00ff00',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Crypto Club 69 - Professional Trading Platform',
  description: 'Enterprise-grade cryptocurrency trading platform with mobile-optimized P&L calculator, touch-friendly charts, and global CDN delivery. Real-time market data, AI-generated visuals, and professional trading tools.',
  keywords: 'cryptocurrency, bitcoin, ethereum, blockchain, crypto news, trading, DeFi, P&L calculator, mobile trading, professional trading, enterprise crypto, CDN optimization, touch charts',
  authors: [{ name: 'Crypto Club 69' }],
  creator: 'Crypto Club 69',
  publisher: 'Crypto Club 69',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://crypto-club-69.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Crypto Club 69 - Professional Trading Platform',
    description: 'Enterprise-grade cryptocurrency trading platform with mobile-optimized features',
    url: 'https://crypto-club-69.vercel.app',
    siteName: 'Crypto Club 69',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Crypto Club 69 - Professional Trading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Club 69 - Professional Trading Platform',
    description: 'Enterprise-grade cryptocurrency trading platform with mobile-optimized features',
    images: ['/logo.png'],
    creator: '@choudhary00070',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Crypto Club 69',
    'application-name': 'Crypto Club 69',
    'msapplication-TileColor': '#fbbf24',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-black relative overflow-hidden">
          {/* Retro Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-retro-green/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-retro-cyan/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-retro-green/3 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="relative z-10">
            <Header />
            <PriceTicker />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
