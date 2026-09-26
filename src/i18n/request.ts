import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/landing.json`)).default,
      ...(await import(`../../messages/${locale}/notFound.json`)).default,
      ...(await import(`../../messages/${locale}/metadata.json`)).default,
      ...(await import(`../../messages/${locale}/contactForm.json`)).default,
      ...(await import(`../../messages/${locale}/project.json`)).default,
      ...(await import(`../../messages/${locale}/projects.json`)).default,
    },
  };
});