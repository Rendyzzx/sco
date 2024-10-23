import gtts from 'node-gtts'
import {
    readFileSync,
    unlinkSync
} from 'fs'
import {
    join
} from 'path'
import { toPTT } from '../lib/converter.js'
const defaultLang = 'id'
let handler = async (m, {
    conn,
    q,
    usedPrefix,
    command
}) => {
        if (!q) throw `📌 Contoh *.tts Rama ganteng banget njir mw gw entod*`
        var media = await tts(q, defaultLang)
        let audio = await toPTT(media, 'mp4')
        conn.sendFile(m.chat, audio.data, 'tts.mp3', '', m, true, { mimetype: 'audio/mp4' })
    }
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i
export default handler

function tts(text, lang = 'id') {
    console.log(lang, text)
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}