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

import BlogItem from '@components/BlogItem';
import BlogItemType from '../types/BlogItemType';

// eslint-disable-next-line global-require
const blogItems = ((require('../data/blog.json')) as BlogItemType[]);

export default function Home() {
  const { formatMessage } = useIntl();
  return (
    <Page>
      <Header />
      <Section>
        <Container className="grid place-items-center start">
          <div className="p-3 md:w-4/5">
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
            {blogItems.map((item) => (<li key={item.guid}><BlogItem item={item} /></li>))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="apps"><FormattedMessage id="apps.title" /></Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="about"><FormattedMessage id="about.title" /></Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="contact"><FormattedMessage id="contact.title" /></Heading>
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}
