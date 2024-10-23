import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    try{
    m.reply(wait)
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendMessage(
         m.chat,
             { image: 
                 { url: link }, 
                       caption: `
*GOOGLE IMAGE*
🔎 *Result:* ${text}
🌎 *Source:* Google
`
}, 
   {
     quoted:m
     }
   )
  } catch(err) {
  console.log(err)
  m.reply(eror)
}
}
handler.help = handler.command =  ['gimage', 'image']
handler.tags = ['tools']
handler.limit = 50

export default handler