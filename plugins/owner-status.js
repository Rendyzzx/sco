let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply('Silakan tentukan status: on/off');
    }

    if (args[0].toLowerCase() === 'on') {
        conn.sendPresenceUpdate('available', m.chat);  // Set presence to available (online)
        m.reply('Status WhatsApp: Online');
    } else if (args[0].toLowerCase() === 'off') {
        conn.sendPresenceUpdate('unavailable', m.chat);  // Set presence to unavailable (offline)
        m.reply('Status WhatsApp: Offline');
    } else {
        m.reply('Status yang valid adalah: on/off');
    }
};

handler.help = ['status'];
handler.command = ['status'];
handler.tags = ['downloader'];
handler.owner = true

export default handler;