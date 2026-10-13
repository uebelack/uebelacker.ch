import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import { scroller } from 'react-scroll';
import GlitchText from './GlitchText';
import { useCookieConsent } from './CookieConsent';

const SECTIONS = ['blog', 'apps', 'opensource', 'about', 'contact'];

export default function Header({ title, description }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const cookiesAccess = useCookieConsent();

  // The header is transparent over the hero and gains its glass background
  // once you leave it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Which nav item lights up: the last heading that has passed the line just
  // below the header.
  //
  // Not an IntersectionObserver, even though that is the usual answer — the
  // elements carrying the ids are the heading blocks, which are only ~130px
  // tall. Any rootMargin narrow enough to pick exactly one of them is also
  // narrow enough for all of them to miss it, which is what the first version
  // here did: it reported no active section at all for most of the page.
  // Comparing positions against one line has no such gap.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = 140;
      let current = null;
      SECTIONS.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lock the page while the mobile panel is open, so the body does not scroll
  // behind a full-width menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen]);

  const handleOnClick = (e, target) => {
    if (window.location.pathname === '/en' || window.location.pathname === '/de' || window.location.pathname === '/') {
      scroller.scrollTo(target, { duration: 500, smooth: 'easeInOutQuad', offset: -72 });
      e.preventDefault();
    }
    setMenuOpen(false);
  };

  const navItem = (id) => (
    <Link
      href={`/#${id}`}
      onClick={(e) => handleOnClick(e, id)}
      className={['nav-link', active === id ? 'is-active' : ''].filter(Boolean).join(' ')}
      aria-current={active === id ? 'true' : undefined}
    >
      <span className="whitespace-nowrap"><FormattedMessage id={`${id}.title`} /></span>
    </Link>
  );

  return (
    <header className={['site-header', scrolled ? 'is-scrolled' : ''].filter(Boolean).join(' ')}>
      <Head>
        <title>
          {title ? `${title} | Übelacker Solutions` : 'Übelacker Solutions'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1033" />
        {description && (<meta name="description" content={description} />)}
      </Head>
      {typeof window !== 'undefined' && cookiesAccess && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
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

      <div className="md:container site-header__bar">
        <Link href="/" className="wordmark" aria-label="Übelacker Solutions — home">
          <Image
            className="wordmark__mark"
            src="/logo_dark.svg"
            alt=""
            width={38}
            height={38}
            priority
          />
          <span className="wordmark__text">
            <GlitchText>Übelacker</GlitchText>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size="1.4em" /> : <HiMenuAlt4 size="1.4em" />}
        </button>

        <nav className="site-nav">
          <ul className="site-nav__list">
            {SECTIONS.map((id) => <li key={id}>{navItem(id)}</li>)}
            <li aria-hidden="true"><div className="nav-sep" /></li>
            <li>
              <div className="lang-switch">
                <a href="/en">en</a>
                <span aria-hidden="true">/</span>
                <a href="/de">de</a>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-3">
                <a className="social-link" title="Github Profile" href="https://github.com/uebelack"><FaGithub size="1.25em" /></a>
                <a className="social-link" title="LinkedIn Profile" href="https://www.linkedin.com/in/daviduebelacker/"><FaLinkedin size="1.25em" /></a>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && (
        <nav className="mobile-nav">
          <ul className="mobile-nav__list">
            {SECTIONS.map((id, i) => (
              <li className="mobile-nav__item" key={id} style={{ '--item-delay': `${i * 45}ms` }}>
                {navItem(id)}
              </li>
            ))}
            <li className="mobile-nav__item flex items-center gap-4 pt-5" style={{ '--item-delay': `${SECTIONS.length * 45}ms` }}>
              <div className="lang-switch">
                <a href="/en">en</a>
                <span aria-hidden="true">/</span>
                <a href="/de">de</a>
              </div>
              <div className="nav-sep" aria-hidden="true" />
              <a className="social-link" title="Github Profile" href="https://github.com/uebelack"><FaGithub size="1.3em" /></a>
              <a className="social-link" title="LinkedIn Profile" href="https://www.linkedin.com/in/daviduebelacker/"><FaLinkedin size="1.3em" /></a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
