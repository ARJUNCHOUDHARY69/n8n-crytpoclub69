'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Search, Bell, User, TrendingUp, DollarSign, Activity, Twitter, Linkedin, MessageCircle, Github, Clock } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [utcTime, setUtcTime] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const utcTimeString = now.toISOString().slice(11, 19) // HH:MM:SS format
      setUtcTime(utcTimeString)
    }
    
    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000) // Update every second
    
    return () => clearInterval(interval)
  }, [])

  return (
    <header className={`${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900'} sticky top-0 z-50 border-b border-gray-700 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Social Media - Asymmetric Design */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="https://www.binance.com/en-IN/square/profile/cryptoclub69" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110" title="Binance Square">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-2 hover:border-retro-cyan/50 transition-all duration-300">
                <img
                  src="/Screenshot 2025-10-23 092443-removebg-preview.jpg"
                  alt="Binance Square"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-green animate-pulse"></div>
            </a>
            <a href="https://www.linkedin.com/in/arjunchoudhary69/" target="_blank" rel="noopener noreferrer" className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="LinkedIn">
              <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-2 hover:border-retro-amber/50 transition-all duration-300">
                <Linkedin className="w-4 h-4 text-retro-cyan" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
            </a>
            <a href="https://github.com/ARJUNCHOUDHARY69" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="GitHub">
              <div className="bg-black border-2 border-retro-amber/30 rounded-none p-2 hover:border-retro-magenta/50 transition-all duration-300">
                <Github className="w-4 h-4 text-retro-amber" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
            </a>
            <a href="https://t.me/CRYPTOCLUB69BINANCE" target="_blank" rel="noopener noreferrer" className="relative group transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110" title="Telegram">
              <div className="bg-black border-2 border-retro-magenta/30 rounded-none p-2 hover:border-retro-red/50 transition-all duration-300">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center p-0.5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                    alt="Telegram"
                    className="w-2.5 h-2.5"
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
            </a>
            <a href="https://x.com/choudhary00070" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="X (Twitter)">
              <div className="bg-black border-2 border-retro-red/30 rounded-none p-2 hover:border-retro-green/50 transition-all duration-300">
                <Twitter className="w-4 h-4 text-retro-red" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-red animate-pulse"></div>
            </a>
          </div>

          {/* Center - Logo and Brand */}
          <a href="/" className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="CRYPTO CLUB 69 Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-crypto-gold transition-colors font-mono tracking-wider cursor-pointer" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>CRYPTO CLUB 69</h1>
              <p className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider" style={{
                textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                filter: 'contrast(1.05)'
              }}>CRYPTO NEWS HUB</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white group-hover:text-crypto-gold transition-colors font-mono tracking-wider cursor-pointer" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>CC69</h1>
            </div>
          </a>

          {/* Right Side - UTC Time and Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* UTC Time Display - Asymmetric Design */}
            <div className="relative group transform -rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <div className="bg-black border-2 border-retro-green/30 rounded-none px-3 py-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-retro-green" />
                  <div className="text-right">
                    <div className="text-xs text-retro-gray font-mono tracking-wider">UTC</div>
                    <div className="text-sm font-bold text-retro-green font-mono">
                      {utcTime}
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-retro-green/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-8">
            <a href="/news" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors relative group font-mono tracking-wider" style={{
              textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
              filter: 'contrast(1.05)'
            }}>
              NEWS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crypto-gold group-hover:w-full transition-all duration-300"></span>
            </a>
                <a href="/markets" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors relative group font-mono tracking-wider" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>
                  MARKETS
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crypto-gold group-hover:w-full transition-all duration-300"></span>
                </a>
            <a href="/analysis" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors relative group font-mono tracking-wider" style={{
              textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
              filter: 'contrast(1.05)'
            }}>
              ANALYSIS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crypto-gold group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/article" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors relative group font-mono tracking-wider" style={{
              textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
              filter: 'contrast(1.05)'
            }}>
              ARTICLE
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crypto-gold group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/image-gallery" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors relative group font-mono tracking-wider" style={{
              textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
              filter: 'contrast(1.05)'
            }}>
              AI IMAGE GALLERY
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crypto-gold group-hover:w-full transition-all duration-300"></span>
            </a>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-crypto-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 animate-slideInUp">
            {/* Mobile UTC Time */}
            <div className="flex items-center justify-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-3 mb-4 border border-gray-700/50">
              <Clock className="w-4 h-4 text-crypto-gold" />
              <div className="text-center">
                <div className="text-xs text-gray-400 font-mono tracking-wider">UTC TIME</div>
                <div className="text-sm font-bold text-white font-mono" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>
                  {utcTime}
                </div>
              </div>
            </div>
            
            <nav className="flex flex-col space-y-4">
                  <a href="/news" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors py-2 flex items-center space-x-2 group font-mono tracking-wider" style={{
                    textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                    filter: 'contrast(1.05)'
                  }}>
                <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>NEWS</span>
              </a>
                  <a href="/markets" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors py-2 flex items-center space-x-2 group font-mono tracking-wider" style={{
                    textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                    filter: 'contrast(1.05)'
                  }}>
                <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>MARKETS</span>
              </a>
                  <a href="/analysis" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors py-2 flex items-center space-x-2 group font-mono tracking-wider" style={{
                    textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                    filter: 'contrast(1.05)'
                  }}>
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>ANALYSIS</span>
                  </a>
                  <a href="/article" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors py-2 flex items-center space-x-2 group font-mono tracking-wider" style={{
                    textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                    filter: 'contrast(1.05)'
                  }}>
                    <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>ARTICLE</span>
                  </a>
                  <a href="/image-gallery" className="text-gray-300 hover:text-crypto-gold font-medium transition-colors py-2 flex items-center space-x-2 group font-mono tracking-wider" style={{
                    textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                    filter: 'contrast(1.05)'
                  }}>
                    <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>AI IMAGE GALLERY</span>
                  </a>
              <div className="pt-4 border-t border-gray-700">
                {/* Social Media Links */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 font-mono tracking-wider">FOLLOW US</h4>
                  <div className="flex space-x-4">
                    <a href="https://www.binance.com/en-IN/square/profile/cryptoclub69" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-colors" title="Binance Square">
                      <img 
                        src="/Screenshot 2025-10-23 092443-removebg-preview.jpg" 
                        alt="Binance Square" 
                        className="w-7 h-7 object-contain"
                      />
                    </a>
                    <a href="https://www.linkedin.com/in/arjunchoudhary69/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-colors" title="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/ARJUNCHOUDHARY69" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-colors" title="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://t.me/CRYPTOCLUB69BINANCE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-colors" title="Telegram">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center p-1">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                          alt="Telegram" 
                          className="w-3 h-3"
                        />
                      </div>
                    </a>
                    <a href="https://x.com/choudhary00070" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-colors" title="X (Twitter)">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
