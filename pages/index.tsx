import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import Page from '@components/Page';
import Container from '@components/Container';
import Section from '@components/Section';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Typist from 'react-typist-component';
import ScrollButton from '@components/ScrollButton';
import Heading from '@components/Heading';
import About from '@components/About';
import BlogItem from '@components/BlogItem';
import App from '@components/App';
import ContactForm from '@components/ContactForm';

// eslint-disable-next-line global-require
const blogItems = ((require('../data/blog.json')) as { guid: string, thumbnail: string, title: string, link: string, teaser: string }[]);

export default function Home() {
  const { formatMessage } = useIntl();
  return (
    <Page>
      <Header />
      <Section className="grid place-items-center first">
        <Container className="grid place-items-center">
          <div className="p-3 md:w-4/5 pt-20">
            <Typist typingDelay={30}>
              <div className="text-2xl md:text-3xl mb-4">
                { formatMessage({ id: 'home.quote' }) }
                <br />
              </div>
              <Typist.Paste>
                <div className="text-1xl mt-4">- Fred Brooks</div>
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
          <App
            title={formatMessage({ id: 'apps.skynjari.title' })}
            description={formatMessage({ id: 'apps.skynjari.description' })}
            thumbnail={formatMessage({ id: 'apps.skynjari.thumbnail' })}
            link={formatMessage({ id: 'apps.skynjari.link' })}
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
