import Page from '@components/Page';
import Container from '@components/Container';
import Section from '@components/Section';
import Header from '@components/Header';
import Typist from 'react-typist-component';
import ScrollButton from '@components/ScrollButton';

export default function Home() {
  return (
    <Page>
      <Header />
      <Section>
        <Container className="grid place-items-center start">
          <div className="p-3 md:w-4/5">
            <Typist typingDelay={30}>
              <div className="text-2xl md:text-3xl mb-4">
                What one programmer can do in one month, two programmers can do in two months.<br/>
                </div>
              <Typist.Paste>
              <div className="text-1xl mt-4">- Fred Brooks</div>
              </Typist.Paste>
            </Typist>
          </div>
        </Container>
      </Section>
      <ScrollButton target="about" />
    </Page>
  );
}
