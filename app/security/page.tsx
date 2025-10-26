import Footer from '@/components/Footer'

export default function Security() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                <span className="text-crypto-gold">SECURITY</span>
              </h1>
              <p className="text-xl text-gray-400 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                PROTECTING YOUR DATA AND PRIVACY
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>DATA PROTECTION</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    WE IMPLEMENT APPROPRIATE TECHNICAL AND ORGANIZATIONAL SECURITY MEASURES TO PROTECT YOUR PERSONAL INFORMATION AGAINST UNAUTHORIZED ACCESS, ALTERATION, DISCLOSURE, OR DESTRUCTION.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>ENCRYPTION</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    ALL DATA TRANSMITTED BETWEEN YOUR DEVICE AND OUR SERVERS IS ENCRYPTED USING INDUSTRY-STANDARD SSL/TLS PROTOCOLS. WE USE 256-BIT ENCRYPTION TO ENSURE MAXIMUM SECURITY.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>SECURE INFRASTRUCTURE</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    OUR WEBSITE IS HOSTED ON SECURE, ENTERPRISE-GRADE SERVERS WITH REGULAR SECURITY UPDATES AND MONITORING. WE EMPLOY MULTIPLE LAYERS OF SECURITY TO PROTECT AGAINST CYBER THREATS.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>REPORTING SECURITY ISSUES</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    IF YOU DISCOVER A SECURITY VULNERABILITY, PLEASE REPORT IT TO US IMMEDIATELY AT ARJUN.CHOUDHARY00070@GMAIL.COM. WE APPRECIATE YOUR HELP IN KEEPING OUR PLATFORM SECURE.
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
