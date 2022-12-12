import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export interface Props {
  title: string;
  description?: string;
}

function Header({ title, description }: Props) {
  return (
    <header>
      <Head>
        <title>
          {title ? `${title} | Übelacker Solutions` : 'Übelacker Solutions'}
        </title>
        {description && (<meta name="description" content={description} />)}
      </Head>
      <div className="container header-wrapper">
        <Link href="/" className="header-brand">
          <Image src="/logo.svg" alt="Übelacker Solutions logo" style={{ width: '40px', height: '40px' }} />
          <div>Übelacker Solutions</div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
