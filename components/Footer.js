import React from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';

export default function Footer() {
  const { formatMessage } = useIntl();
  return (
    <footer className="md:container mt-24 mb-16">
      <div className="px-4">
        <div className="border-t border-gray-light dark:border-gray-dark pt-8">
          <div className="text-gray-dark dark:text-gray text-sm">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            Übelacker Solutions GmbH
          </div>
          <div className="mt-2 text-sm flex gap-3">
            <Link href={formatMessage({ id: 'footer.imprint_link' })} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="footer.imprint" /></Link>
            <span className="text-gray">|</span>
            <Link href={formatMessage({ id: 'footer.privacy_link' })} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="footer.privacy" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
