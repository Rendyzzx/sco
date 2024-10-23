import fs from 'fs'
let handler = async (m, {conn}) => {
var aohh = JSON.parse(fs.readFileSync('./virtex.json'))
conn.sendMessage(m.chat, { image: { url: "https://telegra.ph/file/e7aab7738ecc6cc08f991.jpg" }, caption: aohh }, {quoted: pee})
}

handler.command = /^(konn)$/i
handler.owner = true

export default handler