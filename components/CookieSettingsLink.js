import React from 'react';
import { resetCookieConsentValue } from 'react-cookie-consent';
import { COOKIE_NAME } from './CookieConsent';

/*
  Withdrawing consent has to be as easy as giving it was (Art. 7(3) GDPR), and
  "clear your cookies" is not. This is the footer's way back to the banner:
  it drops the consent cookie and whatever Analytics left behind, then reloads
  so the banner comes back up and neither Analytics nor reCAPTCHA is loaded
  again until somebody accepts a second time.
*/
const ANALYTICS_COOKIE = /^(_ga|_gid|_gat)/;

function forget(name) {
  const { hostname } = window.location;
  const domains = ['', `; domain=${hostname}`, `; domain=.${hostname}`];
  domains.forEach((domain) => {
    document.cookie = `${name}=; path=/; max-age=0${domain}`;
  });
}

export default function CookieSettingsLink({ children }) {
  const reopen = () => {
    document.cookie
      .split(';')
      .map((entry) => entry.split('=')[0].trim())
      .filter((name) => ANALYTICS_COOKIE.test(name))
      .forEach(forget);
    resetCookieConsentValue(COOKIE_NAME);
    forget(COOKIE_NAME);
    window.location.reload();
  };

  return (
    <button type="button" onClick={reopen}>
      {children}
    </button>
  );
}
