import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function App({
  thumbnail, title, link, description,
}) {
  return (
    <div className="flex mb-12 border border-transparent hover:border-gray-light dark:hover:border-gray-dark rounded-lg p-4 -mx-4 transition-all duration-300 group">
      <div className="flex-grow flex-1">
        <div className="text-xl mb-2 tracking-tight">
          {title}
        </div>
        <div className="text-gray-dark dark:text-gray leading-relaxed">
          {description}
        </div>
        <div className="mt-3">
          <Link href={link} className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-60 transition-opacity duration-200">
            <FormattedMessage id="apps.more" />
          </Link>
        </div>
      </div>
      {thumbnail && (
        <div className="ml-4 md:ml-10 flex items-center">
          <Link href={link}>
            <Image
              src={thumbnail}
              alt={title}
              width={100}
              height={100}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
