import axios from 'axios' 

const API_URL = 'https://openai.lbbai.cc/v1/chat/completions';

async function chatAI(query, profile) {
    const payload = {
        messages: [{
                role: "system",
                content: profile
            },
            {
                role: "user",
                content: query
            },
        ],
        model: "gpt-3.5-turbo",
        presence_penalty: 0,
        stream: true,
        temperature: 0.7,
    };

    try {
        const response = await axios.post(API_URL, payload);
        const inputString = response.data;

        return inputString
            .split('\n\n')
            .filter(data => data.includes('data: {"id":"chatcmpl'))
            .map(data => {
                try {
                    return JSON.parse(data.match(/{.*}/)?.[0]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .filter(Boolean)
            .map(data => data.choices[0].delta.content)
            .join('');
    } catch (error) {
        console.error('Error during chatAI request:', error);
        throw error;
    }
}

export {
  chatAI
}