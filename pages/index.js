import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import Page from '@/components/Page';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Heading from '@/components/Heading';
import Hero from '@/components/Hero';
import TechMarquee from '@/components/TechMarquee';
import Reveal from '@/components/Reveal';
import About from '@/components/About';
import BlogItem from '@/components/BlogItem';
import App from '@/components/App';
import ContactForm from '@/components/ContactForm';

const blogItems = require('../data/blog.json');

// Both lists are i18n keys rather than repeated <App> blocks, so adding an app
// or a project is one entry here plus its copy in i18n/{en,de}.js.
const APPS = ['daitoo', 'letter'];
const OPEN_SOURCE = ['babeli', 'babeli4j', 'nodeappattest', 'tossitin', 'tratschtante', 'screegen'];

export default function Home() {
  const { formatMessage } = useIntl();

  return (
    <Page>
      <Header description={formatMessage({ id: 'home.description' })} />

      <Hero />

      <TechMarquee />

      <Section>
        <Container>
          <Heading id="blog" command="cat ~/writing/*.md" index="01 / 05">
            <FormattedMessage id="blog.title" />
          </Heading>
          <ul className="grid gap-5">
            {blogItems.map((item, i) => (
              <Reveal as="li" key={item.guid} delay={i * 70}>
                <BlogItem
                  thumbnail={item.thumbnail}
                  title={item.title}
                  link={item.link}
                  teaser={item.teaser}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading id="apps" command="ls -l ~/apps" index="02 / 05">
            <FormattedMessage id="apps.title" />
          </Heading>
          <ul className="grid gap-5">
            {APPS.map((key, i) => (
              <Reveal as="li" key={key} delay={i * 70}>
                <App
                  title={formatMessage({ id: `apps.${key}.title` })}
                  description={formatMessage({ id: `apps.${key}.description` })}
                  thumbnail={formatMessage({ id: `apps.${key}.thumbnail` })}
                  link={formatMessage({ id: `apps.${key}.link` })}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading id="opensource" command="git remote -v" index="03 / 05">
            <FormattedMessage id="opensource.title" />
          </Heading>
          <ul className="grid gap-5 md:grid-cols-2">
            {OPEN_SOURCE.map((key, i) => (
              <Reveal as="li" key={key} delay={i * 60}>
                <App
                  title={formatMessage({ id: `opensource.${key}.title` })}
                  description={formatMessage({ id: `opensource.${key}.description` })}
                  link={formatMessage({ id: `opensource.${key}.link` })}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading id="about" command="whoami --verbose" index="04 / 05">
            <FormattedMessage id="about.title" />
          </Heading>
          <About />
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading id="contact" command="mail -s hello" index="05 / 05">
            <FormattedMessage id="contact.title" />
          </Heading>
          <ContactForm />
        </Container>
      </Section>

      <Footer />
    </Page>
  );
}
