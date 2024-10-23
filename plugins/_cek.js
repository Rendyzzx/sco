let handler = async (m, {
}) => {
    var res = await axios.get(global.FetchLinks)
    m.reply(res.data)
}
handler.command = ["cek","tes","p"]

export default handler