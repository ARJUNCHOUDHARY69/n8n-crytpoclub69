'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, Search, Star, BarChart3, DollarSign, Activity } from 'lucide-react'

interface CryptoMarket {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  high_24h: number
  low_24h: number
  image: string
  market_cap_rank: number
}

export default function MarketsPage() {
  const [cryptoData, setCryptoData] = useState<CryptoMarket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [globalData, setGlobalData] = useState<any>(null)
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 0,
    totalVolume: 0,
    activeCryptocurrencies: 0,
    marketCapChange: 0,
    bitcoinDominance: 0,
    ethereumDominance: 0,
    gainers: 0,
    losers: 0
  })

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        
        // Fetch multiple data sources in parallel
        const [marketsResponse, globalResponse] = await Promise.all([
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=50'),
          fetch('/api/crypto?endpoint=global')
        ])
        
        if (marketsResponse.ok && globalResponse.ok) {
          const [marketsData, globalData] = await Promise.all([
            marketsResponse.json(),
            globalResponse.json()
          ])
          
          // Ensure marketsData is an array - handle both direct array and wrapped data
          let safeMarketsData = []
          if (Array.isArray(marketsData)) {
            safeMarketsData = marketsData
          } else if (marketsData && Array.isArray(marketsData.data)) {
            safeMarketsData = marketsData.data
          } else if (marketsData && Array.isArray(marketsData.data?.data)) {
            safeMarketsData = marketsData.data.data
          }
          
          setCryptoData(safeMarketsData)
          setGlobalData(globalData.data)
          setLoading(false)
          
          // Calculate market stats
          if (globalData.data) {
            const gainers = safeMarketsData.filter((coin: any) => coin.price_change_percentage_24h > 0).length
            const losers = safeMarketsData.filter((coin: any) => coin.price_change_percentage_24h < 0).length
            
            setMarketStats({
              totalMarketCap: globalData.data.total_market_cap?.usd || 0,
              totalVolume: globalData.data.total_volume?.usd || 0,
              activeCryptocurrencies: globalData.data.active_cryptocurrencies || 0,
              marketCapChange: globalData.data.market_cap_change_percentage_24h_usd || 0,
              bitcoinDominance: globalData.data.market_cap_percentage?.btc || 0,
              ethereumDominance: globalData.data.market_cap_percentage?.eth || 0,
              gainers,
              losers
            })
          }
        } else {
          // Fallback data - 10 coins
          const fallbackData: CryptoMarket[] = [
            { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 107916, price_change_percentage_24h: 0.13, market_cap: 2100000000000, total_volume: 45000000000, circulating_supply: 19500000, high_24h: 108500, low_24h: 106800, image: '', market_cap_rank: 1 },
            { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3839.63, price_change_percentage_24h: -1.09, market_cap: 461000000000, total_volume: 20000000000, circulating_supply: 120000000, high_24h: 3920, low_24h: 3810, image: '', market_cap_rank: 2 },
            { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price: 612.45, price_change_percentage_24h: 1.36, market_cap: 89000000000, total_volume: 1800000000, circulating_supply: 145000000, high_24h: 625, low_24h: 598, image: '', market_cap_rank: 3 },
            { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 198.32, price_change_percentage_24h: -1.07, market_cap: 78000000000, total_volume: 4200000000, circulating_supply: 393000000, high_24h: 205, low_24h: 195, image: '', market_cap_rank: 4 },
            { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 2.39, price_change_percentage_24h: -2.07, market_cap: 67000000000, total_volume: 2100000000, circulating_supply: 28000000000, high_24h: 2.48, low_24h: 2.35, image: '', market_cap_rank: 5 },
            { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.48, price_change_percentage_24h: 4.35, market_cap: 17000000000, total_volume: 890000000, circulating_supply: 35000000000, high_24h: 0.51, low_24h: 0.45, image: '', market_cap_rank: 6 },
            { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.15, price_change_percentage_24h: 6.67, market_cap: 22000000000, total_volume: 1200000000, circulating_supply: 146000000000, high_24h: 0.16, low_24h: 0.14, image: '', market_cap_rank: 7 },
            { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', current_price: 28.45, price_change_percentage_24h: -2.90, market_cap: 11000000000, total_volume: 450000000, circulating_supply: 387000000, high_24h: 29.8, low_24h: 27.5, image: '', market_cap_rank: 8 },
            { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', current_price: 14.23, price_change_percentage_24h: 3.26, market_cap: 8900000000, total_volume: 320000000, circulating_supply: 625000000, high_24h: 14.8, low_24h: 13.9, image: '', market_cap_rank: 9 },
            { id: 'polygon', symbol: 'MATIC', name: 'Polygon', current_price: 0.89, price_change_percentage_24h: -2.20, market_cap: 8200000000, total_volume: 280000000, circulating_supply: 9200000000, high_24h: 0.93, low_24h: 0.86, image: '', market_cap_rank: 10 }
          ]
          setCryptoData(fallbackData)
        }
        setLoading(false)
      } catch (error) {
        console.error('❌ Error fetching market data:', error)
        setLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(2)}`
  }

  const filteredData = (Array.isArray(cryptoData) ? cryptoData : []).filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Hero Section - Asymmetric Design - Mobile Optimized */}
      <div className="bg-black py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 text-center mb-4 sm:mb-6 md:mb-8">
            <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-retro-cyan mb-3 sm:mb-4 font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  CRYPTO MARKETS
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-retro-gray font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500 px-2">
                  LIVE CRYPTOCURRENCY MARKET DATA POWERED BY COINGECKO
                </p>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-retro-cyan/10 transform rotate-45 translate-x-8 -translate-y-8 sm:translate-x-12 sm:-translate-y-12 md:translate-x-16 md:-translate-y-16"></div>
            </div>
          </div>

          {/* Enhanced Market Stats - Asymmetric Design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">MARKET CAP</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-green font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    {marketStats.totalMarketCap >= 1e12 ? `$${(marketStats.totalMarketCap / 1e12).toFixed(2)}T` : `$${(marketStats.totalMarketCap / 1e9).toFixed(2)}B`}
                  </p>
                  <p className={`text-xs font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300 ${marketStats.marketCapChange >= 0 ? 'text-retro-green' : 'text-retro-red'}`}>
                    {marketStats.marketCapChange >= 0 ? '+' : ''}{marketStats.marketCapChange.toFixed(2)}%
                  </p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">24H VOLUME</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-cyan font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    {marketStats.totalVolume >= 1e9 ? `$${(marketStats.totalVolume / 1e9).toFixed(2)}B` : `$${(marketStats.totalVolume / 1e6).toFixed(2)}M`}
                  </p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-blue/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-blue rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">BTC DOM</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{marketStats.bitcoinDominance.toFixed(1)}%</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-blue animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-magenta rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">GAINERS</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-green font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">+{marketStats.gainers}</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
              </div>
            </div>


            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">COINS</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-amber font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{marketStats.activeCryptocurrencies.toLocaleString()}</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-red/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-red/5 to-retro-magenta/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-red rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">ETH DOM</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-red font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{marketStats.ethereumDominance.toFixed(1)}%</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-red animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-blue/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-blue rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">EXCHANGES</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">875</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-blue animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Market Overview Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Market Performance Summary - Asymmetric Design */}
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 mb-8">
            <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold text-retro-green mb-6 text-center font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  MARKET PERFORMANCE SUMMARY
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                      <div className="relative text-center">
                        <div className="w-16 h-16 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-4 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                          <TrendingUp className="w-8 h-8 text-black" />
                        </div>
                        <div className="text-2xl font-bold text-retro-green mb-2 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          {marketStats.gainers} GAINERS
                        </div>
                        <div className="text-sm text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          Coins in positive territory
                        </div>
                        <div className="text-xs text-retro-green font-mono mt-2 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          {((marketStats.gainers / (marketStats.gainers + marketStats.losers)) * 100).toFixed(1)}% of market
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
                      <div className="relative text-center">
                        <div className="w-16 h-16 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-4 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                          <BarChart3 className="w-8 h-8 text-black" />
                        </div>
                        <div className="text-2xl font-bold text-retro-cyan mb-2 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          {marketStats.activeCryptocurrencies.toLocaleString()}
                        </div>
                        <div className="text-sm text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          Active cryptocurrencies
                        </div>
                        <div className="text-xs text-retro-cyan font-mono mt-2 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                          Global market coverage
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-retro-green/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
            </div>
          </div>

          {/* Top Performers Section - Asymmetric Design */}
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 mb-8">
            <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-retro-magenta mb-6 font-mono tracking-wider text-center transform -skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  TOP PERFORMERS
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  {/* Top Gainers */}
                  <div>
                    <h4 className="text-lg font-bold text-retro-green mb-4 font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">TOP GAINERS (24H)</h4>
                    <div className="space-y-3">
                      {(Array.isArray(cryptoData) ? cryptoData : [])
                        .filter(coin => coin.price_change_percentage_24h > 0)
                        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                        .slice(0, 10)
                        .map((coin, index) => (
                          <div key={coin.id} className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                            <div className="bg-black border-2 border-retro-green/30 rounded-none p-4 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                              <div className="relative flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-retro-green rounded-none flex items-center justify-center transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                                    <span className="text-black font-bold text-sm">{index + 1}</span>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-retro-green text-sm transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{coin.name}</div>
                                    <div className="text-xs text-retro-gray transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{coin.symbol.toUpperCase()}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-retro-green text-sm transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                                    +{coin.price_change_percentage_24h.toFixed(2)}%
                                  </div>
                                  <div className="text-xs text-retro-gray transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">${coin.current_price.toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-retro-magenta/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Table - Asymmetric Design - Mobile Optimized */}
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
          <div className="bg-black border-2 border-retro-blue/30 rounded-none p-3 sm:p-4 md:p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
            <div className="relative">
          {loading ? (
            <div className="text-center py-8 sm:py-12">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-retro-blue mx-auto mb-4"></div>
                  <p className="text-retro-gray font-mono text-sm sm:text-base">LOADING MARKET DATA...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                      <tr className="border-b-2 border-retro-blue">
                        <th className="text-left py-4 px-4 text-retro-blue font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">#</th>
                        <th className="text-left py-4 px-4 text-retro-blue font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">COIN</th>
                        <th className="text-right py-4 px-4 text-retro-blue font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">PRICE</th>
                        <th className="text-right py-4 px-4 text-retro-blue font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">24H %</th>
                        <th className="text-right py-4 px-4 text-retro-blue font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">MARKET CAP</th>
                        <th className="text-right py-4 px-4 text-retro-blue font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">VOLUME (24H)</th>
                        <th className="text-right py-4 px-4 text-retro-blue font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">SUPPLY</th>
                        <th className="text-center py-4 px-4 text-retro-blue font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((crypto, index) => (
                    <tr 
                      key={crypto.id} 
                          className="border-b border-retro-blue/20 hover:bg-retro-blue/5 transition-colors"
                    >
                          <td className="py-4 px-4 text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{crypto.market_cap_rank || index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          {crypto.image && (
                                <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-none transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />
                          )}
                          <div>
                                <p className="text-retro-blue font-semibold font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{crypto.name}</p>
                                <p className="text-retro-gray text-sm font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{crypto.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                          <td className="py-4 px-4 text-right text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{formatPrice(crypto.current_price)}</td>
                      <td className="py-4 px-4 text-right">
                            <span className={`flex items-center justify-end space-x-1 font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300 ${
                              crypto.price_change_percentage_24h >= 0 ? 'text-retro-green' : 'text-retro-red'
                        }`}>
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                        </span>
                      </td>
                          <td className="py-4 px-4 text-right text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{formatNumber(crypto.market_cap)}</td>
                          <td className="py-4 px-4 text-right text-retro-blue font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{formatNumber(crypto.total_volume)}</td>
                          <td className="py-4 px-4 text-right text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                        {crypto.circulating_supply ? (crypto.circulating_supply / 1e6).toFixed(2) + 'M' : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-center">
                            <button className="text-retro-blue hover:text-retro-green transition-colors transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                          <Star className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-retro-blue/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

