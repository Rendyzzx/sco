let handler = async (m, { text }) => {
let dataGempa = global.db.data.other
if(dataGempa == undefined ) global.db.data = other 
if(m.isGroup) {
if(!text) return m.reply("Pilih on atau off")
if(text == "on"){
if(dataGempa.includes(m.chat)) return m.reply("Sudah aktif di group ini")
dataGempa.push(m.chat)
m.reply(`Berhasil menambahkan group kedalam auto update gempa`)
} else if(text == "off"){
if(!dataGempa.includes(m.chat)) return m.reply("Sudah nonaktif di group ini")
dataGempa.splice(dataGempa.indexOf(m.chat))
m.reply(`Berhasil menonaktifkan group kedalam auto update gempa`)
}


} else {
if(!text) return m.reply("Masukin idgc")
if(!text.includes("@g.us") ) return m.reply("Masukan id")
if(global.db.data.other.includes(m.chat)) return m.reply("Sudah aktif")
global.db.data.other.push(text)
m.reply(`Berhasil menambahkan  ${text}  kedalam auto update gempa`)
}
}
handler.help = ['updategempa']
handler.tags = ['tools']

handler.command = /^(updategempa)$/i

handler.rowner = true

export default handler