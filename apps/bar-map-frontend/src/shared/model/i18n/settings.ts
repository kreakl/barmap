export const fallbackLng = 'ru';
export const languages = [fallbackLng, 'en'];
export const defaultNS = 'ru';
export const cookieName = 'i18next';

// eslint-disable-next-line @typescript-eslint/default-param-last
export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
