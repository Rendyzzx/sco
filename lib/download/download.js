import axios from 'axios';
import { JSDOM } from 'jsdom';

class TikDown {
    constructor() {
        this.url = 'https://www.tikdd.cc/wp-json/aio-dl/video-data/';
        this.headers = {
            'accept': '*/*',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://www.tikdd.cc',
            'referer': 'https://www.tikdd.cc/',
            'user-agent': 'Postify/1.0.0',
            'cookie': 'pll_language=en',
            'x-forwarded-for': Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.')
        };
        this.token = '';
        this.salt = 'aio-dl'; 
    }

    async toket() {
        try {
            const response = await axios.get('https://www.tikdd.cc');
            const dom = new JSDOM(response.data);
            const tokenElement = dom.window.document.getElementById('token');
            if (tokenElement) {
                this.token = tokenElement.value;
            } else {
                throw new Error('Tokennya gak ada 😆');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    bypassHash(url) {
        return btoa(url) + (url.length + 1000) + btoa(this.salt);
    }

    async get(videoUrl) {
        await this.toket()
        const hash = this.bypassHash(videoUrl);

        try {
            const response = await axios.post(this.url, new URLSearchParams({
                url: videoUrl,
                token: this.token,
                hash: hash
            }), {
               headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

export { TikDown };