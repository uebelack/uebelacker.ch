/* eslint-disable global-require */
import React from 'react';
import BlogItem from './BlogItem';
import BlogItemType from '../types/BlogItemType';

const items = ((require('../data/blog.json')) as BlogItemType[]);

export default function Blog() {
  return (<ul>{items.map((item) => (<li key={item.guid}><BlogItem item={item} /></li>))}</ul>);
}
