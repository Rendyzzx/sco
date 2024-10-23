var { downloadTrack, metadata } = await import("../lib/spotifydl.js")
let handler = async (m, {
    conn,
    usedPrefix,
    command,
    q
}) => {
    if (!q) throw `Example; ${usedPrefix+command} https://open.spotify.com/track/7gHs73wELdeycvS48JfIos`
    if (!q.match(/(https:\/\/open.spotify.com\/track\/)/gi)) throw `Url Tidak Falid`
    try {
        m.react(waits)
        var data = await downloadTrack(q)     
        var info = await metadata(q)   
        conn.sendMessage(m.chat, {
            document: { url: "https://spotifyapi.caliphdev.com/api/download/track?url="+q },
            mimetype: 'audio/mpeg',
            fileName: info.apiResponse.data[0].album + '.mp3'
        }, {
            quoted: m
        })
        m.react(done)
    } catch (e) {
        console.log(e)
        throw eror
    }
}
handler.help = handler.command = ['spotifydl']
handler.tags = ['downloader']

export default handler