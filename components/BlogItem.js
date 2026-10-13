import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

/*
  A blog card.

  The whole card is one <Link>, so the hit area is the panel rather than the
  title — which is also why the "read more" line is a <span> and not a nested
  anchor: an anchor inside an anchor is invalid, and the card already goes
  where it would have gone.
*/
export default function BlogItem({
  thumbnail, title, link, teaser,
}) {
  return (
    <Link href={link} title={title} className="card card--blog">
      <span className="card__sheen" aria-hidden="true" />
      <span className="card__corner card__corner--tl" aria-hidden="true" />
      <span className="card__corner card__corner--br" aria-hidden="true" />

      <div className="card__media relative">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 224px"
        />
      </div>

      <div className="card__text">
        <div className="card__meta">
          <FormattedMessage id="blog.title" />
        </div>
        <div className="card__title text-lg mt-2">{title}</div>
        <p className="card__body mt-3 text-sm">{teaser}</p>
        <span className="card__more mt-4">
          <FormattedMessage id="blog.read_more" />
        </span>
      </div>
    </Link>
  );
}
