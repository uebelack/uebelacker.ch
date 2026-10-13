import React from 'react';
import Reveal from './Reveal';

/*
  A section heading: shell prompt, title, and the gradient rule that draws
  itself open when the heading arrives.

  The rule's animation is keyed off `.is-visible`, which Reveal puts on the
  wrapper — so the heading gets its fade and its rule from the same single
  observer rather than two.

  `index` is the "01 / 05" marker on the right. It is decoration, so it is
  aria-hidden; the heading level and text carry the actual structure.
*/
export default function Heading({
  id, command, index, children,
}) {
  return (
    <Reveal className="heading" threshold={0.25}>
      <div id={id} style={{ scrollMarginTop: 'calc(var(--header-height) + 32px)' }}>
        <div className="heading__eyebrow">
          <span className="heading__prompt" aria-hidden="true">❯</span>
          <span aria-hidden="true">{command}</span>
          {index && <span className="heading__index" aria-hidden="true">{index}</span>}
        </div>
        <h2 className="heading__title">{children}</h2>
        <div className="heading__rule" aria-hidden="true" />
      </div>
    </Reveal>
  );
}
