import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import BlogItemType from '../types/BlogItemType';

export default function BlogItem({ item } : { item: BlogItemType }) {
  return (
    <div className="mb-10 md:flex">
      <div className="relative h-48 md:h-32 md:w-48">
        <Link href={item.link}>
          <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} />
        </Link>
      </div>
      <div className="max-h-64 md:flex-1 md:ml-10">
        <div className="text-lg mt-3">
          {item.title}
        </div>
        <div className="mt-2 text-sm">
          {item.teaser}
          { ' ' }
          <Link href={item.link} className="underline">
            <FormattedMessage id="blog.read_more" />
          </Link>
        </div>
      </div>
    </div>
  );
}
