import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function BlogItem({
  thumbnail, title, link, teaser,
}) {
  return (
    <div className="mb-12 md:flex border border-transparent hover:border-gray-light dark:hover:border-gray-dark rounded-lg p-4 -mx-4 transition-all duration-300 group">
      <div className="relative h-48 md:h-36 md:w-52 rounded-md overflow-hidden">
        <Link href={link} title={title}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw,
            208px"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="max-h-64 md:flex-1 md:ml-8 md:justify-start">
        <div className="text-lg mt-3 md:mt-0 tracking-tight">
          <Link href={link} title={title}>
            {title}
          </Link>
        </div>
        <div className="mt-2 text-gray-dark dark:text-gray leading-relaxed">
          <Link href={link} title={title}>{teaser}</Link>
          { ' ' }
          <Link href={link} className="underline" title={title}>
            <FormattedMessage id="blog.read_more" />
          </Link>
        </div>
      </div>
    </div>
  );
}
