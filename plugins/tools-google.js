import axios from "axios";
var { GoogleSearch } = await import("../lib/ggs.js");

let handler = async (m, { text, conn }) => {
    if (!text) throw 'Masukkan kata kunci pencarian!';
    
    try {
        // Membuat instance GoogleSearch
        let res = new GoogleSearch({ lang: 'id', timeout: 5000 });
        
        // Melakukan pencarian
        let results = await res.search(text);

        if (!results.length) {
            m.reply('Tidak ada hasil yang ditemukan.');
            return;
        }

        let message = `[ *HASIL PENCARIAN GOOGLE* ]\n\n`;
        let i = 0;

        for (let result of results) {
            i++;
            message += `> ${i}. Judul: ${result.title}
> Deskripsi: ${result.description}
> URL: ${result.url}\n──────────────────\n`;
        }

        message = message.trim();

        // Menyimpan hasil pencarian dalam sesi untuk grup
        conn.googleSearch = conn.googleSearch || {};
        conn.googleSearch[m.chat] = {
            results,
            messageId: (await conn.sendMessage(m.chat, {
                image: { url: `https://image.thum.io/get/fullpage/https://www.google.com/search?q=${encodeURIComponent(text)}` },
                caption: message + '\nBalas dengan nomor untuk mendapatkan info lebih lanjut + foto.'
            }, { quoted: m })).key.id,
            timeout: setTimeout(() => {
                delete conn.googleSearch[m.chat];
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000) // Timeout 2 menit
        };
    } catch (err) {
        m.reply('Terjadi kesalahan, coba lagi.');
        console.log(err);
    }
};

handler.before = async (m, { conn }) => {
    if (!conn.googleSearch || !conn.googleSearch[m.chat]) return false;

    if (!m.quoted || !m.quoted.isBaileys || !m.quoted.fromMe || m.quoted.key.id !== conn.googleSearch[m.chat].messageId) {
        return true;
    }

    const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();

    if (!isNaN(cleanText)) {
        clearTimeout(conn.googleSearch[m.chat].timeout);
        let resultIndex = parseInt(cleanText) - 1;
        let selectedResult = conn.googleSearch[m.chat].results[resultIndex];

        if (selectedResult) {
            let caption = `*${selectedResult.title}*\n\n${selectedResult.description}\n\n*URL:* ${selectedResult.url}`;
            let imageUrl = selectedResult.thumbnail || `https://image.thum.io/get/fullpage/${selectedResult.url}`;

            await conn.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption
            }, { quoted: m });

            conn.googleSearch[m.chat].timeout = setTimeout(() => {
                delete conn.googleSearch[m.chat];
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000);
        } else {
            m.reply('Nomor tidak valid. Coba lagi.');
        }
    } else {
        m.reply('Balas dengan nomor yang valid.');
    }
    return true;
};

handler.command = handler.help = ['googlesearch', 'google'];
handler.tags = ['tools'];

export default handler;