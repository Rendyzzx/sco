import fs from 'fs'
import os from 'os'
const getFolderSize = (await import("get-folder-size")).default;
import { sizeFormatter } from 'human-readable'
let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn }) => {
	let chats = Object.entries(conn.chats).filter(([a, b]) => a && b.isChats)
	let groups = chats.filter(([a]) => a.endsWith('g.us'))
	let storage = await getFolderSize.loose('.');
    let moduls = await getFolderSize.loose('./node_modules');
    let session = await getFolderSize.loose('./sessions')
    let databse = await getFolderSize.strict('./database.json');  
	let txt = `
*BOT:*
- ${groups.length} Group Chats
- ${chats.length - groups.length} Personal Chats
- ${chats.length} Total Chats
- Runtime: (${new Date(~~(process.uptime()) * 1000).toTimeString().split(' ')[0]})

*STORAGE*
• Internal: ${FileSize(storage)}
• Modules: ${FileSize(moduls)}
• Session: ${FileSize(session)}
• Database: ${FileSize(databse)}
`
	m.reply(txt.trim())
}
handler.alias = ['stats']
handler.command = /^(stats)$/i

export default handler

const FileSize = (number) => {
    var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}