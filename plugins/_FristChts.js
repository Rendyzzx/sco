import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
let {
    proto,
    generateWAMessageFromContent
} = require('@adiwajshing/baileys')
export async function all(m) {
    let anuu = global.opts
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup || db.data.settings[this.user.jid].group || anuu.gconly) return
    let user = global.db.data.users[m.sender]
    const cooldown = 86400000
    if (new Date - user.pc < cooldown) return // setiap 24 jam sekali
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    /*let caption = `Hai kak ${name}\n\nJika ingin mengakses bot silahkan join Grup di bawah\n${sgc}\nDan Berikan Rating\nhttps://whatsapp.com/channel/0029VaEHHgo6LwHiSQjNDG1b/129\n\n© ${me}`.trim()
    await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
            externalAdReply: {
                title: ``,
                thumbnailUrl: `https://telegra.ph/file/f5843e0456f8446589062.jpg`,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: m
    })*/
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ""
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: me
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "OPTIONS",
                        subtitle: "",
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": "{\"title\":\"Click Here\",\"sections\":[{\"title\":\"Pilihan Command\",\"highlight_label\":\"Favorite Commands\",\"rows\":[{\"header\":\"Auto Chat\",\"title\":\"\",\"description\":\"Runs using Chatgpt Latest Version\",\"id\":\".simi\"},{\"header\":\"All Command\",\"title\":\"\",\"description\":\"displays all commands\",\"id\":\".menu\"}]}]}"
                        }, ],
                    })
                })
            }
        }
    }, {
        quoted: m
    }, {})

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
    user.pc = new Date * 1
}