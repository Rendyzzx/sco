let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
    if (!text) return m.reply("Gunakan *" + usedPrefix + "liststore* untuk melihat daftar pesan yg tersimpan.");
    let msgs = global.db.data.msgs;
    if (!(text in msgs)) return m.reply("[ " + text + " ] tidak terdaftar di daftar pesan.");
    delete msgs[text];
    return m.reply("[💬] berhasil menghapus pesan di daftar List dengan nama >\n" + text);
};

handler.help = ["dellist"]
handler.tags = ["group"];
handler.command = ["dellist"];
handler.group = true;
handler.admin = true;
export default handler;