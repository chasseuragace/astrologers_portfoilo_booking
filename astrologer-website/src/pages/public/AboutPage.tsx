import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t } = useTranslation()

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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">{t('about.title')}</h1>
          </div>
          
          <div className="bg-cosmic-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gold-400/20 mb-8">
            <h2 className="text-3xl font-display font-bold mb-4 text-amber-100">शालिग्राम दाहाल</h2>
            <p className="text-xl mb-6 text-gold-400">{t('about.subtitle')}</p>
            <p className="text-amber-200/70 mb-6 leading-relaxed">
              {t('about.intro')}
            </p>
            <p className="text-amber-200/70 mb-6 leading-relaxed">
              {t('about.expertise')}
            </p>
            <p className="text-amber-200/70 leading-relaxed">
              {t('about.services')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <h3 className="text-2xl font-display font-bold mb-3 text-amber-100">{t('about.location')}</h3>
              <p className="text-amber-200/70">{t('about.locationValue')}</p>
            </div>
            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <h3 className="text-2xl font-display font-bold mb-3 text-amber-100">{t('about.experience')}</h3>
              <p className="text-amber-200/70">{t('about.experienceValue')}</p>
            </div>
            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <h3 className="text-2xl font-display font-bold mb-3 text-amber-100">{t('about.specializations')}</h3>
              <ul className="text-amber-200/70 space-y-2">
                <li>• {t('about.kundaliAnalysis')}</li>
                <li>• {t('about.vastuConsultation')}</li>
                <li>• {t('about.marriageCompatibility')}</li>
                <li>• {t('about.muhuratDetermination')}</li>
              </ul>
            </div>
            <div className="bg-cosmic-800/40 backdrop-blur-sm p-6 rounded-xl border border-gold-400/20">
              <h3 className="text-2xl font-display font-bold mb-3 text-amber-100">{t('about.languages')}</h3>
              <p className="text-amber-200/70">{t('about.languagesValue')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
