import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES, resolveBrowserLang } from '@/data/languages';
import { STORAGE_KEYS } from '@/lib/storageKeys';

import translationDK from '@/locales/dk/translation.json';
import translationEN from '@/locales/en/translation.json';
import translationES from '@/locales/es/translation.json';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
  dk: { translation: translationDK },
};

// Retrieve saved language or default to generic browser navigator
const savedLanguage =
  localStorage.getItem(STORAGE_KEYS.lang) || resolveBrowserLang(navigator.language);

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: LANGUAGES[0].code,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
