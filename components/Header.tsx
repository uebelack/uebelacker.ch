/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { scroller } from 'react-scroll';

export interface Props {
  title?: string;
  description?: string;
}

export default function Header({ title, description }: Props) {
  const handleOnClick = (e:any, target:string) => {
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
        {description && (<meta name="description" content={description} />)}
      </Head>
      <div className="md:container px-4 my-4 fade-in flex flex-col items-center md:items-start md:flex-row">
        <Link href="/" className="flex items-center transition ease-in-out delay-150 flex-grow">
          <Image className="dark:hidden" src="/logo.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <Image className="hidden dark:inline-block" src="/logo_dark.svg" alt="Übelacker Solutions logo" width={40} height={40} />
          <div className="text-2xl ml-2 pt-0.5">Übelacker Solutions</div>
        </Link>
        <ul className="flex pt-2 pl-1 md:pt-2.5">
          <li className="mr-2"><a href="/#blog" onClick={(e) => handleOnClick(e, 'blog')}><FormattedMessage id="blog.title" /></a></li>
          <li className="mr-2"><a href="/#apps" onClick={(e) => handleOnClick(e, 'apps')}><FormattedMessage id="apps.title" /></a></li>
          <li className="mr-2"><a href="/#about" onClick={(e) => handleOnClick(e, 'about')}><FormattedMessage id="about.title" /></a></li>
          <li className="mr-2"><a href="/#contact" onClick={(e) => handleOnClick(e, 'contact')}><FormattedMessage id="contact.title" /></a></li>
          <li><a href="/en">en</a></li>
          <li>|</li>
          <li><a href="/de">de</a></li>
          <a className="ml-3" href="https://github.com/hackercowboy"><FaGithub size="1.5em" /></a>
          <a className="ml-2" href="https://www.linkedin.com/in/daviduebelacker/"><FaLinkedin size="1.5em" /></a>
        </ul>
      </div>
    </header>
  );
}
