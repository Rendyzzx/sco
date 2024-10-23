var {
    mlstalk
} = await import('../lib/mlstalk.js')
let handler = async (m, {
    text,
    conn,
    usedPrefix,
    command
}) => {
    if(!text) throw `Exp: ${usedPrefix+command} 458156230|2359`
    try {
        m.reply(wait)
        let dat = await mlstalk(text.split("|")[0], text.split("|")[1])
        m.reply(`*/ Mobile Legend \\*

Username : ${dat.userName}
Id : ${text.split("|")[0]}
ID Zone: ${text.split("|")[1]}`)
    } catch (e) {
        console.log(e)
        m.reply(eror)
    };
};
handler.help = handler.command = ['mlstalk'];
handler.tags = ['misc'];
handler.limit = true

export default handler