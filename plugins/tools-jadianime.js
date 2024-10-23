//import axios from 'axios';
import uploadFile from '../lib/uploadFile.js'
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let url = await uploadFile(media)

    await m.reply(wait)
    try {
        let res = 'https://skizo.tech/api/toanime?apikey=' + apikey + '&url=' + url
        await conn.sendMessage(m.chat, {
            image: {
                url: res
            },
            caption: me,
            mentions: [m.sender]
        }, {
            quoted: m
        });
    } catch (e) {
        console.log(e)
        await m.reply(eror)
    }
}
handler.help = ["jadianime"].map(v => v + " (Balas foto)")
handler.tags = ["tools"]
handler.command = /^(jadianime)$/i
handler.limit = true
export default handler