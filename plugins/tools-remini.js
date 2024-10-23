var { ImgLarger } = await import("../lib/upscale.js")
var data = new ImgLarger()
var handler = async (m, { conn: conn, usedPrefix: usedPrefix, command: command }) => {  
      conn.hdr = conn.hdr ? conn.hdr : {};
      let q = m.quoted ? m.quoted : m,
        mime = (q.msg || q).mimetype || q.mediaType || "";
      if (!mime) throw "Fotonya Mana...?";
      if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
      conn.hdr[m.sender] = !0, m.react(waits);
      let error, img = await (q?.download());
      try {
        var res = await data.processImage(img)
        await conn.sendFile(m.chat, res.data.downloadUrls[0], "", me, m);
        m.react(done)
      } catch (er) {
        error = !0;
      } finally {
        error && m.reply("Proses Gagal :("), delete conn.hdr[m.sender];
      }     
  };
handler.help = ["remini","hd"], handler.tags = ["tools"], handler.command = ["remini","hd"];
export default handler;