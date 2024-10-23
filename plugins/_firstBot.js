import emojiRegex from 'emoji-regex';

export async function before(m) {
    const {
        isBaileys,
        sender,
        isCommand,
        text
    } = m;
    if (!(isBaileys && !sender && !isCommand && !text && !this.chats)) return;

    const symbolRegex = /^[^\w\s\d]/u;
    const emojiAndSymbolRegex = new RegExp(`(${symbolRegex.source}|${emojiRegex().source})`, 'u');
    const prefixRegex = new RegExp(`^${emojiAndSymbolRegex.source}`, 'u');
    if (!prefixRegex.test(m.text)) return;

    const groupCode = global.sgc.split('/').pop();
    let groupId = "19562503665-1552094131@g.us";

    groupId = (await this.groupGetInviteInfo(groupCode))?.id || groupId;

    const data = (await this.groupMetadata(groupId)) || (this.chats[groupId]?.metadata);

    if (!data) return this.reply(m.chat, "❌ *Terjadi kesalahan saat mengambil informasi grup.*\nTambahkan bot ke dalam grup terlebih dahulu:\n - " + global.sgc, m);

    const isIdExist = data?.participants.some(participant => participant.id === m.sender);
    global.db.data.chats[m.chat].isBanned = !isIdExist;

    if (!isIdExist) {
        const urls = "https://chat.whatsapp.com/";
        const inviteCode = await this.groupInviteCode(groupId);
        const caption = `🤖 *Harap bergabung ke grup bot terlebih dahulu untuk menggunakan layanannya.*\n\n*Bergabung di sini:*\n -  ${urls + inviteCode || groupCode}`;
        await this.reply(m.chat, caption, m);
    }
}

export default before