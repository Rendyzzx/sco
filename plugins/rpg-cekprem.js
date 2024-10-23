let handler = async (m, {
    conn,
    args,
    command
}) => {
 
    var premiumTime = global.db.data.users[m.sender].premiumTime
    let prem = global.db.data.users[m.sender].premium
    //let waktu = clockString(`${premTime - new Date() * 1} `)

    let fileBuffer = `${htjava} *My Premium Time*
${prem ? `${clockString (premiumTime - new Date() * 1)}` : '• *PremiumTime:* Expired/Notuserprem'}
\n> *Name:* ${conn.getName(m.sender)}`.trim()
    m.reply(fileBuffer)
    setTimeout(() => {
        if (db.data.chats[m.chat].deletemedia) conn.deleteMessage(m.chat, key)
    }, db.data.chats[m.chat].deletemediaTime)
}

handler.help = ['cekprem']
handler.tags = ['rpg']
handler.command = /^(cekprem)$/i

export default handler

function clockString(ms) {
    let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [' • ', ye, ' *Years 🗓️*\n', ' • ', mo, ' *Month 🌙*\n', ' • ', d, ' *Days ☀️*\n', ' • ', h, ' *Hours 🕐*\n', ' • ', m, ' *Minute ⏰*\n', ' • ', s, ' *Second ⏱️*'].map(v => v.toString().padStart(2, 0)).join('')
}

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
        return {
            ...b[i],
            [property]: a[property] === undefined ? _default : a[property]
        }
    }
    else return a => a === undefined ? _default : a
}