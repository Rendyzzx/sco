import axios from 'axios';
import { areJidsSameUser } from '@adiwajshing/baileys';  // Pastikan ini di-import jika menggunakan Baileys

let handler = async (m, { conn, args, q, text }) => {
    try {
        // Ambil nomor dari reply atau mention
        let users = m.quoted ? [m.quoted.sender] : m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id));
        
        // Jika nomor dimasukkan langsung, gunakan itu, jika tidak, gunakan nomor dari reply atau mention
        let number = text ? text : users.length > 0 ? users[0].split('@')[0] : null;

        if (!number) throw 'Mohon masukkan nomor yang valid atau reply/mention ke pesan!';

        // Melakukan GET request ke API dengan nomor yang diambil
        const res = await axios.get(`https://script.google.com/macros/s/AKfycbwx_d7KPLH1x2AjCf8yfAAvOCueZZxteegaormYL3i9xf2ejkMwodJVHPB0OZeEZ_Pc_A/exec?no=${number}`);
        
        // Cek apakah response valid dan format hasilnya
        if (res.data) {
            let resultText = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2);
            
            // Format hasil untuk lebih rapi
            let formattedResult = `*Hasil Pencarian Nomor*\n\n` +
                                  `Nomor: ${number}\n` +
                                  `\n*Informasi:*\n${resultText}\n` +
                                  `\nTerima kasih telah menggunakan layanan kami!`;

            // Kirim hasil yang telah diformat
            await conn.sendMessage(m.chat, {
                text: formattedResult
            }, {
                quoted: null
            });
        } else {
            throw 'Data tidak ditemukan atau response tidak valid.';
        }
        
    } catch (error) {
        // Tampilkan pesan error dengan format yang lebih baik
        await conn.sendMessage(m.chat, {
            text: `*Error*: ${error.message || error}`
        }, {
            quoted: null
        });
        console.error(error); // Log error ke console
    }
}

handler.command = handler.help = ['ceknomor'];
handler.tags = ['tools'];
handler.premium = true;

export default handler;