import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { GiHamburger } from 'react-icons/gi';
import { HiX } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { scroller } from 'react-scroll';
import { useCookieConsent } from './CookieConsent';

export default function Header({ title, description }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cookiesAccess = useCookieConsent();

  const handleOnClick = (e, target) => {
    if (window.location.pathname === '/en' || window.location.pathname === '/de') {
      scroller.scrollTo(target, { duration: 200, smooth: true });
      e.preventDefault();
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
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
      <div className="md:container px-4 py-4 fade-in flex items-center justify-between">
        <Link href="/" className="flex items-center transition-opacity duration-200 hover:opacity-70">
          <Image className="dark:hidden" src="/logo.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <Image className="hidden dark:inline-block" src="/logo_dark.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <div className="text-2xl ml-2 pt-0.5 tracking-tight">Übelacker Solutions</div>
        </Link>
        <button
          type="button"
          className="md:hidden p-2 hover:opacity-60 transition-opacity duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size="1.5em" /> : <GiHamburger size="1.5em" />}
        </button>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
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
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-light dark:border-gray-dark bg-white dark:bg-black px-4 py-4">
          <ul className="flex flex-col gap-4">
            <li><Link href="/#blog" onClick={(e) => handleOnClick(e, 'blog')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="blog.title" /></Link></li>
            <li><Link href="/#apps" onClick={(e) => handleOnClick(e, 'apps')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="apps.title" /></Link></li>
            <li><Link href="/#opensource" onClick={(e) => handleOnClick(e, 'opensource')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="opensource.title" /></Link></li>
            <li><Link href="/#about" onClick={(e) => handleOnClick(e, 'about')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="about.title" /></Link></li>
            <li><Link href="/#contact" onClick={(e) => handleOnClick(e, 'contact')} className="hover:opacity-60 transition-opacity duration-200"><FormattedMessage id="contact.title" /></Link></li>
            <li className="flex items-center gap-3 pt-2 border-t border-gray-light dark:border-gray-dark">
              <a href="/en" className="hover:opacity-60 transition-opacity duration-200">en</a>
              <span className="text-gray">/</span>
              <a href="/de" className="hover:opacity-60 transition-opacity duration-200">de</a>
              <span className="text-gray">|</span>
              <a title="Github Profile" href="https://github.com/uebelack" className="hover:opacity-60 transition-opacity duration-200"><FaGithub size="1.3em" /></a>
              <a title="LinkedIn Profile" href="https://www.linkedin.com/in/daviduebelacker/" className="hover:opacity-60 transition-opacity duration-200"><FaLinkedin size="1.3em" /></a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
