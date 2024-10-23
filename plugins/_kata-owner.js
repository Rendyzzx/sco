import { readFileSync } from "fs"
let handler = m => m
handler.all = async function(m, {
    isBlocked
}) {
    if(isBlocked) return
    let regc = /(Rama hitam|Rama jelek|Rama kek kontol|Rama kontol)/i
    let isSayangKamu = regc.exec(m.text)
    let saymu = [
        '⚠️'
    ]
    let sayangkamuh = saymu[Math.floor(Math.random() * saymu.length)]
    if(isSayangKamu && !m.fromMe) {
        conn.sendMessage(m.chat, {
            react: {
                text: `${sayangkamuh}`,
                key: m.key,
            }
        })
        setTimeout(() => {
            global.db.data.users[m.sender].banned = true
        }, 1000)
    }
}
export default handler