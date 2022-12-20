/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Link from 'next/link';
import { useIntl, FormattedMessage } from 'react-intl';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const { formatMessage } = useIntl();
  return (
    <footer className="md:container mt-10 mb-32">
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
      <div className="flex fixed bottom-0 m-3">
        <a className="pr-2" href="https://github.com/hackercowboy"><FaGithub size="2.5em" /></a>
        <a href="https://www.linkedin.com/in/daviduebelacker/"><FaLinkedin size="2.5em" /></a>
      </div>
    </footer>
  );
}
