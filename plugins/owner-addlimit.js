let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Who wants to increase the limit ?'
    let who
    if (m.isGroup) who = m.quoted ? [m.quoted.sender] : m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    else who = m.chat
    let users = global.db.data.users
    users[who].limit += text
    conn.reply(m.chat, 'berhasil menambahkan '+text+' limit ke pada user!', m)
}
handler.help = ['addlimit']
handler.tags = ['owner']
handler.command = /^addlimit(user)?$/i
handler.rowner = true

export default handler