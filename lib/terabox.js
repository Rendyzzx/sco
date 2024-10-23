import axios from 'axios'

async function getLink(payload) {
  try {
    const response = await axios.post('https://terabox-dl.qtcloud.workers.dev/api/get-download', payload);
    return response.data.downloadLink;
  } catch (error) {
    return error.response.data;
  }
}

async function terabox(url) {
  let id = (url.split(/surl=|\/s\//) || [])[1];
  id = `1${id.replace(/^1/, '')}`;

  const infoResponse = await axios.get(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${id}`);
  const info = infoResponse.data;

  if (info.ok !== true) {
    throw new Error(info.message);
  }

  for (const file of info.list) {
    const payload = {
      shareid: info.shareid,
      uk: info.uk,
      sign: info.sign,
      timestamp: info.timestamp,
      fs_id: file.children.length ? file.children[0].fs_id : file.fs_id
    };
    const dlUrl = await getLink(payload);
    file.downloadLink = dlUrl;
  }

  return info;
}

export { terabox }