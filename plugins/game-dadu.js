import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import fs from 'fs'
//import {fileTypeFromBuffer as fromBuffer} from 'file-type'
import uploadImage from '../lib/uploadImage.js'
//let { Sticker, createSticker, StickerTypes } = await import('wa-sticker-formatter')
import { createSticker } from "wa-sticker-formatter"
let handler = async (m, { conn }) => {
await m.reply(wait)
let anu = global.dados
let son = anu[Math.floor(Math.random() * anu.length)]
conn.sendFile(m.chat, son, 'file', '', m)
}
handler.help = ["dadu"]
handler.tags = ["game"]
handler.command = ["dadu"] 
export default handler

global.dados = ['https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/1.webp','https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/2.webp','https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/3.webp','https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/4.webp','https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/5.webp','https://raw.githubusercontent.com/Azex229/data-rest-api/main/dadu/6.webp']