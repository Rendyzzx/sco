var { upload } = await import("../lib/uploadMedia.js")
import fetch from 'node-fetch'
let handler = async (m, {
    args,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    m.react(waits)
    let media = await q.download()
    let link = await upload(media)
    let caption = `> SUCESS
🔗 Original ${link.url}
📝 Short ${await shortUrl(link.url)}

*Ukuran* ${formatBytes(media.length)}`
    m.react(done)
    await conn.reply(m.chat, caption, m)
}
handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(url|tourl)$/i
handler.limit = true
export default handler

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}