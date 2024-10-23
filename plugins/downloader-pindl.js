import axios from "axios"
let handler = async (m, {
    conn,
    q,
    text
}) => {
    if (!q) throw 'Input URL'
    m.react(waits)
    var res = await axios.get("https://pinterestdownloader.io/id/frontendService/DownloaderService?url="+q)
    return conn.sendFile(m.chat, res.data.medias[2].url, wm, null, m)
    m.react(done)
}
handler.help = ['pinterestdl']
handler.tags = ['downloader']
handler.command = ['pindl', 'pinterestdl']

export default handler