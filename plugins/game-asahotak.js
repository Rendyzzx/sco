import fetch from 'node-fetch'
let timeout = 120000
let poin = 10000
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
    let imgr = flaaa.getRandom()

    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.asahotak[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `───[ *${command.toUpperCase()}* ]───
Pertanyaan 

${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hasa untuk bantuan
Bonus: ${poin} MONEY 💵
    `.trim()
    conn.asahotak[id] = [
        await conn.sendMessage(m.chat, {
  text: caption,
  contextInfo: {
  externalAdReply: {
  title: `ASAH OTAK`,
  thumbnailUrl: `${imgr + command}`,
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, { quoted: m}),
        //await conn.sendFile(m.chat, imgr + command, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak/i

export default handler

const buttons = [
    ['Hint', '/hasa'],
    ['Nyerah', 'menyerah']
]