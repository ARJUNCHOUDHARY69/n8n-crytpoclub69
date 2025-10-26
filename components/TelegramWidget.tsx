'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Users, Zap, Send, Bell, TrendingUp } from 'lucide-react'

interface TelegramData {
  members: number
  messages: number
  online: number
  growth: number
}

export default function TelegramWidget() {
  const [telegramData, setTelegramData] = useState<TelegramData>({
    members: 0,
    messages: 0,
    online: 0,
    growth: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTelegramData = async () => {
      try {
        setLoading(true)
        
        // Simulate Telegram community data
        const mockData = {
          members: Math.floor(Math.random() * 50000) + 15000,
          messages: Math.floor(Math.random() * 10000) + 5000,
          online: Math.floor(Math.random() * 2000) + 500,
          growth: Math.floor(Math.random() * 20) + 5
        }
        
        setTelegramData(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Telegram data:', error)
        setLoading(false)
      }
    }

    fetchTelegramData()
    
    // Update every 2 minutes
    const interval = setInterval(fetchTelegramData, 120000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-crypto-gold/30 transition-all duration-300 group">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Telegram Community</h3>
          <p className="text-sm text-gray-400">Join our crypto discussions</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Members Count */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Members</span>
          </div>
          <span className="text-white font-semibold">{formatNumber(telegramData.members)}</span>
        </div>

        {/* Online Users */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Online Now</span>
          </div>
          <span className="text-white font-semibold">{formatNumber(telegramData.online)}</span>
        </div>

        {/* Messages Today */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Messages Today</span>
          </div>
          <span className="text-white font-semibold">{formatNumber(telegramData.messages)}</span>
        </div>

        {/* Growth Rate */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Growth</span>
          </div>
          <span className="text-green-400 font-semibold">+{telegramData.growth}%</span>
        </div>
      </div>

      {/* Join Button */}
      <div className="mt-6">
        <a
          href="https://t.me/cryptoclub69"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-crypto-gold to-yellow-400 hover:from-yellow-400 hover:to-crypto-gold text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 transform"
        >
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center p-1">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
              alt="Telegram" 
              className="w-3 h-3"
            />
          </div>
          <span>Join Telegram</span>
        </a>
      </div>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400">Live Community • Updated {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
