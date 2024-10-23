const xpperlimit = 10000
let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^buylimit/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].money >= xpperlimit * count) {
    global.db.data.users[m.sender].money -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.reply(m.chat, `Sukses membeli limit sebesar ${toSimpl(count)} money ✨`, m)
  } else conn.reply(m.chat, `[❗] Money anda tidak mencukupi untuk membeli limit sebesar ${toSimpl(count)} ✨`, m)
}
handler.help = ['buylimit <jumlah>']
handler.tags = ['rpg']
handler.command = /^(buylimit)$/i

export default handler