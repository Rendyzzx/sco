import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
await m.react(done)
let type = (command).toLowerCase()

switch (type) {
case 'waifu': case 'anime':
  let res = (await axios.get('https://api.waifu.pics/sfw/waifu')).data
  conn.sendMessage(m.chat, { image: res, caption: me},  { quoted: m })
break
case 'neko':
  let _neko = (await axios.get('https://api.waifu.pics/sfw/neko')).data
  conn.sendMessage(m.chat, { image: _neko, caption: me},  { quoted: m })
  break
case 'megumin':
  let _megumin = (await axios.get('https://api.waifu.pics/sfw/megumin')).data
  conn.sendMessage(m.chat, { image: _megumin, caption: me},  { quoted: m })
  break    
default:
 }
}

handler.help = handler.command = ['waifu', 'neko', 'megumin','anime']
handler.tags = ['random']
handler.limit = true
export default handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}