var handler = async (m, {
    conn,
    command,
    q,
    usedPrefix,
    args
}) => {
    if (!q) throw `Use example ${usedPrefix}${command} Link`;
    //if (!/https?:\/\/(\.)?\/.test(args[0])) throw 'Invalid URL'
    try {
        m.react(waits)
        var res = await (await axios.get('https://mxmxk-helper.hf.space/youtube?query=' + q))
        var a_nu = await conn.sendMessage(m.chat, {
            video: {
                url: res.data.result.download.video
           }
        }, {
            quoted: m
        })
        conn.reply(m.chat, 'Sucess Downloading ' + res.data.result.title, a_nu)
        m.react(done)
    } catch (e) {
        throw eror
        console.log(e)
    }
};

handler.help = handler.command = ['ytmp4']
handler.tags = ['downloader'];
export default handler;