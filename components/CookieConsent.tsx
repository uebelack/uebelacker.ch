import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactCookieConsent from 'react-cookie-consent';

export default function CookieConsent() {
  const { formatMessage } = useIntl();
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText={formatMessage({ id: 'cookie_consent.dismiss' })}
      cookieName="david_uebelacker_consent"
    >
      <FormattedMessage id="cookie_consent.message" />
      {' '}
      <a href={formatMessage({ id: 'footer.privacy_link' })}><FormattedMessage id="cookie_consent.link" /></a>
    </ReactCookieConsent>
  );
}
