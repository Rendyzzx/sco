import api from 'caliph-api'
let handler = async (m, { text, usedPrefix, conn, command }) => {    
api.search.kusonime(text).then(async(data) => {
var a = data.result.deks
var b = data.result.thumb
var c = data.result.judul
m.reply(a)  
})
}
handler.help = ['kusonime']
handler.tags = ['tools']
handler.command = ['kusonime']

export default handler

function pickRandoms(list) {
  return list[Math.floor(list.length * Math.random())]
}