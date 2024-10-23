import {
    canLevelUp,
    xpRange
} from "../lib/levelling.js"
import {
    levelup
} from "../lib/canvas.js"

export async function before(m) {
    if (m.isBaileys || !m.sender) return false;
    let user = global.db.data.users[m.sender]
    let chats = global.db.data.chats[m.chat]
    if (!chats.autolevelup) return false;

    let beforeLevel = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (beforeLevel !== user.level) {
        let teks = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}`
        let str = `Congratulations on leveling up\nfrom *${beforeLevel}* To *${user.level}*\n
> Pada Jam : ${new Date().toLocaleString("id-ID")}
`.trim()         
        try {
            let datac = await levelup(teks, user.level)
            //await conn.sendFile(m.chat, datac, "", str, m)
            m.reply(str)
        } catch (e) {
            try {
                //await conn.sendFile(m.chat, fla + "levelup", "", str, m)
                m.reply(str)
            } catch (e) {
                await m.reply(str || eror)
            }
        }

    }
}