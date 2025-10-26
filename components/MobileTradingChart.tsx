'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Hand, Smartphone, Zap, Globe } from 'lucide-react'

interface ChartData {
  time: string
  price: number
  volume: number
}

interface MobileTradingChartProps {
  symbol: string
  data: ChartData[]
  height?: number
}

function MobileTradingChart({ symbol, data, height = 300 }: MobileTradingChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [isTouchMode, setIsTouchMode] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; price: number; time: string } | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 })

  const timeframes = ['1H', '4H', '1D', '1W', '1M']

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect()
        setChartDimensions({ width: rect.width, height: height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [height])

  // Touch event handlers for mobile optimization
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouchMode(true)
    const touch = e.touches[0]
    const rect = chartRef.current?.getBoundingClientRect()
    if (rect) {
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      updateHoveredPoint(x, y)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = chartRef.current?.getBoundingClientRect()
    if (rect) {
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      updateHoveredPoint(x, y)
    }
  }

  const handleTouchEnd = () => {
    setIsTouchMode(false)
    setHoveredPoint(null)
  }

  const updateHoveredPoint = (x: number, y: number) => {
    if (data.length === 0) return

    const dataIndex = Math.floor((x / chartDimensions.width) * data.length)
    if (dataIndex >= 0 && dataIndex < data.length) {
      const point = data[dataIndex]
      setHoveredPoint({
        x,
        y,
        price: point.price,
        time: point.time
      })
    }
  }

  // Calculate chart metrics
  const maxPrice = Math.max(...data.map(d => d.price))
  const minPrice = Math.min(...data.map(d => d.price))
  const priceRange = maxPrice - minPrice
  const isPositive = data.length > 1 ? data[data.length - 1].price > data[0].price : true

  // Generate SVG path for the line chart
  const generatePath = () => {
    if (data.length === 0) return ''
    
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartDimensions.width
      const y = height - ((point.price - minPrice) / priceRange) * height
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')

    return points
  }

  // Generate area under the curve
  const generateArea = () => {
    if (data.length === 0) return ''
    
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartDimensions.width
      const y = height - ((point.price - minPrice) / priceRange) * height
      return `${x},${y}`
    }).join(' ')

    return `M 0,${height} L ${points} L ${chartDimensions.width},${height} Z`
  }

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold/20 to-blue-500/20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-crypto-gold" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
              filter: 'contrast(1.05)'
            }}>
              {symbol} CHART
            </h3>
            <p className="text-gray-400 text-sm font-mono">Mobile-Optimized Trading Chart</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Hand className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-blue-400 font-mono">TOUCH</span>
        </div>
      </div>

      {/* Timeframe Selector - Mobile Optimized */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-4 py-2 rounded-lg font-mono tracking-wider transition-all whitespace-nowrap ${
              selectedTimeframe === timeframe
                ? 'bg-crypto-gold text-black font-bold'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
          >
            {timeframe}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div
          ref={chartRef}
          className="relative bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden"
          style={{ height: `${height}px` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* SVG Chart */}
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            viewBox={`0 0 ${chartDimensions.width} ${height}`}
            preserveAspectRatio="none"
          >
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="1"/>
              </pattern>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Area under curve */}
            <path
              d={generateArea()}
              fill="url(#priceGradient)"
            />
            
            {/* Price line */}
            <path
              d={generatePath()}
              fill="none"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * chartDimensions.width
              const y = height - ((point.price - minPrice) / priceRange) * height
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={isPositive ? "#10b981" : "#ef4444"}
                  className="hover:r-4 transition-all cursor-pointer"
                />
              )
            })}
          </svg>

          {/* Hover/Touch Indicator */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: hoveredPoint.x - 1,
                top: 0,
                width: '2px',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* Price Info Overlay */}
        {hoveredPoint && (
          <div
            className="absolute bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50 shadow-lg"
            style={{
              left: Math.min(hoveredPoint.x - 60, chartDimensions.width - 120),
              top: Math.max(hoveredPoint.y - 60, 10),
              zIndex: 20
            }}
          >
            <div className="text-white font-mono text-sm">
              <div className="font-bold">${hoveredPoint.price.toLocaleString()}</div>
              <div className="text-gray-400 text-xs">{hoveredPoint.time}</div>
            </div>
          </div>
        )}

        {/* Chart Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="text-xs text-gray-400 font-mono tracking-wider">HIGH</div>
            <div className="text-white font-bold font-mono">${maxPrice.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="text-xs text-gray-400 font-mono tracking-wider">LOW</div>
            <div className="text-white font-bold font-mono">${minPrice.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="text-xs text-gray-400 font-mono tracking-wider">RANGE</div>
            <div className="text-white font-bold font-mono">${priceRange.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="text-xs text-gray-400 font-mono tracking-wider">TREND</div>
            <div className={`font-bold font-mono flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? 'BULLISH' : 'BEARISH'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Optimization Features */}
      <div className="mt-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-4 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-mono text-gray-300">MOBILE OPTIMIZED</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Hand className="w-3 h-3 text-blue-400" />
                <span className="text-gray-400 font-mono">Touch</span>
              </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-gray-400 font-mono">Real-time</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3 text-green-400" />
              <span className="text-gray-400 font-mono">CDN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileTradingChart
