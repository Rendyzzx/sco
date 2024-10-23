import yts from "yt-search";
import axios from "axios";

let handler = async (m, { text, conn }) => {
    if (!text) throw 'Cari apa?';
    try {
        let rus = await yts(text);
        let res = rus.all.filter(v => v.type == 'video');
        if (res.length === 0) {
            m.reply('Tidak ada video yang ditemukan.');
            return;
        }

        let teks = `[ *SEARCHING YOUTUBE* ]\n\n`;
        let i = 0;
        for (let vid of res) {
            i++;
            teks += `> ${i}. Judul : ${vid.title}
> Jumlah Tonton : ${vid.views}
> Unggah : ${vid.ago}
> Durasi : ${vid.timestamp}
> Channel : ${vid.author.name}
> Tautan : ${vid.url}\n──────────────────\n`;
        }
        teks = teks.trim();

        // Mengatur sesi dengan hasil pencarian untuk grup
        conn.yts = conn.yts || {}; 
        conn.yts[m.chat] = {
            pesan: res,  // Menyimpan hasil pencarian untuk interaksi berbasis sesi
            messageId: (await m.reply(teks + '\nBalas dengan nomor untuk mengunduh video.')).key.id,
            timeout: setTimeout(() => {
                delete conn.yts[m.chat]; // Hapus sesi setelah 2 menit tidak aktif
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000) // Timeout 2 menit
        };
    } catch (err) {
        m.reply('Terjadi kesalahan, coba lagi.');
        console.log(err);
    }
};

handler.before = async (m, { conn }) => {
    // Memeriksa apakah ada sesi aktif untuk grup
    if (!conn.yts || !conn.yts[m.chat]) return false;  // Hanya merespon jika ada sesi aktif

    // Memastikan pesan adalah balasan dari pesan hasil pencarian bot
    if (!m.quoted || !m.quoted.isBaileys || !m.quoted.fromMe || m.quoted.key.id !== conn.yts[m.chat].messageId) {
        //m.reply('Balas pesan hasil pencarian bot dengan nomor yang sesuai untuk mengunduh video.');
        return true;  // Menunjukkan pesan sudah diproses
    }

    // Menyaring teks dari balasan
    const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();
    
    // Memeriksa apakah pesan berisi nomor valid dan jika sesi aktif
    if (!isNaN(cleanText)) {
        clearTimeout(conn.yts[m.chat].timeout);  // Menghapus timeout sebelumnya
        let videoIndex = parseInt(cleanText) - 1;
        let selectedVideo = conn.yts[m.chat].pesan[videoIndex];

        if (selectedVideo) {
            let videoUrl = `https://mxmxk-helper.hf.space/yt/dl?url=${encodeURIComponent(selectedVideo.url)}&type=video`;         
            m.react(waits);  // Asumsi `waits` didefinisikan di suatu tempat
            // Mengunduh video
            await conn.sendMessage(m.chat, {
                video: { url: videoUrl },
                fileName: 'video.mp4',
                mimetype: 'video/mp4'
            }, { quoted: m });
            
            // Bereaksi dengan emoji selesai atau yang serupa
            m.react(done);  // Asumsi `done` didefinisikan di suatu tempat
            
            // Mengatur ulang timeout sesi setelah interaksi
            conn.yts[m.chat].timeout = setTimeout(() => {
                delete conn.yts[m.chat];  // Hapus sesi setelah 2 menit tidak aktif
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

handler.command = handler.help = ['yts', 'youtubesearch', 'ytsearch'];
handler.tags = ['downloader'];

export default handler;