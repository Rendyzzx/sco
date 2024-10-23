import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, {
    conn,
    command,
    args,
    text
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let caption = `*PREMIUM ADS*

• KELEBIHAN 
• UNLOCK NSFW FITUR
• UNLIMITED LIMIT
• FITUR CHEAT LIMIT DAN MONEY

(30K/BULAN) PER 1 USER

PAYMENT : Tanya owner

CHAT OWNER ${nomorown}
UNTUK INFO YANG LEBIH RINCI
 
`
    await conn.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'USD',
            amount1000: `10000`,
            requestFrom: m.sender,
            noteMessage: {
                extendedTextMessage: {
                    text: caption,
                    mentions: conn.parseMention(caption),
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: false
                        }
                    }
                }
            }
        }
    }, {})
}
handler.command = ['buypremium', 'buyprem', 'prem', 'premium']

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}