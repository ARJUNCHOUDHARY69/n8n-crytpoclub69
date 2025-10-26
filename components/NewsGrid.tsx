'use client'

import { useState } from 'react'
import { TrendingUp, AlertTriangle, Target, Globe, BarChart3, Shield, Zap, DollarSign, Users, Activity, ArrowRight, Star, Bitcoin, Lock, Network, Rocket } from 'lucide-react'

const futureOfCrypto = [
  {
    icon: Globe,
    title: "Global Financial Revolution",
    description: "Cryptocurrency is reshaping the global financial system, offering borderless transactions and financial inclusion for billions worldwide.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Zap,
    title: "Decentralized Finance (DeFi)",
    description: "DeFi protocols are creating a new financial ecosystem without traditional banks, offering lending, borrowing, and trading services.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Target,
    title: "Digital Asset Adoption",
    description: "Major corporations and institutions are adopting crypto as treasury reserves, signaling mainstream acceptance and long-term viability.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Users,
    title: "Web3 & Metaverse",
    description: "The next generation of the internet will be decentralized, with crypto powering virtual economies and digital ownership.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  }
]

const newsImportance = [
  {
    icon: TrendingUp,
    title: "Market Volatility Awareness",
    description: "Crypto markets are highly volatile and news can cause instant price swings of 10-50%. Staying informed helps you make better trading decisions and avoid sudden losses.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: AlertTriangle,
    title: "Regulatory Changes",
    description: "Government regulations can make or break crypto projects overnight. News about regulatory decisions can cause massive price movements and affect the entire market.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Target,
    title: "Investment Opportunities",
    description: "Early news about new projects, partnerships, or technological breakthroughs can reveal investment opportunities before they become mainstream and prices surge.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: BarChart3,
    title: "Technical Analysis Support",
    description: "News provides context for price movements. Understanding the 'why' behind market movements helps validate technical analysis and trading strategies.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Security breaches, exchange hacks, and project failures are common in crypto. News helps you identify risks early and protect your investments.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Globe,
    title: "Global Market Impact",
    description: "Crypto markets operate 24/7 globally. News from any timezone can affect prices worldwide. Understanding global events helps predict market movements.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  }
]

export default function NewsGrid() {
  const [activeTab, setActiveTab] = useState<'future' | 'news'>('future')

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-crypto-gold/10 px-4 py-2 rounded-full mb-6">
          <Bitcoin className="w-5 h-5 text-crypto-gold" />
          <span className="text-crypto-gold font-semibold font-mono tracking-wider" style={{
            textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
            filter: 'contrast(1.1)'
          }}>CRYPTO CLUB 69</span>
        </div>
        <h2 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
          textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          THE FUTURE OF <span className="text-crypto-gold">CRYPTOCURRENCY</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          UNDERSTANDING THE REVOLUTIONARY POTENTIAL OF BLOCKCHAIN TECHNOLOGY AND WHY STAYING INFORMED IS CRUCIAL FOR SUCCESS IN THE CRYPTO MARKET.
        </p>
      </div>

      {/* Tab Navigation - Asymmetric Design */}
      <div className="flex justify-center">
        <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
          <div className="bg-black border-2 border-retro-green/30 rounded-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
            <div className="relative p-2 flex">
              <button
                onClick={() => setActiveTab('future')}
                className={`relative px-8 py-4 border font-semibold transition-all duration-500 flex items-center space-x-2 font-mono tracking-wider transform ${activeTab === 'future' ? 'rotate-0' : 'rotate-1'} hover:rotate-0 ${
                  activeTab === 'future'
                    ? 'bg-retro-green text-black border-retro-green shadow-lg'
                    : 'bg-black text-retro-gray border-retro-cyan/30 hover:border-retro-green/50'
                }`}
              >
                <div className={`w-5 h-5 ${activeTab === 'future' ? 'text-black' : 'text-retro-cyan'}`}>
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  FUTURE OF CRYPTO
                </span>
                {activeTab === 'future' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`relative px-8 py-4 border font-semibold transition-all duration-500 flex items-center space-x-2 font-mono tracking-wider transform ${activeTab === 'news' ? 'rotate-0' : '-rotate-1'} hover:rotate-0 ${
                  activeTab === 'news'
                    ? 'bg-retro-cyan text-black border-retro-cyan shadow-lg'
                    : 'bg-black text-retro-gray border-retro-amber/30 hover:border-retro-cyan/50'
                }`}
              >
                <div className={`w-5 h-5 ${activeTab === 'news' ? 'text-black' : 'text-retro-amber'}`}>
                  <Network className="w-5 h-5" />
                </div>
                <span className="transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  WHY NEWS MATTERS
                </span>
                {activeTab === 'news' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
                )}
              </button>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-retro-green/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
          </div>
        </div>
      </div>

      {/* Future of Crypto Content - Asymmetric Design */}
      {activeTab === 'future' && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureOfCrypto.map((item, index) => (
              <div key={index} className={`relative group transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-all duration-700 hover:scale-105`}>
                <div className="bg-black border-2 border-retro-green/30 rounded-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                  <div className="relative p-8">
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <div className={`w-16 h-16 bg-retro-green border-2 border-retro-cyan transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center`}>
                          <item.icon className="w-8 h-8 text-black" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-retro-cyan animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-retro-green mb-4 group-hover:text-retro-amber transition-colors font-mono tracking-wider transform -skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                          {item.title.toUpperCase()}
                        </h3>
                        <p className="text-retro-gray leading-relaxed text-lg font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                          {item.description.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-retro-green/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Future Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>$2.1T</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>TOTAL MARKET CAP</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>420M+</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>GLOBAL USERS</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>24/7</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>MARKET ACTIVITY</p>
            </div>
          </div>
        </div>
      )}

      {/* News Importance Content */}
      {activeTab === 'news' && (
        <div className="space-y-16">
          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Large Feature Card */}
            <div className="lg:col-span-1 relative group">
              <div className="relative overflow-hidden bg-black border-2 border-retro-green/30 rounded-none transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative p-8">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-retro-green border-2 border-retro-cyan transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <TrendingUp className="w-8 h-8 text-black m-4" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-retro-cyan animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-retro-green mb-4 font-mono tracking-wider transform -skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                        {newsImportance[0].title.toUpperCase()}
                      </h3>
                      <p className="text-retro-gray leading-relaxed font-mono text-sm transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                        {newsImportance[0].description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-retro-green/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
              </div>
            </div>

            {/* Vertical Stack Cards */}
            <div className="lg:col-span-1 space-y-6">
              {newsImportance.slice(1, 3).map((item, index) => (
                <div key={index} className={`relative group transform ${index === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-all duration-500`}>
                  <div className="bg-black border-2 border-retro-cyan/30 rounded-none overflow-hidden hover:border-retro-green/50 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-retro-cyan/5 to-transparent"></div>
                    <div className="relative p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-retro-cyan border border-retro-green transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                          <item.icon className="w-6 h-6 text-black m-3" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-retro-cyan mb-2 font-mono tracking-wider">
                            {item.title.toUpperCase()}
                          </h3>
                          <p className="text-retro-gray text-sm font-mono leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsImportance.slice(3).map((item, index) => (
              <div key={index} className={`relative group transform ${index === 0 ? '-rotate-1' : index === 1 ? 'rotate-1' : 'rotate-0'} hover:rotate-0 transition-all duration-500`}>
                <div className="bg-black border-2 border-retro-amber/30 rounded-none overflow-hidden hover:border-retro-green/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-transparent"></div>
                  <div className="relative p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-retro-amber border border-retro-green mx-auto mb-4 transform rotate-45 group-hover:rotate-0 transition-transform duration-300">
                        <item.icon className="w-6 h-6 text-black m-3" />
                      </div>
                      <h3 className="text-base font-bold text-retro-amber mb-3 font-mono tracking-wider">
                        {item.title.toUpperCase()}
                      </h3>
                      <p className="text-retro-gray text-xs font-mono leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
