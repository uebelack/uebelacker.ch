/* eslint-disable max-len */
import React from "react";
import { useRemarkSync } from "react-remark";
import Image from "next/image";
import { useRouter } from "next/router";

const content = {
  en: `I'm a full-stack developer and software architect with over 20 years of experience in web and mobile application development. Passionate about coding, problem solving and modern technologies.

My fascination with computers started early on. When I was 12 years old, I reset my father's computer out of curiosity because I wanted to know what happens when you enter format c:. Only a few years later I created my first own homepage with pure HTML.

Since then, I've worked my way through the full evolution of web development: starting with PHP, then Java-based development from servlets to JSP and JavaServer Faces, on to Spring Boot and Angular. Along the way I learned a lot about good web design and excellent user experience, which I still rely on every day.

I spent six years as technical lead at a large Swiss industrial company, implementing its digitalization strategy with several IIoT services. There I gained extensive experience with React, React Native, Ruby on Rails, Node.js, DevOps and cloud-based solutions.

Today, I work as a senior software developer and technical lead in the Swiss financial sector, building business-critical applications with Java, Spring Boot, Camunda BPM, Angular, Kubernetes and ArgoCD. As an iSAQB-certified software architect, I have a strong focus on AI-augmented engineering: I build solutions with LLMs, AI agents and RAG using LangChain and LangChain4j, maintain open-source developer tooling, and share my experience as a speaker at conferences.

One of my strengths is that I'm very quick to get to grips with new topics and technologies, so I can easily adapt to ongoing projects or kick off new ones from scratch. I believe in building quality from day one. Topics like clean code, secure coding, test-driven development and a good user experience are central to my work.
  `,
  de: `Ich bin Full-Stack-Entwickler und Softwarearchitekt mit über 20 Jahren Erfahrung in der Entwicklung von Web- und Mobile-Applikationen. Mit Leidenschaft für Programmierung, Problemlösung und moderne Technologien.

Meine Faszination für Computer begann früh. Mit 12 Jahren habe ich aus Neugier den Computer meines Vaters zurückgesetzt, weil ich wissen wollte, was passiert, wenn man format c: eingibt. Nur wenige Jahre später erstellte ich meine erste eigene Homepage in purem HTML.

Seither habe ich die gesamte Evolution der Webentwicklung durchlaufen: angefangen mit PHP, dann Java-basierte Entwicklung von Servlets über JSP und JavaServer Faces bis hin zu Spring Boot und Angular. Dabei habe ich viel über gutes Webdesign und exzellente User Experience gelernt – Wissen, auf das ich mich noch heute täglich verlasse.

Sechs Jahre lang war ich als Technical Lead bei einem grossen Schweizer Industrieunternehmen tätig und habe dort die Umsetzung der Digitalisierungsstrategie mit mehreren IIoT-Services verantwortet. Dabei sammelte ich umfangreiche Erfahrung mit React, React Native, Ruby on Rails, Node.js, DevOps und Cloud-basierten Lösungen.

Heute arbeite ich als Senior Software Developer und Technical Lead im Schweizer Finanzsektor und entwickle geschäftskritische Applikationen mit Java, Spring Boot, Camunda BPM, Angular, Kubernetes und ArgoCD. Als iSAQB-zertifizierter Softwarearchitekt lege ich einen starken Fokus auf AI-augmented Engineering: Ich baue Lösungen mit LLMs, AI Agents und RAG auf Basis von LangChain und LangChain4j, pflege Open-Source-Entwicklertools und teile meine Erfahrungen als Speaker an Konferenzen.

Eine meiner Stärken ist, dass ich mich sehr schnell in neue Themen und Technologien einarbeite und mich dadurch problemlos in laufende Projekte integrieren oder neue von Grund auf starten kann. Ich glaube daran, Qualität vom ersten Tag an zu bauen. Themen wie Clean Code, Secure Coding, Test-Driven Development und eine gute User Experience sind zentral für meine Arbeit.`,
};

export default function About() {
  const { locale } = useRouter();
  const language = locale && locale.startsWith("de") ? "de" : "en";
  const reactContent = useRemarkSync(content[language]);
  return (
    <div className="md:flex md:items-start">
      <div className="grid place-items-center m-5 md:hidden">
        <Image
          src="/david.jpg"
          alt="David Übelacker"
          width={220}
          height={220}
          className="rounded-full align-center"
        />
      </div>
      <div className="prose prose-uebelack dark:prose-uebelackdark max-w-none flex-grow flex-1 md:mr-12 leading-relaxed">
        {reactContent}
      </div>
      <div className="hidden md:inline-block flex-shrink-0">
        <Image
          src="/david.jpg"
          alt="David Übelacker"
          width={220}
          height={220}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
