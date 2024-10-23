import axios from 'axios';

async function generateImage(prompt) {
    const url = 'https://api.fliki.ai/rpc/common.generateImage?batch=1';

/* INS scrape - Copyright INS, do not copy without permission. */

    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'Referer': 'https://fliki.ai/tools/ai/image-generator'
    };

    const body = {
        "0": {
            "description": prompt,
            "aspectRatio": "portrait" //rasio yang tersedia [portrait, square, landscape]
        }
    };

    try {
        const response = await axios.post(url, body, { headers });
        
        const imageUrl = response.data[0].result.data.data;

        return imageUrl;
    } catch (error) {
        return null;
    }
}

export { generateImage }