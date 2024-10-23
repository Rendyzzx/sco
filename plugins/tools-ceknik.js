import axios from 'axios';

let handler = async (m, { conn, args, q, text }) => {
    try {
        if (!q) throw 'Mohon masukkan NIK yang valid!';

        // Melakukan GET request ke API
        const res = await axios.get(`https://script.google.com/macros/s/AKfycbwwGKJ6JU7xyfpl_fwQpjsOjzoHZAUzTyOsnXJnbNuDyTx8aqvx5OX8TXHGKUT-OTh5/exec?nik=${q}`);
        
        // Cek apakah response valid dan format hasilnya
        if (res.data) {
            let resultText = typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2);
            
            // Format hasil untuk lebih rapi
            let formattedResult = `*Hasil Pencarian NIK*\n\n` +
                                  `NIK: ${q}\n` +
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

handler.command = handler.help = ['ceknik'];
handler.tags = ['tools'];
handler.premium = true;

export default handler;