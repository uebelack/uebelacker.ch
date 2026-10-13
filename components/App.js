import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

/*
  The card used for both the apps and the open-source list. `thumbnail` is
  optional — the open-source entries have no artwork, and the card lays out
  without a media column rather than reserving an empty one.
*/
export default function App({
  thumbnail, title, link, description,
}) {
  return (
    <Link href={link} title={title} className="card card--app">
      <span className="card__sheen" aria-hidden="true" />
      <span className="card__corner card__corner--tl" aria-hidden="true" />
      <span className="card__corner card__corner--br" aria-hidden="true" />

      <div className="card__text">
        <div className="card__title text-lg">{title}</div>
        <p className="card__body mt-3 text-sm">{description}</p>
        <span className="card__more mt-4">
          <FormattedMessage id="apps.more" />
        </span>
      </div>

      {thumbnail && (
        <div className="card__media">
          <Image src={thumbnail} alt="" width={60} height={60} />
        </div>
      )}
    </Link>
  );
}
