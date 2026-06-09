import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import CookieConsent from '@/components/CookieConsent';
import KonamiCode from '@/components/KonamiCode';
import ConsoleEasterEgg from '@/components/ConsoleEasterEgg';
import SudoMode from '@/components/SudoMode';
import '@fontsource/fira-code/300.css';
import '../styles/input.css';
import messages from '../i18n';

export default function App({ Component, pageProps }) {
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
        <KonamiCode />
        <ConsoleEasterEgg />
        <SudoMode />
      </CookieConsent>
    </IntlProvider>
  );
}
