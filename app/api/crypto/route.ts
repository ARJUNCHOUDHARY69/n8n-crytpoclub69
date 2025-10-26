import { NextRequest, NextResponse } from 'next/server'

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 300000 // 5 minutes cache

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CRYPTO-CLUB-69/1.0'
        }
      })
      
      if (response.ok) {
        return response
      }
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  
  throw new Error('Max retries exceeded')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    const vsCurrency = searchParams.get('vs_currency') || 'usd'
    const perPage = searchParams.get('per_page') || '50'
    const order = searchParams.get('order') || 'market_cap_desc'
    const days = searchParams.get('days') || '1'
    
    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 })
    }
    
    // Check cache first
    const cacheKey = `${endpoint}-${vsCurrency}-${perPage}-${order}-${days}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': 'public, max-age=300',
          'X-Cache': 'HIT'
        }
      })
    }

    // Build API URL
    let apiUrl = `${COINGECKO_API_BASE}/${endpoint}`
    const urlParams = new URLSearchParams()
    
    if (endpoint === 'global') {
      // Global data endpoint
    } else if (endpoint === 'coins/markets') {
      urlParams.append('vs_currency', vsCurrency)
      urlParams.append('order', order)
      urlParams.append('per_page', perPage)
      urlParams.append('page', '1')
      urlParams.append('sparkline', 'false')
    } else if (endpoint.includes('market_chart')) {
      urlParams.append('vs_currency', vsCurrency)
      urlParams.append('days', days)
    } else if (endpoint === 'simple/price') {
      urlParams.append('ids', 'bitcoin,ethereum,binancecoin,cardano,solana')
      urlParams.append('vs_currencies', vsCurrency)
    }
    
    if (urlParams.toString()) {
      apiUrl += `?${urlParams.toString()}`
    }
    
    console.log('🚀 Fetching from CoinGecko:', apiUrl)
    
    const response = await fetchWithRetry(apiUrl)
    const data = await response.json()
    
    // Cache the response
    cache.set(cacheKey, { data, timestamp: Date.now() })
    
    // Clean up old cache entries
    if (cache.size > 100) {
      const now = Date.now()
      const keysToDelete: string[] = []
      cache.forEach((value, key) => {
        if (now - value.timestamp > CACHE_DURATION) {
          keysToDelete.push(key)
        }
      })
      keysToDelete.forEach(key => cache.delete(key))
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300',
      'X-Cache': 'MISS',
        'X-API-Source': 'CoinGecko'
      }
    })
    
  } catch (error) {
    console.error('❌ API Error:', error)
    
    // Get endpoint from URL for fallback data
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    
    // Return fallback data instead of error
    const fallbackData = {
      success: false,
      error: 'API temporarily unavailable',
      fallback: true,
      data: endpoint === 'global' ? {
        data: {
          total_market_cap: { usd: 2500000000000 },
          total_volume: { usd: 100000000000 },
          active_cryptocurrencies: 10000,
          market_cap_change_percentage_24h_usd: 2.5,
          market_cap_percentage: { btc: 45, eth: 20 }
        }
      } : endpoint === 'coins/markets' ? [
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          current_price: 107916,
          price_change_percentage_24h: 0.13,
          market_cap: 2100000000000,
          total_volume: 45000000000,
          circulating_supply: 19500000,
          high_24h: 108500,
          low_24h: 106800,
          image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
          market_cap_rank: 1
        },
        {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          current_price: 3839.63,
          price_change_percentage_24h: -1.09,
          market_cap: 461000000000,
          total_volume: 20000000000,
          circulating_supply: 120000000,
          high_24h: 3920,
          low_24h: 3810,
          image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
          market_cap_rank: 2
        },
        {
          id: 'binancecoin',
          symbol: 'bnb',
          name: 'BNB',
          current_price: 612.45,
          price_change_percentage_24h: 1.36,
          market_cap: 89000000000,
          total_volume: 1800000000,
          circulating_supply: 145000000,
          high_24h: 625,
          low_24h: 598,
          image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
          market_cap_rank: 3
        },
        {
          id: 'solana',
          symbol: 'sol',
          name: 'Solana',
          current_price: 198.32,
          price_change_percentage_24h: -1.07,
          market_cap: 78000000000,
          total_volume: 4200000000,
          circulating_supply: 393000000,
          high_24h: 205,
          low_24h: 195,
          image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
          market_cap_rank: 4
        },
        {
          id: 'ripple',
          symbol: 'xrp',
          name: 'XRP',
          current_price: 2.39,
          price_change_percentage_24h: -2.07,
          market_cap: 67000000000,
          total_volume: 2100000000,
          circulating_supply: 28000000000,
          high_24h: 2.48,
          low_24h: 2.35,
          image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
          market_cap_rank: 5
        },
        {
          id: 'cardano',
          symbol: 'ada',
          name: 'Cardano',
          current_price: 0.48,
          price_change_percentage_24h: 4.35,
          market_cap: 17000000000,
          total_volume: 890000000,
          circulating_supply: 35000000000,
          high_24h: 0.51,
          low_24h: 0.45,
          image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
          market_cap_rank: 6
        },
        {
          id: 'dogecoin',
          symbol: 'doge',
          name: 'Dogecoin',
          current_price: 0.15,
          price_change_percentage_24h: 6.67,
          market_cap: 22000000000,
          total_volume: 1200000000,
          circulating_supply: 146000000000,
          high_24h: 0.16,
          low_24h: 0.14,
          image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
          market_cap_rank: 7
        },
        {
          id: 'avalanche',
          symbol: 'avax',
          name: 'Avalanche',
          current_price: 28.45,
          price_change_percentage_24h: -2.90,
          market_cap: 11000000000,
          total_volume: 450000000,
          circulating_supply: 387000000,
          high_24h: 29.8,
          low_24h: 27.5,
          image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
          market_cap_rank: 8
        },
        {
          id: 'chainlink',
          symbol: 'link',
          name: 'Chainlink',
          current_price: 14.23,
          price_change_percentage_24h: 3.26,
          market_cap: 8900000000,
          total_volume: 320000000,
          circulating_supply: 625000000,
          high_24h: 14.8,
          low_24h: 13.9,
          image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
          market_cap_rank: 9
        },
        {
          id: 'polygon',
          symbol: 'matic',
          name: 'Polygon',
          current_price: 0.89,
          price_change_percentage_24h: -2.20,
          market_cap: 8200000000,
          total_volume: 280000000,
          circulating_supply: 9200000000,
          high_24h: 0.93,
          low_24h: 0.86,
          image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
          market_cap_rank: 10
        }
      ] : {}
    }
    
    return NextResponse.json(fallbackData, {
      status: 200, // Return 200 instead of 500 to prevent error modals
      headers: {
        'Cache-Control': 'public, max-age=60',
        'X-Fallback': 'true'
      }
    })
  }
}