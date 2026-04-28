import { PageLayout } from '../../components/layout/PageLayout'
import { PageHeader } from '../../components/layout/PageHeader'
import { CosmicBackground } from '../../components/layout/CosmicBackground'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { CtaButton } from '../../components/ui/CtaButton'
import { useTranslation } from 'react-i18next'
import { SERVICES } from '../../constants/services'

export function ServicesPage() {
  const { t } = useTranslation()

  return (
    <PageLayout>
      <main className="flex-1 relative overflow-hidden">
        <CosmicBackground showOrbs />
        
        <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
          <PageHeader title={t('services.title')} subtitle={t('services.description')} />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.num}
                num={service.num}
                title={t(service.titleKey)}
                description={t(service.descKey)}
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
        </div>
      </main>
    </PageLayout>
  )
}
