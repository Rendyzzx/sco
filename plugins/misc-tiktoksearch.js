var {
    tiktoks
} = await import('../lib/tiktoks.js')
let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw "Example\n" + usedPrefix + command + '\tAmv'
    try {
        m.react(waits)
        var res = await tiktoks(text)
        var s = res.no_watermark
        var t = res.title
        m.react(done)
        m.reply(s)
    } catch (e) {
        console.log(e)
        throw eror
    }
}
handler.help = handler.command = ['ttsearch', 'tiktoksearch', 'tags']
handler.tags = ['misc']
handler.premium = false
handler.limit = 5

export default handler