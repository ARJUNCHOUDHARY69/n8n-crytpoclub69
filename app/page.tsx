'use client'

import Hero from '@/components/Hero'
import NewsGrid from '@/components/NewsGrid'
import TrendingSection from '@/components/TrendingSection'
import PriceChart from '@/components/PriceChart'
import MarketOverview from '@/components/MarketOverview'
import VolumeChart from '@/components/VolumeChart'
import ActivityWidget from '@/components/ActivityWidget'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity, Globe, Users, Zap, Shield } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slideContent = [
    {
      title: "CRYPTO CLUB 69",
      subtitle: "Professional crypto analysis and market insights",
      description: "Trusted by crypto professionals worldwide",
      icon: Globe,
      color: "retro-green"
    },
    {
      title: "REAL-TIME DATA",
      subtitle: "Live market updates and price tracking",
      description: "Stay ahead with instant cryptocurrency insights",
      icon: Activity,
      color: "retro-cyan"
    },
    {
      title: "EXPERT ANALYSIS",
      subtitle: "Professional market research and trends",
      description: "In-depth analysis from crypto industry experts",
      icon: TrendingUp,
      color: "retro-amber"
    },
    {
      title: "SECURE TRADING",
      subtitle: "Advanced security and risk management",
      description: "Your investments protected with enterprise-grade security",
      icon: Shield,
      color: "retro-magenta"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideContent.length)
    }, 1000) // Change slide every 1 second for fast rotation

    return () => clearInterval(interval)
  }, [slideContent.length])

  return (
    <>
        <Hero />
        
        {/* Rotating Horizontal Slide */}
        <div className="relative bg-black py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 text-center max-w-4xl mx-auto">
              <div className="bg-black border-2 border-retro-green/30 rounded-none p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                <div className="relative">
                  <div className="inline-block bg-retro-green/10 border border-retro-green/30 rounded-none px-3 py-1.5 mb-4 sm:mb-6 transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    <span className="text-retro-green text-xs sm:text-sm font-mono tracking-wider">LIVE UPDATES</span>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-retro-green rounded-none flex items-center justify-center transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                      {(() => {
                        const IconComponent = slideContent[currentSlide].icon
                        return <IconComponent className="w-6 h-6 text-black" />
                      })()}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-retro-green mb-4 sm:mb-6 font-mono tracking-wider leading-tight transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                    {slideContent[currentSlide].title}
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl text-retro-gray font-mono mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    {slideContent[currentSlide].subtitle}
                  </p>
                  
                  <p className="text-sm sm:text-base text-retro-gray font-mono mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    {slideContent[currentSlide].description}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-retro-green/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {slideContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-none transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-retro-green scale-125' 
                      : 'bg-retro-gray hover:bg-retro-green/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>


        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
          {/* Charts Section - Mobile Optimized */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105 inline-block mb-4">
                <div className="bg-black border-2 border-retro-green/30 rounded-none px-3 sm:px-4 py-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
                  <div className="relative">
                    <span className="text-retro-green font-semibold font-mono tracking-wider text-sm sm:text-base transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">LIVE CHARTS</span>
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-retro-green/10 transform rotate-45 translate-x-4 -translate-y-4 sm:translate-x-6 sm:-translate-y-6"></div>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-retro-green mb-4 font-mono tracking-wider">
                REAL-TIME <span className="text-retro-cyan">MARKET DATA</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-retro-gray max-w-3xl mx-auto px-4">
                Interactive charts and analytics to track cryptocurrency performance and market trends.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              <PriceChart />
              <VolumeChart />
            </div>
            
            <div className="mb-8 sm:mb-12">
              <MarketOverview />
            </div>
            
          </div>


          {/* Main Content - Mobile Optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <NewsGrid />
            </div>
            <div className="lg:col-span-1 space-y-6 sm:space-y-8 lg:space-y-12">
              <TrendingSection />
              <ActivityWidget />
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
