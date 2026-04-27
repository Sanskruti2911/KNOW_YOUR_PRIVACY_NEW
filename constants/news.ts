import type { Lang } from './i18n';

// map app language to NewsAPI language
export const mapLangToNewsLang = (lang: Lang): string => {
  // NewsAPI supports ISO-639-1 codes, hindi is `hi`, english is `en`.[web:53][web:83]
  if (lang === 'hi') return 'hi';
  return 'en';
};

// query only privacy‑related leaks / breaches
export const PRIVACY_QUERY =
  '("data breach" OR "privacy leak" OR "privacy invasion" OR "data leak" OR "cyber fraud")';

export const buildNewsEndpoint = (lang: Lang) => {
  const newsLang = mapLangToNewsLang(lang);
  return (
    'https://newsapi.org/v2/everything?' +
    `q=${encodeURIComponent(PRIVACY_QUERY)}` +
    `&language=${newsLang}` +
    '&sortBy=publishedAt&pageSize=15'
  );
};

export const NEWS_API_KEY = 'ba5a728501294f29932512e7e93a3a57';
