import React from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import CoffeeCounter from './CoffeeCounter';

/*
  The footer echoes the hero: same horizon, same colours, but drawn in CSS.
  Nothing down here is interactive and a second canvas running at the bottom of
  every page would be paying twice for the same picture — see Footer.css for
  how the perspective grid is faked with one rotateX.
*/
export default function Footer() {
  const { formatMessage } = useIntl();

  return (
    <footer className="site-footer">
      <div className="footer-grid" aria-hidden="true" />
      <div className="footer-glow" aria-hidden="true" />

      <div className="md:container px-4 site-footer__inner">
        <div className="site-footer__rule" />
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">Übelacker Solutions</div>
            <div className="site-footer__meta">
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              Übelacker Solutions GmbH ·
              {' '}
              <FormattedMessage id="footer.rights" />
            </div>
            <CoffeeCounter />
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="site-footer__links">
              <Link href={formatMessage({ id: 'footer.imprint_link' })}>
                <FormattedMessage id="footer.imprint" />
              </Link>
              <Link href={formatMessage({ id: 'footer.privacy_link' })}>
                <FormattedMessage id="footer.privacy" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <a className="social-link" title="Github Profile" href="https://github.com/uebelack"><FaGithub size="1.2em" /></a>
              <a className="social-link" title="LinkedIn Profile" href="https://www.linkedin.com/in/daviduebelacker/"><FaLinkedin size="1.2em" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
