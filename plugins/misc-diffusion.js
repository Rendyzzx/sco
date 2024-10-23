import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
        if (!text) throw `This command generates image from texts\n\n Example usage\n${ usedPrefix + command } 1girl, blush, megane, school uniform`
        await m.reply(wait)          
        try{    
        let ff = await (await axios.get(`https://api.neoxr.eu/api/waifudiff?q=${text}`))
        return conn.sendFile(m.chat, ff.data.data.url, 'image.jpg', me, m)               
        } catch(e) {
        throw eror
        console.log(e)
        }
} 

handler.help = ['diffusion']
handler.tags = ['misc']
handler.command = ['diffusion','dif','dalle']
handler.limit = true

export default handler