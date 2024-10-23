import axios from 'axios';

const api = 'https://spotydown.media/api';
const headers = {
    'authority': 'spotydown.media',
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://spotydown.media',
    'referer': 'https://spotydown.media/',
    'user-agent': 'Postify/1.0.0',
    'x-forwarded-for': Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.'),
};

async function request(endpoint, data) {
    try {
        const response = await axios.post(`${api}/${endpoint}`, data, { headers });
        return response.data;
    } catch (error) {
        err(error);
        throw error;
    }
}

async function metadata(link) {
    return request('get-metadata', { url: link });
}

async function downloadTrack(link) {
    return request('download-track', { url: link });
}

async function file(fileUrl) {
    try {
        const response = await axios.get(fileUrl, { headers });
        return response.data;
    } catch (error) {
        err(error);
        throw error;
    }
}

function err(error) {
    if (axios.isAxiosError(error)) {
        console.error(error.message);
        if (error.response) {
            console.error(error.response.data);
        }
    } else {
        console.error(error);
    }
}

export { metadata, downloadTrack, file };