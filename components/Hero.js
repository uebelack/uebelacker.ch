import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Typist from 'react-typist-component';
import OutrunHero from './OutrunHero';
import TerminalShell from './TerminalShell';
import Container from './Container';
import ScrollButton from './ScrollButton';

const DEV_QUOTES = [
  { text: 'What one programmer can do in one month, two programmers can do in two months.', author: 'Fred Brooks' },
  { text: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' },
  { text: 'The best code is no code at all.', author: 'Jeff Atwood' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'The most disastrous thing that you can ever learn is your first programming language.', author: 'Alan Kay' },
  { text: "It's not a bug — it's an undocumented feature.", author: 'Anonymous' },
];

const NAME = 'ÜBELACKER';

/*
  The hero.

  The quote is chosen in an effect rather than during render on purpose: it is
  random, so picking it while rendering gives the server one quote and the
  client another and React throws out the server markup on hydration. Until it
  is picked the terminal shows a blinking caret, which is what a terminal does
  while it waits anyway — so the fix costs nothing visually.
*/
export default function Hero() {
  const { formatMessage } = useIntl();
  const [quote, setQuote] = useState(null);
  const [calm, setCalm] = useState(false);
  const [shellOpen, setShellOpen] = useState(false);

  const closeShell = useCallback(() => setShellOpen(false), []);

  useEffect(() => {
    setQuote(DEV_QUOTES[Math.floor(Math.random() * DEV_QUOTES.length)]);
    // Typist has no reduced-motion handling of its own, so the preference is
    // read here and the quote is printed in one go instead of typed.
    setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const printed = quote && (
    <>
      <p className="terminal__quote">{quote.text}</p>
      <p className="terminal__author">{quote.author}</p>
    </>
  );

  return (
    <section className="section first hero">
      <OutrunHero />
      <div className="hero__scrim" aria-hidden="true" />

      <Container>
        <div className="hero__inner">
          <p className="hero__kicker">
            <span className="hero__kicker-dot" aria-hidden="true" />
            <FormattedMessage id="home.kicker" />
          </p>

          <h1 className="hero__name">
            <span className="hero__name-wrap">
              {/* A blurred copy behind the real one: the glyphs are filled with
                  a clipped gradient, and a text-shadow on gradient-filled text
                  paints behind the transparent fill and smears it. */}
              <span className="hero__name-glow" aria-hidden="true">{NAME}</span>
              <span className="text-chrome">{NAME}</span>
            </span>
          </h1>

          <p className="hero__role">
            <FormattedMessage id="home.role_dev" />
            <span className="hero__role-sep" aria-hidden="true">◆</span>
            <FormattedMessage id="home.role_architect" />
            <span className="hero__role-sep" aria-hidden="true">◆</span>
            <FormattedMessage id="home.role_speaker" />
          </p>

          <div className="terminal terminal--interactive">
            {/* The click target for the shell. Transparent and laid over the
                whole panel, so the terminal reads as one thing you can press
                without the markup having to nest a <p> inside a <button>. */}
            <button
              type="button"
              className="terminal__trigger"
              onClick={() => setShellOpen(true)}
              aria-label={formatMessage({ id: 'shell.open' })}
            />
            <div className="terminal__bar">
              <span className="terminal__dot terminal__dot--1" />
              <span className="terminal__dot terminal__dot--2" />
              <span className="terminal__dot terminal__dot--3" />
              <span className="terminal__title">david@uebelacker.dev — zsh</span>
            </div>
            <div className="terminal__body">
              <div className="terminal__command">
                <span className="terminal__command-prompt">❯</span>
                <span>
                  <span className="terminal__command-name">fortune</span>
                  {' '}
                  <span className="terminal__command-arg">--dev</span>
                </span>
              </div>

              {!quote && (
                <p className="terminal__quote" aria-hidden="true"><span className="caret" /></p>
              )}
              {quote && calm && printed}
              {quote && !calm && (
                <Typist typingDelay={22}>
                  <p className="terminal__quote">{quote.text}</p>
                  <Typist.Paste>
                    <p className="terminal__author">{quote.author}</p>
                  </Typist.Paste>
                </Typist>
              )}

              <div className="terminal__hint">
                <span className="terminal__hint-prompt" aria-hidden="true">❯</span>
                <span>{formatMessage({ id: 'shell.hint' })}</span>
                <span className="caret" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="hero__stats">
            {['years', 'cert', 'oss'].map((key) => (
              <div className="hero-stat" key={key}>
                <div className="hero-stat__value">{formatMessage({ id: `home.stat_${key}_value` })}</div>
                <div className="hero-stat__label">{formatMessage({ id: `home.stat_${key}_label` })}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <ScrollButton target="blog" />

      <TerminalShell open={shellOpen} onClose={closeShell} quotes={DEV_QUOTES} />
    </section>
  );
}
