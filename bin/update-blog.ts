import fetch from 'node-fetch';

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
  // const items = json.items.map((item:BlogItem) => {
  //   const temp = document.createElement('div');
  //   temp.innerHTML = item.description;
  //   const teaser = temp.querySelector('p')?.textContent;
  //   return {
  //     guid: item.guid,
  //     thumbnail: item.thumbnail,
  //     title: item.title,
  //     link: item.link,
  //     teaser,
  //   };
  // });
  console.log(json);
};

updateBlog();
