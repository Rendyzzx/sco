//By https://github.com/DIEGO-OFC

import jimp from "jimp"
import uploadImage from "../lib/uploadImage.js"
import uploadFile from "../lib/uploadFile.js"

let handler = async (m, {
    conn,
    usedPrefix
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw "*Reply Foto Nya*"
    try {
        let media = await q.download()
        let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
        let link = await uploadFile(media)
        let source = await jimp.read(await link)
        let height = await source.getHeight()
        let width = await source.getWidth()
        let cap = `${htjava} *RESOLUTION :* ${width} x ${height}
> Width : ${width}
> Heighta : ${height}
> Link: ${link}`
        m.reply(cap)
    } catch (e) {
        throw eror
    }
}
handler.help = ['cekresolution', 'cekreso']
handler.tags = ['tools']
handler.command = /^(cekreso(lution)?)$/i

export default handler