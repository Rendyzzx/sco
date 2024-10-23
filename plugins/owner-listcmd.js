let handler = async (m, { conn }) => {
conn.reply(m.chat, `
*< LIST CMD WITH MEDIA />*

${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-*\n*CODE MEDIA:* ${value.locked ? `*(𝚋𝚕𝚘𝚚𝚞𝚎𝚊𝚍𝚘)* ${key}` : key}\n\n*CMD* ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])},{quoted:m})
}
handler.command = ['listcmd', 'cmdlist']
handler.rowner = true
export default handler