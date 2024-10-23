import { wallpaper } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    try{
    const res = await (wallpaper)(text)
    const img = res[Math.floor(Math.random() * res.length)]
    conn.sendFile(m.chat, img, 'wallpaper.jpg', `Result from *${text}*`, m)
    } catch(e) {
    throw eror
    }
}
handler.help = ['wallpaper']
handler.tags = ['downloader']
handler.command = /^(wallpaper)$/i

export default handler