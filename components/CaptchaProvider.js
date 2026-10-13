import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCookieConsent } from './CookieConsent';

/*
  One reCAPTCHA provider for the whole app.

  Two things need a token — the contact form and the shell's `mail` command —
  and they must not each mount their own provider. The library tears the shared
  script out of the document on unmount: it removes `#google-recaptcha-v3` and
  the gstatic release script and clears `window.___grecaptcha_cfg`. A provider
  scoped to the shell would break the contact form's captcha every time the
  terminal was closed.

  The provider is mounted only once consent exists, and that is load-bearing,
  not just a privacy nicety. Internally the library does:

      const keyRef = useRef(reCaptchaKey)        // captured on FIRST render
      ...
      grecaptcha.execute(keyRef.current, { action })

  It never refreshes that ref when the prop changes. An earlier version here
  kept the tree shape constant and flipped `reCaptchaKey` from undefined to the
  real key on consent, to avoid remounting the subtree. That looked tidier and
  silently broke both consumers in production: the ref had already captured
  `undefined`, so every token request became `grecaptcha.execute(undefined)` —
  "No reCAPTCHA clients exist" — and no message could be sent. Since
  CookieConsent always starts false and resolves in an effect, the first render
  never has the key, so it failed for everyone, returning visitors included.

  So the provider has to be born with the key. The cost is that accepting
  cookies remounts what is underneath — the same thing the contact form did
  before this was hoisted, and it happens in the first frames of a page load
  rather than mid-session.
*/
export default function CaptchaProvider({ children }) {
  const cookiesAccepted = useCookieConsent();

  if (!cookiesAccepted) return children;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
