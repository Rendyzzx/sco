import axios from "axios"
var handler = async (m, {
    conn,
    command,
    q,
    usedPrefix
}) => {
    if (!q) throw `Use example ${usedPrefix}${command} naruto blue bird`;
    var res = await (await axios.get('https://ramczy-helper.hf.space/youtube?query=' + q))
    try {
        m.react(done)
        var no_w = await await conn.sendMessage(m.chat, {
            document: {
                url: res.data.result.download.audio
            },
            fileName: res.data.result.title + '.mp3',
            mimetype: 'audio/mpeg'
            //jpegThumbnail: await conn.getFile(await conn.resize(res.data.result.thumbnail, 300, 150))
        }, {
            quoted: m
        })
        let captvid = `- Duration: ${res.data.result.duration['timestamp']}
- Views: ${res.data.result.views}
- Upload: ${res.data.result.ago}
- Title: ${res.data.result.title}`;
        await conn.sendButtonCta(m.chat, [
            ["", captvid, res.data.result.thumbnail, [
                ["Video", ".ytmp4 " + res.data.result.url]
            ], null, [
                []
            ], null, no_w]
        ], {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        });
    } catch (e) {
        console.log(e)
        throw eror
    }
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;


export default handler;