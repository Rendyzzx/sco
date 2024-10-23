import { family100 } from '@bochilteam/scraper'
const winScore = 7000
async function handler(m) {
let imgr = flaaa.getRandom()

    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
        throw false
    }
    const json = await family100()
    let caption = `
*Soal:* ${json.soal}
 ↓
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${toSimpl(winScore)} Money tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await conn.sendMessage(m.chat, {
text: caption,
contextInfo: {
externalAdReply: {
title: `Family100`,
thumbnailUrl: `${imgr + 'Family100'}`,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m}), 
        //this.sendFile(m.chat, imgr + 'Family100', null, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i

export default handler