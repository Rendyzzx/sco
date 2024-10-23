let handler = async (m, {
    conn,
    usedPrefix,
    text,
    command
}) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `*command nya ga terdaftar bang*`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw '*Lah*'
    delete sticker[hash]
    m.reply(`> ${htjava} Succes`)
}
handler.command = ['delcmd']
handler.rowner = true
export default handler