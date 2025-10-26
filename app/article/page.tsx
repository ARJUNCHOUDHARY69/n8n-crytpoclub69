'use client'

import Footer from '@/components/Footer'
import { Calendar, Clock, Eye, MessageCircle, Share2, ArrowRight, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ArticlePage() {
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=10')
        if (response.ok) {
          const data = await response.json()
          // Handle both array and object responses
          setCryptoData(Array.isArray(data) ? data : (data.data || []))
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
        setCryptoData([]) // Ensure we always have an array
        setLoading(false)
      }
    }
    fetchCryptoData()
  }, [])

  return (
    <div>
      {/* Hero Section - Asymmetric Design - Mobile Optimized */}
      <div className="relative bg-black py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 text-center max-w-4xl mx-auto">
            <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
              <div className="relative">
                <div className="inline-block bg-retro-magenta/10 border border-retro-magenta/30 rounded-none px-2 sm:px-3 py-1 sm:py-1.5 mb-3 sm:mb-4 md:mb-6 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  <span className="text-retro-magenta text-xs sm:text-sm font-mono tracking-wider">LATEST INSIGHTS</span>
            </div>
            
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-retro-magenta mb-3 sm:mb-4 md:mb-6 font-mono tracking-wider leading-tight transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  FEATURED <span className="text-retro-red">ARTICLES</span>
            </h1>
            
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-retro-gray font-mono mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500 px-2">
              Expert insights on the future of cryptocurrency and blockchain technology
            </p>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-retro-magenta/10 transform rotate-45 translate-x-8 -translate-y-8 sm:translate-x-12 sm:-translate-y-12 md:translate-x-16 md:-translate-y-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Charts Section - Mobile Optimized */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Charts Header - Asymmetric Design - Mobile Optimized */}
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 text-center mb-6 sm:mb-8">
            <div className="bg-black border-2 border-retro-green/30 rounded-none p-4 sm:p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
              <div className="relative">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-retro-green mb-3 sm:mb-4 font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  LIVE <span className="text-retro-cyan">MARKET ANALYTICS</span>
                </h2>
                <p className="text-sm sm:text-base text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500 px-2">Real-time cryptocurrency market data and insights</p>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-retro-green animate-pulse"></div>
            </div>
          </div>

          {/* Charts Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Coin Performance Chart - Asymmetric Design */}
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-retro-green rounded-none flex items-center justify-center transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <BarChart3 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-retro-green font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">TOP COINS PERFORMANCE</h3>
                      <p className="text-sm text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">24H Price Changes</p>
                    </div>
                  </div>
              
                  <div className="space-y-4">
                    {loading ? (
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="animate-pulse flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                            </div>
                            <div className="w-16 h-4 bg-gray-700 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      (Array.isArray(cryptoData) ? cryptoData : []).slice(0, 5).map((coin, index) => (
                        <div key={coin.id} className="relative group/item transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                          <div className="flex items-center justify-between p-3 bg-retro-green/10 rounded-none border border-retro-green/20 hover:bg-retro-green/20 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-retro-green rounded-none flex items-center justify-center transform rotate-1 group-hover/item:rotate-0 transition-transform duration-300">
                                <span className="text-black font-bold text-xs">{index + 1}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-retro-green transform skew-x-1 group-hover/item:skew-x-0 transition-transform duration-300">{coin.name}</div>
                                <div className="text-xs text-retro-gray transform -skew-x-1 group-hover/item:skew-x-0 transition-transform duration-300">{coin.symbol.toUpperCase()}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-retro-green transform -skew-x-1 group-hover/item:skew-x-0 transition-transform duration-300">${coin.current_price?.toLocaleString() || '0'}</div>
                              <div className={`text-sm flex items-center space-x-1 ${
                                coin.price_change_percentage_24h >= 0 ? 'text-retro-green' : 'text-retro-red'
                              } transform skew-x-1 group-hover/item:skew-x-0 transition-transform duration-300`}>
                                {coin.price_change_percentage_24h >= 0 ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                <span>{coin.price_change_percentage_24h?.toFixed(2) || '0'}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-retro-green animate-pulse"></div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
              </div>
            </div>

            {/* Market Cap Pie Chart - Asymmetric Design */}
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-blue/30 rounded-none p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-retro-blue rounded-none flex items-center justify-center transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      <PieChart className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-retro-blue font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">MARKET CAP DISTRIBUTION</h3>
                      <p className="text-sm text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">Top 5 Cryptocurrencies</p>
                    </div>
                  </div>
              
                  <div className="relative">
                    {/* SVG Pie Chart - Petal Design */}
                    <svg className="w-full h-64" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="btcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f7931a" />
                          <stop offset="100%" stopColor="#ffb84d" />
                        </linearGradient>
                        <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#87ceeb" />
                          <stop offset="100%" stopColor="#b0e0e6" />
                        </linearGradient>
                        <linearGradient id="bnbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffd700" />
                          <stop offset="100%" stopColor="#ffff00" />
                        </linearGradient>
                        <linearGradient id="solGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9945ff" />
                          <stop offset="100%" stopColor="#b366ff" />
                        </linearGradient>
                        <linearGradient id="othersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6b7280" />
                          <stop offset="100%" stopColor="#9ca3af" />
                        </linearGradient>
                      </defs>
                      
                      {/* Petal-like segments */}
                      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#btcGradient)" transform="rotate(0 100 100)" />
                      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#ethGradient)" transform="rotate(72 100 100)" />
                      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#bnbGradient)" transform="rotate(144 100 100)" />
                      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#solGradient)" transform="rotate(216 100 100)" />
                      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#othersGradient)" transform="rotate(288 100 100)" />
                      
                      {/* Center circle */}
                      <circle cx="100" cy="100" r="25" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                      <text x="100" y="95" textAnchor="middle" className="text-xs font-bold fill-white">TOTAL</text>
                      <text x="100" y="110" textAnchor="middle" className="text-sm font-bold fill-white">$2.1T</text>
                    </svg>
                    
                    {/* Legend */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-300">Bitcoin</span>
                        </div>
                        <span className="text-white font-semibold">42.5%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-300">Ethereum</span>
                        </div>
                        <span className="text-white font-semibold">18.4%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-300">BNB</span>
                        </div>
                        <span className="text-white font-semibold">4.2%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300">Solana</span>
                        </div>
                        <span className="text-white font-semibold">3.8%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-gray-300">Others</span>
                        </div>
                        <span className="text-white font-semibold">31.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-blue animate-pulse"></div>
              </div>
            </div>
                  </div>
                
          {/* Market Stats Cards - Asymmetric Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-retro-green mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$2.1T</div>
                  <div className="text-xs text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">TOTAL MARKET CAP</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
              </div>
            </div>
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-retro-cyan rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-retro-cyan mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">$120B</div>
                  <div className="text-xs text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">24H VOLUME</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
              </div>
                    </div>
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-retro-amber mb-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">13.5K</div>
                  <div className="text-xs text-retro-gray font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">ACTIVE COINS</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
              </div>
            </div>
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110">
              <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-retro-magenta rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <PieChart className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-retro-magenta mb-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">875</div>
                  <div className="text-xs text-retro-gray font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">EXCHANGES</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
              </div>
            </div>
          </div>
                  </div>
                </div>
                
      {/* Featured Articles Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono transform -skew-x-1">FEATURED ARTICLES</h2>
            <p className="text-retro-gray font-mono text-lg">Expert insights and market analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Article 1 */}
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-8 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block bg-retro-green/20 border border-retro-green/40 rounded-none px-3 py-1 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                      <span className="text-retro-green text-xs font-mono tracking-wider">MARKET ANALYSIS</span>
                    </div>
                    <div className="flex items-center space-x-2 text-retro-gray text-sm font-mono">
                      <Calendar className="w-4 h-4" />
                      <span>Dec 15, 2024</span>
                      </div>
                      </div>

                  <h3 className="text-2xl font-bold text-white mb-4 font-mono transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    The Future of Bitcoin: Institutional Adoption and Market Maturation
                  </h3>

                  {/* Article Image */}
                  <div className="mb-6 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    <div className="relative w-full h-48 bg-gradient-to-br from-retro-green/20 to-retro-cyan/20 border border-retro-green/30 rounded-none overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-retro-green/10 to-retro-cyan/10"></div>
                      <div className="relative flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-retro-green rounded-none flex items-center justify-center mx-auto mb-3 transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                            <TrendingUp className="w-8 h-8 text-black" />
                          </div>
                          <p className="text-retro-green font-mono text-sm font-bold">BITCOIN INSTITUTIONAL ADOPTION</p>
                          <p className="text-retro-gray font-mono text-xs mt-1">Market Maturation & ETF Integration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-retro-gray font-mono mb-6 leading-relaxed transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    Bitcoin's journey from a niche digital currency to a mainstream financial asset has been nothing short of remarkable. 
                    As we enter 2024, institutional adoption is accelerating at an unprecedented pace, with major corporations, pension funds, 
                    and sovereign wealth funds allocating significant portions of their portfolios to digital assets.
                  </p>

                  <p className="text-retro-gray font-mono mb-6 leading-relaxed transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    The recent approval of Bitcoin ETFs has opened the floodgates for traditional investors, providing a regulated pathway 
                    to cryptocurrency exposure. This institutional validation has not only increased market liquidity but also reduced 
                    volatility, making Bitcoin a more attractive store of value for long-term investors.
                  </p>

                  <p className="text-retro-gray font-mono mb-8 leading-relaxed transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    Looking ahead, the integration of Bitcoin into traditional financial infrastructure, combined with ongoing technological 
                    improvements in scalability and energy efficiency, positions Bitcoin as a cornerstone of the digital economy. The convergence 
                    of institutional adoption and technological advancement suggests we're witnessing the early stages of a fundamental shift 
                    in global finance.
                  </p>

                  <div className="flex items-center justify-center pt-4 border-t border-retro-green/20">
                    <div className="flex items-center space-x-4 text-retro-gray text-sm font-mono">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>2.4K</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>127</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  </div>
                
            {/* Article 2 */}
            <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-8 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block bg-retro-amber/20 border border-retro-amber/40 rounded-none px-3 py-1 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                      <span className="text-retro-amber text-xs font-mono tracking-wider">TECHNOLOGY</span>
                    </div>
                    <div className="flex items-center space-x-2 text-retro-gray text-sm font-mono">
                      <Calendar className="w-4 h-4" />
                      <span>Dec 12, 2024</span>
                    </div>
                  </div>
                
                  <h3 className="text-2xl font-bold text-white mb-4 font-mono transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    Ethereum 2.0: The Merge and Beyond - Scaling the Future of Decentralized Finance
                  </h3>

                  {/* Article Image */}
                  <div className="mb-6 transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    <div className="relative w-full h-48 bg-gradient-to-br from-retro-amber/20 to-retro-magenta/20 border border-retro-amber/30 rounded-none overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/10 to-retro-magenta/10"></div>
                      <div className="relative flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-retro-amber rounded-none flex items-center justify-center mx-auto mb-3 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                            <BarChart3 className="w-8 h-8 text-black" />
                          </div>
                          <p className="text-retro-amber font-mono text-sm font-bold">ETHEREUM 2.0 TRANSFORMATION</p>
                          <p className="text-retro-gray font-mono text-xs mt-1">Proof-of-Stake & DeFi Evolution</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-retro-gray font-mono mb-6 leading-relaxed transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    The successful completion of Ethereum's transition to Proof-of-Stake (PoS) through "The Merge" represents one of the 
                    most significant milestones in blockchain history. This monumental upgrade has reduced Ethereum's energy consumption by 
                    over 99%, making it one of the most environmentally sustainable blockchain networks while maintaining its security and 
                    decentralization.
                  </p>

                  <p className="text-retro-gray font-mono mb-6 leading-relaxed transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    Beyond the environmental benefits, Ethereum 2.0 has introduced staking mechanisms that allow ETH holders to earn rewards 
                    while securing the network. This has created new economic incentives and has led to a significant increase in the total 
                    value locked (TVL) in Ethereum-based DeFi protocols, further solidifying Ethereum's position as the leading smart contract platform.
                  </p>

                  <p className="text-retro-gray font-mono mb-8 leading-relaxed transform skew-x-1 group-hover:skew-x-0 transition-transform duration-300">
                    Looking forward, the upcoming Shanghai upgrade and the implementation of sharding will further enhance Ethereum's scalability, 
                    potentially processing thousands of transactions per second. This evolution positions Ethereum not just as a cryptocurrency, 
                    but as the foundational infrastructure for the next generation of internet applications, from decentralized finance to 
                    non-fungible tokens and beyond.
                  </p>

                  <div className="flex items-center justify-center pt-4 border-t border-retro-amber/20">
                    <div className="flex items-center space-x-4 text-retro-gray text-sm font-mono">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>3.1K</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>89</span>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}