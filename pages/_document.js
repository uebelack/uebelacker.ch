import React from 'react';
import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html data-scroll-behavior="smooth">
      <Head>
        {/* Empty, but it keeps Next from hoisting the comment block below into
            the <body> — which is where it would end up with no node before it. */}
        <script dangerouslySetInnerHTML={{ __html: '' }} />
        {/*
          ╔══════════════════════════════════════════════════════════════╗
          ║   S Y N T H W A V E   ' 8 5                                   ║
          ║                                                              ║
          ║   Hey there, source code explorer! 🕵️                         ║
          ║                                                              ║
          ║   This whole site runs the same palette as my terminal,       ║
          ║   editors and window manager — github.com/uebelack/davconf    ║
          ║                                                              ║
          ║     #f92aad  magenta  structure, headings, the accent         ║
          ║     #00f0ff  cyan     links, actions, the grid                ║
          ║     #fede5d  gold     text you wrote                          ║
          ║     #fe4450  coral    anything wrong                          ║
          ║     #72f1b8  green    types and success                       ║
          ║     #d4c8ff  lavender body text                               ║
          ║     #1a1033  indigo   the night everything sits in            ║
          ║                                                              ║
          ║   Since you're already here:                                  ║
          ║   → Try the Konami Code (↑↑↓↓←→←→BA)                        ║
          ║   → Type "sudo" on the page                                   ║
          ║   → Check the browser console                                 ║
          ║                                                              ║
          ║   // TODO: Take over the world                                ║
          ║   // FIXME: Still human, need coffee                          ║
          ║   // HACK: Runs on mass(coffee) and mass(hope)                ║
          ║                                                              ║
          ║   No bugs were mass(harmed) in the making of this website.    ║
          ║   They were mass(relocated) to production. 🐛                  ║
          ╚══════════════════════════════════════════════════════════════╝
        */}
        <link rel="preload" as="image" href="/logo_dark.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="color-scheme" content="dark" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
