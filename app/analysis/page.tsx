'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Target, Zap, AlertCircle, CheckCircle } from 'lucide-react'

interface MarketAnalysis {
  coin: string
  symbol: string
  price: number
  change24h: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  support: number
  resistance: number
  volume: number
  recommendation: string
}

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<MarketAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [marketSentiment, setMarketSentiment] = useState('BULLISH')
  const [fearGreedIndex, setFearGreedIndex] = useState(65)
  const [globalData, setGlobalData] = useState<any>(null)
  const [trendingData, setTrendingData] = useState<any[]>([])
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 0,
    totalVolume: 0,
    activeCryptocurrencies: 0,
    marketCapChange: 0,
    bitcoinDominance: 0,
    ethereumDominance: 0
  })

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true)
        
        // Fetch multiple data sources in parallel
        const [marketsResponse, globalResponse, trendingResponse] = await Promise.all([
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=50'),
          fetch('/api/crypto?endpoint=global'),
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&order=market_cap_desc&per_page=10')
        ])
        
        if (marketsResponse.ok && globalResponse.ok && trendingResponse.ok) {
          const [marketsData, globalData, trendingData] = await Promise.all([
            marketsResponse.json(),
            globalResponse.json(),
            trendingResponse.json()
          ])
          
          setGlobalData(globalData)
          setTrendingData(trendingData)
          
          // Calculate market stats
          const totalMarketCap = globalData?.data?.total_market_cap?.usd || 0
          const totalVolume = globalData?.data?.total_volume?.usd || 0
          const activeCryptocurrencies = globalData?.data?.active_cryptocurrencies || 0
          const marketCapChange = globalData?.data?.market_cap_change_percentage_24h_usd || 0
          const bitcoinDominance = globalData?.data?.market_cap_percentage?.btc || 0
          const ethereumDominance = globalData?.data?.market_cap_percentage?.eth || 0
          
          setMarketStats({
            totalMarketCap,
            totalVolume,
            activeCryptocurrencies,
            marketCapChange,
            bitcoinDominance,
            ethereumDominance
          })
          
          // Process market data for analysis - ensure marketsData is an array
          const safeMarketsData = Array.isArray(marketsData) ? marketsData : []
          const processedAnalyses = safeMarketsData.map((coin: any) => ({
            coin: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h || 0,
            sentiment: (coin.price_change_percentage_24h > 5 ? 'bullish' : 
                      coin.price_change_percentage_24h < -5 ? 'bearish' : 'neutral') as 'bullish' | 'bearish' | 'neutral',
            support: coin.current_price * 0.9,
            resistance: coin.current_price * 1.1,
            volume: coin.total_volume,
            recommendation: coin.price_change_percentage_24h > 10 ? 'BUY' : 
                           coin.price_change_percentage_24h < -10 ? 'SELL' : 'HOLD'
          }))
          
          setAnalyses(processedAnalyses)
        } else {
          // Fallback data
          const fallbackData: MarketAnalysis[] = [
            { coin: 'Bitcoin', symbol: 'BTC', price: 45000, change24h: 2.5, sentiment: 'bullish', support: 42000, resistance: 48000, volume: 25000000000, recommendation: 'BUY' },
            { coin: 'Ethereum', symbol: 'ETH', price: 3200, change24h: 1.8, sentiment: 'bullish', support: 3000, resistance: 3500, volume: 15000000000, recommendation: 'BUY' },
            { coin: 'Binance Coin', symbol: 'BNB', price: 320, change24h: -0.5, sentiment: 'neutral', support: 300, resistance: 350, volume: 2000000000, recommendation: 'HOLD' },
            { coin: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 3.2, sentiment: 'bullish', support: 0.42, resistance: 0.48, volume: 800000000, recommendation: 'BUY' },
            { coin: 'Solana', symbol: 'SOL', price: 95, change24h: -1.2, sentiment: 'neutral', support: 90, resistance: 100, volume: 1200000000, recommendation: 'HOLD' },
            { coin: 'Polkadot', symbol: 'DOT', price: 6.8, change24h: 4.1, sentiment: 'bullish', support: 6.2, resistance: 7.5, volume: 600000000, recommendation: 'BUY' },
            { coin: 'Chainlink', symbol: 'LINK', price: 14.5, change24h: -2.3, sentiment: 'bearish', support: 13.5, resistance: 15.8, volume: 400000000, recommendation: 'SELL' },
            { coin: 'Litecoin', symbol: 'LTC', price: 68, change24h: 1.5, sentiment: 'neutral', support: 65, resistance: 72, volume: 500000000, recommendation: 'HOLD' },
            { coin: 'Tron', symbol: 'TRX', price: 0.22, change24h: 1.85, sentiment: 'neutral', support: 0.21, resistance: 0.23, volume: 890000000, recommendation: 'HOLD' },
            { coin: 'Shiba Inu', symbol: 'SHIB', price: 0.00002345, change24h: 8.92, sentiment: 'bullish', support: 0.00002156, resistance: 0.00002498, volume: 1500000000, recommendation: 'BUY' }
          ]
          setAnalyses(fallbackData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching analysis data:', error)
        setLoading(false)
      }
    }

    fetchAnalysisData()
    const interval = setInterval(fetchAnalysisData, 60000)
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

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${volume.toFixed(2)}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(2)}`
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-400 bg-green-500/20 border-green-500'
      case 'bearish': return 'text-red-400 bg-red-500/20 border-red-500'
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500'
    }
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'bg-green-500 text-white'
      case 'SELL': return 'bg-red-500 text-white'
      default: return 'bg-yellow-500 text-black'
    }
  }

  return (
    <>
      {/* Hero Section - Asymmetric Design */}
      <div className="bg-black py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 text-center mb-6 sm:mb-8">
            <div className="bg-black border-2 border-retro-green/30 rounded-none p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-retro-green mb-4 font-mono tracking-wider transform -skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  MARKET ANALYSIS
                </h1>
                <p className="text-lg sm:text-xl text-retro-gray font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  TECHNICAL ANALYSIS & TRADING RECOMMENDATIONS
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-retro-green/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
            </div>
          </div>

          {/* Analysis Overview Stats - Asymmetric Design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-6">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">SENTIMENT</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-green font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{marketSentiment}</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">FEAR/GREED</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-cyan font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">{fearGreedIndex}/100</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">SIGNALS</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-amber font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">ACTIVE</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-3 sm:p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
                <div className="relative text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-retro-magenta rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                  <p className="text-retro-gray text-xs font-mono mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">VOLUME</p>
                  <p className="text-xs sm:text-sm font-bold text-retro-magenta font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">HIGH</p>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-retro-green mx-auto mb-4"></div>
              <p className="text-retro-gray font-mono">LOADING ANALYSIS...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {analyses.map((analysis, index) => (
                <div key={index} className="bg-black border-2 border-retro-green/30 rounded-none p-4 sm:p-6 hover:border-retro-green/50 transition-colors">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base font-mono">{analysis.coin}</h3>
                      <p className="text-retro-gray text-xs font-mono">{analysis.symbol}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-none text-xs font-mono border ${getSentimentColor(analysis.sentiment)}`}>
                      {analysis.sentiment.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">PRICE</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatPrice(analysis.price)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">24H CHANGE</span>
                      <span className={`font-semibold text-sm sm:text-base ${analysis.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {analysis.change24h >= 0 ? '+' : ''}{analysis.change24h.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">VOLUME</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatVolume(analysis.volume)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">SUPPORT</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatPrice(analysis.support)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">RESISTANCE</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatPrice(analysis.resistance)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-retro-green/20">
                    <div className="flex justify-between items-center">
                      <span className="text-retro-gray text-xs font-mono">RECOMMENDATION</span>
                      <span className={`px-2 py-1 rounded-none text-xs font-mono font-bold ${getRecommendationColor(analysis.recommendation)}`}>
                        {analysis.recommendation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advanced Market Statistics */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Market Overview Stats */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-mono text-center transform -skew-x-1">ADVANCED MARKET STATISTICS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {/* Market Cap Distribution */}
              <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-blue/30 rounded-none p-4 sm:p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-cyan/5"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-retro-blue rounded-none flex items-center justify-center transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <DollarSign className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-right">
                        <p className="text-retro-gray text-xs font-mono">TOTAL MARKET CAP</p>
                        <p className="text-white font-bold text-lg font-mono">{formatNumber(marketStats.totalMarketCap)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-retro-blue font-mono">
                      {marketStats.marketCapChange >= 0 ? '+' : ''}{marketStats.marketCapChange.toFixed(2)}% 24H
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Volume */}
              <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-green/30 rounded-none p-4 sm:p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-amber/5"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-retro-green rounded-none flex items-center justify-center transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <Activity className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-right">
                        <p className="text-retro-gray text-xs font-mono">24H VOLUME</p>
                        <p className="text-white font-bold text-lg font-mono">{formatNumber(marketStats.totalVolume)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-retro-green font-mono">
                      {marketStats.activeCryptocurrencies.toLocaleString()} ACTIVE COINS
                    </div>
                  </div>
                </div>
              </div>

              {/* Bitcoin Dominance */}
              <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-amber/30 rounded-none p-4 sm:p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-retro-amber rounded-none flex items-center justify-center transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <Target className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-right">
                        <p className="text-retro-gray text-xs font-mono">BTC DOMINANCE</p>
                        <p className="text-white font-bold text-lg font-mono">{marketStats.bitcoinDominance.toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="text-xs text-retro-amber font-mono">
                      ETH: {marketStats.ethereumDominance.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Fear & Greed Index */}
              <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-4 sm:p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-retro-magenta rounded-none flex items-center justify-center transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <AlertCircle className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-right">
                        <p className="text-retro-gray text-xs font-mono">FEAR & GREED</p>
                        <p className="text-white font-bold text-lg font-mono">{fearGreedIndex}</p>
                      </div>
                    </div>
                    <div className="text-xs text-retro-magenta font-mono">
                      {fearGreedIndex > 70 ? 'EXTREME GREED' : fearGreedIndex > 50 ? 'GREED' : fearGreedIndex > 30 ? 'FEAR' : 'EXTREME FEAR'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Sentiment Analysis */}
          <div className="mb-8">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-blue/5"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-4 font-mono transform -skew-x-1">MARKET SENTIMENT ANALYSIS</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <TrendingUp className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">BULLISH SIGNALS</p>
                      <p className="text-2xl font-bold text-retro-cyan font-mono">
                        {analyses.filter(a => a.sentiment === 'bullish').length}
                      </p>
            </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-retro-red rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <TrendingDown className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">BEARISH SIGNALS</p>
                      <p className="text-2xl font-bold text-retro-red font-mono">
                        {analyses.filter(a => a.sentiment === 'bearish').length}
                      </p>
            </div>

              <div className="text-center">
                      <div className="w-16 h-16 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <BarChart3 className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">NEUTRAL SIGNALS</p>
                      <p className="text-2xl font-bold text-retro-amber font-mono">
                        {analyses.filter(a => a.sentiment === 'neutral').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers & Losers */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Gainers */}
              <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono transform skew-x-1">TOP GAINERS (24H)</h3>
                    <div className="space-y-3">
                      {analyses
                        .filter(a => a.change24h > 0)
                        .sort((a, b) => b.change24h - a.change24h)
                        .slice(0, 5)
                        .map((analysis, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-black/30 border border-retro-green/20 rounded-none">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-retro-green rounded-none flex items-center justify-center">
                                <span className="text-black font-bold text-xs">{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm">{analysis.coin}</p>
                                <p className="text-retro-gray text-xs font-mono">{analysis.symbol}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-retro-green font-bold text-sm">+{analysis.change24h.toFixed(2)}%</p>
                              <p className="text-retro-gray text-xs font-mono">{formatPrice(analysis.price)}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Losers */}
              <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-red/30 rounded-none p-6 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-red/5 to-retro-magenta/5"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono transform -skew-x-1">TOP LOSERS (24H)</h3>
                    <div className="space-y-3">
                      {analyses
                        .filter(a => a.change24h < 0)
                        .sort((a, b) => a.change24h - b.change24h)
                        .slice(0, 5)
                        .map((analysis, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-black/30 border border-retro-red/20 rounded-none">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-retro-red rounded-none flex items-center justify-center">
                                <span className="text-black font-bold text-xs">{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm">{analysis.coin}</p>
                                <p className="text-retro-gray text-xs font-mono">{analysis.symbol}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-retro-red font-bold text-sm">{analysis.change24h.toFixed(2)}%</p>
                              <p className="text-retro-gray text-xs font-mono">{formatPrice(analysis.price)}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Analysis Indicators */}
          <div className="mb-8">
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-blue/5"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-6 font-mono transform skew-x-1">TECHNICAL ANALYSIS INDICATORS</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* RSI Indicator */}
                    <div className="text-center p-4 bg-black/30 border border-retro-cyan/20 rounded-none">
                      <div className="w-12 h-12 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <BarChart3 className="w-6 h-6 text-black" />
                      </div>
                      <p className="text-retro-gray text-xs font-mono mb-1">RSI (14)</p>
                      <p className="text-white font-bold text-lg font-mono">65.4</p>
                      <p className="text-retro-cyan text-xs font-mono">NEUTRAL</p>
                    </div>

                    {/* MACD Indicator */}
                    <div className="text-center p-4 bg-black/30 border border-retro-green/20 rounded-none">
                      <div className="w-12 h-12 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <TrendingUp className="w-6 h-6 text-black" />
                      </div>
                      <p className="text-retro-gray text-xs font-mono mb-1">MACD</p>
                      <p className="text-white font-bold text-lg font-mono">+125.7</p>
                      <p className="text-retro-green text-xs font-mono">BULLISH</p>
                    </div>

                    {/* Bollinger Bands */}
                    <div className="text-center p-4 bg-black/30 border border-retro-amber/20 rounded-none">
                      <div className="w-12 h-12 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <Target className="w-6 h-6 text-black" />
                      </div>
                      <p className="text-retro-gray text-xs font-mono mb-1">BOLLINGER</p>
                      <p className="text-white font-bold text-lg font-mono">0.85</p>
                      <p className="text-retro-amber text-xs font-mono">SQUEEZE</p>
                    </div>

                    {/* Volume Profile */}
                    <div className="text-center p-4 bg-black/30 border border-retro-magenta/20 rounded-none">
                      <div className="w-12 h-12 bg-retro-magenta rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <Activity className="w-6 h-6 text-black" />
                      </div>
                      <p className="text-retro-gray text-xs font-mono mb-1">VOLUME</p>
                      <p className="text-white font-bold text-lg font-mono">HIGH</p>
                      <p className="text-retro-magenta text-xs font-mono">CONFIRMED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Volatility & Risk Metrics */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Volatility Index */}
              <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-red/30 rounded-none p-6 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-red/5 to-retro-magenta/5"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono transform -skew-x-1">VOLATILITY INDEX</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-red/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">BTC VOLATILITY</span>
                        <span className="text-white font-bold">2.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-red/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">ETH VOLATILITY</span>
                        <span className="text-white font-bold">3.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-red/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">ALT COIN VOLATILITY</span>
                        <span className="text-white font-bold">4.1%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-red/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">MARKET STRESS</span>
                        <span className="text-retro-red font-bold">LOW</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="bg-black border-2 border-retro-blue/30 rounded-none p-6 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-cyan/5"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono transform skew-x-1">RISK ASSESSMENT</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-blue/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">PORTFOLIO RISK</span>
                        <span className="text-retro-blue font-bold">MEDIUM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-blue/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">LIQUIDITY RISK</span>
                        <span className="text-retro-green font-bold">LOW</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-blue/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">CORRELATION RISK</span>
                        <span className="text-retro-amber font-bold">HIGH</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/30 border border-retro-blue/20 rounded-none">
                        <span className="text-retro-gray text-sm font-mono">OVERALL RISK</span>
                        <span className="text-retro-cyan font-bold">MODERATE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Trends & Patterns */}
          <div className="mb-8">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-green/5"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-6 font-mono transform -skew-x-1">MARKET TRENDS & PATTERNS</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-black/30 border border-retro-amber/20 rounded-none">
                      <div className="w-16 h-16 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <TrendingUp className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">UPTREND</p>
                      <p className="text-2xl font-bold text-retro-amber font-mono">68%</p>
                      <p className="text-retro-amber text-xs font-mono">COINS IN UPTREND</p>
            </div>

                    <div className="text-center p-4 bg-black/30 border border-retro-green/20 rounded-none">
                      <div className="w-16 h-16 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <BarChart3 className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">CONSOLIDATION</p>
                      <p className="text-2xl font-bold text-retro-green font-mono">24%</p>
                      <p className="text-retro-green text-xs font-mono">COINS SIDEWAYS</p>
            </div>

                    <div className="text-center p-4 bg-black/30 border border-retro-red/20 rounded-none">
                      <div className="w-16 h-16 bg-retro-red rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                        <TrendingDown className="w-8 h-8 text-black" />
                      </div>
                      <p className="text-retro-gray text-sm font-mono mb-2">DOWNTREND</p>
                      <p className="text-2xl font-bold text-retro-red font-mono">8%</p>
                      <p className="text-retro-red text-xs font-mono">COINS IN DOWNTREND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section - Asymmetric Design */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Top Coins Performance */}
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-retro-green rounded-none flex items-center justify-center mr-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <BarChart3 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-retro-green font-bold text-lg font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                        TOP COINS PERFORMANCE
                      </h3>
                      <p className="text-retro-gray text-sm font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                        24H Price Changes
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-retro-green/10 rounded-none border border-retro-green/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-retro-green rounded-none flex items-center justify-center transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                          <span className="text-black font-bold text-sm">1</span>
            </div>
                        <div>
                          <div className="font-semibold text-retro-green text-sm transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">Bitcoin</div>
                          <div className="text-xs text-retro-gray transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">BTC</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-retro-green text-sm transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$45,000</div>
                        <div className="text-xs text-retro-green transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">+2.50%</div>
                      </div>
                    </div>
                  </div>
                        </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
                        </div>
            </div>

            {/* Market Cap Distribution */}
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-blue/30 rounded-none p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-retro-blue rounded-none flex items-center justify-center mr-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <Activity className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-retro-blue font-bold text-lg font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                        MARKET CAP DISTRIBUTION
                      </h3>
                      <p className="text-retro-gray text-sm font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                        Top 5 Cryptocurrencies
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-retro-blue/10 rounded-none flex items-center justify-center transform rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-retro-blue font-bold text-lg transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">TOTAL</div>
                        <div className="text-retro-blue font-bold text-xl transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$2.1T</div>
                      </div>
        </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">Bitcoin</span>
                        <span className="text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">42.5%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">Ethereum</span>
                        <span className="text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">18.4%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">BNB</span>
                        <span className="text-retro-blue font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">4.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-blue animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Summary Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative text-center">
                  <div className="w-10 h-10 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-xl font-bold text-retro-green mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$2.1T</div>
                  <div className="text-xs text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">TOTAL MARKET CAP</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
                <div className="relative text-center">
                  <div className="w-10 h-10 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Activity className="w-5 h-5 text-black" />
          </div>
                  <div className="text-xl font-bold text-retro-cyan mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$120B</div>
                  <div className="text-xs text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">24H VOLUME</div>
        </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                <div className="relative text-center">
                  <div className="w-10 h-10 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Target className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-xl font-bold text-retro-amber mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">13.5K</div>
                  <div className="text-xs text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">ACTIVE COINS</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
              </div>
            </div>

            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
                <div className="relative text-center">
                  <div className="w-10 h-10 bg-retro-magenta rounded-none flex items-center justify-center mx-auto mb-2 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-xl font-bold text-retro-magenta mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">875</div>
                  <div className="text-xs text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">EXCHANGES</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}