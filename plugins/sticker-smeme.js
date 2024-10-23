import uploadFile from '../lib/uploadFile.js'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [bawah, atas] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Example; ${usedPrefix+command} Hi\n\nReply Stiker nya`
    //if (!/image\/(jpe?g|png)/.test(mime)) throw `Error`
    //m.reply(global.wait)
    m.react(waits)
    let img = await q.download()
    let url = await uploadFile(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah ? bawah : '')}/${encodeURIComponent(atas ? atas : '')}.png?background=${url}`
    let stiker = await sticker(false, meme, global.packname, global.author)
    m.react(done)
    if (stiker) await conn.sendFile(m.chat, stiker, '', author, m, '', { asSticker: 1 })
}
handler.help = handler.command = ['smeme']
handler.tags = ['tools']
handler.limit = true
export default handler