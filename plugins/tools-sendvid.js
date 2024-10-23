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
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await upload(media)
    let caption = link.url
    m.react(done)
    await conn.sendMessage(m.chat,
            {
                video: { url: caption },  
                mimetype: "video/mp4",
                interactiveAnnotations: [
                    {
                        polygonVertices: [
                            { x: 60.71664810180664, y: -36.39784622192383 },
                            { x: -16.710189819335938, y: 49.263675689697266 },
                            { x: -56.585853576660156, y: 37.85963439941406 },
                            { x: 20.840980529785156, y: -47.80188751220703 }
                        ],
                        location: {
                            degreesLatitude: -7.64780786537579,
                            degreesLongitude: 111.51515875252841,
                            name: "Yahahahha"
                        }
                    }
                ],
            },
            { quoted: m }
        );
}
handler.help = ['sendvid']
handler.tags = ['tools']
handler.command = /^(sendvid)$/i
handler.limit = true
handler.owner = true
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