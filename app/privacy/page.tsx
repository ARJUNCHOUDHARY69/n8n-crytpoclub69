import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                PRIVACY <span className="text-crypto-gold">POLICY</span>
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
                  }}>INFORMATION WE COLLECT</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    WE COLLECT INFORMATION YOU PROVIDE DIRECTLY TO US, SUCH AS WHEN YOU CREATE AN ACCOUNT, SUBSCRIBE TO OUR NEWSLETTER, OR CONTACT US. THIS MAY INCLUDE YOUR NAME, EMAIL ADDRESS, AND ANY OTHER INFORMATION YOU CHOOSE TO PROVIDE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>HOW WE USE YOUR INFORMATION</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    WE USE THE INFORMATION WE COLLECT TO PROVIDE, MAINTAIN, AND IMPROVE OUR SERVICES, COMMUNICATE WITH YOU, AND COMPLY WITH LEGAL OBLIGATIONS.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>CONTACT US</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    IF YOU HAVE ANY QUESTIONS ABOUT THIS PRIVACY POLICY, PLEASE CONTACT US AT ARJUN.CHOUDHARY00070@GMAIL.COM
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
