import axios from 'axios'
import cheerio from 'cheerio'
import { happymod } from '../lib/happymod.js'
let handler = async (m, {
    text,
    command,
    usedPrefix
}) => {
    if(!text) throw `Masukan Query!\n\nContoh:\n${usedPrefix + command} minecraft`
    let result = await happymod(text)
    let teks = result.map((v, i) => {
        return `
*${i + 1}.* ${v.name}
• Link: ${v.link}
`.trim()
    }).filter(v => v).join('\n\n\n')
    conn.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            externalAdReply: {
                title: ``,
                thumbnailUrl: `https://telegra.ph/file/27611f568bb47c937b8f5.jpg`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    })
    //await m.reply(teks)
}
handler.help = handler.command = ['happymod']
handler.tags = ['downloader']
export default handler