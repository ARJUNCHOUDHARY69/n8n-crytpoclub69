'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, TrendingDown, DollarSign, Percent, Smartphone, Hand, Globe, Zap } from 'lucide-react'

interface CryptoHolding {
  id: string
  symbol: string
  name: string
  amount: number
  buyPrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercent: number
}

function PLCalculator() {
  const [holdings, setHoldings] = useState<CryptoHolding[]>([])
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newHolding, setNewHolding] = useState({
    symbol: '',
    amount: '',
    buyPrice: ''
  })

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/crypto')
        const data = await response.json()
        setCryptoData(data.slice(0, 50)) // Top 50 coins for performance
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCryptoData()
  }, [])

  // Calculate P&L for all holdings
  useEffect(() => {
    if (cryptoData.length > 0) {
      const updatedHoldings = holdings.map(holding => {
        const crypto = cryptoData.find(c => c.symbol.toLowerCase() === holding.symbol.toLowerCase())
        if (crypto) {
          const currentPrice = crypto.current_price
          const value = holding.amount * currentPrice
          const pnl = value - (holding.amount * holding.buyPrice)
          const pnlPercent = ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100
          
          return {
            ...holding,
            currentPrice,
            value,
            pnl,
            pnlPercent
          }
        }
        return holding
      })
      setHoldings(updatedHoldings)
    }
  }, [cryptoData])

  const addHolding = () => {
    if (newHolding.symbol && newHolding.amount && newHolding.buyPrice) {
      const crypto = cryptoData.find(c => c.symbol.toLowerCase() === newHolding.symbol.toLowerCase())
      if (crypto) {
        const holding: CryptoHolding = {
          id: Date.now().toString(),
          symbol: newHolding.symbol.toUpperCase(),
          name: crypto.name,
          amount: parseFloat(newHolding.amount),
          buyPrice: parseFloat(newHolding.buyPrice),
          currentPrice: crypto.current_price,
          value: parseFloat(newHolding.amount) * crypto.current_price,
          pnl: 0,
          pnlPercent: 0
        }
        setHoldings([...holdings, holding])
        setNewHolding({ symbol: '', amount: '', buyPrice: '' })
      }
    }
  }

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id))
  }

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0)
  const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0)
  const totalPnlPercent = totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-crypto-gold/20 to-blue-500/20 px-6 py-3 rounded-full mb-4 border border-crypto-gold/30">
          <Calculator className="w-6 h-6 text-crypto-gold" />
          <span className="text-crypto-gold font-bold text-lg font-mono tracking-wider">P&L CALCULATOR</span>
            <Hand className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
          textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          REAL-TIME PROFIT & LOSS
        </h2>
        <p className="text-gray-400 text-lg">Mobile-Optimized Portfolio Tracking</p>
      </div>

      {/* Portfolio Summary - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400 font-mono tracking-wider">TOTAL VALUE</span>
          </div>
          <div className="text-2xl font-bold text-white font-mono" style={{
            textShadow: '1px 0 0 #00ff00, -1px 0 0 #00ff00',
            filter: 'contrast(1.1)'
          }}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className={`bg-gradient-to-br ${totalPnl >= 0 ? 'from-green-600/20 to-green-800/20 border-green-500/30' : 'from-red-600/20 to-red-800/20 border-red-500/30'} rounded-xl p-4 border`}>
          <div className="flex items-center justify-between mb-2">
            {totalPnl >= 0 ? <TrendingUp className="w-5 h-5 text-green-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
            <span className={`text-xs font-mono tracking-wider ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>P&L</span>
          </div>
          <div className={`text-2xl font-bold font-mono ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`} style={{
            textShadow: totalPnl >= 0 ? '1px 0 0 #00ff00, -1px 0 0 #00ff00' : '1px 0 0 #ff0000, -1px 0 0 #ff0000',
            filter: 'contrast(1.1)'
          }}>
            {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className={`bg-gradient-to-br ${totalPnlPercent >= 0 ? 'from-green-600/20 to-green-800/20 border-green-500/30' : 'from-red-600/20 to-red-800/20 border-red-500/30'} rounded-xl p-4 border`}>
          <div className="flex items-center justify-between mb-2">
            <Percent className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400 font-mono tracking-wider">PERCENTAGE</span>
          </div>
          <div className={`text-2xl font-bold font-mono ${totalPnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`} style={{
            textShadow: totalPnlPercent >= 0 ? '1px 0 0 #00ff00, -1px 0 0 #00ff00' : '1px 0 0 #ff0000, -1px 0 0 #ff0000',
            filter: 'contrast(1.1)'
          }}>
            {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Add New Holding - Mobile Optimized Form */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4 font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
          filter: 'contrast(1.05)'
        }}>
          ADD NEW HOLDING
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-mono tracking-wider">CRYPTO SYMBOL</label>
            <input
              type="text"
              placeholder="BTC, ETH, ADA..."
              value={newHolding.symbol}
              onChange={(e) => setNewHolding({...newHolding, symbol: e.target.value.toUpperCase()})}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-crypto-gold focus:ring-2 focus:ring-crypto-gold/20 transition-all font-mono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-mono tracking-wider">AMOUNT</label>
            <input
              type="number"
              placeholder="1.5"
              value={newHolding.amount}
              onChange={(e) => setNewHolding({...newHolding, amount: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-crypto-gold focus:ring-2 focus:ring-crypto-gold/20 transition-all font-mono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 font-mono tracking-wider">BUY PRICE ($)</label>
            <input
              type="number"
              placeholder="45000"
              value={newHolding.buyPrice}
              onChange={(e) => setNewHolding({...newHolding, buyPrice: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-crypto-gold focus:ring-2 focus:ring-crypto-gold/20 transition-all font-mono"
            />
          </div>
        </div>
        
        <button
          onClick={addHolding}
          className="w-full mt-4 bg-gradient-to-r from-crypto-gold to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-crypto-gold/80 hover:to-blue-500/80 transition-all duration-300 font-mono tracking-wider shadow-lg hover:shadow-crypto-gold/20"
        >
          ADD TO PORTFOLIO
        </button>
      </div>

      {/* Holdings List - Mobile Optimized */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4 font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
          filter: 'contrast(1.05)'
        }}>
          YOUR HOLDINGS ({holdings.length})
        </h3>
        
        {holdings.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <Calculator className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-mono tracking-wider">No holdings added yet</p>
            <p className="text-gray-500 text-sm">Add your first crypto holding above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {holdings.map((holding) => (
              <div key={holding.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-crypto-gold/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-crypto-gold font-bold text-sm font-mono">{holding.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-mono tracking-wider">{holding.symbol}</h4>
                      <p className="text-gray-400 text-sm font-mono">{holding.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeHolding(holding.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400 font-mono tracking-wider">AMOUNT</span>
                    <div className="text-white font-bold font-mono">{holding.amount}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 font-mono tracking-wider">CURRENT</span>
                    <div className="text-white font-bold font-mono">${holding.currentPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 font-mono tracking-wider">VALUE</span>
                    <div className="text-white font-bold font-mono">${holding.value.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 font-mono tracking-wider">P&L</span>
                    <div className={`font-bold font-mono ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toLocaleString()} ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Optimization Features */}
      <div className="mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-bold text-white font-mono tracking-wider">MOBILE OPTIMIZED</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Hand className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 font-mono">Touch-Friendly Interface</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 font-mono">Real-Time Updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 font-mono">Global CDN Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PLCalculator
