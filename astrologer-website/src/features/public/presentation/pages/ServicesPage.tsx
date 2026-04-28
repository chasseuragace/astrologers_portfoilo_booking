import { PageLayout } from '../../../../components/layout/PageLayout'
import { PageHeader } from '../../../../components/layout/PageHeader'
import { CosmicBackground } from '../../../../components/layout/CosmicBackground'
import { ServiceCard } from '../../../../components/ui/ServiceCard'
import { CtaButton } from '../../../../components/ui/CtaButton'
import { useTranslation } from 'react-i18next'
import { useServiceList } from '../../../service/presentation/hooks/service.hooks'

export function ServicesPage() {
  const { t, i18n } = useTranslation()
  const { data: services, isLoading } = useServiceList()
  const isNepali = i18n.language === 'np'

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
        </div>
      </main>
    </PageLayout>
  )
}
