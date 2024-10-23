handler.before = function(m, { conn, isAdmin }) {
    if (!m.isGroup) return;
    if (m.fromMe) return;

    let bl = db.data.chats[m.chat].blacklist || [];

    if (Object.values(bl).find(users => users.id == m.sender) && !isAdmin) {
        // Menghapus pengguna dari grup jika ada di dalam daftar hitam
        conn.sendMessage(m.chat, { delete: { ...m.key }});
    }
return true 
}