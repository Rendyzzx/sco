import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hkab/i.test(m.quoted.text) || /.*hkab/i.test(m.text))
        return !0
    this.tebakkabupaten = this.tebakkabupaten ? this.tebakkabupaten : {}
    if (!(id in this.tebakkabupaten))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.tebakkabupaten[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakkabupaten[id][3])
            delete this.tebakkabupaten[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebakkabupaten[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.title.toLowerCase().trim()) {
            global.db.data.users[m.sender].money += this.tebakkabupaten[id][2]
            this.reply(m.chat, `*Benar!*\n+${this.tebakkabupaten[id][2]} MONEY 💵`, m)
            clearTimeout(this.tebakkabupaten[id][3])
            delete this.tebakkabupaten[id]
        } else if (similarity(m.text.toLowerCase(), json.title.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `*Salah!*`, m)
    }
    return !0
}
export const exp = 0

const buttontebakkabupaten = [
    ['tebakkabupaten', '/tebakkabupaten']
]