import axios from "axios"

async function kitsune(url, opts = {}) {
    const response = await axios.post('https://kityune.imput.net/api/json', {
        url,
        ...opts
    }, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export { kitsune }