import speed from 'performance-now'
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let timestamp = speed();
    let latensi = speed() - timestamp;
    m.reply(`_${latensi.toFixed(4)}ms_`);
}
handler.help = ['ping']
handler.tags = ['general']
handler.command = ['ping', 'speed']

export default handler