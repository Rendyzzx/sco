import uploadFile from '../lib/uploadFile.js'
let handler = async (m, {
    conn,
    text,
    participants
}) => {    
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'Teks nya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5} detik`)
    var ftrol = {
        key: {
            remoteJid: 'status@broadcast',
            participant: '0@s.whatsapp.net'
        },
        message: {
            orderMessage: {
                itemCount: 2024,
                status: 1,
                surface: 1,
                message: '~> '+pesan,
                orderTitle: me,
                sellerJid: '0@s.whatsapp.net'
            }
        }
    }
    let q = m.quoted ? m.quoted : m
    let media = await q.download?.()
    let link = await uploadFile(media)    
    // console.log(msg)
    for(let i of anu) {
        conn.sendFile(i, link, ``, ``, ftrol)
        //await conn.relayMessage(i, msg.message, { messageId: msg.key.id })
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.command = ['tobc']
handler.owner = true

export default handler