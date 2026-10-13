import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import CookieConsent from '@/components/CookieConsent';
import CaptchaProvider from '@/components/CaptchaProvider';
import KonamiCode from '@/components/KonamiCode';
import ConsoleEasterEgg from '@/components/ConsoleEasterEgg';
import SudoMode from '@/components/SudoMode';
import CrtOverlay from '@/components/CrtOverlay';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';
import '@fontsource/fira-code/300.css';
import '@fontsource/fira-code/400.css';
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/orbitron/900.css';
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
        <CaptchaProvider>
          <Component {...pageProps} />
          {/* Chrome that belongs to the whole site rather than any one page. */}
          <ScrollProgress />
          <CursorGlow />
          <CrtOverlay />
          <KonamiCode />
          <ConsoleEasterEgg />
          <SudoMode />
        </CaptchaProvider>
      </CookieConsent>
    </IntlProvider>
  );
}
