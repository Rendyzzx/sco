let handler = async (m, {
    conn,
    command,
    text
}) => {
    conn.temamenu = conn.temamenu ? conn.temamenu : {
        id: 0
    }
    let themes = {
        0: 'Button Url',
        1: 'Normal',
        2: 'Document',
        3: 'NewsLetter',
        4: 'Fotter',
        5: 'Contexinfo High thumb',
        6: 'Document with Newsletter',
        7: 'Adreply',
        8: 'Button',
        9: 'Contexinfo',
    };

    if (text) {
        let themeIndex = parseInt(text);
        if (isNaN(themeIndex) || !themes[themeIndex]) {
            conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
            return;
        }
        conn.temamenu = {
            id: themeIndex
        };
        conn.reply(m.chat, 'Tema berhasil diatur\n' + themes[themeIndex], m);
    } else {
        conn.reply(m.chat, 'Input tidak valid. Silakan pilih tema dari daftar berikut:\n' + Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join('\n'), m);
        return;
    }
};
handler.help = ['setmenu']
handler.tags = ['owner']
handler.command = /^(setmenu)$/i
handler.owner = true

export default handler