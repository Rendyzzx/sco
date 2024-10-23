let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = m.name
    let namee = m.name
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"

    await m.react(waits)

    try {
        const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
        let part1 = Math.floor(Math.random() * 112000);
        let part2 = Math.floor(Math.random() * 91000);
        let part3 = Math.floor(Math.random() * 214000);
        const username = who.split("@")[0]
        const replies = part1
        const retweets = part2
        const anu = part3
        const theme = "dark"
        const url = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(name)}&username=${encodeURIComponent(namee)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`
        m.react(done)
        conn.sendFile(m.chat, url, "tweet.png", me, m)
    } catch (e) {
        await m.reply(eror)
    }
}

handler.help = ["tweetc"]
handler.tags = ["tools"]
handler.command = ["tweetc"]
handler.limit = true 

export default handler