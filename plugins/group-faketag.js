let handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, {
                text: `@${m.chat}`,
                contextInfo: {
                    mentionedJid: (await conn.groupMetadata(m.chat)).participants.map(v => v.id),
                    groupMentions: [{
                        groupSubject: text ? text : "everyone",
                        groupJid: m.chat
                    }]
                }
            })	
}

handler.tags = ['owner']
handler.help = ['faketag <text>']
handler.command = ['ft', 'ftag', 'fulltag', 'faketag']
handler.owner = true

export default handler