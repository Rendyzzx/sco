import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
let {
    proto,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = require('@adiwajshing/baileys')
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
    const media = await prepareWAMessageMedia({
        image: (await conn.getFile("https://pomf2.lain.la/f/z04kcuue.jpg")).data
    }, {
        upload: conn.waUploadToServer
    })
    let str = '\t'
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
                        text: "`\nTerimakasih Sudah mau berkontribusi dalam pengembangan bot ini walaupun cuma 1p bisa berguna untuk bnyk hal`\n"
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: "",
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...media
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [{
                            "name": "single_select",
                            "buttonParamsJson": "{\"title\":\"Confirm\",\"sections\":[{\"title\":\"Payment\",\"highlight_label\":\"Thanks For You\",\"rows\":[{\"header\":\"Saweria\",\"title\":\"\",\"description\":\"R-BOT\",\"id\":\".saweria payment\"}]}]}"
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
}
handler.help = ['donasi']
handler.tags = ['general']
handler.command = /^dona(te|si)$/i

export default handler