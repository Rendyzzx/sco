let handler = async (m, { conn }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (!(id in conn.tebakkata)) throw false
    let json = conn.tebakkata[id][1]
    m.reply('```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```')
}
handler.command = /^hkat$/i

handler.limit = true

export default handler