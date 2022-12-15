import React, { ReactNode, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactCookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

const CookieContext = React.createContext(getCookieConsentValue('uebelacker_cookie_consent') === 'true');

export function useCookieConsent() {
  return React.useContext(CookieContext);
}

export default function CookieConsent({ children } : { children: ReactNode }) {
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(getCookieConsentValue('uebelacker_cookie_consent') === 'true');

  const { formatMessage } = useIntl();
  return (
    <CookieContext.Provider value={cookieConsentAccepted}>
      <ReactCookieConsent
        location="bottom"
        buttonText={formatMessage({ id: 'cookie_consent.accept' })}
        cookieName="uebelacker_cookie_consent"
        onAccept={() => setCookieConsentAccepted(true)}
      >
        <FormattedMessage id="cookie_consent.message" />
        {' '}
        <a href={formatMessage({ id: 'footer.privacy_link' })} className="underline underline-offset-2">{formatMessage({ id: 'footer.privacy' })}</a>
        .
      </ReactCookieConsent>
      {children}
    </CookieContext.Provider>
  );
}
