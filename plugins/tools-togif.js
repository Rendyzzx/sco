import {
    webp2mp4
} from '../lib/webp2mp4.js'

let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    if (!m.quoted) throw `Balas stiker dengan caption *${usedPrefix + command}*`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/webp/g.test(mime)) throw `Balas stiker dengan caption *${usedPrefix + command}*`
    let media = await q.download?.()
    let out = Buffer.alloc(0)
    m.react(waits)
    if (/webp/g.test(mime)) {
        out = await webp2mp4(media)
    }
    m.react(done)
    await conn.sendMessage(m.chat, {
        video: {
            url: out
        },
        caption: me,
        gifPlayback: true,
        gifAttribution: Math.floor(Math.random() * 2) + 1
    }, {
        quoted: m
    })
}
handler.help = ['togif']
handler.tags = ['tools']
handler.command = /^togif?$/i
handler.limit = true

export default handler