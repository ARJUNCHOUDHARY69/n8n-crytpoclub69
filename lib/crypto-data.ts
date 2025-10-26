// Simple crypto data fetching with caching
export interface CryptoData {
  marketData: any
  priceData: any
  trendingData: any
  volumeData: any
}

// Simple cache
const dataCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60000 // 1 minute

export async function fetchCryptoData(): Promise<CryptoData> {
  const cacheKey = 'crypto-data'
  const now = Date.now()
  
  // Check cache first
  const cached = dataCache.get(cacheKey)
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    console.log('Using cached crypto data')
    return cached.data
  }

  console.log('Fetching fresh crypto data...')
  
  try {
    // Fetch all data in parallel
    const [marketResponse, priceResponse, trendingResponse, volumeResponse] = await Promise.all([
      fetch('/api/crypto?endpoint=global'),
      fetch('/api/crypto?endpoint=coins/bitcoin/market_chart&days=7'),
      fetch('/api/crypto?endpoint=coins/markets'),
      fetch('/api/crypto?endpoint=coins/bitcoin/market_chart&days=7')
    ])

    const [marketData, priceData, trendingData, volumeData] = await Promise.all([
      marketResponse.json(),
      priceResponse.json(),
      trendingResponse.json(),
      volumeResponse.json()
    ])

    const data = {
      marketData: marketData.data || marketData,
      priceData,
      trendingData,
      volumeData
    }

    // Cache the result
    dataCache.set(cacheKey, { data, timestamp: now })
    
    return data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    throw error
  }
}
