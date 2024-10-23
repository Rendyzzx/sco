let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    let user = global.db.data.users[who]
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit
    m.reply(`
${htjava} *Username:* ${user.registered ? user.name : conn.getName(who)}
${htjava} *Status:*  ${who.split`@`[0] == global.nomorown ? 'Creator' : user.premiumTime >= 1 ? 'Premium' : user.level >= 1000 ? 'Elite User' : 'Free User'}
${htjava} *Limit:* ${toSimpl(limit)}

> If you want to buy a limit, please type "buylimit"
`.trim())
}
handler.help = handler.command = ['limit']
handler.tags = ['rpg']

export default handler