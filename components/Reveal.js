import React, { useEffect, useRef, useState } from 'react';

/*
  Scroll reveal.

  One IntersectionObserver per element, disconnected the moment the element has
  been seen — the reveal is a one-shot, so keeping the observer alive would be
  paying to watch something that can no longer change.

  The animation itself is in animations.css (.reveal / .is-visible); this only
  decides when to add the class. The `as` prop exists because a reveal often
  needs to be a <li> or a <section> rather than a <div>, and wrapping those in
  a div would break the parent's layout.
*/
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  variant = '',
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // No IntersectionObserver (jsdom, ancient browsers): show the content
    // rather than leaving the page blank.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold, rootMargin: '0px 0px -8% 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const classes = ['reveal', variant, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </Tag>
  );
}
