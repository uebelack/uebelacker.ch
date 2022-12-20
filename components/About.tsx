/* eslint-disable max-len */
import React from 'react';
import { useRemarkSync } from 'react-remark';
import Image from 'next/image';
import { useRouter } from 'next/router';

const content = {
  en: `The company Übelacker Solutions was founded by me, David Übelacker, to work as freelancer in Switzerland.

  I'm a full-stack developer and software architect with 20+ years of experience in web and mobile application development. Passionate about coding, problem solving and modern technologies.
  
  My fascination with computers started early on. When I was 12 years old, I reset my father's computer out of curiosity because I wanted to know what happens when you enter format c:. Only a few years later I created my first own homepage with pure HTML.
  
  Now, I look back on 20 years of experience in web-based application development. I started with PHP and then worked my way through Java-based development from servlets to JSP and Java Server Faces to Spring Boot and Angular.js. During this time I learned a lot about good web design and excellent user experience, which I can now rely on every day.
  
  For the last 6 years, I've been working for a large Swiss industrial company as technical lead for the implementation of the digitalization strategy with several IIoT services where I gained a lot of experience with React, React Native, Ruby on Rails, Node.js, DevOps and cloud based solutions.
  
  One of my strengths is that I’m very quick to get to grips with new topics and technologies, so I can easily adapt to ongoing projects or kick-off new ones from scratch. I believe in building quality from day one. Topics like clean code, secure coding, test driven development and a good user experience are central to my work.
  `,
  de: `Die Firma Übelacker Solutions wurde von mir, David Übelacker, gegründet, um als Freelancer in der Schweiz zu arbeiten.

  Ich bin ein Full-Stack-Entwickler und Software-Architekt mit über 20 Jahren Erfahrung in der Entwicklung von Web- und mobilen Anwendungen. Meine Leidenschaft gilt dem Programmieren, dem Lösen von Problemen und modernen Technologien.
  
  Meine Faszination für Computer begann schon früh. Als ich 12 Jahre alt war, habe ich den Computer meines Vaters aus Neugierde zurückgesetzt, weil ich wissen wollte, was passiert, wenn man Format c: eingibt. Nur ein paar Jahre später habe ich meine erste eigene Homepage mit reinem HTML erstellt.
  
  Heute blicke ich auf 20 Jahre Erfahrung in der webbasierten Anwendungsentwicklung zurück. Angefangen habe ich mit PHP und mich dann über die Java-basierte Entwicklung von Servlets über JSP und Java Server Faces zu Spring Boot und Angular.js vorgearbeitet. Während dieser Zeit habe ich viel über gutes Webdesign und exzellente Benutzererfahrung gelernt, auf die ich nun täglich zurückgreifen kann.
  
  In den letzten 6 Jahren habe ich bei einem großen Schweizer Industrieunternehmen als technischer Lead für die Umsetzung der Digitalisierungsstrategie mit verschiedenen IIoT-Services gearbeitet und dabei viel Erfahrung mit React, React Native, Ruby on Rails, Node.js, DevOps und cloudbasierten Lösungen gesammelt.
  
  Eine meiner Stärken ist, dass ich mich sehr schnell in neue Themen und Technologien einarbeiten kann, so dass ich mich leicht in laufende Projekte einarbeiten oder neue Projekte von Grund auf beginnen kann. Mir ist gute Qualität vom ersten Tag an wichtig. Themen wie Clean Code, Secure Coding, testgetriebene Entwicklung und ein gutes Benutzererlebnis sind für mich von zentraler Bedeutung.`,
};

export default function About() {
  const { locale } = useRouter();
  const language = locale && locale.startsWith('de') ? 'de' : 'en';
  const reactContent = useRemarkSync(content[language]);
  return (
    <div className="md:flex">
      <div className="grid place-items-center m-5 md:hidden">
        <Image src="/david.jpg" alt="David Übelacker" width={200} height={200} className="rounded-full align-center" />
      </div>
      <div className="prose prose-uebelack dark:prose-uebelackdark max-w-none flex-grow flex-1 md:mr-10">{reactContent}</div>
      <div className="hidden md:inline-block">
        <Image src="/david.jpg" alt="David Übelacker" width={200} height={200} className="rounded-full" />
      </div>
    </div>
  );
}
