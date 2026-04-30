import { useTranslation } from 'react-i18next'
import { guruConfig } from '../config/guru.config'

export function Footer() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()
  const isNepali = i18n.language === 'np'

  return (
    <footer className="bg-cosmic-950 border-t border-gold-400/20 py-12 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-sacred-pattern opacity-30"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-cosmic-950 text-sm font-display font-bold flex-shrink-0">ॐ</span>
              <span className="text-xl font-display font-bold text-gold-400">{isNepali ? guruConfig.name.nepali.split(' ')[0] : guruConfig.name.english.split(' ')[0]}</span>
            </div>
            <p className="text-amber-200/60 text-sm">{t('footer.title')}</p>
          </div>
          
          <div className="text-center">
            <p className="text-amber-200/80 font-display">
              {isNepali ? guruConfig.contact.location.nepali : guruConfig.contact.location.english}
            </p>
            <p className="text-amber-200/50 text-sm mt-1">{t('footer.tagline')}</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-amber-200/60 text-sm">© {currentYear} {t('footer.copyright')}</p>
            <p className="text-amber-200/40 text-xs mt-1">{t('footer.blessing')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
