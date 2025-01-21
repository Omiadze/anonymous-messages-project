import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import ka from './translations/ka.json';

const languageFromUrl = window.location.pathname.split('/')[1] || 'en';
console.log(languageFromUrl);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ka: {
      translation: ka,
    },
  },
  lng: languageFromUrl,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
