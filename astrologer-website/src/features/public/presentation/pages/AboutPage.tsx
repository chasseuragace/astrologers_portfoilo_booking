import { PageLayout } from '../../../../components/layout/PageLayout'
import { PageHeader } from '../../../../components/layout/PageHeader'
import { CosmicCard } from '../../../../components/ui/CosmicCard'
import { InfoCard } from '../../../../components/ui/InfoCard'
import { useTranslation } from 'react-i18next'
import { useServiceList } from '../../../service/presentation/hooks/service.hooks'
import { guruConfig } from '../../../../config/guru.config'

export function AboutPage() {
  const { t, i18n } = useTranslation()
  const { data: services } = useServiceList()
  const isNepali = i18n.language === 'np'
  const bio = isNepali ? guruConfig.bio.nepali : guruConfig.bio.english

  const sortedServices = services?.sort((a, b) => a.displayOrder - b.displayOrder) || []

  return (
    <PageLayout>
      <main className="flex-1 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />
          
          <CosmicCard className="mb-8">
            <h2 className="text-3xl font-display font-bold mb-4 text-amber-100">
              {isNepali ? guruConfig.name.nepali : guruConfig.name.english}
            </h2>
            <p className="text-xl mb-6 text-gold-400">{t('about.subtitle')}</p>
            <p className="text-amber-200/70 mb-6 leading-relaxed">
              {bio.intro}
            </p>
            <p className="text-amber-200/70 mb-6 leading-relaxed">
              {bio.expertise}
            </p>
            <p className="text-amber-200/70 leading-relaxed">
              {bio.services}
            </p>
          </CosmicCard>

          {/* All Services Section */}
          <CosmicCard className="mb-8">
            <h3 className="text-3xl font-display font-bold mb-6 text-amber-100">{t('about.servicesOffered')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedServices.map((service) => (
                <CosmicCard key={service.id} variant="subtle" padding="sm">
                  <h4 className="text-xl font-display font-bold mb-2 text-gold-400">{isNepali ? service.titleNp : service.titleEn}</h4>
                  <p className="text-amber-200/60 text-sm">{isNepali ? service.descriptionNp : service.descriptionEn}</p>
                </CosmicCard>
              ))}
            </div>
          </CosmicCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard label={t('about.location')} value={guruConfig.contact.location} />
            <InfoCard label={t('about.experience')} value={t('about.experienceValue')} />
            <InfoCard label={t('about.languages')} value={t('about.languagesValue')} />
          </div>
        </div>
      </main>
    </PageLayout>
  )
}
