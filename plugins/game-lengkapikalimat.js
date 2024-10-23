import fetch from 'node-fetch'
let timeout = 60000
let poin = 10000
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {}
    let id = m.chat
    if (id in conn.lengkapikalimat) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.lengkapikalimat[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*───[ ${command.toUpperCase()} ]───*

Pertanyaan: 

${json.pertanyaan} 

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlen untuk bantuan
Bonus: ${poin} UANG💵
    `.trim()
    conn.lengkapikalimat[id] = [
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
            if (conn.lengkapikalimat[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.lengkapikalimat[id][0])
            delete conn.lengkapikalimat[id]
        }, timeout)
    ]
}
handler.help = ['lengkapikalimat']
handler.tags = ['game']
handler.command = /^lengkapikalimat/i

export default handler