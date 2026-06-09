import React from 'react';
import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: '' }} />
        {/*
          ╔══════════════════════════════════════════════════╗
          ║  Hey there, source code explorer! 🕵️             ║
          ║                                                  ║
          ║  You found the secret comments!                  ║
          ║                                                  ║
          ║  Since you're already here:                      ║
          ║  → Try the Konami Code (↑↑↓↓←→←→BA)             ║
          ║  → Type "sudo" on the page                      ║
          ║  → Check the browser console                    ║
          ║                                                  ║
          ║  // TODO: Take over the world                    ║
          ║  // FIXME: Still human, need coffee              ║
          ║  // HACK: Runs on mass(coffee) and mass(hope)    ║
          ║                                                  ║
          ║  No bugs were mass(harmed) in the making of      ║
          ║  this website. They were mass(relocated) to      ║
          ║  production. 🐛                                  ║
          ╚══════════════════════════════════════════════════╝
        */}
        <link rel="preload" as="image" href="/logo.svg" />
        <link rel="preload" as="image" href="/logo_dark.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-white dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
