import fs from 'fs'
let timeout = 60000
let poin = 10000
let imgr = flaaa.getRandom()
let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
        throw false
    }
    let src = JSON.parse(fs.readFileSync('./json/game/siapakahaku.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `───[ *${command.toUpperCase()}* ]───
        
Siapakah aku? ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} UANG💵
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendMessage(m.chat, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: wm,
                    body: conn.user.name,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: `${imgr+command}`,
                    sourceUrl: `p`
                }
            },
            text: caption
        }, {
            quoted: m
        }),
        //conn.sendButton(m.chat, caption, author, ['hint', `${usedPrefix}who`], m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) m.reply(`Waktu habis!\nJawabannya adalah *${json.jawaban}*`)
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

export default handler