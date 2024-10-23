import {
    fileURLToPath
} from 'url'
import {
    watchFile,
    unwatchFile,
    readFileSync
} from 'fs'

//Models For Ai
global.GroqModels = "llama3-8b-8192"

//Ai api
global.apiMeta = "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"
global.apiMixtrl = "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"

//SEMUA APis 
global.cors = "https://cors.caliph.my.id/"
global.uptime = `u2169181-edebb22efeba5247c1a689c9`
global.aem = "https://aemt.me/"
global.apikey = "Michiepunyagw"
global.xzn = 'https://skizo.tech/'
global.clph = 'https://api.caliph.biz.id/'
global.clphkey = 'caliphkey'
global.APIs = { // API Prefix
    //name: 'https://website'
    nrtm: 'https://nurutomo.herokuapp.com',
    bg: 'http://bochil.ddns.net',
    dev: 'http://openapi.miwudev.my.id',
    xteam: 'https://api.xteam.xyz',
    zahir: 'https://zahirr-web.herokuapp.com',
    xzn: 'https://skizo.tech/',
    zeks: 'https://api.zeks.xyz',
    pencarikode: 'https://pencarikode.xyz',
    LeysCoder: 'https://leyscoders-api.herokuapp.com',
    violetics: 'https://violetics.pw',
    rrul: 'https://api-rull.herokuapp.com',
    hadi: 'http://hadi-api.herokuapp.com',
    males: 'https://malesin.xyz'
}
global.APIKeys = { // APIKey Here
    // 'https://website': 'apikey'
    'https://api.xteam.xyz': 'd90a9e986e18778b',
    'https://zahirr-web.herokuapp.com': 'zahirgans',
    'https://api.zeks.xyz': 'apivinz',
    'https://skizo.tech/': 'Rijalkiw1',
    'https://pencarikode.xyz': 'pais',
    'https://leyscoders-api.herokuapp.com': 'dappakntlll',
    'https://violetics.pw': 'beta'
}

//JANGAN UBAH!!!
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.cyanBright("Update 'Api.js'"))
    import(`${file}?update=${Date.now()}`)
})