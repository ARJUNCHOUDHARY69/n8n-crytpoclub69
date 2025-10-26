// Security configuration for API routes
export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 50,
    WINDOW_MS: 60 * 1000, // 1 minute
    BURST_LIMIT: 10 // Allow 10 requests in first second
  },
  
  // API endpoints whitelist
  ALLOWED_ENDPOINTS: [
    'global',
    'simple/price',
    'coins/markets',
    'coins/bitcoin/market_chart',
    'coins/ethereum/market_chart',
    'coins/binancecoin/market_chart',
    'coins/cardano/market_chart',
    'coins/solana/market_chart'
  ],
  
  // Security headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },
  
  // CORS settings
  CORS_ORIGINS: [
    'http://localhost:3000',
    'https://crypto-club-69.vercel.app',
    'https://crypto-club-69-git-main.vercel.app'
  ],
  
  // Cache settings
  CACHE_SETTINGS: {
    'Cache-Control': 'public, max-age=60, s-maxage=60',
    'ETag': 'strong'
  }
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const userLimit = rateLimitStore.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { 
      count: 1, 
      resetTime: now + SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS 
    })
    return { 
      allowed: true, 
      remaining: SECURITY_CONFIG.RATE_LIMIT.REQUESTS_PER_MINUTE - 1 
    }
  }
  
  if (userLimit.count >= SECURITY_CONFIG.RATE_LIMIT.REQUESTS_PER_MINUTE) {
    return { 
      allowed: false, 
      remaining: 0 
    }
  }
  
  userLimit.count++
  return { 
    allowed: true, 
    remaining: SECURITY_CONFIG.RATE_LIMIT.REQUESTS_PER_MINUTE - userLimit.count 
  }
}

export function validateEndpoint(endpoint: string): boolean {
  return SECURITY_CONFIG.ALLOWED_ENDPOINTS.includes(endpoint)
}

export function getSecurityHeaders(): Record<string, string> {
  return {
    ...SECURITY_CONFIG.SECURITY_HEADERS,
    ...SECURITY_CONFIG.CACHE_SETTINGS
  }
}
