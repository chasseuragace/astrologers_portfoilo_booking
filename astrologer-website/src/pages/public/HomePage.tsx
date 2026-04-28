import { PageLayout } from '../../components/layout/PageLayout'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { CtaButton } from '../../components/ui/CtaButton'
import { useTranslation } from 'react-i18next'
import { SERVICES } from '../../constants/services'
import { useState } from 'react'

export function HomePage() {
  const { t } = useTranslation()
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <PageLayout>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic-gradient">
          {/* Cover image background */}
          <div className="absolute inset-0 opacity-40 overflow-hidden">
            <img
              src="/cover.jpeg"
              alt="Background"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center md:object-top transition-transform duration-[2000ms] ease-out ${
                imageLoaded ? 'scale-100' : 'scale-125'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/50 to-transparent"></div>
          </div>

          {/* Animated star field overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-star-field animate-pulse"></div>
          </div>

          {/* Sacred pattern overlay */}
          <div className="absolute inset-0 bg-sacred-pattern"></div>

          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-mystic-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-mystic-indigo/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <div className="mb-8 inline-block">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-glow opacity-60 blur-xl"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-3xl font-display font-bold">
                    ॐ
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 text-gold-400 tracking-wide animate-slide-up" style={{ animationDelay: '0.2s' }}>
                शालिग्राम दाहाल
              </h1>
              
              <h2 className="text-2xl md:text-4xl font-display font-medium mb-4 text-amber-100 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {t('home.subtitle')}
              </h2>
              
              <p className="text-lg md:text-xl text-gold-400/90 mb-4 max-w-3xl mx-auto leading-relaxed animate-slide-up font-display font-medium" style={{ animationDelay: '0.5s' }}>
                {t('home.locationValue')}
              </p>
              
              <p className="text-lg md:text-xl text-amber-200/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.6s' }}>
                {t('home.description')}
              </p>
              
              <div className="flex gap-6 justify-center flex-wrap animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <CtaButton to="/calendar">{t('home.bookAppointment')}</CtaButton>
                <CtaButton to="/services" variant="outline">{t('home.ourServices')}</CtaButton>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-gold-400/70 rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-24 bg-cosmic-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-sacred-pattern opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gold-400">
                {t('home.sacredServices')}
              </h2>
              <p className="text-xl text-amber-200/70 max-w-2xl mx-auto">
                {t('home.ancientWisdom')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.slice(0, 3).map((service, index) => (
                <ServiceCard
                  key={service.num}
                  num={service.num}
                  title={t(service.titleKey)}
                  description={t(service.descKey)}
                  index={index}
                  compact
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <CtaButton to="/services" variant="outline">
                {t('home.exploreServices')}
              </CtaButton>
            </div>
          </div>
        </section>

        {/* Calendar Preview */}
        <section className="py-24 bg-cosmic-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mystic-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-mystic-indigo/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-mystic-purple/30 to-mystic-indigo/30 border border-gold-400/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-400">
                {t('home.celestialCalendar')}
              </h2>
              <p className="text-xl text-amber-200/70 mb-10 leading-relaxed">
                {t('home.calendarDesc')}
              </p>
              <CtaButton to="/calendar" variant="mystic">
                {t('home.viewCalendar')}
              </CtaButton>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  )
}
