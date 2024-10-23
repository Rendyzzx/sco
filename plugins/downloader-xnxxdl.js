var xnxx = await import('../lib/xnxx.js')
//import { apivisit } from './kanghit.js'

let handler = async (m, { conn, text }) => {
  try {
	if (!text) throw 'Input URL'	 
	m.reply(wait)
	var data = await xnxx.xnxxdl(text)	
	var res = data.result.files.high
	var rep = conn.sendFile(m.chat, res, '', me, m)	 
	var wtf = `Title: ${data.result.title},\nURL: ${data.result.URL},\nduration: ${data.result.duration},\nquality: ${data.result.quality},\ninfo: ${data.result.info}`	
    conn.reply(m.chat, wtf, rep)	
  } catch (e) {
    console.log(e)
    throw e
  }
}
handler.help = ['xnxxdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.alias = ['bokep', 'xnl', 'xxx', 'xnxx']
handler.premium = true
handler.command = /^(xnxx(dl)?|xnxx(dl)?)$/i
export default handler