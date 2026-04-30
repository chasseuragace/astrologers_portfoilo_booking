import { useState } from 'react'
import { PageLayout } from '../../../../components/layout/PageLayout'
import { PageHeader } from '../../../../components/layout/PageHeader'
import { CosmicBackground } from '../../../../components/layout/CosmicBackground'
import { ServiceCard } from '../../../../components/ui/ServiceCard'
import { CtaButton } from '../../../../components/ui/CtaButton'
import { useTranslation } from 'react-i18next'
import { useServiceList } from '../../../service/presentation/hooks/service.hooks'
import { X } from 'lucide-react'

export function ServicesPage() {
  const { t, i18n } = useTranslation()
  const { data: services, isLoading } = useServiceList()
  const isNepali = i18n.language === 'np'
  const [showQrDialog, setShowQrDialog] = useState(false)

  if (isLoading) {
    return (
      <PageLayout>
        <main className="flex-1 relative overflow-hidden">
          <CosmicBackground showOrbs />
          <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
            <div className="text-gold-400 font-display text-xl animate-pulse">Loading services...</div>
          </div>
        </main>
      </PageLayout>
    )
  }

  const sortedServices = services?.sort((a, b) => a.displayOrder - b.displayOrder) || []

  return (
    <PageLayout>
      <main className="flex-1 relative overflow-hidden">
        <CosmicBackground showOrbs />
        
        <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
          <PageHeader title={t('services.title')} subtitle={t('services.description')} />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {sortedServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                num={String(service.displayOrder).padStart(2, '0')}
                title={isNepali ? service.titleNp : service.titleEn}
                description={isNepali ? service.descriptionNp : service.descriptionEn}
                index={index}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <CtaButton to="/calendar" size="large" glow>
              {t('services.beginJourney')}
            </CtaButton>
          </div>

          {/* Donation Section */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowQrDialog(true)}
              className="text-amber-300/70 hover:text-amber-200 transition-colors text-sm font-medium underline underline-offset-4 decoration-amber-400/30 hover:decoration-amber-400"
            >
              सेवा निरन्तर राख्न सहयोगका लागि → यहाँ थिच्नुहोस्
            </button>
          </div>
        </div>
      </main>

      {/* QR Code Dialog */}
      {showQrDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-cosmic-800 border border-gold-400/20 p-6 shadow-2xl mx-4">
            <div className="relative flex items-center justify-center mb-4">
              <h3 className="text-lg font-display font-bold text-amber-100">सहयोग गर्नुहोस्</h3>
              <button
                onClick={() => setShowQrDialog(false)}
                className="absolute right-0 text-amber-300/60 hover:text-amber-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="text-amber-200/90 text-sm mb-6 text-center font-display leading-relaxed">
              <p>ॐ हिरण्यगर्भ गर्भस्थं हेमबीजं विभावसोः ।</p>
              <p>अनन्तपुण्यफलदं अतः शान्तिं प्रयच्छ मे ॥</p>
            </div>
            <div className="flex justify-center">
              <img
                src="/gallery/qr.png"
                alt="QR Code for donation"
                className="w-48 h-48 rounded-lg object-contain bg-amber-100/10"
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
