var handler = async (m, { conn, command, q, usedPrefix, args }) => {  
  if (!q) throw `Use example ${usedPrefix}${command} Link`;
 //if (!/https?:\/\/(\.)?\/.test(args[0])) throw 'Invalid URL'
  try{
  m.react(waits)
  var url = q
  console.log(url)
  var res = await (await axios.get('https://mxmxk-helper.hf.space/youtube?query='+q))   
  var a_nu = await conn.sendMessage(m.chat, { audio: { url : res.data.result.download.audio }, mimetype: 'audio/mpeg' }, { quoted: m })
  conn.reply(m.chat, 'Sucess Downloading '+res.data.result.title, a_nu) 
  m.react(done)
  } catch(e) {
  console.log(e)
  throw eror
  }
};

handler.help = handler.command =  ['ytmp3']
handler.tags = ['downloader'];
handler.limit = true
export default handler;