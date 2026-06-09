import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import Typist from 'react-typist-component';
import Page from '@/components/Page';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollButton from '@/components/ScrollButton';
import Heading from '@/components/Heading';
import About from '@/components/About';
import BlogItem from '@/components/BlogItem';
import App from '@/components/App';
import ContactForm from '@/components/ContactForm';

const blogItems = require('../data/blog.json');

export default function Home() {
  const { formatMessage } = useIntl();
  return (
    <Page>
      <Header description={formatMessage({ id: 'home.description' })} />
      <Section className="grid place-items-center first">
        <Container className="grid place-items-center">
          <div className="p-3 md:w-4/5 pt-20">
            <Typist typingDelay={30}>
              <div className="text-3xl md:text-4xl mb-4 leading-snug tracking-tight">
                { formatMessage({ id: 'home.quote' }) }
                <br />
              </div>
              <Typist.Paste>
                <div className="text-lg mt-6 text-gray-dark dark:text-gray">- Fred Brooks</div>
              </Typist.Paste>
            </Typist>
          </div>
        </Container>
      </Section>
      <ScrollButton target="blog" />
      <Section>
        <Container>
          <Heading id="blog"><FormattedMessage id="blog.title" /></Heading>
          <ul>
            {blogItems.map((item) => (
              <li key={item.guid}>
                <BlogItem
                  thumbnail={item.thumbnail}
                  title={item.title}
                  link={item.link}
                  teaser={item.teaser}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="apps"><FormattedMessage id="apps.title" /></Heading>
          <App
            title={formatMessage({ id: 'apps.letter.title' })}
            description={formatMessage({ id: 'apps.letter.description' })}
            thumbnail={formatMessage({ id: 'apps.letter.thumbnail' })}
            link={formatMessage({ id: 'apps.letter.link' })}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="opensource"><FormattedMessage id="opensource.title" /></Heading>
          <App
            title={formatMessage({ id: 'opensource.babeli.title' })}
            description={formatMessage({ id: 'opensource.babeli.description' })}
            link={formatMessage({ id: 'opensource.babeli.link' })}
          />
          <App
            title={formatMessage({ id: 'opensource.babeli4j.title' })}
            description={formatMessage({ id: 'opensource.babeli4j.description' })}
            link={formatMessage({ id: 'opensource.babeli4j.link' })}
          />
          <App
            title={formatMessage({ id: 'opensource.nodeappattest.title' })}
            description={formatMessage({ id: 'opensource.nodeappattest.description' })}
            link={formatMessage({ id: 'opensource.nodeappattest.link' })}
          />
          <App
            title={formatMessage({ id: 'opensource.tossitin.title' })}
            description={formatMessage({ id: 'opensource.tossitin.description' })}
            link={formatMessage({ id: 'opensource.tossitin.link' })}
          />
          <App
            title={formatMessage({ id: 'opensource.tratschtante.title' })}
            description={formatMessage({ id: 'opensource.tratschtante.description' })}
            link={formatMessage({ id: 'opensource.tratschtante.link' })}
          />
          <App
            title={formatMessage({ id: 'opensource.screegen.title' })}
            description={formatMessage({ id: 'opensource.screegen.description' })}
            link={formatMessage({ id: 'opensource.screegen.link' })}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="about"><FormattedMessage id="about.title" /></Heading>
          <About />
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="contact"><FormattedMessage id="contact.title" /></Heading>
          <ContactForm />
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}
