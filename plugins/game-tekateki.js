import fs from 'fs'
let timeout = 60000
let poin = 10000
let imgr = flaaa.getRandom()
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tekateki[id][0])
        throw false
    }
    let src = JSON.parse(fs.readFileSync('./json/game/tekateki.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*───[ ${command.toUpperCase()} ]───*
    
Pertanyaan:

${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}htek untuk bantuan
Bonus: ${poin} UANG💵
    `.trim()
    conn.tekateki[id] = [
        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: `GAME`,
                    thumbnailUrl: `${imgr + command}`,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        }),
        //conn.sendFile(m.chat, pp, null, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*`)
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i

export default handler

const pickRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}