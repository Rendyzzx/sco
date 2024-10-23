import axios from 'axios'
import cheerio from 'cheerio'
//import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input URL'
	//if (!text.match(/(x.com)/gi)) throw `Invalid *URL*`
	try {
	await m.react(waits)
	let html = await (await axios.get("https://twtube.app/en/download?url="+ text)).data
    let $ = cheerio.load(html)
    let k = $('.square-box-img').get().map(el => 
    $(el).find('img').attr('src') || $(el).find('video').attr('src'))
    for (let x = 0; x < k.length; x++) {
		conn.sendFile(m.chat, k[x], '', null, m)
	}
	m.react(done)
	//await apivisit
  } catch (e) {
    console.log(e)
    throw eror
  }
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['twt', 'twtdl', 'twitter', 'twitterdl']
handler.command = /^((twt|twitter)(dl)?)$/i
export default handler