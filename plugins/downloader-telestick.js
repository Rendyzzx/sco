import fetch from "node-fetch"
import {
    Sticker,
    StickerTypes
} from "wa-sticker-formatter"
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://t.me/addstickers/namapack`
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `url salah`
    let packName = args[0].replace("https://t.me/addstickers/", "")
    let gas = await fetch(cors+`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {
        method: "GET",
        headers: {
            "User-Agent": "GoogleBot"
        }
    })
    if (!gas.ok) throw eror
    let json = await gas.json()
    m.reply(`*Total stiker:* ${json.result.stickers.length}
*Estimasi selesai:* ${json.result.stickers.length * 1.5} detik`.trim())
    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id
        let gasIn = await fetch(cors+`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
        let jisin = await gasIn.json()
        // conn.sendMessage(m.chat, { url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path }, MessageType.sticker)
        //let stiker = await sticker(false, cors+"https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, global.packname, global.author)
        let stiker = await createSticker(false, cors+"https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, global.stickpack, global.stickauth, 30)
        await conn.reply(m.sender, stiker, null)
        /*await conn.sendFile(m.sender, stiker, null, {
            asSticker: true
        })*/
        await delay(5000)
    }
    throw `Selesai`
}
handler.help = ['telesticker'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.command = /^(telestic?ker|stic?kertele)$/i
export default handler

const delay = time => new Promise(res => setTimeout(res, time))

async function createSticker(img, url, packName, authorName, quality) {
    try {
        let stickerMetadata = {
            type: 'full',
            pack: packName,
            author: authorName,
            quality
        }
        return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
    } catch (error) {
        console.error('Error:', error);
    }
}