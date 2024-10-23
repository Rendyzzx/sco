let handler = async ( m, {text} ) => {
  m.reply(text)
}
handler.command = /^(reply)$/i
handler.owner = true
export default handler