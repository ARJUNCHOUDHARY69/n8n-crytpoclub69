'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Users, Activity, Zap, Star, ArrowRight, Shield, Globe } from 'lucide-react'

export default function Hero() {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null)
  const [marketCap, setMarketCap] = useState<string>('2.1T')
  const [isAnimating, setIsAnimating] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        // Try our secure API first
        const response = await fetch('/api/crypto?endpoint=simple/price&coin=bitcoin')
        if (response.ok) {
          const data = await response.json()
          if (data.bitcoin?.usd) {
            setBitcoinPrice(data.bitcoin.usd)
            setIsAnimating(true)
            setTimeout(() => setIsAnimating(false), 1000)
            return
          }
        }
        
        // Fallback to direct API call
        const directResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const directData = await directResponse.json()
        if (directData.bitcoin?.usd) {
          setBitcoinPrice(directData.bitcoin.usd)
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 1000)
        }
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
        // Set current real price as fallback
        setBitcoinPrice(107916)
      }
    }

    // Set initial price to prevent hydration mismatch
    setBitcoinPrice(107916)
    
    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-black text-white py-16 relative overflow-hidden">
      {/* Retro Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-retro-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-retro-cyan/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-retro-green/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-retro-green">CRYPTO CLUB 69</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 text-retro-gray max-w-2xl mx-auto">
              Professional crypto analysis and market insights
            </p>
          </div>
          


          {/* Professional Stats */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-retro-gray">
            <Globe className="w-4 h-4" />
            <span>Trusted by crypto professionals worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
