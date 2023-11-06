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
      <Header title="Impressum" />
      <Section>
        <Container className="prose prose-uebelack dark:prose-uebelackdark">
          <h1>Impressum</h1>
          <h2>Kontaktadresse</h2>
          <p>
            Übelacker Solutions GmbH
            <br />
            Bläsiring 28
            <br />
            4057 Basel
            <br />
            Schweiz
          </p>
          <p>
            E-Mail: support@uebelacker.ch
            <br />
            Webseite: uebelacker.ch
          </p>
          <h2>Vertretungsberechtigte Person(en)</h2>
          <p>David Übelacker</p>
          <h2>Handelsregister-Eintrag</h2>
          <h3>Eingetragener Firmenname:</h3>
          <p>Übelacker Solutions GmbH</p>
          <h3>Unternehmens-Nr (UID):</h3>
          <p>CHE-175.183.669</p>
          <h3>Mehrwertsteuer-Nummer</h3>
          <p>CHE-175.183.669 MWST</p>
          <h2>Haftungsausschluss</h2>
          <p>Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.</p>
          <p>Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.</p>
          <p>Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne besondere Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>
          <h3>Haftungsausschluss für Links</h3>
          <p>Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.</p>
          <h3>Urheberrechte</h3>
          <p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören ausschliesslich der Firma Übelacker Solutions GmbH oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.</p>
        </Container>
      </Section>
      <Footer />
    </Page>
  );
}

export default Imprint;
