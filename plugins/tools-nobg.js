var { removebg } = await import("../lib/nobg.js")
let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Kirim/Reply Gambar dengan caption .removebg'
    m.react(waits)
    let media = await q.download()
    let url = await removebg(media)
    await conn.sendMessage(m.chat, { document: { url: url.image }, caption: wm, mimetype: "image/png", fileName: "RemoveBaground.png" }, { quoted: m })
}
handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(removebg|nobg)$/i
handler.limit = true

export default handler