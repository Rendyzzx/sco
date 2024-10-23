import axios from "axios"
import cheerio from 'cheerio'
let handler= async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Example use ${usedPrefix}${command} <username>`
m.reply(wait)    
var aj = await igstalk(`${args[0]}`)
let ano = `───[ *Instagram Stalker* ]───

Full name : ${aj.fullname}
Username : ${aj.username}
Post : ${aj.post}
Followers : ${aj.followers}
Following : ${aj.following}
Bio : ${aj.bio}`
conn.sendMessage(m.chat, { contextInfo: { externalAdReply: { showAdAttribution: false,
title: wm,
body: conn.user.name,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: aj.profile,
//sourceUrl: `https://chat.whatsapp.com/Bd2mN13f4QV7Mu1vtZ0NuP`,
}}, text: ano}, { quoted: m })
//conn.sendMessage(m.chat, { image: { url : aj.profile }, caption: ano}, { quoted: m })
}

handler.help = ['igstalk'].map(v => v + ' <username>')
handler.tags = ['tools']

handler.command = /^(igstalk)$/i

export default handler

async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpor.com/v/'+Username, {
      headers: {
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts',''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers',''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following',''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    })
  })
}