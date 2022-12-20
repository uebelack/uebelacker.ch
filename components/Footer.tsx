import React from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';
// import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { formatMessage } = useIntl();
  return (
    <footer className="md:container mb-20">
      <div className="mb-2">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        Übelacker Solutions GmbH
        |
        {' '}
        <Link href={formatMessage({ id: 'footer.imprint_link' })}><FormattedMessage id="footer.imprint" /></Link>
        {' '}
        |
        {' '}
        <Link href={formatMessage({ id: 'footer.privacy_link' })}><FormattedMessage id="footer.privacy" /></Link>
      </div>
    </footer>
  );
}
