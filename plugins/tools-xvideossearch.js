var { xvideosSearch } = await import('../lib/xvideos.js');
let handler = async (m, { args, usedPrefix, command, text }) => {
    if (!text) throw `Exp: ${usedPrefix+command} Japanese `
    var data = await xvideosSearch(text)
    m.reply(wait)
    let str = '*XVIDEOS SEARCH*' + '\n\n'
    for (let i = 0; i < data[i].length; i++) {
      str += "Title: " + data[i].title + '\n'      
      str += "Quality: " + data[i].quality + '\n'
      str += "Durasi: " + data[i].duration + '\n'
      str += "Link: " + data[i].url + '\n\n'
    }
    await conn.sendMessage(m.chat, {
  text: str,
  contextInfo: {
  externalAdReply: {
  title: ``,
  thumbnailUrl: `https://telegra.ph/file/440dcc526932b176b884e.jpg`,
  mediaType: 1,
  renderLargerThumbnail: true
  }}}, { quoted: m})
}

handler.help = handler.command = ['xvideosSearch'];
handler.tags = ['tools'];
handler.premium = true

export default handler