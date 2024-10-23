import axios from 'axios'
import clph from 'caliph-api'
import fetch from "node-fetch"

import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
try{
m.reply(global.wait)
	let q = m.quoted ? m.quoted : m	 
	let media = await q.download()	 
		let data = await uploadImage(media)		 
		conn.sendMessage(m.chat, {image: {url:data}, viewOnce : true}, {quoted:m})
} catch(e) {
console.log(e)
m.reply(` 🚩 Media Not surrport `)
}
}
handler.help = ['toviewone']
handler.tags = ['tools']
handler.limit = true
handler.command = ['toviewone','toone']

export default handler