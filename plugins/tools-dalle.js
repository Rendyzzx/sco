var { textToImage } = await import('../lib/text2img.js');

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw 'Prompt?';

  try {
    m.reply(wait)
    var b = await textToImage(text);
    var a = b.url;

    conn.sendFile(m.chat, a, 'error.jpg', wm, m, false);
  } catch (e) {
    console.log(e);
    m.reply(eror);
  }
};

handler.help = handler.command = ['dalle','animedif'];
handler.tags = ['tools'];

export default handler;