let handler = async (m, {
	conn,
	usedPrefix
}) => {
	let warning = global.db.data.users[m.sender].warn
	let ndy = `
*Kamu Memiliki ${warning} Warn*
 `.trim()
	conn.reply(m.chat, ndy, m)
}

handler.help = ['cekwarn']
handler.tags = ['general']
handler.command = /^(cekwarn)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)