const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys || !m.isGroup) return false;

    const chat = global.db.data.chats[m.chat];
    const isGroupLink = linkRegex.exec(m.text);
    const groupId = m.chat; // ID grup saat ini

    if (chat.antiLink && isGroupLink) {
        // Ambil kode undangan dari grup saat ini
        const currentGroupInviteCode = await this.groupInviteCode(m.chat); // Ambil kode undangan grup
        const detectedInviteCode = isGroupLink[1]; // Kode undangan dari link yang dibagikan

        // Cek apakah link yang dibagikan adalah dari grup yang sama
        if (currentGroupInviteCode === detectedInviteCode) {
            await this.reply(m.chat, '*Link grup ini terdeteksi, tidak ada tindakan yang diambil.*', null, {
                mentions: [m.sender]
            });
            return true; // Tidak ada tindakan jika link grup sama
        }

        // Jika link grup berbeda, keluarkan pengguna
        const kickMessage = isAdmin ?
            `*Tautan Terdeteksi*\nAnda admin grup tidak bisa dikeluarkan dari grup.` :
            `*Tautan Terdeteksi*\nAnda akan dikeluarkan dari grup.`;

        await this.reply(m.chat, kickMessage, null, {
            mentions: [m.sender]
        });
        await this.sendMessage(m.chat, {
            delete: m.key
        });

        // Jika bot adalah admin dan pengguna bukan admin, keluarkan mereka
        if (isBotAdmin && !isAdmin) {
            await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
    }
    return true;
}