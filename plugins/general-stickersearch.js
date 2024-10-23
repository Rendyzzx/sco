import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import fs from 'fs'
import fg from 'api-dylux' 
//import {fileTypeFromBuffer as fromBuffer} from 'file-type'
import uploadImage from '../lib/uploadImage.js'
//let { Sticker, createSticker, StickerTypes } = await import('wa-sticker-formatter')
import { createSticker } from "wa-sticker-formatter"
let handler = async (m, { conn, text }) => {
if (!text) throw `Query?`
await m.reply(wait)
let data = await fg.StickerSearch(text)
var son = data.sticker_url[0]
const stiker = await sticker(false, son, global.packname, global.author)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}
handler.help = handler.command = ["stickersearch","searchsticker"]
handler.tags = ["general"]

export default handler