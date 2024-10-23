import { readFileSync } from "fs"
let handler = m => m
handler.all = async function(m, {
    isBlocked
}) {
    if(isBlocked) return
    let regc = /(Rama ga di ajak|rama out aja)/i
    let isSayangKamu = regc.exec(m.text)
    let saymu = [
        '😡'
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
            conn.sendFile(m.chat, readFileSync('./sirkel.webp'), m)
        }, 1000)
    }
}
export default handler