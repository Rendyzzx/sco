import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
let handler = async (m, {
    conn,
    command
}) => {


    let id = Object.keys(db.data.chats).filter(a => a.endsWith("@newsletter"))
    let ar = []
    for (let i of id) {
        let meta = await conn.newsletterMetadata("jid", i)
        ar.push({
            subject: meta.name,
            id: meta.id,
            //role: meta.viewer_metadata.role,
            followers: meta.subscribers.toLocaleString(),
            create: require("moment-timezone")(meta.creation_time * 1000).format("DD/MM/YYYY HH:mm:ss"),
            picture: meta.picture ? "https://pps.whatsapp.net" + meta.picture : "N/A",
            url: "https://whatsapp.com/channel/" + meta.invite
        })
    }
    let cap = `*––– L i s t C H*

${ar.map(a => Object.entries(a).map(([a, b]) => `   ◦ ${a} : ${b}`).join("\n")).join("\n\n")}


> Total Newsletter Chat : ${ar.length}`

    m.reply(cap)
}

handler.help = handler.command = ["listch"];
handler.tags = ["general"]

export default handler