import axios from 'axios' 
let handler = async ( m, {text, usedPrefix,  command} ) => {
if (!text) throw `*Exp: ${usedPrefix+command} Simple login page*`
try{
m.reply(wait)
var res = await (await axios.get('https://vihangayt.me/tools/genwebsite?q='+text))
var html = res.data.data.extra_info.html
var css = res.data.data.extra_info.css
var final = `CSS 👨‍💻\n\n${css}\nHTML 👨‍💻\n\n${html}`
await conn.sendMessage(m.chat, {
  text: final,
  contextInfo: {
  externalAdReply: {
  title: `WEBSITE GENERATOR`,
  thumbnailUrl: `https://telegra.ph/file/02b4ca0c1e1e07bc26dce.jpg`,
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, { quoted: m})
  } catch(e) {
  console.log(e)
  throw eror
  }
}
handler.help = handler.command = ['webai','webgenerator']
handler.limit = true
export default handler