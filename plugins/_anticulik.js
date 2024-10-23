import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
export async function all(m) {
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let name = await this.getName(who)
	let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings
    let user = global.db.data.users[m.sender]
    

   // if (chat.autoReply) {
    // ketika ada yang kirim anu
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat.whatsapp.com') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {       
        m.reply(`
        ╭━━━━「 SEWA 」
        ┊⫹⫺ Sultan: 65k/grup (permanen)
        ┊⫹⫺ Normal: 15k/grup (1 bulan)
        ┊⫹⫺ Hemat: 7k/grup (2 minggu)
        ╰═┅═━––––––๑
        
        ⫹⫺ PAYMENT:
        • Pulsa Telkomsel: [${ppulsa}]
        • Dana: [${pdana}]
        • Gopay: [${pgopay}]
        
        Nomor Owner :
        wa.me/${nomorown}
        
        #${wm}
        `)
await this.reply(nomorown + '@s.whatsapp.net', `Ada Yang Mau Nyulik nih :v \n\ndari: @${m.sender.split("@")[0]} \n\npesan: ${m.text}`, m, { mentions: [m.sender] })
   // }
    }

    return !0
}