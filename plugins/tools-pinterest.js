import cheerio from 'cheerio'
import fetch from 'node-fetch'
let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw query
    try {
        //m.react(waits)
        let res = await pinterest(text)
        // if (!res) throw res        
        m.reply(res)
        m.react(done)
    } catch (e) {
        throw eror
    }
}
handler.help = handler.alias = ['pinterest']
handler.tags = ['tools']
handler.command = /^(pinterest|pin)$/i
handler.limit = 15
export default handler

async function pinterest(query) {         
        let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
        let json = await res.json()
        let data = json.resource_response.data.results
        if (!data.length) throw `Query "${query}" not found :/`
        return data[~~(Math.random() * (data.length))].images.orig.url
    }

async function shortUrl(url) {
    return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}