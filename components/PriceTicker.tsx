'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CryptoPrice {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export default function PriceTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true)
        console.log('Fetching crypto prices...')
        
        // Use cached API endpoint with proper headers - fetch fewer coins for mobile
        const response = await fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&order=market_cap_desc&per_page=5&page=1', {
          headers: {
            'Cache-Control': 'max-age=60',
            'Accept': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Crypto API Response:', data)
        
        if (data && Array.isArray(data) && data.length > 0) {
          const cryptoPrices: CryptoPrice[] = data.map((coin: any) => ({
            symbol: `${coin.symbol?.toUpperCase() || 'BTC'}USD`,
            price: coin.current_price || 0,
            change: coin.price_change_24h || 0,
            changePercent: coin.price_change_percentage_24h || 0
          }))
          
          setPrices(cryptoPrices)
          console.log('Prices set:', cryptoPrices)
        } else {
          throw new Error('Invalid API response structure')
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
        // Set fallback data with real current prices - fewer cryptocurrencies for mobile
        const fallbackPrices: CryptoPrice[] = [
          { symbol: 'BTCUSD', price: 107916.00, change: 141.50, changePercent: 0.13 },
          { symbol: 'ETHUSD', price: 3839.63, change: -42.30, changePercent: -1.09 },
          { symbol: 'BNBUSD', price: 612.45, change: 8.25, changePercent: 1.36 },
          { symbol: 'SOLUSD', price: 198.32, change: -2.15, changePercent: -1.07 },
          { symbol: 'XRPUSD', price: 2.39, change: -0.05, changePercent: -2.07 }
        ]
        setPrices(fallbackPrices)
        setLoading(false)
      }
    }

    // Set initial fallback data immediately - fewer cryptocurrencies for mobile
    const fallbackPrices: CryptoPrice[] = [
      { symbol: 'BTCUSD', price: 107916.00, change: 141.50, changePercent: 0.13 },
      { symbol: 'ETHUSD', price: 3839.63, change: -42.30, changePercent: -1.09 },
      { symbol: 'BNBUSD', price: 612.45, change: 8.25, changePercent: 1.36 },
      { symbol: 'SOLUSD', price: 198.32, change: -2.15, changePercent: -1.07 },
      { symbol: 'XRPUSD', price: 2.39, change: -0.05, changePercent: -2.07 }
    ]
    setPrices(fallbackPrices)
    setLoading(false)
    
    fetchPrices()
    
    // Update prices every 60 seconds (aligned with cache duration)
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    }
    return price.toFixed(2)
  }

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
  }

  if (loading) {
    return (
      <div className="bg-gray-800 text-white py-2 px-4 overflow-hidden relative animate-tickerGlow">
        <div className="relative flex items-center justify-center space-x-8 animate-scroll">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 bg-gray-700/30 rounded-lg px-4 py-2 animate-pulse">
              <div className="h-4 w-12 bg-gray-600 rounded"></div>
              <div className="h-4 w-16 bg-gray-600 rounded"></div>
              <div className="h-4 w-8 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-crypto-gold to-transparent animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-white py-1.5 sm:py-3 px-1 sm:px-4 overflow-hidden relative animate-tickerGlow h-10 sm:h-16 hidden sm:block">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-50 animate-pulse"></div>
      
      {/* Moving ticker content - Ultra Mobile Optimized */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex items-center h-full animate-continuousScroll" style={{ width: '200%' }}>
          {prices.length > 0 ? (
            <>
              {/* First set of prices - Ultra Mobile Optimized */}
              <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0 h-full" style={{ width: '50%' }}>
                {prices.map((crypto, index) => (
                  <div key={`first-${index}`} className="flex items-center space-x-0.5 sm:space-x-2 group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-crypto-gold/20 rounded px-1 sm:px-3 py-0.5 sm:py-1 bg-gray-700/30 hover:bg-gray-700/50 flex-shrink-0 h-6 sm:h-10 min-w-fit">
                    <span className="text-xs font-bold text-crypto-gold group-hover:text-yellow-300 transition-colors duration-300 font-mono tracking-wider whitespace-nowrap">{crypto.symbol}</span>
                    <span className="text-xs font-bold text-white group-hover:text-crypto-gold transition-colors duration-300 animate-pulse whitespace-nowrap">
                      ${formatPrice(crypto.price)}
                    </span>
                    <span className={`text-xs font-semibold flex items-center space-x-0.5 sm:space-x-1 transition-all duration-500 whitespace-nowrap ${
                      crypto.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {crypto.changePercent >= 0 ? (
                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce flex-shrink-0" />
                      ) : (
                        <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce flex-shrink-0" />
                      )}
                      <span className="animate-pulse font-mono text-xs">{formatChange(crypto.changePercent)}</span>
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop - Ultra Mobile Optimized */}
              <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0 h-full" style={{ width: '50%' }}>
                {prices.map((crypto, index) => (
                  <div key={`second-${index}`} className="flex items-center space-x-0.5 sm:space-x-2 group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-crypto-gold/20 rounded px-1 sm:px-3 py-0.5 sm:py-1 bg-gray-700/30 hover:bg-gray-700/50 flex-shrink-0 h-6 sm:h-10 min-w-fit">
                    <span className="text-xs font-bold text-crypto-gold group-hover:text-yellow-300 transition-colors duration-300 font-mono tracking-wider whitespace-nowrap">{crypto.symbol}</span>
                    <span className="text-xs font-bold text-white group-hover:text-crypto-gold transition-colors duration-300 animate-pulse whitespace-nowrap">
                      ${formatPrice(crypto.price)}
                    </span>
                    <span className={`text-xs font-semibold flex items-center space-x-0.5 sm:space-x-1 transition-all duration-500 whitespace-nowrap ${
                      crypto.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {crypto.changePercent >= 0 ? (
                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce flex-shrink-0" />
                      ) : (
                        <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-bounce flex-shrink-0" />
                      )}
                      <span className="animate-pulse font-mono text-xs">{formatChange(crypto.changePercent)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-crypto-gold mx-auto mr-2"></div>
              <span className="text-xs">Loading crypto prices...</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-crypto-gold to-transparent animate-pulse"></div>
      
      {/* Floating particles effect - Hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-1 left-1/4 w-1 h-1 bg-crypto-gold rounded-full animate-ping"></div>
        <div className="absolute top-1 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-ping delay-2000"></div>
      </div>
    </div>
  )
}
