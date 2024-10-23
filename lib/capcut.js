import axios from "axios"
import cheerio from "cheerio"

async function capcut(url) {
    const capcutRegex = /^https:\/\/www\.capcut\.com\/t\/[a-zA-Z0-9]+\/$/;

    if (!capcutRegex.test(url)) {
        throw new Error("URL yang diberikan bukan URL CapCut yang valid.");
    }

    try {
        const get = await axios.get('https://vidburner.com/', {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "id;q=0.8",
                "priority": "u=0, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "sec-gpc": "1",
                "upgrade-insecure-requests": "1",
                "cookie": "pll_language=en",
                "Referer": "https://vidburner.com/capcut-video-downloader/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        });

        const $ = cheerio.load(get.data);

        const token = $('#token').attr('value');
        if (!token) {
            throw new Error("Gagal ntuk toked masbro");
        }

        const post = await axios.post('https://vidburner.com/wp-json/aio-dl/video-data/', 
            `url=${encodeURIComponent(url)}&token=${token}`, {
            headers: {
                "accept": "*/*",
                "accept-language": "id;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "cookie": "pll_language=en",
                "Referer": "https://vidburner.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        });

        return post.data;

    } catch (error) {
        console.error(error?.message || error);
        throw error;
    }
}

export { capcut }