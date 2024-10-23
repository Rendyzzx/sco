import { dare } from '@bochilteam/scraper'
import moment from 'moment-timezone'
import cheerio from 'cheerio'
let handler = async (m, { conn, usedPrefix, text, command }) => {
let anu = await quotesAnime()
let result = anu[Math.floor(Math.random() * anu.length)]
let ininya = `*─────[ QUOTES ]─────*\n\n~ _${result.quotes}_\n\nBy '${result.karakter}', ${result.anime}\n`
m.reply(ininya)
}

handler.help = ['quotesanime']
handler.tags = ['misc']
handler.command = /^(quotes(anime))$/i
export default handler

function quotesAnime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 184)
        axios.get('https://otakotaku.com/quote/feed/'+page)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = []
            $('div.kotodama-list').each(function(l, h) {
                hasil.push({
                    link: $(h).find('a').attr('href'),
                    gambar: $(h).find('img').attr('data-src'),
                    karakter: $(h).find('div.char-name').text().trim(),
                    anime: $(h).find('div.anime-title').text().trim(),
                    episode: $(h).find('div.meta').text(),
                    up_at: $(h).find('small.meta').text(),
                    quotes: $(h).find('div.quote').text().trim()
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}