import { PageLayout } from '../../components/layout/PageLayout'
import { PageHeader } from '../../components/layout/PageHeader'
import { CosmicCard } from '../../components/ui/CosmicCard'
import { ContactItem } from '../../components/ui/ContactItem'
import { QRCodeSVG } from 'qrcode.react'
import { MapPin, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ContactPage() {
  const { t } = useTranslation()

  const vCardData = `BEGIN:VCARD
VERSION:4.0
FN:Shaligram Dahal
N:Dahal;Shaligram;;;
TITLE:${t('vcard.title')}
ORG:${t('vcard.org')}
TEL;TYPE=CELL;VALUE=uri:tel:+977-9842081092
EMAIL:shaligramdahal2012@gmail.com
ADR;TYPE=WORK:;;Biratnagar Pitchara;;Nepal
URL:https://shaligram-guru.netlify.app
X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/shaligram.dahal.58
NOTE:${t('vcard.note')}
END:VCARD`

  return (
    <PageLayout>
      <main className="flex-1 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
        <div className="absolute inset-0 bg-sacred-pattern"></div>

        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <PageHeader title={t('nav.contact')} subtitle={t('home.contactDesc')} />

          <CosmicCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <ContactItem label="Phone">
                  <a href="tel:+977-9842081092" className="text-gold-400 hover:text-gold-300 transition-colors">
                    +977-9842081092
                  </a>
                </ContactItem>

                <ContactItem label="Email">
                  <a href="mailto:shaligramdahal2012@gmail.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                    shaligramdahal2012@gmail.com
                  </a>
                </ContactItem>

                <ContactItem label="Location" icon={<MapPin className="w-6 h-6 text-cosmic-950" />}>
                  <p className="text-amber-200/70">Biratnagar Pitchara, Nepal</p>
                </ContactItem>

                <ContactItem label="Website" icon={<Globe className="w-6 h-6 text-cosmic-950" />}>
                  <a href="https://shaligram-guru.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">
                    shaligram-guru.netlify.app
                  </a>
                </ContactItem>

                <ContactItem label="Facebook" icon={
                  <svg className="w-6 h-6 text-cosmic-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }>
                  <a
                    href="https://www.facebook.com/shaligram.dahal.58"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    facebook.com/shaligram.dahal.58
                  </a>
                </ContactItem>
              </div>

              {/* QR Code */}
              <CosmicCard variant="inner" className="flex flex-col items-center justify-center">
                <h3 className="font-display font-semibold text-lg mb-4 text-amber-100 text-center">{t('vcard.saveContact')}</h3>
                <p className="text-sm text-amber-200/60 mb-4 text-center">
                  {t('vcard.scanToSave')}
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG 
                    value={vCardData} 
                    size={200} 
                    level="H"
                    imageSettings={{
                      src: '/ganpati.png',
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
                <p className="text-xs text-amber-200/50 mt-4 text-center">
                  vCard QR Code
                </p>
              </CosmicCard>
            </div>

            <CosmicCard variant="inner" className="mt-8">
              <p className="text-center text-amber-200/70">
                <strong className="text-gold-400">Ready to book an appointment?</strong> Visit the{' '}
                <a href="/calendar" className="text-gold-400 hover:text-gold-300 transition-colors underline">calendar page</a> to schedule your consultation.
              </p>
            </CosmicCard>
          </CosmicCard>

          {/* Google Maps Street View */}
          <CosmicCard className="mt-8">
            <h3 className="font-display font-semibold text-xl mb-4 text-amber-100 text-center">
              <MapPin className="w-5 h-5 inline-block mr-2 text-gold-400" />
              {t('home.locationTitle')}
            </h3>
            <div className="rounded-xl overflow-hidden border border-gold-400/10" style={{ height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1777363375827!6m8!1m7!1s-OjsCWsOaBtNyBFCbsIY1A!2m2!1d26.45236569653541!2d87.26708356223959!3f182.12!4f6.569999999999993!5f0.4000000000000002"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Street View"
              ></iframe>
            </div>
            <p className="text-xs text-amber-200/50 mt-3 text-center">
              Biratnagar 11, Pitchara Chowk
            </p>
          </CosmicCard>
        </div>
      </main>
    </PageLayout>
  )
}
