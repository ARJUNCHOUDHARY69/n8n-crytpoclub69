'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, Zap, Users, Globe } from 'lucide-react'

interface ActivityData {
  activeUsers: number
  transactions: number
  marketCap: number
  volume: number
}

export default function ActivityWidget() {
  const [activityData, setActivityData] = useState<ActivityData>({
    activeUsers: 0,
    transactions: 0,
    marketCap: 0,
    volume: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true)
        
        // Simulate real-time activity data
        const mockData = {
          activeUsers: Math.floor(Math.random() * 50000) + 100000,
          transactions: Math.floor(Math.random() * 1000000) + 5000000,
          marketCap: Math.floor(Math.random() * 500000000000) + 2000000000000,
          volume: Math.floor(Math.random() * 100000000000) + 50000000000
        }
        
        setActivityData(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching activity data:', error)
        setLoading(false)
      }
    }

    fetchActivityData()
    
    // Update every 30 seconds
    const interval = setInterval(fetchActivityData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-xl"></div>
          <div className="h-6 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
      <div className="bg-black border-2 border-retro-magenta/30 rounded-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-retro-magenta/5 to-retro-red/5"></div>
        <div className="relative p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-retro-magenta border-2 border-retro-red transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-retro-magenta font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                LIVE ACTIVITY
              </h3>
              <p className="text-sm text-retro-gray font-mono">REAL-TIME MARKET PULSE</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Active Users */}
            <div className="flex items-center justify-between p-3 bg-retro-magenta/10 border border-retro-red/30 rounded-none hover:bg-retro-magenta/20 transition-colors transform rotate-1 hover:rotate-0">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-retro-magenta" />
                <span className="text-sm text-retro-gray font-mono">ACTIVE USERS</span>
              </div>
              <span className="text-retro-cyan font-semibold font-mono">{formatNumber(activityData.activeUsers)}</span>
            </div>

            {/* Transactions */}
            <div className="flex items-center justify-between p-3 bg-retro-red/10 border border-retro-magenta/30 rounded-none hover:bg-retro-red/20 transition-colors transform -rotate-1 hover:rotate-0">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-retro-red" />
                <span className="text-sm text-retro-gray font-mono">TRANSACTIONS</span>
              </div>
              <span className="text-retro-green font-semibold font-mono">{formatNumber(activityData.transactions)}</span>
            </div>

            {/* Market Cap */}
            <div className="flex items-center justify-between p-3 bg-retro-green/10 border border-retro-cyan/30 rounded-none hover:bg-retro-green/20 transition-colors transform rotate-1 hover:rotate-0">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-retro-green" />
                <span className="text-sm text-retro-gray font-mono">MARKET CAP</span>
              </div>
              <span className="text-retro-amber font-semibold font-mono">${formatNumber(activityData.marketCap)}</span>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-between p-3 bg-retro-cyan/10 border border-retro-amber/30 rounded-none hover:bg-retro-cyan/20 transition-colors transform -rotate-1 hover:rotate-0">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-retro-cyan" />
                <span className="text-sm text-retro-gray font-mono">24H VOLUME</span>
              </div>
              <span className="text-retro-magenta font-semibold font-mono">${formatNumber(activityData.volume)}</span>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></div>
            <span className="text-xs text-retro-gray font-mono">LIVE • UPDATED {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-retro-magenta/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
      </div>
    </div>
  )
}
