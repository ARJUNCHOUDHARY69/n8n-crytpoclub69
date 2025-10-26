'use client'

import { useState } from 'react'
import { MessageCircle, Send, Bell, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'

interface NotificationData {
  id: string
  type: 'price' | 'news' | 'alert'
  message: string
  timestamp: number
  sent: boolean
}

export default function TelegramNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'price' | 'news' | 'alert'>('price')
  const [loading, setLoading] = useState(false)

  const sendNotification = async () => {
    if (!message.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          type,
        }),
      })

      if (response.ok) {
        const newNotification: NotificationData = {
          id: Date.now().toString(),
          type,
          message: message.trim(),
          timestamp: Date.now(),
          sent: true,
        }
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
        setMessage('')
      }
    } catch (error) {
      console.error('Failed to send notification:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <DollarSign className="w-4 h-4 text-green-400" />
      case 'news':
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'price':
        return 'bg-green-500/20 text-green-400'
      case 'news':
        return 'bg-blue-500/20 text-blue-400'
      case 'alert':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-crypto-gold/30 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Telegram Notifications</h3>
          <p className="text-sm text-gray-400">Send alerts to community</p>
        </div>
      </div>

      {/* Send Notification Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notification Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'price' | 'news' | 'alert')}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-crypto-gold focus:border-transparent"
          >
            <option value="price">💰 Price Alert</option>
            <option value="news">📰 News Update</option>
            <option value="alert">🚨 Market Alert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your notification message..."
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-crypto-gold focus:border-transparent placeholder-gray-400"
          />
        </div>

        <button
          onClick={sendNotification}
          disabled={!message.trim() || loading}
          className="w-full bg-gradient-to-r from-crypto-gold to-yellow-400 hover:from-yellow-400 hover:to-crypto-gold disabled:from-gray-600 disabled:to-gray-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send to Telegram</span>
            </>
          )}
        </button>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Recent Notifications</h4>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg"
              >
                <div className={`p-1 rounded-full ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-green-400 text-xs">
                  ✓ Sent
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
