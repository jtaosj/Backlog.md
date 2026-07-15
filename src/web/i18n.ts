import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import zh from '../locales/zh/translation.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

function detectInitialLanguage(): string {
  try {
    const stored = (window.localStorage && window.localStorage.getItem('backlog:lang')) || undefined;
    if (stored) return stored;
  } catch {}
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
  if (typeof nav === 'string' && nav.length > 0) {
    return nav.split('-')[0];
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: detectInitialLanguage(),
  supportedLngs: ['en', 'zh'],
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: { escapeValue: false },
});

export default i18n;
