import {
    toPTT
} from "../lib/converter.js";
var {
    Groq
} = await import("groq-sdk")
var {
    fetch
} = await import('undici');
var {
    upload
} = await import('../lib/uploadMedia.js')

const groq = new Groq({
    apiKey: apiMixtrl
});
export async function all(m) {
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return

    // ketika ditag 
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            this.autoai[m.sender] = {
                pesan: []
            }
            //if (!m.text) throw 'Halo! Aku R-BOT. Ada yang bisa aku bantu?'           
            const messages = [{
                    role: "system",
                    content: system
                },
                {
                    role: "assistant",
                    content: system
                },
                {
                    role: "user",
                    content: m.text
                }
            ]
            var res = await groq.chat.completions.create({
                messages,
                model: "mixtral-8x7b-32768"
            })
            var response = res.choices[0].message.content
            console.log(res.choices[0].message)
            // Reply with the bot's response
            //return m.reply(respon);
            //m.reply(response)
            var url = 'https://wavel.ai/wp-json/myplugin/v1/tts';
            var data = new URLSearchParams({
                lang: 'id-ID',
                text: response,
                voiceId: 'en-US-EmmaMultilingualNeural'
            });

            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest'
            };

            var response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: data
            });

            var jsonResponse = await response.json();
            var base64Audio = jsonResponse.base64Audio;
            var audioData = Buffer.from(base64Audio, 'base64');
            var audio = await toPTT(audioData, "mp3");
            await conn.sendFile(m.chat, audio.data, "audio.mp3", "", m, !0, {
                mimetype: "audio/ogg; codecs=opus",
                ptt: !0
            });
        }
    } catch (e) {
        console.log(e)
        return
    }
}