import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

interface Props {
  thumbnail: string,
  title: string,
  link: string,
  description: string,
}

export default function App({
  thumbnail, title, link, description,
} : Props) {
  return (
    <div className="flex mb-10">
      <div className="flex-grow flex-1">
        <div className="text-lg mb-2">
          {title}
        </div>
        <div className="">
          {description}
        </div>
        <div className="mt-2">
          <Link href={link} className="underline">
            <FormattedMessage id="apps.more" />
          </Link>
        </div>
      </div>
      <div className="ml-2 md:ml-10 mt-8">
        <Link href={link}>
          <Image
            src={thumbnail}
            alt={title}
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
}
