import React, { useMemo } from 'react';
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

const devQuotes = [
  { text: 'What one programmer can do in one month, two programmers can do in two months.', author: 'Fred Brooks' },
  { text: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' },
  { text: 'The best code is no code at all.', author: 'Jeff Atwood' },
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', author: 'Brian Kernighan' },
  { text: 'The most disastrous thing that you can ever learn is your first programming language.', author: 'Alan Kay' },
  { text: "It's not a bug — it's an undocumented feature.", author: 'Anonymous' },
  { text: 'Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.', author: 'Rick Cook' },
];

export default function Home() {
  const { formatMessage } = useIntl();
  const quote = useMemo(() => devQuotes[Math.floor(Math.random() * devQuotes.length)], []);
  return (
    <Page>
      <Header description={formatMessage({ id: 'home.description' })} />
      <Section className="grid place-items-center first">
        <Container className="grid place-items-center">
          <div className="p-3 md:w-4/5 pt-20">
            <Typist typingDelay={30}>
              <div className="text-3xl md:text-4xl mb-4 leading-snug tracking-tight">
                {quote.text}
                <br />
              </div>
              <Typist.Paste>
                <div className="text-lg mt-6 text-gray-dark dark:text-gray">- {quote.author}</div>
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
