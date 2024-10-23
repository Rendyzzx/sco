let handler = async (m, {
    conn,
    text,
    participants
}) => {
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'teksnya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5} detik`)
    for(let i of anu) {
        conn.sendMessage(i, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: `BROADCAST GRUP`,
                    body: conn.user.name,
                    mediaType: 1,
                    //renderLargerThumbnail : true,
                    thumbnailUrl: `https://telegra.ph/file/f5843e0456f8446589062.jpg`,
                    sourceUrl: '',
                }
            },
            text: pesan + '\n' + '©\t' + wm
        }, m)
    }
    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true

export default handler