/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import CookieConsent from '@components/CookieConsent';
import '@fontsource/fira-code/300.css';
import '../styles/output.css';
import messages from '../i18n';

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  const language = locale && locale.startsWith('de') ? 'de' : 'en';

  return (
    <IntlProvider
      locale={language}
      defaultLocale="en"
      messages={messages[language]}
    >
      <CookieConsent>
        <Component {...pageProps} />
      </CookieConsent>
    </IntlProvider>
  );
}
