import fs from 'fs'
let handler = async (m, { usedPrefix, text, command }) => {
    if (!text) return m.reply(`uhm.. teksnya mana?\n\npenggunaan:\n${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} plugins/anu.js`)
    if (!m.quoted.text) return m.reply(`balas pesan nya!`)
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`tersimpan di ${path}`)
}
handler.help = ['savefile'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^savefile$/i

handler.rowner = true
export default handler