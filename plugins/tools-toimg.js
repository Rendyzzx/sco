import {
    webp2png
} from '../lib/webp2mp4.js';

let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    const notStickerMessage = `Reply to a sticker with : *${usedPrefix + command}*`;
    try {
        const q = m.quoted || m;
        const mime = q.mediaType || '';
        if (!m.quoted || !/sticker/.test(mime)) return m.reply(notStickerMessage);
        const media = await q.download();
        if (media) await conn.sendMessage(m.chat, {
            image: media,
            caption: me
        }, {
            quoted: m
        });
    } catch (error) {
        try {
            const out = await webp2png(media) || Buffer.alloc(0);
            if (out) await conn.sendFile(m.chat, out, 'out.png', me, m);
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['toimg (reply)'];
handler.tags = ['tools'];
handler.command = /^t(oim(age|g)|im(age|g))$/i;

export default handler;