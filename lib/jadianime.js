import axios from 'axios';

// Fungsi untuk memproses gambar dan mengunggahnya
async function jadianime(imageBuffer) {
    try {
        // Mengonversi gambar menjadi base64
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        
        // Mengirim permintaan ke API
        const response = await axios.post('https://www.drawever.com/api/photo-to-anime', {
            data: 'data:image/png;base64,' + base64Image
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Mengembalikan URL gambar yang diproses
        return 'https://www.drawever.com' + (response.data.urls[1] || response.data.urls[0]);
    } catch (error) {
        throw error;
    }
}

export { jadianime };