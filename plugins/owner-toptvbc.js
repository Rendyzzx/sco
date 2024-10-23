import { generateWAMessageContent } from "@whiskeysockets/baileys";
const handler = async (m, { conn: conn, usedPrefix: usedPrefix, command: command }) => {
  let getGroups = await conn.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anu = groups.map(v => v.id)
  let q = m.quoted ? m.quoted : m,
    mime = (m.quoted ? m.quoted : m.msg).mimetype || "";
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`);
  let media = await (q?.download());
  m.react(wait);
  m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5} detik`)
    for(let i of anu) {
    let msg = await generateWAMessageContent({
      video: media
    }, {
      upload: conn.waUploadToServer
    });    
    await conn.relayMessage(i, {
      ptvMessage: msg.videoMessage
    }, {
      quoted: m
    });
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
};
handler.help = ["bctoptv"], handler.tags = ["owner"], handler.command = ["bctoptv"], handler.owner = true
export default handler;