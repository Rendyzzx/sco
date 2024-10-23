import "./Func_global.js"
import "./ApiJson.js"
import {
    watchFile,
    unwatchFile,
    readFileSync
} from 'fs'
import chalk from 'chalk'
import fs from "fs"
import {
    fileURLToPath
} from 'url'
var more = String.fromCharCode(8206)
global.readmore = more.repeat(4001)
//global.ram_usage = 700000000
global.ram_usage = 1000000000000 // 600 MB in this example [Ram Limiter (if your server ram is 1GB put 900MB in bytes, later the server will auto restart before using 1GB ram)]

//LINK
global.sig = 'https://instagram.com/piikkkri_'
global.syt = 'https://youtube.com/Vynzz'
global.sgh = 'https://github.com/rasssya76'
global.sgc = 'https://chat.whatsapp.com/CBqgmdjWEylCIxRjD0ykvK'
global.sdc = 'https://wa.me/6283177644082'
global.swa = 'wa.me/6283177644082'
global.sch = "https://whatsapp.com/channel/0029VaEHHgo6LwHiSQjNDG1b"
global.nilai = 'https://whatsapp.com/channel/0029VaEHHgo6LwHiSQjNDG1b/288'
global.idch = '1203632008430285588@newsletter'
global.stel = '-'
global.swb = '-'
global.snh = '-' //Kalo ga di isi, isi aja pake '-'

//PAYMENT
global.pdana = '0859-5980-4835'
global.povo = '-'
global.pgopay = '-'
global.ppulsa = '-'
global.ppulsa2 = '-'
global.psaweria = '-'

//NOMOR
//global.nomorbot = `6283135904706` //Buat pairing 
global.nomorbot = "6283135904706"
global.nomorown = '6283177644082'
global.own = '+62 831-7764-4082'
global.owner = [
        ["6283177644082", "️Reyy", !0],
        ["6283177644082", "Vynxz", !0]
    ],
global.mods = [] // Want some help?
global.prems = [] // Premium user bukan disini nambahinnya, ketik .addprem @user 10

//BIO DATA OWNERt
global.nameown = 'Vynxz'
global.email = '-'
global.lahir = '-'
global.web = '-'
global.nicknameown = '-'

//WATERMARK
global.namebot = 'VynzAI'
global.wm = 'Vynxz ©2021-2024' //Main Watermark
global.wm2 = ''
global.wm3 = 'Vynxz'
global.titlebot = `Vynxz © ` + global.nameown
global.ultahowner = 'Oktober 31 2023'
global.me = `Follow Agar Tau mengenai update ${namebot}\n${sch}`

//Sticker wm
global.stickauth = wm
global.stickpack = `\n${week}\t${date}\nwa.me/${nomorbot}`
global.packname = wm
global.author = stickpack


//LOGO 
global.logo = pickRandom([cors + "https://telegra.ph/file/d1c889bbcbe69345ee71b.jpg", cors + "https://telegra.ph/file/06c4e93a3d3f388b2642d.jpg"]);
global.thumbs = cors + `https://telegra.ph/file/d1c889bbcbe69345ee71b.jpg`
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
global.botintro = 'Hallo, Kenalin saya adalah R-BOT, perangkat lunak otomatis yang melakukan tugas berulang melalui jaringan. Saya juga dapat mengikuti instruksi khusus untuk meniru perilaku manusia tetapi lebih cepat dan lebih akurat lo. Saya juga dapat berjalan secara independen tanpa intervensi manusia.'
global.thumb = readFileSync('./me.png')
global.thumb2 = readFileSync('./me2.jpeg')
global.multiplier = 69 // The higher, The harder levelup
global.thumbnailUrl = [
    cors + 'https://telegra.ph/file/81260a8b9e8cff26d2b48.jpg', cors + 'https://telegra.ph/file/ac4928f0824a2a0492737.jpg',
    cors + 'https://telegra.ph/file/6359b013bc7e52c3b346f.jpg', cors + 'https://telegra.ph/file/d43c89a5d2da72875ec05.jpg',
    cors + 'https://telegra.ph/file/7d6c0e35f9c8f52715541.jpg', cors + 'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg',
    cors + 'https://telegra.ph/file/55e5af5f33fbd57104187.jpg', cors + 'https://telegra.ph/file/af236598456b95884bd15.jpg',
    cors + 'https://telegra.ph/file/de92ed4a729887ffc974c.jpg', cors + 'https://telegra.ph/file/00ce42a193b1dbbf907d4.jpg'
]
global.bgmenu = "https://files.catbox.moe/wmquxj.jpg"


//JANGAN UBAH!!!
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.cyanBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})