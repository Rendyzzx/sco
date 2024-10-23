var {
    chat
} = await import('../lib/chatGPT.js')
let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    const messages = [{
            role: "assistant",
            content: system
        },
        {
            role: "user",
            content: m.text
        }
    ]
    var response = await chat(
        messages,
        m.text
    )
    return m.reply(response)
}
handler.customPrefix = ['Hai', 'Hy']
export default handler