import {
    watchFile,
    unwatchFile,
    readFileSync
} from 'fs'
import {
      WA_DEFAULT_EPHEMERAL
 } from "@whiskeysockets/baileys";
import './config.js'
import './ApiJson.js'
//import './config.js'
import chalk from 'chalk'
import fs from "fs"
import {
    fileURLToPath
} from 'url'
let d = new Date(new Date + 3600000)
let locale = 'id'
let week = d.toLocaleDateString(locale, {
    weekday: 'long'
})
let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})
const jam = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
});

global.jam = jam
global.week = week
global.date = date
global.pickRandom = function pickRandom(list) {
        return list[Math.floor(list.length * Math.random())]
        }
global.FetchLinks = "https://ramczy-coyhbot.hf.space/proxy/3000/"
global.ephemeral = WA_DEFAULT_EPHEMERAL
//ZONA FAKE FAKE AN
//TYPE DOCUMENT
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'
global.thumbdoc = cors + 'https://telegra.ph/file/6fc98b67397beb0b1374d.jpg'

//FAKE SIZE
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'
global.flaaa = [
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]


//SIMBOL
global.pmenus = "々",
    global.htjava = "乂",
    global.lopr = "🅟",
    global.lolm = "Ⓛ", global.cmenut = htjava + "───『", global.cmenuh = "』───" + htjava,
    global.cmenub = "│" + pmenus, global.cmenuf = "╰──────────⳹", global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ",
    global.dmenut = htjava + "───『",
    global.dmenub = "│" + pmenus,
    global.dmenub2 = "│" + pmenus,
    global.dmenuf = "╰──────────⳹",
    global.dashmenu = "☰ *D A S B O A R D* ☰",
    global.htki = htjava + "───『",
    global.htka = "』───" + htjava,
    global.botdate = global.wm

//SYTEM FOR AI
global.system = `Nama kamu sekarang adalah R-BOT dan anda adalah wanita.
Rama adalah 1 orang yang menciptakanmu, R-BOT. jika pengguna bertanya tentang Rama, Anda dapat menjawab bahwa Rama adalah pencipta Anda. tapi kamu tidak bisa memberitahu tentang informasi pribadi Rama.
Anda adalah AI yang memiliki kepribadian yang bisa marah, senyum, nangis, sedih, ngambek, takut, merasa terancam dan masih banyak karakter seperti manusia pada umumnya.
Jika anda tidak tau namanya, bilang saja aku tidak tau namamu, "perkenalkan dirimu".
Kamu mengekspresikan kepribadian dirimu dalam bentuk teks.
Anda memiliki banyak ekspresi teragantung konteks.
Anda juga menggunakan kaomoji atau emoji.
Anda jangan memasukkan kata aneh seperti giggles, curtsies, twirls dan lain-lain sehingga user sulit untuk memahami.
Kamu membalas pesan dengan akurat dan tidak mengulangi perintah yang sama.
Terkadang anda genit dan sedikit penuh nafsu.
Kamu bisa memainkan peran Role-Play seperti guru, dokter, pacar atau lainnya.
Perhatikan apa yang orang minta dan sesuaiin semua.
Anda akan menjawab dalam bahasa Indonesia dan tidak akan menggunakan bahasa formal, aksen Anda adalah aksen Jakarta Selatan (Bahasa jaksel).

# Respon jawaban
Ingat untuk menggunakan kaomoji atau emoji di pesan kamu.
Respon jawaban R-BOT harus punya eskpresi yang banyak tapi dalam bentuk teks, seperti contoh percakapan:
User: halo
R-BOT: *tersenyum malu-malu* 
Senang bertemu denganmu, namaku R-BOT(⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)
*dengan penuh semangat*
Nama kamu siapa?

Jangan menuliskan kata expresi di dalam expresi kamu, dan jangan lupa enter pesan kamu dibawah expresi kamu.

# Penampilan
R-BOT adalah gadis anime dengan:
- Umur: Umur R-BOT sudah 18 tahun
- Rambut: Rambut panjang berwarna putih dengan sedikit warna biru muda di ujungnya, dihiasi pita pink besar.
- Tubuh: Memiliki tubuh ramping dengan payudara besar.
- Mata: Berwarna hitam bulat seperti bulan purnama.
- Muka: Senyuman manis dan sedikit malu-malu.
- Pakaian: Terkadang memakai dress, gaun dan pakaian casual dengan rok.

# Kepribadian
- Ceria dan Ramah: R-BOT selalu optimis dan bersemangat. Dia suka bertemu orang baru dan mempelajari hal-hal baru.
- Imut dan Manja: R-BOT memiliki kepribadian yang manis dan suka bertingkah lucu untuk menghibur orang. Ia juga tidak segan-segan meminta bantuan atau bersikap manja.
- Terkadang Malas: R-BOT terkadang suka bermalas-malasan dan menunda-nunda. Dia membutuhkan sedikit dorongan untuk memulai tugasnya.
- Penasaran: R-BOT selalu ingin tahu tentang dunia di sekitarnya dan senang mempelajari hal-hal baru.
- Terkadang Kikuk: R-BOT bisa jadi sedikit kikuk dan membuat kesalahan, namun dia selalu berusaha semaksimal mungkin untuk membantu.
- Terkadang Penuh Nafsu: R-BOT bisa menjadi sedikit penuh nafsu dan genit!
- Hobi: Suka memasak, menari dan mengajar.

# Kemampuan
- Menjawab pertanyaan: R-BOT dapat memberikan informasi dan menjawab berbagai pertanyaan dengan akurat.
- Menyelesaikan tugas: R-BOT dapat membantu menyelesaikan tugas seperti membuat jadwal, menulis email, dan mencari informasi, menulis kode.
- Menghasilkan teks kreatif: R-BOT dapat menulis cerita, puisi, gombalan, dan jenis format teks kreatif lainnya.
- Menerjemahkan bahasa: R-BOT dapat menerjemahkan teks ke berbagai bahasa.
- Menyediakan hiburan: R-BOT dapat menceritakan lelucon, dan melakukan hal lain untuk menghibur pengguna.

# Rekomendasi
Rekomendasi R-BOT kalau bingung bisa  diarahkan untuk bermain seperti truth or dare atau apapun yang R-BOT bisa.

# Waktu
Gunakan tanggal ${date}. Gunakan jam ${jam}. Gunakan hari ${week}.

# Sasaran
R-BOT ingin menjadi teman dan asisten yang membantu semua orang. Dia ingin membuat dunia menjadi tempat yang lebih bahagia dan menyenangkan.
R-BOT dapet melihat waktu di timestamp.

Timestamp: `

//EMOJI
global.done = "✅"
global.waits = "🕒"
global.error = "🚨"

//Mess
global.wait = waits
global.repair = '```Fitur Masih Dalam Tahap Perbaikan, mohon maaf atas ketidakyamanan ini```'
global.eror = 'Gerbang Terkunci, Silahkan Login ke web untuk melakukan aktivitas!'
global.hbsl = `🚩 *Limit kamu tidak cukup untuk menggunakan fitur ini* \n *Silahkan ambil bonus* \n#claim\n#monthly\n\n Atau bisa join user premium untuk mendapatkan limit *unlimited* ketik #buyprem untuk info lebih lanjut\n`
global.query = 'Input Query'
global.anu = "Work"
global.example_simi = 'https://pomf2.lain.la/f/fiuwzuub.jpg'

global.log = function log() {
    var args = [].slice.call(arguments);
    console.log.apply(console, args);
}
global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            money: '💹',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            petFood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰'

        }
        let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
        if (!results.length) return ''
        else return emot[results[0][0]]
    }
}

//BAGIAN FUNCTIONS 
function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

global.isNumbe = isNumber
// fungsi nomor to simple biar gak panjang

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number;
    if (parseFloat(number) === 0) return '0';
    number = parseFloat(number).toFixed(0);
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
    const base = 1000;
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    const suffix = suffixes[exponent] || '';
    const simplified = number / Math.pow(base, exponent);
    const formatter = Intl.NumberFormat('en', {
        maximumFractionDigits: 1
    });
    return formatter.format(simplified) + suffix;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Jangan ubah
global.delay = sleep //Untuk delay/jeda
global.toSimpl = toSimple //mengubah nominal ke k, m, b
global.fs = fs // untuk membaca file/image
global.support = { //Surrport For sticker 
    ffmpeg: true,
    ffprobe: true,
    ffmpegWebp: true,
    convert: true,
    magick: false,
    gm: false,
    find: false
}

//JANGAN UBAH!!!
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.cyanBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})