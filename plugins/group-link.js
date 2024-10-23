import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
const {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = await require('@whiskeysockets/baileys')
let handler = async (m, {
    conn,
    args
}) => {
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    /*try {
        var pp_grup = await conn.profilePictureUrl(m.chat, 'image')
    } catch (e) {
        var pp_grup = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
    }
    const media = await prepareWAMessageMedia({
        image: (await conn.getFile(pp_grup)).data
    }, {
        upload: conn.waUploadToServer
    })
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
                        text: wm
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "Link Group ini",
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...media
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "cta_url",
                            "buttonParamsJson": `{\"display_text\":\"url\",\"url\":\"https://www.google.com\",\"merchant_url\":\`https://chat.whatsapp.com/ + ${await conn.groupInviteCode(m.chat)}\`}`
                        }],
                    })
                })
            }
        }
    }, {
        quoted: m
    }, {})

    return conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })*/
}
handler.command = handler.help = ['linkgroup', 'linkgc']
handler.tags = ['group']
handler.group = true
handler.botAdmin = true

export default handler