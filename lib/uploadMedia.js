import axios from 'axios';

async function upload(buffer) {
  let res = await axios.post('https://rammpntxxx-up.hf.space/upload', {
    file: buffer.toString('base64')
  }).catch(e => e.response);
  return res.data;
}

export { upload }