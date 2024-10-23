let handler = async (m, { conn }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (!(id in conn.caklontong)) throw false
    let json = conn.caklontong[id][1]
    m.reply('```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```')
}
handler.command = /^hcak$/i

handler.limit = true

export default handler