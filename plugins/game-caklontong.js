import { caklontong } from '@bochilteam/scraper'

let timeout = 60000
let poin = 10000
let imgr = flaaa.getRandom()
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
        throw false
    }
    const json = await caklontong()
    let caption = `───[ *${command.toUpperCase()}* ]───

Pertanyaan:
    
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcak untuk bantuan
Bonus: ${toSimpl(poin)} UANG💵
    `.trim()
    conn.caklontong[id] = [
        await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
        externalAdReply: {
        title: `GAME`,
        thumbnailUrl: `${imgr + command}`,
        mediaType: 1,
        renderLargerThumbnail: true
        }}}, { quoted: m}),
        //conn.sendFile(m.chat, `${imgr + command}`, null, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i

export default handler