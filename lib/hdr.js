import cheerio from 'cheerio';
import got from 'got';
import axios from 'axios' 
import Form from 'form-data';
import { z } from 'zod';

async function enhanceImg(url, scale) {
  const scaleNumber = scale ? scale : 2
  const { data } = await axios(`https://toolsapi.spyne.ai/api/forward`, {
    method: "post",
    data: {
      image_url: url,
      scale: scaleNumber,
      save_params: {
        extension: ".png",
        quality: 95
      }
    },
    headers: {
      "content-type": "application/json",
      accept: "*/*"
    }
  })
  return data
}
export { enhanceImg }