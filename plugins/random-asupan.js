import fetch from 'node-fetch'
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    m.react(waits)
    let type = (command).toLowerCase()
    switch (type) {
        case 'china':
        case 'cogan':
        case 'indonesia':
        case 'japan':
        case 'korea':
        case 'malaysia':
        case 'thailand':
        case 'vietnam':
            let anuu = await fetchJson(`https://raw.githubusercontent.com/rasssya76/Databasee/main/cecan/${command}.json`)
            var result = anuu[Math.floor(Math.random() * anuu.length)]
            conn.sendMessage(m.chat, {
                image: {
                    url: cors + result
                },
                caption: me
            }, {
                quoted: m
            })
            m.react(done)
            break
        default:
    }
}
handler.help = ['china', 'cogan', 'indonesia', 'japan', 'korea', 'malaysia', 'thailand', 'vietnam']
handler.tags = ['random']
handler.command = /^(china|cogan|indonesia|japan|korea|malaysia|thailand|vietnam)$/i
handler.limit = true
export default handler


function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})