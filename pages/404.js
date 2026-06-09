import React from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Page from '@/components/Page';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Section from '@/components/Section';
import PongGame from '@/components/PongGame';

export default function NotFound() {
  return (
    <Page>
      <Header />
      <Section className="first">
        <Container>
          <div className="pt-32 pb-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-4 tracking-tight">
              <FormattedMessage id="lost.title" />
            </h1>
            <p className="text-gray-dark dark:text-gray text-lg mb-2">
              <FormattedMessage id="lost.description" />
            </p>
            <p className="text-gray-dark dark:text-gray text-sm mb-8">
              But hey, while you&apos;re here... play some Pong! 🏓
            </p>
            <PongGame />
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block px-6 py-3 border border-current rounded-lg hover:opacity-60 transition-opacity duration-200"
              >
                <FormattedMessage id="lost.button" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}
