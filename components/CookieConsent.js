import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactCookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

export const COOKIE_NAME = 'uebelacker_cookie_consent';

const CookieContext = React.createContext(getCookieConsentValue(COOKIE_NAME) === 'true');

export function useCookieConsent() {
  return React.useContext(CookieContext);
}

export default function CookieConsent({ children }) {
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);

  useEffect(() => setCookieConsentAccepted(getCookieConsentValue(COOKIE_NAME) === 'true'), []);

  const { formatMessage } = useIntl();
  return (
    <CookieContext.Provider value={cookieConsentAccepted}>
      <ReactCookieConsent
        location="bottom"
        buttonText={formatMessage({ id: 'cookie_consent.accept' })}
        cookieName={COOKIE_NAME}
        onAccept={() => setCookieConsentAccepted(true)}
      >
        <FormattedMessage id="cookie_consent.message" />{' '}
        <a href={formatMessage({ id: 'footer.privacy_link' })} className="underline underline-offset-2">
          {formatMessage({ id: 'footer.privacy' })}
        </a>
        .
      </ReactCookieConsent>
      {children}
    </CookieContext.Provider>
  );
}
