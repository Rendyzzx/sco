/*💥 *MEDIAFIRE DOWNLOADER* 

🍑 *MOD*
- Bypass SSL Certificate Validation

🧑‍💻 Script Code by Daffa
*/

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import https from 'https';
import path from 'path';

const meki = axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

const MediaFire = {
    async request(url) {
        try {
            const { data } = await meki.get(url, { headers: { 'User-Agent': 'Postify/1.0.0' } });
            return cheerio.load(data);
        } catch (error) {
            console.error(error.message);
            return null;
        }
    },

    async dl(url) {
        const fileName = path.basename(url);
        const filePath = path.join('tmp', fileName);

        try {
            const writer = fs.createWriteStream(filePath);
            const response = await meki.get(url, { responseType: 'stream' });
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    resolve();
                });
                writer.on('error', (error) => {
                    console.error(error.message);
                    reject(error);
                });
            });
        } catch (error) {
            console.error(error.message);
        }
    },

    async detail(url) {
        const $ = await this.request(url);
        if (!$) return {};

        const downloadLink = $('#download_link a.input.popsok').attr('href');
        const result = {
            fileName: $('.dl-btn-label').text().trim(),
            downloadLink: downloadLink.startsWith('//') ? `https:${downloadLink}` : downloadLink,
            fileSize: $('.dl-info .details li').first().find('span').text().trim(),
            uploadedDate: $('.dl-info .details li').last().find('span').text().trim(),
            mimetype: $('.dl-btn-cont .icon').attr('class')?.split(' ')[1] || 'Gak tau',
        };
        return result; 
    },
};

export { MediaFire };