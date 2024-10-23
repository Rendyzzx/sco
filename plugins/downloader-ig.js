var { publer } = await import('../lib/publer.js')
var handler = async (m, { command: command, usedPrefix: usedPrefix, conn: conn, text: text, args: args, q }) => {    
     if (!q) throw query 
     m.react(waits)
     try{
        var results = await publer(q);
        if (results.payload) {
          let caption = me
          for (let i = 0; i < results.payload?.length; i++) {
            let media = results.payload[i],
              out = media.path
              //mediaCaption = `Type: ${media.type}\nQuality: ${media.quality}`;
            out && await conn.sendFile(m.chat, out, "", `${caption}`, m);
            m.react(done)
          }
        } else console.log("Invalid data format in results");
        } catch (e) {
        console.log(e)
        m.reply(eror)
        }
      }       
handler.help = ["instagram"], handler.tags = ["downloader"], handler.command = /^i(nsta(gram(dl)?|dl)|g(dl)?)$/i;
export default handler;