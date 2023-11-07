/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';

export default function Footer() {
  const { formatMessage } = useIntl();
  return (
    <footer className="md:container mt-20 mb-20">
      <div className="mb-2 px-4 my-4">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        Übelacker Solutions GmbH
        <br />
        <Link href={formatMessage({ id: 'footer.imprint_link' })}><FormattedMessage id="footer.imprint" /></Link>
        {' '}
        |
        {' '}
        <Link href={formatMessage({ id: 'footer.privacy_link' })}><FormattedMessage id="footer.privacy" /></Link>
      </div>
    </footer>
  );
}
