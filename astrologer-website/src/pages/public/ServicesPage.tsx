import { Navigation } from '../../components/Navigation'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function ServicesPage() {
  const { t } = useTranslation()

  const services = [
    {
      title: t('services.kundaliTitle'),
      description: t('services.kundaliDesc'),
      num: '01'
    },
    {
      title: t('services.vastuTitle'),
      description: t('services.vastuDesc'),
      num: '02'
    },
    {
      title: t('services.shraddhaTitle'),
      description: t('services.shraddhaDesc'),
      num: '03'
    },
    {
      title: t('services.pujaTitle'),
      description: t('services.pujaDesc'),
      num: '04'
    },
    {
      title: t('services.muhuratTitle'),
      description: t('services.muhuratDesc'),
      num: '05'
    },
    {
      title: t('services.generalTitle'),
      description: t('services.generalDesc'),
      num: '06'
    },
    {
      title: t('services.gunaMilanTitle'),
      description: t('services.gunaMilanDesc'),
      num: '07'
    },
    {
      title: t('services.brataPuranTitle'),
      description: t('services.brataPuranDesc'),
      num: '08'
    },
    {
      title: t('services.shantiPujaTitle'),
      description: t('services.shantiPujaDesc'),
      num: '09'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-950 font-body">
      <Navigation />
      <main className="flex-1 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mystic-indigo/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
                ॐ
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gold-400">
              {t('services.title')}
            </h1>
            <p className="text-xl text-amber-200/70 max-w-3xl mx-auto leading-relaxed">
              {t('services.description')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-cosmic-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-400/10 flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center text-gold-400 font-display font-bold text-xl mb-6">{service.num}</div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-amber-100">{service.title}</h3>
                  <p className="text-amber-200/60 leading-relaxed flex-1">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg blur-xl opacity-30 animate-glow"></div>
              <Link
                to="/booking"
                className="relative px-12 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-950 font-display font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/30 hover:scale-105 inline-block"
              >
                {t('services.beginJourney')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
