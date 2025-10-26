'use client'

import { useState, useEffect } from 'react'
import { Globe, Zap, Shield, TrendingUp, Server, Cloud, Wifi, Smartphone } from 'lucide-react'

interface CDNStats {
  region: string
  latency: number
  bandwidth: number
  cacheHit: number
  status: 'optimal' | 'good' | 'slow'
}

function CDNOptimizer() {
  const [cdnStats, setCdnStats] = useState<CDNStats[]>([])
  const [selectedRegion, setSelectedRegion] = useState('global')
  const [isOptimizing, setIsOptimizing] = useState(false)

  const regions = [
    { code: 'global', name: 'Global CDN', flag: '🌍' },
    { code: 'us-east', name: 'US East', flag: '🇺🇸' },
    { code: 'us-west', name: 'US West', flag: '🇺🇸' },
    { code: 'eu-central', name: 'Europe', flag: '🇪🇺' },
    { code: 'asia-pacific', name: 'Asia Pacific', flag: '🌏' },
    { code: 'india', name: 'India', flag: '🇮🇳' }
  ]

  useEffect(() => {
    // Simulate CDN performance data
    const generateStats = () => {
      const stats: CDNStats[] = regions.map(region => ({
        region: region.name,
        latency: Math.random() * 50 + 10, // 10-60ms
        bandwidth: Math.random() * 100 + 50, // 50-150 Mbps
        cacheHit: Math.random() * 20 + 80, // 80-100%
        status: Math.random() > 0.2 ? 'optimal' : Math.random() > 0.5 ? 'good' : 'slow'
      }))
      setCdnStats(stats)
    }

    generateStats()
    const interval = setInterval(generateStats, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const optimizeCDN = async () => {
    setIsOptimizing(true)
    // Simulate CDN optimization
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsOptimizing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400'
      case 'good': return 'text-yellow-400'
      case 'slow': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <Zap className="w-4 h-4 text-green-400" />
      case 'good': return <TrendingUp className="w-4 h-4 text-yellow-400" />
      case 'slow': return <Server className="w-4 h-4 text-red-400" />
      default: return <Cloud className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full mb-4 border border-blue-500/30">
          <Globe className="w-6 h-6 text-blue-400" />
          <span className="text-blue-400 font-bold text-lg font-mono tracking-wider">CDN OPTIMIZER</span>
          <Cloud className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
          textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          GLOBAL CONTENT DELIVERY
        </h2>
        <p className="text-gray-400 text-lg">Enterprise-Grade CDN Performance</p>
      </div>

      {/* CDN Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <Wifi className="w-8 h-8 text-blue-400" />
            <span className="text-xs text-blue-400 font-mono tracking-wider">BANDWIDTH</span>
          </div>
          <div className="text-3xl font-bold text-white font-mono mb-2" style={{
            textShadow: '1px 0 0 #0000ff, -1px 0 0 #0000ff',
            filter: 'contrast(1.1)'
          }}>
            {cdnStats.length > 0 ? Math.round(cdnStats.reduce((sum, stat) => sum + stat.bandwidth, 0) / cdnStats.length) : 0}Mbps
          </div>
          <div className="text-sm text-gray-400 font-mono">Average Speed</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="text-xs text-purple-400 font-mono tracking-wider">CACHE HIT</span>
          </div>
          <div className="text-3xl font-bold text-white font-mono mb-2" style={{
            textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
            filter: 'contrast(1.1)'
          }}>
            {cdnStats.length > 0 ? Math.round(cdnStats.reduce((sum, stat) => sum + stat.cacheHit, 0) / cdnStats.length) : 0}%
          </div>
          <div className="text-sm text-gray-400 font-mono">Hit Rate</div>
        </div>
      </div>

      {/* Region Selector */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
          filter: 'contrast(1.05)'
        }}>
          SELECT CDN REGION
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {regions.map((region) => (
            <button
              key={region.code}
              onClick={() => setSelectedRegion(region.code)}
              className={`p-4 rounded-xl border transition-all font-mono tracking-wider ${
                selectedRegion === region.code
                  ? 'bg-crypto-gold text-black border-crypto-gold font-bold'
                  : 'bg-gray-800/50 text-gray-300 border-gray-700/50 hover:border-crypto-gold/50'
              }`}
            >
              <div className="text-2xl mb-2">{region.flag}</div>
              <div className="text-sm">{region.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CDN Performance Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
          filter: 'contrast(1.05)'
        }}>
          REGIONAL PERFORMANCE
        </h3>
        <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-mono tracking-wider text-gray-400">REGION</th>
                  <th className="px-6 py-4 text-left text-xs font-mono tracking-wider text-gray-400">LATENCY</th>
                  <th className="px-6 py-4 text-left text-xs font-mono tracking-wider text-gray-400">BANDWIDTH</th>
                  <th className="px-6 py-4 text-left text-xs font-mono tracking-wider text-gray-400">CACHE HIT</th>
                  <th className="px-6 py-4 text-left text-xs font-mono tracking-wider text-gray-400">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {cdnStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{regions[index]?.flag}</span>
                        <span className="text-white font-mono font-medium">{stat.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-mono font-bold">{stat.latency.toFixed(1)}ms</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-mono font-bold">{stat.bandwidth.toFixed(1)}Mbps</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-mono font-bold">{stat.cacheHit.toFixed(1)}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(stat.status)}
                        <span className={`font-mono font-bold ${getStatusColor(stat.status)}`}>
                          {stat.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Optimization Controls */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4 font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff00ff, -1px 0 0 #ff00ff',
          filter: 'contrast(1.05)'
        }}>
          CDN OPTIMIZATION
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 font-mono tracking-wider">AUTOMATIC OPTIMIZATION</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-300 font-mono">Image Compression</span>
                <span className="text-green-400 font-mono font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-300 font-mono">Gzip Compression</span>
                <span className="text-green-400 font-mono font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-300 font-mono">Browser Caching</span>
                <span className="text-green-400 font-mono font-bold">ENABLED</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 font-mono tracking-wider">MANUAL OPTIMIZATION</h4>
            <button
              onClick={optimizeCDN}
              disabled={isOptimizing}
              className="w-full bg-gradient-to-r from-crypto-gold to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-crypto-gold/80 hover:to-blue-500/80 transition-all duration-300 font-mono tracking-wider shadow-lg hover:shadow-crypto-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? 'OPTIMIZING...' : 'OPTIMIZE CDN'}
            </button>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 font-mono">Global Edge Locations: 200+</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 font-mono">Real-time Optimization</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-mono">DDoS Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Optimization Features */}
      <div className="mt-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-bold text-white font-mono tracking-wider">MOBILE CDN OPTIMIZATION</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 font-mono">Adaptive Bitrate Streaming</span>
          </div>
          <div className="flex items-center space-x-2">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 font-mono">Edge Caching</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 font-mono">Global Distribution</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CDNOptimizer
