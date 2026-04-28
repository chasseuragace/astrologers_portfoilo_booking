import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { QRCodeSVG } from 'qrcode.react'
import { Phone, MapPin, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ContactPage() {
  const { t } = useTranslation()

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Shaligram Dahal
TITLE:Astrologer / Guru
ORG:Shaligram Dahal Astrology
TEL;TYPE=CELL:9800000000
EMAIL:shaligram@example.com
ADR;TYPE=WORK:;;Biratnagar;;Nepal
URL:https://facebook.com/shaligramdahal
NOTE:Renowned astrologer and spiritual guide specializing in Vedic astrology, vastu, and ritual ceremonies.
END:VCARD`

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <Navigation />
      <main className="flex-1 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>

        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
                ॐ
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">{t('nav.contact')}</h1>
            <p className="text-xl text-amber-200/70">
              {t('home.contactDesc')}
            </p>
          </div>

          <div className="bg-cosmic-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gold-400/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-cosmic-950" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-amber-100">Phone</h3>
                    <p className="text-amber-200/70">9800000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cosmic-950" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-amber-100">Email</h3>
                    <p className="text-amber-200/70">shaligram@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-cosmic-950" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-amber-100">{t('about.location')}</h3>
                    <p className="text-amber-200/70">{t('footer.location')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cosmic-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-amber-100">Facebook</h3>
                    <a
                      href="https://facebook.com/shaligramdahal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      facebook.com/shaligramdahal
                    </a>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-cosmic-900/50 p-6 rounded-xl border border-gold-400/20 flex flex-col items-center justify-center">
                <h3 className="font-display font-semibold text-lg mb-4 text-amber-100 text-center">Save Contact</h3>
                <p className="text-sm text-amber-200/60 mb-4 text-center">
                  Scan to save contact to your phone
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG value={vCardData} size={180} />
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-cosmic-900/50 rounded-xl border border-gold-400/20">
              <p className="text-center text-amber-200/70">
                <strong className="text-gold-400">{t('home.bookAppointment')}:</strong> {t('home.contactDesc')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
