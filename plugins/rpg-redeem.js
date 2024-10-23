const cooldown = 86400000
let handler = async (m, {
    conn,
    args,
    usedPrefix
}) => {
    let user = global.db.data.users[m.sender]
    let ctimer = (new Date - user.lastcode)
    let _ctimer = (cooldown - ctimer)
    let timers = clockString(_ctimer)    
    var jumlahHari = 172800000 
    var now = Date.now(); 
    if (args.length == 0) return conn.reply(m.chat, `Harap masukan code transaksi anda..!!`, m)
    let kodes = args[0] == '1iquHv7wiiwutcct&'  
    if (kodes) {
        if (user.lastcode < cooldown) {
            conn.reply(m.chat, `ANDA MENDAPATKAN PREMIUM 2HARI`, m)
            user.premiumTime = now + jumlahHari;
            user.premium = true;
        } else {
            return m.reply(`Hei Anda sudah mengambill code gift, Code gift anda sudah kadaluarsa..`.trim())
        }
    } else {
        return m.reply(' KODE SUDAH TIDAK BISA DI TUKARKAN ')
    }
}
handler.help = handler.command = ['redeem']
handler.tags = ['rpg']
export default handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}