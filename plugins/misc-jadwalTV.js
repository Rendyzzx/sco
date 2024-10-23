//Module version

import { jadwalTV } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix: _p }) => {

 if(!text) throw 'Input Chanel TV Name!'
try{
let res = await jadwalTV(text)
	let txt = res.result.map((v) => `──[ Jadwal TV ${res.channel} ]──\n\n*[ ${v.date.replace('WIB', ' WIB')} ]*\n • ${v.event}`).join`\n`
	let ch = `\n\t\t\t\t\n`

  m.replyV2(txt+ch)
} catch(e) {
m.reply(`🚩 Chanel tidak di temukan `)
}
}

handler.alias = ['jtv', 'jadwaltv']
handler.command = /^(jtv|jadwaltv)$/i

export default handler