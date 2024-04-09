import type ru from './locales/ru/ru.json';

interface I18nNamespaces {
  ru: typeof ru;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ru';
    resources: I18nNamespaces;
    returnNull: false;
  }
}
