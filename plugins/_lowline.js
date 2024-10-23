var { generateText } = await import("../lib/lowline.js")
let handler = async (m, { usedPrefix, command, q }) => {
  if(!q) return m.reply(`Masukkan teks yang mau ditanyakan ke LowlineAi \nContoh: ${usedPrefix+command} Apa itu Function?`)
  try{  
  m.react(waits)
  var res = await generateText(q)
  m.react(done)
  m.reply(res.result)
  } catch(e) {
  console.log(e)
  m.reply(eror)
  }
}
handler.help = ['lowline']
handler.command = ['lowline']
handler.tags = ['ai']
handler.limit = true

export default handler