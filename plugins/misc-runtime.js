import os from 'os'
let handler = async (m, {
    conn,
    args,
    command
}) => {
    let muptime = runtime(os.uptime())
    m.reply(`Aktif Selama ${muptime}`)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = ['runtime', 'rt']

export default handler

function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ' Hari, ' : ' Hari, ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' Jam, ' : ' Jam, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' Menit, ' : ' Menit, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' Detik' : ' Detik') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}