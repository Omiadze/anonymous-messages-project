// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing language translations (you can add more languages later)
import en from './translations/en.json';
import ge from './translations/ge.json';

const languageFromUrl = window.location.pathname.split('/')[1] || 'en';
console.log(languageFromUrl);

i18n
  .use(initReactI18next) // Passes i18n to react-i18next
  .init({
    resources: {
      en: {
        translation: en, // English translations
      },
      ge: {
        translation: ge, // Georgian translations
      },
    },
    lng: languageFromUrl, // Default language
    fallbackLng: 'en', // Fallback language if translation is not found
    interpolation: {
      escapeValue: false, // React already escapes HTML
    },
  });

export default i18n;
