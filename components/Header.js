import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { scroller } from 'react-scroll';
import { useCookieConsent } from './CookieConsent';

export default function Header({ title, description }) {
  const cookiesAccess = useCookieConsent();
  const handleOnClick = (e, target) => {
    if (window.location.pathname === '/en' || window.location.pathname === '/de') {
      scroller.scrollTo(target, { duration: 200, smooth: true });
      e.preventDefault();
    }
  };

  return (
    <header className="fixed top-0 w-full">
      <Head>
        <title>
          {title ? `${title} | Übelacker Solutions` : 'Übelacker Solutions'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        {description && (<meta name="description" content={description} />)}
        {typeof window !== 'undefined' && cookiesAccess && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}', { 'anonymize_ip': true });
          `,
              }}
            />
          </>
        )}
      </Head>
      <div className="md:container px-4 py-4 fade-in flex flex-col md:flex-row md:items-center">
        <Link href="/" className="flex items-center transition-opacity duration-200 hover:opacity-70 flex-grow">
          <Image className="dark:hidden" src="/logo.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <Image className="hidden dark:inline-block" src="/logo_dark.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <div className="text-2xl ml-2 pt-0.5 tracking-tight">Übelacker Solutions</div>
        </Link>
        <nav>
          <ul className="flex items-center pt-2 pl-1 md:pt-0 gap-4">
            <li><Link href="/#blog" onClick={(e) => handleOnClick(e, 'blog')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="blog.title" /></Link></li>
            <li><Link href="/#apps" onClick={(e) => handleOnClick(e, 'apps')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="apps.title" /></Link></li>
            <li><Link href="/#opensource" onClick={(e) => handleOnClick(e, 'opensource')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="opensource.title" /></Link></li>
            <li><Link href="/#about" onClick={(e) => handleOnClick(e, 'about')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="about.title" /></Link></li>
            <li><Link href="/#contact" onClick={(e) => handleOnClick(e, 'contact')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="contact.title" /></Link></li>
            <li className="text-gray">|</li>
            <li className="flex items-center gap-1 text-sm">
              <a href="/en" className="hover:opacity-60 transition-opacity duration-200">en</a>
              <span className="text-gray">/</span>
              <a href="/de" className="hover:opacity-60 transition-opacity duration-200">de</a>
            </li>
            <li className="flex items-center gap-2 ml-1">
              <a title="Github Profile" href="https://github.com/uebelack" className="hover:opacity-60 transition-opacity duration-200"><FaGithub size="1.3em" /></a>
              <a title="LinkedIn Profile" href="https://www.linkedin.com/in/daviduebelacker/" className="hover:opacity-60 transition-opacity duration-200"><FaLinkedin size="1.3em" /></a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
