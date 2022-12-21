/* eslint-disable max-len */
import React from 'react';

import Section from '../components/Section';
import Container from '../components/Container';
import Page from '../components/Page';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Imprint() {
  return (
    <Page>
      <Header title="Imprint" />
      <Section>
        <Container className="prose prose-uebelack dark:prose-uebelackdark">
          <h1>Imprint</h1>
          <h2>Contact</h2>
          <p>
            Übelacker Solutions GmbH
            <br />
            Bläsiring 28
            <br />
            4057 Basel
            <br />
            Switzerland
          </p>
          <p>
            E-Mail: support@uebelacker.ch
            <br />
            Webseite: uebelacker.ch
          </p>
          <h2>Authorized representative</h2>
          <p>David Übelacker</p>
          <h2>Commercial register entry</h2>
          <h3>Registered company name:</h3>
          <p>Übelacker Solutions GmbH</p>
          <h3>Company No. (UID):</h3>
          <p>CHE-175.183.669</p>
          <h3>VAT number</h3>
          <p>CHE-175.183.669 MWST</p>
          <h2>Disclaimer</h2>
          <p>The author assumes no responsibility for the correctness, accuracy, timeliness, reliability and completeness of the information.</p>
          <p>Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.</p>
          <p>All offers are non-binding. The author expressly reserves the right to change, supplement or delete parts of the pages or the entire offer without special notice, or to cease publication temporarily or permanently.</p>
          <h3>Disclaimer for links</h3>
          <p>References and links to third party websites are outside our area of responsibility. Any responsibility for such websites is disclaimed. The access and use of such websites is at the own risk of the respective user.</p>
          <h3>Copyright</h3>
          <p>The copyright and all other rights to the content, images, photos or other files on this website, belong exclusively to the company Übelacker Solutions GmbH or the specifically named rights holders. For the reproduction of any elements, the written consent of the copyright holder must be obtained in advance.</p>
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}

export default Imprint;
