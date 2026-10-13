import React from 'react';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import Page from '@/components/Page';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import Section from '@/components/Section';
import PongGame from '@/components/PongGame';
import GlitchText from '@/components/GlitchText';
import Reveal from '@/components/Reveal';

export default function NotFound() {
  const { formatMessage } = useIntl();

  return (
    <Page>
      <Header title="404" />
      <Section>
        <Container>
          <div className="pt-24 text-center">
            <div
              className="font-display text-chrome mx-auto"
              style={{ fontSize: 'clamp(5rem, 24vw, 14rem)', lineHeight: 0.85, fontWeight: 900 }}
              aria-hidden="true"
            >
              404
            </div>

            <h1 className="page-title mt-6">
              <GlitchText always>{formatMessage({ id: 'lost.title' })}</GlitchText>
            </h1>

            <p className="mt-6 text-lg" style={{ color: 'var(--sw-muted)' }}>
              <FormattedMessage id="lost.description" />
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--sw-comment)' }}>
              But hey, while you&apos;re here... play some Pong! 🏓
            </p>

            <Reveal className="mt-10" variant="reveal-scale">
              <PongGame />
            </Reveal>

            <div className="mt-10">
              <Link href="/" className="btn btn--ghost">
                <span className="btn__label"><FormattedMessage id="lost.button" /></span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}
