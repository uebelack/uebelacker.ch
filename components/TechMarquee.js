import React from 'react';

/*
  Two bands of technology names scrolling past in opposite directions.

  The list is rendered twice per track and the CSS translates by exactly -50%,
  which is what makes the wrap invisible: at -50% the second copy sits where
  the first one started, so returning to 0 changes nothing on screen. Both
  copies are inside one aria-hidden wrapper — the same twenty words read out
  twice is noise, and the About section already states all of this in prose.
*/

const ROW_ONE = [
  'Java', 'Spring Boot', 'Camunda BPM', 'Angular', 'Kubernetes', 'ArgoCD',
  'React', 'React Native', 'Next.js', 'Node.js', 'TypeScript',
];

const ROW_TWO = [
  'LLMs', 'AI Agents', 'RAG', 'LangChain', 'LangChain4j', 'Ruby on Rails',
  'PostgreSQL', 'Docker', 'Terraform', 'iSAQB Architect', 'Clean Code', 'TDD',
];

function Track({ items, reverse }) {
  // Two copies, keyed by pass so React does not see duplicate keys.
  const doubled = [...items, ...items];

  return (
    <div className={['marquee', reverse ? 'marquee--reverse' : ''].filter(Boolean).join(' ')}>
      <div className="marquee__track">
        {doubled.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index < items.length ? 'a' : 'b'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div aria-hidden="true">
      <Track items={ROW_ONE} reverse={false} />
      <Track items={ROW_TWO} reverse />
    </div>
  );
}
