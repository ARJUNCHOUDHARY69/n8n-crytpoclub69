import Footer from '@/components/Footer'

export default function NewsPage() {
  return (
    <>
      {/* Main Content - Asymmetric Design */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* News Categories */}
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-blue/30 rounded-none p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-bold text-retro-blue mb-6 sm:mb-8 text-center font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
                  NEWS CATEGORIES
                </h3>
              
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {/* Category 1 - Bitcoin */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-orange-500 text-sm sm:text-base">₿</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">BITCOIN</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Latest BTC news</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 2 - Ethereum */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-blue-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-blue-500 text-sm sm:text-base">Ξ</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">ETHEREUM</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">ETH ecosystem</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3 - DeFi */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-green-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-green-500 text-sm sm:text-base">D</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">DEFI</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Decentralized finance</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 4 - NFTs */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-purple-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-purple-500 text-sm sm:text-base">N</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">NFTs</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Non-fungible tokens</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 5 - Web3 */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-cyan-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-cyan-500 text-sm sm:text-base">W</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">WEB3</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Next-gen internet</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 6 - Blockchain */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-red-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-red-500 text-sm sm:text-base">B</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">BLOCKCHAIN</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Distributed ledger</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-retro-blue/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
            </div>
          </div>

          {/* News Articles Grid */}
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Article 1 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-crypto-gold/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">₿</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Bitcoin Reaches New ATH</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  Bitcoin has reached a new all-time high, breaking through the $100,000 barrier for the first time in history.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs sm:text-sm font-semibold">+15.2%</span>
                  <span className="text-gray-400 text-xs">Read More →</span>
                </div>
              </div>

              {/* Article 2 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">Ξ</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Ethereum 2.0 Upgrade</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">4 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  The Ethereum network has successfully completed its transition to Proof of Stake, reducing energy consumption by 99.9%.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs sm:text-sm font-semibold">+8.7%</span>
                  <span className="text-gray-400 text-xs">Read More →</span>
                </div>
              </div>

              {/* Article 3 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-green-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">D</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">DeFi TVL Surges</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">6 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  Total Value Locked in DeFi protocols has reached $200 billion, marking a new milestone in decentralized finance.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs sm:text-sm font-semibold">+12.3%</span>
                  <span className="text-gray-400 text-xs">Read More →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}