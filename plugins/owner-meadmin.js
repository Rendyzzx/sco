let handler = async (m, { conn, text, participants }) => {
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
m.reply(`Siap Owner`)
}
handler.help = ['meadmin']
handler.tags = ["owner"]
handler.command = /^(meadmin)$/i
handler.botAdmin = true
handler.owner = true
handler.group = true

export default handler


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))