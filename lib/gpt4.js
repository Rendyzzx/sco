import axios from 'axios'

async function chat(text) {
    const nonceValue = JSON.parse(cheerio.load(await (await axios.get(
        "https://chatgpt4online.org"
    )).data)('.mwai-chatbot-container').attr('data-system')).restNonce;

    const data = {
        "botId": "default",
        "customId": null,
        "session": "A",
        "contextId": 58,
        "messages": [{
            "role": "assistant",
            "content": "Hai! saya merry",
            "who": "AI: ",
        }],
        "newMessage": text,
        "newFileId": null,
        "stream": false
    };

    const headers = {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonceValue
    };

    try {
        const response = await axios.post('https://chatgpt4online.org/wp-json/mwai-ui/v1/chats/submit', data, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {
    chat
};