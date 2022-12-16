/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'isomorphic-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

interface BlogItem {
  guid: string;
  thumbnail: string;
  title: string;
  link: string;
  description: string;
}

const updateBlog = async () => {
  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@uebelack');
  const json = await response.json();
  const items = json.items.map((item:BlogItem) => {
    const dom = new JSDOM(item.description);
    const teaser = dom.window.document.querySelector('p')?.textContent;
    return {
      guid: item.guid,
      thumbnail: item.thumbnail,
      title: item.title,
      link: item.link,
      teaser,
    };
  });
  fs.writeFileSync('data/blog.json', JSON.stringify(items));
};

updateBlog();
