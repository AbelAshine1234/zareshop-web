import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import enCommon from './en/common.json'
import amCommon from './am/common.json'
import omCommon from './om/common.json'

const resources = {
  en: {
    common: enCommon
  },
  am: {
    common: amCommon
  },
  om: {
    common: omCommon
  }
}

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('zareshop-language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    // Enable debug in development
    debug: process.env.NODE_ENV === 'development',
    
    // React options
    react: {
      useSuspense: false
    }
  })

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('zareshop-language', lng)
})

export default i18n

// Export supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' }
]

// Export helper functions
export const getCurrentLanguage = () => i18n.language
export const changeLanguage = (lng) => i18n.changeLanguage(lng)
export const isRTL = () => ['am'].includes(i18n.language) // Amharic can be RTL in some contexts
