var { lahelu } = await import('../lib/laheludl.js')
var handler = async (m, {
    conn,
    q
}) => {
    m.react(waits)
    if (!q) throw 'input Url'
    try {            
    var ress = await lahelu(q)
    var caption = `${ress.totalUpvotes}⬆️, ${ress.totalDownvotes}⬇️, ${ress.totalComments}✉️\n\n> ${ress.title}`
        await conn.sendFile(m.chat, ress.mediaUrl, "", caption, m)            
        m.react(done)
    } catch (e) {
        console.log(e)
        await m.reply(eror)
    }
}
handler.help = handler.command = ["lahelu"]
handler.tags = ["random"]
handler.limit = true
export default handler