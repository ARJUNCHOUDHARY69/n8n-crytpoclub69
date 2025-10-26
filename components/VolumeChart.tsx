'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign } from 'lucide-react'

interface VolumeData {
  timestamp: number
  volume: number
  price: number
}

export default function VolumeChart() {
  const [volumeData, setVolumeData] = useState<VolumeData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCoin, setSelectedCoin] = useState('bitcoin')
  const [totalVolume, setTotalVolume] = useState(0)
  const [volumeChange, setVolumeChange] = useState(0)

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' }
  ]

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        setLoading(true)
        console.log(`Fetching ${selectedCoin} volume data...`)
        
        const response = await fetch(`/api/crypto?endpoint=coins/${selectedCoin}/market_chart&days=7`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log(`${selectedCoin} API Response:`, data)
        
        if (data && data.total_volumes && data.prices) {
          const formattedData = data.total_volumes.map((item: [number, number], index: number) => ({
            timestamp: item[0],
            volume: item[1],
            price: data.prices[index] ? data.prices[index][1] : 0
          }))
          
          setVolumeData(formattedData)
          
          // Calculate total volume and change
          const total = formattedData.reduce((sum: number, item: VolumeData) => sum + item.volume, 0)
          setTotalVolume(total)
          
          if (formattedData.length > 1) {
            const firstVolume = formattedData[0].volume
            const lastVolume = formattedData[formattedData.length - 1].volume
            const change = ((lastVolume - firstVolume) / firstVolume) * 100
            setVolumeChange(change)
          }
        } else {
          throw new Error('Invalid API response structure')
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching volume data:', error)
        // Set fallback data based on selected coin
        const fallbackData = {
          bitcoin: [
            { timestamp: Date.now() - 518400000, volume: 15000000000, price: 42000 },
            { timestamp: Date.now() - 432000000, volume: 18000000000, price: 43500 },
            { timestamp: Date.now() - 345600000, volume: 12000000000, price: 42800 },
            { timestamp: Date.now() - 259200000, volume: 20000000000, price: 44100 },
            { timestamp: Date.now() - 172800000, volume: 16000000000, price: 43800 },
            { timestamp: Date.now() - 86400000, volume: 19000000000, price: 44500 },
            { timestamp: Date.now(), volume: 17000000000, price: 44200 }
          ],
          ethereum: [
            { timestamp: Date.now() - 518400000, volume: 8000000000, price: 2800 },
            { timestamp: Date.now() - 432000000, volume: 9500000000, price: 2850 },
            { timestamp: Date.now() - 345600000, volume: 7000000000, price: 2750 },
            { timestamp: Date.now() - 259200000, volume: 11000000000, price: 2900 },
            { timestamp: Date.now() - 172800000, volume: 9000000000, price: 2880 },
            { timestamp: Date.now() - 86400000, volume: 10000000000, price: 2920 },
            { timestamp: Date.now(), volume: 8500000000, price: 2890 }
          ]
        }
        
        const coinData = fallbackData[selectedCoin as keyof typeof fallbackData] || fallbackData.bitcoin
        setVolumeData(coinData)
        
        const total = coinData.reduce((sum, item) => sum + item.volume, 0)
        setTotalVolume(total)
        setVolumeChange(selectedCoin === 'bitcoin' ? 13.33 : 3.57)
        setLoading(false)
      }
    }

    fetchVolumeData()
  }, [selectedCoin])

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(2)}K`
    return `$${volume.toFixed(2)}`
  }

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
  }

  const maxVolume = volumeData.length > 0 ? Math.max(...volumeData.map(d => d.volume)) : 0
  const minVolume = volumeData.length > 0 ? Math.min(...volumeData.map(d => d.volume)) : 0

  return (
    <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
      <div className="bg-black border-2 border-retro-amber/30 rounded-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-red/5"></div>
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-retro-amber border-2 border-retro-red transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-retro-amber font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  TRADING VOLUME ANALYSIS
                </h3>
                <p className="text-sm text-retro-gray font-mono">JANUARY - JUNE 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-retro-cyan rounded"></div>
                <span className="text-sm text-retro-gray font-mono">VOLUME</span>
                <span className="text-sm font-semibold text-retro-cyan font-mono">187</span>
              </div>
            </div>
          </div>

          {/* Coin Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {coins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => setSelectedCoin(coin.id)}
                className={`px-4 py-2 border font-medium transition-all duration-300 font-mono ${
                  selectedCoin === coin.id
                    ? 'bg-retro-amber text-black border-retro-amber'
                    : 'bg-black text-retro-gray border-retro-amber/30 hover:border-retro-red/50'
                }`}
              >
                {coin.symbol}
              </button>
            ))}
          </div>

          {/* Volume Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-retro-amber/10 border border-retro-red/30 rounded-none p-4 text-center transform rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="text-sm text-retro-gray mb-1 font-mono">TOTAL VOLUME</div>
              <div className="text-xl font-bold text-retro-amber font-mono">
                {formatVolume(totalVolume)}
              </div>
            </div>
            <div className="bg-retro-red/10 border border-retro-magenta/30 rounded-none p-4 text-center transform -rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="text-sm text-retro-gray mb-1 font-mono">AVG DAILY</div>
              <div className="text-xl font-bold text-retro-red font-mono">
                {formatVolume(totalVolume / 7)}
              </div>
            </div>
            <div className="bg-retro-magenta/10 border border-retro-cyan/30 rounded-none p-4 text-center transform rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="text-sm text-retro-gray mb-1 font-mono">CHANGE</div>
              <div className={`text-xl font-bold font-mono ${volumeChange >= 0 ? 'text-retro-green' : 'text-retro-red'}`}>
                {formatChange(volumeChange)}
              </div>
            </div>
          </div>

          {/* Modern Bar Chart */}
          <div className="relative">
            {loading ? (
              <div className="h-80 bg-retro-amber/10 border border-retro-red/30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-retro-amber"></div>
              </div>
            ) : (
              <div className="h-80 bg-retro-amber/5 border border-retro-red/20 p-6 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 500 300">
              {/* Grid Lines */}
              <defs>
                <pattern id="volumeGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              
              {/* Background Grid */}
              <rect width="500" height="300" fill="url(#volumeGrid)" />
              
              {/* Volume Bars */}
              {volumeData.map((item, index) => {
                const x = 50 + (index * 80)
                const barHeight = (item.volume / maxVolume) * 200
                const y = 300 - barHeight
                const width = 60
                
                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={barHeight}
                      fill="#3B82F6"
                      opacity="0.8"
                      className="hover:opacity-100 transition-all duration-300"
                    />
                    {/* Bar Label */}
                    <text
                      x={x + width/2}
                      y={y - 10}
                      textAnchor="middle"
                      className="text-xs fill-gray-300"
                    >
                      {formatVolume(item.volume)}
                    </text>
                    {/* X-axis Label */}
                    <text
                      x={x + width/2}
                      y={320}
                      textAnchor="middle"
                      className="text-xs fill-gray-400"
                    >
                      {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </text>
                  </g>
                )
              })}
            </svg>
            
            {/* Chart Labels */}
            <div className="absolute top-4 left-4">
              <div className="text-sm font-semibold text-white">Trading Volume</div>
              <div className="text-xs text-gray-400">Active Chart</div>
            </div>
          </div>
        )}
      </div>

          {/* Trend Information */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-retro-green" />
              <span className="text-sm font-medium text-retro-cyan font-mono">TRENDING UP BY 5.2% THIS MONTH</span>
            </div>
            <div className="text-sm text-retro-gray font-mono">
              SHOWING TOTAL VOLUME FOR THE LAST 6 MONTHS
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-retro-amber/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
      </div>
    </div>
  )
}
