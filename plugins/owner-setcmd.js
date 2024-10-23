let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    global.db.data.sticker = global.db.data.sticker || {}
    if (!m.quoted) throw '*Lah?*'
    if (!m.quoted.fileSha256) throw '*Cuma Bisa untuk sticker*'
    if (!text) throw `*Example: ${usedPrefix+command} <reply sticker>*`
    let sticker = global.db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw '*Lah?*'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: +new Date,
        locked: false
    }
    m.reply(`${htjava} Berhasil`)
}
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.rowner = true
export default handler