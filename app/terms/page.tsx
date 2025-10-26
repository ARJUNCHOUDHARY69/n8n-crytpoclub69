import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                TERMS OF <span className="text-crypto-gold">SERVICE</span>
              </h1>
              <p className="text-xl text-gray-400 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                LAST UPDATED: JANUARY 2025
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>ACCEPTANCE OF TERMS</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    BY ACCESSING AND USING CRYPTO CLUB 69, YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS AND PROVISION OF THIS AGREEMENT.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>USE LICENSE</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    PERMISSION IS GRANTED TO TEMPORARILY DOWNLOAD ONE COPY OF THE MATERIALS ON CRYPTO CLUB 69 FOR PERSONAL, NON-COMMERCIAL TRANSIENT VIEWING ONLY.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>DISCLAIMER</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    THE MATERIALS ON CRYPTO CLUB 69 ARE PROVIDED ON AN 'AS IS' BASIS. CRYPTO CLUB 69 MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS ALL OTHER WARRANTIES INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <Footer />
    </>
  )
}
