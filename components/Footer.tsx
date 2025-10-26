import { Twitter, Linkedin, Mail, Phone, MapPin, MessageCircle, Square, Github } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section - Asymmetric Design */}
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-green/30 rounded-none p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-green/5 to-retro-cyan/5"></div>
              <div className="relative space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 relative transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/logo.png"
                      alt="CRYPTO CLUB 69 Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-retro-green font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                      CRYPTO CLUB 69
                    </h3>
                    <p className="text-sm text-retro-gray font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                      CRYPTO NEWS HUB
                    </p>
                  </div>
                </div>
                <p className="text-retro-gray text-sm font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  PROFESSIONAL CRYPTOCURRENCY INTELLIGENCE PLATFORM. AI-GENERATED VISUAL ASSETS BY GOOGLE GEMINI AI. 
                  HIGH-QUALITY CONTENT • PROFESSIONAL DESIGN • CRYPTO CLUB 69.
                </p>
                <div className="flex flex-wrap gap-6">
                  <a href="https://x.com/choudhary00070" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="X (Twitter)">
                    <div className="bg-black border border-retro-red/30 rounded-none p-2 hover:border-retro-green/50 transition-all duration-300">
                      <Twitter className="w-6 h-6 text-retro-red" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-red animate-pulse"></div>
                  </a>
                  <a href="https://www.linkedin.com/in/arjunchoudhary69/" target="_blank" rel="noopener noreferrer" className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="LinkedIn">
                    <div className="bg-black border border-retro-cyan/30 rounded-none p-2 hover:border-retro-amber/50 transition-all duration-300">
                      <Linkedin className="w-6 h-6 text-retro-cyan" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-cyan animate-pulse"></div>
                  </a>
                  <a href="https://t.me/CRYPTOCLUB69BINANCE" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="Telegram">
                    <div className="bg-black border border-retro-amber/30 rounded-none p-2 hover:border-retro-magenta/50 transition-all duration-300">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center p-1">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                          alt="Telegram" 
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-amber animate-pulse"></div>
                  </a>
                  <a href="https://www.binance.com/en-IN/square/profile/cryptoclub69" target="_blank" rel="noopener noreferrer" className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="Binance Square">
                    <div className="bg-black border border-retro-magenta/30 rounded-none p-2 hover:border-retro-red/50 transition-all duration-300">
                      <img 
                        src="/Screenshot 2025-10-23 092443-removebg-preview.jpg" 
                        alt="Binance Square" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-magenta animate-pulse"></div>
                  </a>
                  <a href="https://github.com/ARJUNCHOUDHARY69" target="_blank" rel="noopener noreferrer" className="relative group transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110" title="GitHub">
                    <div className="bg-black border border-retro-red/30 rounded-none p-2 hover:border-retro-green/50 transition-all duration-300">
                      <Github className="w-6 h-6 text-retro-red" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-retro-red animate-pulse"></div>
                  </a>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-retro-green/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
              </div>
            </div>
          </div>

          {/* Navigation Links - Asymmetric Design */}
          <div className="relative group transform -rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-cyan/30 rounded-none p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-cyan/5 to-retro-amber/5"></div>
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-retro-cyan font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  NAVIGATION
                </h4>
                <ul className="space-y-2">
                  <li><a href="/news" className="text-retro-gray hover:text-retro-amber transition-colors font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    CRYPTO NEWS
                  </a></li>
                  <li><a href="/markets" className="text-retro-gray hover:text-retro-amber transition-colors font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    LIVE MARKETS
                  </a></li>
                  <li><a href="/analysis" className="text-retro-gray hover:text-retro-amber transition-colors font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    MARKET ANALYSIS
                  </a></li>
                  <li><a href="/article" className="text-retro-gray hover:text-retro-amber transition-colors font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    CRYPTO ARTICLES
                  </a></li>
                  <li><a href="/image-gallery" className="text-retro-gray hover:text-retro-amber transition-colors font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                    AI IMAGE GALLERY
                  </a></li>
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-retro-cyan/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
            </div>
          </div>


          {/* Contact Info - Asymmetric Design */}
          <div className="relative group transform rotate-1 hover:rotate-0 transition-all duration-700 hover:scale-105">
            <div className="bg-black border-2 border-retro-amber/30 rounded-none p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-retro-amber/5 to-retro-magenta/5"></div>
              <div className="relative">
                <h4 className="text-lg font-semibold mb-4 text-retro-amber font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500">
                  CONTACT US
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-retro-amber" />
                    <a 
                      href="mailto:arjun.choudhary00070@gmail.com" 
                      className="text-retro-gray hover:text-retro-magenta transition-colors text-sm font-mono tracking-wider transform -skew-x-1 group-hover:skew-x-0 transition-transform duration-500"
                    >
                      ARJUN.CHOUDHARY00070@GMAIL.COM
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-retro-amber" />
                    <a 
                      href="https://www.google.com/maps/place/Mumbai,+Maharashtra,+India" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-retro-gray hover:text-retro-magenta transition-colors text-sm font-mono tracking-wider transform skew-x-1 group-hover:skew-x-0 transition-transform duration-500"
                    >
                      MUMBAI, INDIA
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-retro-amber/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center space-y-4">
            <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.2)'
            }}>
              © 2025 CRYPTO CLUB 69. ALL RIGHTS RESERVED.
            </div>
            
                <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
                  textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                  filter: 'contrast(1.2)'
                }}>
                  <a href="/privacy" className="hover:text-crypto-gold transition-colors">PRIVACY POLICY</a>
                  <span className="mx-2">•</span>
                  <a href="/terms" className="hover:text-crypto-gold transition-colors">TERMS OF SERVICE</a>
                  <span className="mx-2">•</span>
                  <a href="/cookies" className="hover:text-crypto-gold transition-colors">COOKIE SETTINGS</a>
                  <span className="mx-2">•</span>
                  <a href="/security" className="hover:text-crypto-gold transition-colors">SECURITY</a>
                </div>
            
            <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.2)'
            }}>
              DO NOT SELL OR SHARE MY PERSONAL INFORMATION
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

