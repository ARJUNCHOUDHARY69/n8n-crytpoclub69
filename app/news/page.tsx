import Footer from '@/components/Footer'

export default function NewsPage() {
  return (
    <>
      {/* Main Content - Asymmetric Design - Mobile Optimized */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* News Categories - Mobile Optimized */}
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-blue/30 rounded-none p-4 sm:p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-blue/5 to-retro-green/5"></div>
              <div className="relative">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-retro-blue mb-4 sm:mb-6 md:mb-8 text-center font-mono tracking-wider transform skew-x-2 group-hover:skew-x-0 transition-transform duration-500">
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

                  {/* Category 7 - Trading */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-yellow-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-yellow-500 text-sm sm:text-base">T</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">TRADING</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Market analysis</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 8 - Regulation */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-indigo-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-indigo-500 text-sm sm:text-base">R</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">REGULATION</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Legal updates</p>
                      </div>
                    </div>
                  </div>

                  {/* Category 9 - Security */}
                  <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-pink-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <span className="text-white font-bold group-hover:text-pink-500 text-sm sm:text-base">S</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs sm:text-sm">SECURITY</h4>
                        <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Cybersecurity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-retro-blue/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
            </div>
          </div>

          {/* News Articles Grid - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 md:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* News 1 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-orange-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 1</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Latest updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news1.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 2 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 2</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Market insights</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news2.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 2"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 3 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-green-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 3</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">DeFi updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news3.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 3"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 4 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 4</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">NFT trends</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news4.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 5 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">5</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 5</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Web3 news</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news5.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 6 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-red-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">6</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 6</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Blockchain tech</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news6.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 7 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">7</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 7</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Trading analysis</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news7.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 7"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 8 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">8</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 8</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Regulation updates</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news8.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 8"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>

              {/* News 9 */}
              <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-pink-500/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">9</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">News Article 9</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Security alerts</p>
                  </div>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  <iframe 
                    src="/dropbox-downloads/news9.html" 
                    className="w-full h-32 border-0 rounded"
                    title="News 9"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-pink-400 text-xs sm:text-sm font-semibold">READ MORE</span>
                  <span className="text-gray-400 text-xs">→</span>
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