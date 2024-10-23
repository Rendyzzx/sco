import { tebakkata } from '@bochilteam/scraper'
let timeout = 60000
let poin = 10000
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    const json = await tebakkata()
    let caption = `───[ *${command.toUpperCase()}* ]───
    
Pertanyaan:

${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hkat untuk bantuan
Bonus: ${toSimpl(poin)} UANG💵
    `.trim()
    conn.tebakkata[id] = [
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
            if (conn.tebakkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i

export default handler