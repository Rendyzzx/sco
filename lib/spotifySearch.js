import fetch from 'node-fetch';

async function searchSpotifyTracks(query) {
    const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
    const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const getToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            timeout: 60000, // 60 seconds
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            }),
            headers: {
                Authorization: `Basic ${auth}`
            },
        });
        return (await response.json()).access_token;
    };

    const accessToken = await getToken();
    const offset = 10;
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
    const response = await fetch(searchUrl, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });
    const data = await response.json();
    return data.tracks.items;
}

export { searchSpotifyTracks }