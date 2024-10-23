import Genius from "genius-lyrics";
import cheerio from "cheerio";
import fetch from "node-fetch"; // Pastikan fetch di-import

let handler = async (m, { text, conn }) => {
    let query;
    if (text) {
        query = text;
    } else if (m.quoted && m.quoted.text) {
        query = m.quoted.text;
    } else {
        throw "Masukkan judul musik!\n*Example:* .lirik hello";
    }

    let key = "h6fTn1BYNjYi5VTszhyAFTcM3WWtk2E4hqrXCcutfObE4jVFnJ3LVyewHKIYTli7";
    let Client = new Genius.Client(key);

    try {
        let songs = await Client.songs.search(query);
        let results = songs.slice(0, 5); // Ambil 5 hasil teratas
        if (results.length === 0) {
            m.reply('Lagu tidak ditemukan, coba judul lain.');
            return;
        }

        let teks = `[ *SEARCHING LYRICS* ]\n\n`;
        let i = 0;
        for (let song of results) {
            i++;
            teks += `> ${i}. Judul : ${song.title}
> Penyanyi : ${song.artist.name}
> Url : ${song.url}\n──────────────────\n`;
        }

        // Set up session dengan hasil pencarian untuk grup
        conn.lyrics = conn.lyrics || {}; 
        conn.lyrics[m.chat] = {
            pesan: results,  // Simpan hasil pencarian untuk interaksi berbasis sesi
            messageId: (await m.reply(teks + '\nBalas dengan nomor untuk menampilkan lirik lengkap.')).key.id,
            timeout: setTimeout(() => {
                delete conn.lyrics[m.chat]; // Hapus sesi setelah 2 menit tidak aktif
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000) // Timeout 2 menit
        };

    } catch (err) {
        m.reply('Terjadi kesalahan, coba lagi.');
        console.log(err);
    }
};

handler.before = async (m, { conn }) => {
    // Periksa apakah ada sesi aktif untuk grup
    if (!conn.lyrics || !conn.lyrics[m.chat]) return false;  // Hanya merespons jika ada sesi aktif

    // Memastikan pesan adalah balasan dari pesan hasil pencarian bot
    if (!m.quoted || !m.quoted.isBaileys || !m.quoted.fromMe || m.quoted.key.id !== conn.lyrics[m.chat].messageId) {
        return true;  // Menunjukkan pesan sudah diproses
    }

    // Menyaring teks dari balasan
    const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();
    
    // Memeriksa apakah pesan berisi nomor valid dan jika sesi aktif
    if (!isNaN(cleanText)) {
        clearTimeout(conn.lyrics[m.chat].timeout);  // Menghapus timeout sebelumnya
        let songIndex = parseInt(cleanText) - 1;
        let selectedSong = conn.lyrics[m.chat].pesan[songIndex];

        if (selectedSong) {
            m.react('⏳');  // Asumsi `waits` didefinisikan di suatu tempat
            try {
                let lyrics = await getLyrics(selectedSong.url);
                let teksLirik = `*Judul*: ${selectedSong.title}\n*Penyanyi*: ${selectedSong.artist.name}\n\n*Lirik*:\n${lyrics}`;

                // Kirim liriknya
                await m.reply(teksLirik);
                m.react('✅');  // Asumsi `done` didefinisikan di suatu tempat
            } catch (error) {
                console.log("Error fetching lyrics:", error);
                m.reply("Tidak dapat mengambil lirik!");
            }

            // Reset timeout sesi setelah interaksi
            conn.lyrics[m.chat].timeout = setTimeout(() => {
                delete conn.lyrics[m.chat];  // Hapus sesi setelah 2 menit tidak aktif
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000);
        } else {
            m.reply('Nomor tidak valid. Coba lagi.');
        }
    } else {
        m.reply('Balas dengan nomor yang valid.');
    }
    return true;  // Menunjukkan pesan sudah diproses
};

handler.command = handler.help = ['lirik', 'lyrics'];
handler.tags = ['tools'];

export default handler;

// Fungsi tambahan untuk mengambil lirik dari URL Genius
async function getLyrics(url) {
    try {
        console.log(`Fetching lyrics from: https://files.xianqiao.wang/${url}`);
        const response = await fetch("https://files.xianqiao.wang/" + url);
        const html = await response.text();
        const $ = cheerio.load(html);
        let lyrics = '';
        $('div[class^="Lyrics__Container"]').each((i, elem) => {
            if ($(elem).text().length !== 0) {
                const snippet = $(elem)
                    .html()
                    .replace(/<br>/g, '\n')
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');

                lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
            }
        });
        return lyrics.trim();
    } catch (error) {
        console.log("Error fetching lyrics:", error);
        return "Tidak dapat mengambil lirik!";
    }
}