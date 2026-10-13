import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCookieConsent } from './CookieConsent';

/*
  One reCAPTCHA provider for the whole app.

  There are two things that need a token — the contact form and the shell's
  `mail` command — and they must not each mount their own provider. The
  library tears the shared script out of the document on unmount: it removes
  `#google-recaptcha-v3`, removes the gstatic release script and clears
  `window.___grecaptcha_cfg`. So a provider scoped to the shell would break the
  contact form's captcha every time the terminal was closed, silently, with the
  form left unable to mint a token until a full reload.

  The provider is always rendered and the *key* is what's conditional. Swapping
  between `{children}` and `<Provider>{children}</Provider>` on consent would
  change the shape of the tree and remount everything under it — resetting the
  shell's scrollback and re-rolling the hero's quote the instant someone
  accepted cookies. With a constant shape, consent just flips the key from
  undefined to real; the provider's effect depends on the key, so that is also
  what triggers the script to load. Until then it injects nothing.
*/
export default function CaptchaProvider({ children }) {
  const cookiesAccepted = useCookieConsent();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={cookiesAccepted ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : undefined}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
