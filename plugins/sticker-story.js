var {
    upload
} = await import("../lib/uploadMedia.js")
import crypto from 'crypto';
let handler = async (m, {
    args,
    usedPrefix,
    command,
    text
}) => {

    if (!text) throw "input Text"
    let json = {
        type: 'stories',
        format: 'png',
        backgroundColor: '#1b1e23',
        width: 512,
        height: 720,
        scale: 4,
        watermark: 'rammm.xyz',
        messages: [{
            entities: 'auto',
            avatar: true,
            from: {
                id: parseInt(crypto.createHash('md5').update(m.sender).digest('hex'), 16),
                name: await conn.getName(m.sender),
                photo: {
                    url: await conn.profilePictureUrl(m.sender, 'image').catch(_ => "https://telegra.ph/file/320b066dc81928b782c7b.png")
                },
            },
            text: text,
        }, ],
    };
    const {
        data
    } = await axios.post('https://dikaardnt.com/api/maker/quote', json);
    var media = Buffer.from(data.image, 'base64')
    var res = await upload(media)
    m.reply(res.url)

}
handler.help = ['story']
handler.tags = ['tools']
handler.command = /^(qcstory|story)$/i
handler.limit = true
export default handler