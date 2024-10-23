import cheerio from 'cheerio';
import got from 'got';
import axios from 'axios' 
import Form from 'form-data';
import { z } from 'zod';

const kbbi = async (query) => {
 return new Promise((resolve, reject) => {
    const url = 'https://kbbi.web.id/'
    axios.get(url + query).then(res => {
        const $ = cheerio.load(res.data)
        const arti = $('div#d1').text().trim()
        resolve(arti)
    }).catch(reject)
})
}

export { kbbi }