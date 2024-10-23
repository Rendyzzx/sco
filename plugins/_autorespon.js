import fs from 'fs'
let handler = m => m
handler.all = async function(m, {
    isBlocked
}) {
    if (isBlocked) return
    let regc = /(assalamualaikum|assalamu'alaikum)/i
    let isSayangKamu = regc.exec(m.text)
    let saymu = [
        '🙏🏿',
        '👋🏿',
        '👍🏿'
    ]
    let sayangkamuh = saymu[Math.floor(Math.random() * saymu.length)]
    if (isSayangKamu && !m.fromMe) {
        conn.sendMessage(m.chat, {
            react: {
                text: `${sayangkamuh}`,
                key: m.key,
            }
        })
        setTimeout(() => {
            conn.autoai[m.sender] = {
                pesan: []
            }
            conn.reply(m.chat, `Walaikumsalam, kak ${conn.getName(m.sender)}`, m)
        }, 1000)
    }
}
export default handler