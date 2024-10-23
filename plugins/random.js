import fs from 'fs'

let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    args,
    command
}) => {
    var arrlist = [
      //"aesthetic",
      //"ahegao",
        "akira",
        "akiyama",
        "ana",
        "anjing",
      //"ass",
        "asuna",
        "ayuzawa",
      //"bdsm",
        "blackpink",
      //"blowjob",
        "boneka",
        "boruto",
        "cecan",
        "cecan2",
        "cecan3",
        "cecan4",
        "cecan5",
        "chiho",
        "china",
        "chitoge",
        "cogan",
        "cogan2",
        "cosplay",
        "cosplayloli",
        "cosplaysagiri",
        "cuckold",
      //"cum",
        "cyberspace",
        "deidara",
        "doraemon",
      //"eba",
        "elaina",
      //"emilia",
      //"ero",
        "erza",
      //"femdom",
      //"foot",
      //"gangbang",
      //"gifs",
      //"glasses",
        "gremory",
      //"hekel",
      //"hentai",
        "hestia",
        "hinata",
        "inori",
        "Islamic",
        "isuzu",
        "itachi",
        "itori",
      //"jahy",
        "jeni",
        "jiso",
        "justina",
        "kaga",
        "kagura",
        "kakasih",
        "kaori",
        "kartun",
        "katakata",
        "keneki",
        "kotori",
        "kpop",
        "kucing",
        "kurumi",
        "lisa",
        "loli",
        "madara",
        "manga",
      //"masturbation",
        "megumin",
        "mikasa",
        "miku",
        "minato",
        "mobil",
        "montor",
        "mountain",
        "naruto",
        "neko",
        "neko2",
        "nekonime",
        "nezuko",
      //"nsfwloli",
        "onepiece",
      //"orgy",
      //"panties",
        "pentol",
        "pokemon",
        "ppcouple",
        "programing",
        "profilwa",
        "pubg",
      //"pussy",
        "rize",
        "rose",
        "ryujin",
        "sagiri",
        "sakura",
        "sasuke",
        "satanic",
        "shina",
        "shinka",
        "shinomiya",
        "shizuka",
        "shota",
        "tatasurya",
        "tejina",
        "technology",
      //"tentacles",
      //"thighs",
        "toukachan",
        "tsunade",
        "waifu",
        "waifu2",
        "wallhp",
        "yotsuba",
        "yuki",
        "yulibocil",
        "yumeko",
      //"yuri",
      //"zettai"
    ]
    var listnya = arrlist.map((v, index) => `[ ${++index} ] ${usedPrefix + command} ${v}`).join('\n')
    let nah = `*L I S T*
_Example: ${usedPrefix + command} yulibocil_

${listnya}`
    if (!arrlist.includes(text)) throw nah
    try {
        m.react(waits)
        var anu = JSON.parse(fs.readFileSync('./json/database/' + text + '.json'))
        var res = pickRandom(anu)
        await conn.sendFile(m.chat, res, "", me, m)
        m.react(done)
    } catch (e) {
        console.log(e)
        throw eror
    }
}
handler.command = handler.help = ["random"]
handler.tags = ['random']
export default handler

const pickRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}