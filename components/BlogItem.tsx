import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

interface Props {
  thumbnail: string,
  title: string,
  link: string,
  teaser: string,
}

export default function BlogItem({
  thumbnail, title, link, teaser,
} : Props) {
  return (
    <div className="mb-10 md:flex">
      <div className="relative h-48 md:h-32 md:w-48">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw,
            192px"
        />
      </div>
      <div className="max-h-64 md:flex-1 md:ml-10 md:justify-start">
        <div className="text-lg mt-3 md:mt-0">
          {title}
        </div>
        <div className="mt-2">
          {teaser}
          { ' ' }
          <Link href={link} className="underline" title={title}>
            <FormattedMessage id="blog.read_more" />
          </Link>
        </div>
      </div>
    </div>
  );
}
