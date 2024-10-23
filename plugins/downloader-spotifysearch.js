import { searchSpotifyTracks } from "../lib/spotifySearch.js";
import axios from "axios";

let handler = async (m, { conn, text, q }) => {
    if (!text) throw '[ *Spotify Search* ]\n\n> Silakan masukkan kata kunci untuk mencari lagu di Spotify.';

    try {
        let results = await searchSpotifyTracks(q);
        if (results.length < 1) {
            m.reply('❌ *Spotify Search* ❌\n\nTidak ada hasil ditemukan.');
            return;
        }

        let searchText = '[ *Spotify Search* ]\n\n';
        let i = 0;
        for (let track of results) {
            i++;
            searchText += `${i}. *Judul:* ${track.name}\n`;
            searchText += `*Artis:* ${track.artists.map(v => v.name).join(', ')}\n`;
            searchText += `*Album:* ${track.album.name}\n`;
            searchText += `*Rilis:* ${track.album.release_date}\n`;
            searchText += `*Durasi:* ${(track.duration_ms / 1000 / 60).toFixed(2)} menit\n`;
            searchText += `*URL:* ${track.external_urls.spotify}\n`;
            if (track.preview_url) searchText += `*Preview:* ${track.preview_url}\n`;
            searchText += '──────────────────\n';
        }

        // Setup session for track selection
        conn.spotifySearch = conn.spotifySearch || {};
        conn.spotifySearch[m.chat] = {
            tracks: results,
            messageId: (await m.reply(searchText + '\nBalas dengan nomor untuk mengunduh lagu.')).key.id,
            timeout: setTimeout(() => {
                delete conn.spotifySearch[m.chat];
                console.log(`Sesi berakhir untuk grup ${m.chat}`);
            }, 120000) // Timeout 2 menit
        };
    } catch (e) {
        console.log(e);
        m.reply('Terjadi kesalahan, coba lagi.');
    }
};

handler.before = async (m, { conn }) => {
    if (!conn.spotifySearch || !conn.spotifySearch[m.chat]) return false;

    if (!m.quoted || !m.quoted.isBaileys || !m.quoted.fromMe || m.quoted.key.id !== conn.spotifySearch[m.chat].messageId) {
        return true;
    }

    const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();
    if (!isNaN(cleanText)) {
        clearTimeout(conn.spotifySearch[m.chat].timeout);
        let trackIndex = parseInt(cleanText) - 1;
        let selectedTrack = conn.spotifySearch[m.chat].tracks[trackIndex];

        if (selectedTrack) {
            try {
                m.react('⏳');  // Reaction indicating waiting state

                // Step 1: Get track info using the provided Spotify URL
                var data = "https://spotifyapi.caliphdev.com/api/download/track?url="+selectedTrack.external_urls.spotify
                //m.reply(data)           
                // Send the file
                await conn.sendMessage(m.chat, {
                    document: { url: data },
                    mimetype: 'audio/mpeg',
                    fileName: `${selectedTrack.name}.mp3`
                }, { quoted: m });

                m.react('✅');  // Reaction indicating success

                // Reset session timeout
                conn.spotifySearch[m.chat].timeout = setTimeout(() => {
                    delete conn.spotifySearch[m.chat];
                    console.log(`Sesi berakhir untuk grup ${m.chat}`);
                }, 120000);

            } catch (err) {
                console.log(err);
                m.reply('Gagal mengunduh lagu. Coba lagi.');
            }
        } else {
            m.reply('Nomor tidak valid. Coba lagi.');
        }
    } else {
        m.reply('Balas dengan nomor yang valid.');
    }
    return true;
};

handler.command = ['spotifysearch', 'spotify'];
handler.tags = ['downloader'];

export default handler;