import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import np from './locales/np.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      np: { translation: np }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

// Set data-lang attribute on body when language changes
i18n.on('languageChanged', (lng) => {
  document.body.setAttribute('data-lang', lng)
})

// Set initial language attribute
document.body.setAttribute('data-lang', i18n.language)

export default i18n
