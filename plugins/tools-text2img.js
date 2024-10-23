import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw 'Prompt?';
    try {
        m.reply(wait)
        var a = await (await axios.get(`https://tti.photoleapapp.com/api/v1/generate?prompt=${text}`)).data;
        conn.sendFile(m.chat, a.result_url, '', 'Prompt: '+text, m);
    } catch(e) {
        // m.reply(`🚩 Server tidak merespons / Media tidak valid`)
        console.error(e);
        m.reply('Terjadi kesalahan');
    }
};

handler.help = handler.command = ['text2img', 'replicate'];
handler.tags = ['tools'];
handler.premium = true;

export default handler;