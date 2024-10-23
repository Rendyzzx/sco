var { fetch } = await import('undici')
var handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    m.react(waits)
    try {        
    var res = await (await fetch('https://lahelu.com/api/post/get-shuffle')).json()
    var randm = res.postInfo.media  
    var up = res.postInfo.totalUpvotes
    var down = res.postInfo.totalDownvotes
    var comen = res.postInfo.totalComments
    var judul = res.postInfo.title
    var caption = `${up}⬆️, ${down}⬇️, ${comen}✉️\n\n> ${judul}`
        await conn.sendFile(m.chat, "https://cache.lahelu.com/"+randm, "", caption, m)            
        m.react(done)
    } catch (e) {
        console.log(e)
        await m.reply(eror)
    }
}
handler.help = handler.command = ["meme"]
handler.tags = ["random"]
handler.limit = true
export default handler