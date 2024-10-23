var handler = async (m, {
    conn,
    usedPrefix,
    command,
    q
}) => {
    if (!q) throw query
    var info = await (await axios.get('https://mxmxk-helper.hf.space/youtube?query=' + q))
    var caption = ``
    await conn.sendButtonCta(m.chat, [
        [caption, info.data.result.title, info.data.result.thumbnail, [
            ['Audio 🎶', '.ytmp3 ' + info.data.result.url],
            ['Video 🎦', '.ytmp4 ' + info.data.result.url]
        ], null, [
            ["Url 🔗", info.data.result.url]
        ], null]
    ], m, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    });
    /*conn.sendButtonMessages(m.chat, caption, info.data.result.title, info.data.result.thumbnail, [
                ['Audio', '.ytmp3 '+q],
                ['Video', '.ytmp4 '+q]
            ], m, [], [], m)*/
}
handler.help = handler.command = ["yt"]
handler.tags = ["downloader"];

export default handler;