import axios from 'axios';

const atob = (b64) =>
  global.atob ? global.atob(b64) : Buffer.from(b64, 'base64').toString('utf-8');

const cacheUrl = 'https://cache.lahelu.com/';

const lahelu = async (url) => {
  // udh coba sniff, ga nemu endpoint API buat get post via id
  const { data: html } = await axios.get(url);
  const json = html.match(/JSON.parse(.*?); /g)[0];
  const { postInfo } = eval(json.replace('window.', ''));

  return Object.assign(postInfo, {
    mediaUrl: cacheUrl + postInfo.media,
    mediaThumbnailUrl: cacheUrl + postInfo.mediaThumbnail,
  });
};

export { lahelu };