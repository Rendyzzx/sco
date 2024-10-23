import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import natural from 'natural';
import { areJidsSameUser } from '@adiwajshing/baileys';
import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: apiMixtrl
});

const handler = async function before(m, {
    conn,
    text,
    usedPrefix,
    command,
    args,
    isAdmin,
    isBotAdmin,
    isPrems
}) {
var pesanRandom = [
    `Hai! Aku bot! Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! 😊`,
    `Halo! Bagaimana harimu? Aku di sini untuk membantumu. Apa yang bisa aku lakukan untukmu? ( ^_^ )`,
    `Selamat datang! Ada yang bisa aku bantu hari ini? Aku siap mendengarkan ceritamu! 🌟`,
    `Hai, teman! Lagi apa? Jika ada yang ingin dibicarakan, aku siap! (⌒‿⌒)`,
    `Hallo! Apa kabar? Jika kamu punya pertanyaan atau butuh bantuan, jangan ragu untuk bertanya! 🌈`,
    `Selamat pagi! Semoga harimu menyenangkan. Ada yang bisa aku bantu hari ini? (｡◕‿◕｡)`,
    `Hai! Aku senang bisa berbicara denganmu. Ada yang ingin kamu bicarakan? Let me know! (•‿•)`,
    `Halo! Aku di sini untuk membantu. Apakah ada hal menarik yang ingin kamu ceritakan? 😊`,
    `Selamat siang! Bagaimana keadaanmu? Aku siap membantumu dengan apapun yang kamu butuhkan. 🌟`,
    `Hai, sahabat! Aku di sini untukmu. Ada yang ingin kamu tanyakan atau diskusikan? (✿◠‿◠)`,
    `Halo! Ada yang bisa aku bantu hari ini? Jangan ragu untuk bertanya! (✿◠‿◠)`,
    `Selamat sore! Aku senang bertemu denganmu. Apa yang bisa aku lakukan untukmu? 😄`,
    `Hai! Aku di sini untuk mendengarkan ceritamu. Ada yang ingin kamu bagikan? ( ^_^ )`,
    `Halo! Semoga harimu menyenangkan. Aku siap membantu jika kamu membutuhkan sesuatu. 🌟`,
    `Selamat malam! Jika ada yang ingin dibicarakan atau ditanyakan, aku siap membantu. 😊`,
    `Hai! Apa kabar? Jika kamu butuh teman bicara, aku di sini untukmu. ( ^_^ )`,
    `Halo! Ada hal yang ingin kamu diskusikan? Aku senang bisa membantumu. (｡♥‿♥｡)`,
    `Selamat datang! Aku siap membantu jika kamu punya pertanyaan atau butuh bantuan. 🌈`,
    `Hai! Bagaimana harimu? Jika kamu butuh teman ngobrol atau informasi, aku di sini. (⌒_⌒)`,
    `Halo! Aku di sini untukmu. Ada yang ingin kamu tanyakan atau ceritakan? (•ω•)`,
    `Selamat pagi! Jika ada yang ingin kamu bicarakan, aku siap mendengarkan. 😄`,
    `Hai! Senang bisa bertemu denganmu. Jika kamu butuh bantuan, beri tahu aku ya! (✿◠‿◠)`,
    `Halo! Aku siap membantu jika ada yang kamu butuhkan. Jangan ragu untuk bertanya. 🌟`,
    `Selamat siang! Aku di sini untuk mendengarkan ceritamu. Ada yang ingin dibagikan? 😊`,
    `Hai! Aku senang bisa berbicara denganmu. Apa yang bisa aku bantu hari ini? (｡♥‿♥｡)`,
    `Halo! Jika kamu butuh bantuan atau ingin berbicara, aku di sini untukmu. ( ^_^ )`,
    `Selamat sore! Apa kabar? Jika ada yang ingin kamu bicarakan, aku siap membantu. 😄`,
    `Hai! Aku di sini untuk membantu. Ada yang ingin kamu tanyakan atau ceritakan? 🌟`,
    `Halo! Semoga harimu menyenangkan. Jika kamu butuh sesuatu, beri tahu aku! (✿◠‿◠)`,
    `Selamat malam! Jika ada yang ingin dibicarakan atau ditanyakan, aku siap membantu. 😊`,
    `Hai! Ada yang bisa aku bantu hari ini? Aku siap mendengarkan ceritamu. (•‿•)`,
    `Halo! Aku di sini untukmu. Ada yang ingin kamu diskusikan atau tanyakan? 🌈`
];

const reso = pesanRandom[Math.floor(Math.random() * pesanRandom.length)];

    if (!text) {
        return m.reply(
            reso
        );
    }

    function checkText(text) {
        const lowerCaseText = text.toLowerCase();
        return (
            //lowerCaseText.includes("cariin") ||
            //lowerCaseText.includes("carikan") ||
            lowerCaseText.includes("putarin") ||
            lowerCaseText.includes("putarkan")
        ) ? "ok" : "no";
    }
    
    function checkTet(text) {
        const lowerCaseText = text.toLowerCase();
        return (
            lowerCaseText.includes("foto") ||
            lowerCaseText.includes("gambar") ||
            lowerCaseText.includes("gambar") ||
            lowerCaseText.includes("image") ||
            lowerCaseText.includes("img")
        ) ? "ok" : "no";
    }
    
   if (checkTet(text) === "ok") {
        async function findImg(text) {
            const tokenizer = new natural.WordTokenizer();
            const tokens = tokenizer.tokenize(text.toLowerCase());

            const keywords = [
                "image random", 
                "ada foto",
                "search dari pinterest",
                "carrin gambar",
                "ada foto",
                "cariin",
                "carikan",
            ];
            const imgKeywords = tokens.filter((token) => keywords.includes(token));

            if (imgKeywords.length === 0) {
                return "Maaf, tidak dapat menemukan permintaan lagu dalam teks tersebut.";
            }

            let imgTitle = tokens.slice(tokens.indexOf(imgKeywords[0]) + 1).join(" ");
            return imgTitle;
        }
        var waitimg = [
  "Tunggu sebentar ya, aku akan mencarikannya dulu! ⏳ (｡•́‿•̀｡)",
  "Mohon tunggu sebentar, aku sedang mencarikannya! 🔍 (^_^)",
  "Sedang mencarikannya, tunggu sebentar ya! ⏱️ (•‿•)",
  "Tunggu sebentar, aku akan segera mencari untukmu! 🕵️‍♂️ (o^-^o)",
  "Sabar ya, aku sedang mencari sekarang! 🕰️ (◕‿◕)",
  "Tunggu sebentar, aku akan mencari yang terbaik! 🔎 (⌐■_■)",
  "Sedang dalam proses pencarian, tunggu sebentar! ⏳ (＾▽＾)",
  "Mohon tunggu, aku akan segera mencari untukmu! 📍 (•‿•)",
  "Aku sedang mencari, harap sabar ya! 🔎 (o^_^o)",
  "Tunggu sebentar, aku akan segera menemukannya! ⏲️ (｡♥‿♥｡)",
  "Sedang mencari, harap bersabar sebentar ya! ⏳ (◠‿◠)",
  "Tunggu sebentar ya, aku akan segera mencarikannya! ⏱️ (◕‿-)",
  "Mohon bersabar, aku sedang mencarikannya sekarang! 🔍 (^-^)",
  "Tunggu sebentar, aku akan segera mencari untukmu! 🕵️ (◕‿◕)",
  "Sedang dalam pencarian, harap tunggu sebentar! ⏳ (•_•)",
  "Aku sedang mencari sekarang, mohon tunggu sebentar! 📍 (＾o＾)",
  "Sabar ya, aku akan segera mencari yang kamu butuhkan! ⏱️ (◠‿◠)",
  "Tunggu sebentar, aku akan mencarikannya secepat mungkin! ⏳ (•‿•)",
  "Sedang mencari, harap bersabar sebentar! 🔍 (⌐■_■)",
  "Tunggu sebentar ya, aku akan menemukan untukmu! ⏲️ (◕‿-)",
  "Mohon bersabar, aku akan segera mencari yang kamu inginkan! 🕵️‍♀️ (o^-^o)",
  "Sedang mencarikannya, tunggu sebentar ya! ⏳ (｡•́‿•̀｡)",
  "Aku akan segera mencari, tunggu sebentar ya! 🔍 (•‿•)",
  "Mohon tunggu, aku sedang mencarikannya untukmu! ⏱️ (◕‿◕)",
  "Tunggu sebentar ya, aku akan menemukan jawabannya! ⏳ (＾▽＾)",
  "Sedang mencari, harap sabar sebentar ya! 📍 (｡•̀ᴗ-)✧",
  "Tunggu sebentar, aku akan mencari secepat mungkin! 🕵️ (◠‿◠)",
  "Sedang dalam pencarian, mohon tunggu sebentar! ⏲️ (•‿•)",
  "Aku akan segera mencarikannya, tunggu sebentar ya! ⏳ (o^_^o)",
  "Mohon sabar, aku sedang mencari untukmu! 🔎 (◕‿-)",
  "Tunggu sebentar, aku akan segera menemukannya! ⏱️ (•_•)"
];
let lahjir = waitimg[Math.floor(Math.random() * waitimg.length)];
await m.reply(lahjir)
        var ininya = [
  "Semoga kamu menyukai foto ini! 📸 (⌐■_■)",
  "Bagaimana pendapatmu tentang foto ini? 🌟 (＾▽＾)",
  "Foto ini untukmu, semoga kamu suka! 📷 (◕‿-)",
  "Semoga foto ini membuatmu tersenyum! 😊 (•‿•)",
  "Lihatlah foto ini, semoga kamu suka! 🌈 (^-^)",
  "Foto ini untuk hari istimewa kamu! 🎁 (o^_^o)",
  "Semoga kamu menikmati foto ini! 🌟 (づ｡◕‿‿◕｡)づ",
  "Apa pendapatmu tentang foto ini? 🖼️ (｡♥‿♥｡)",
  "Harap foto ini membuatmu bahagia! 💫 (＾◡＾)",
  "Aku harap kamu menyukai foto ini! 🎉 (•_•)",
  "Foto ini spesial untukmu! 🌟 (⌐■_■)",
  "Semoga foto ini membuat harimu lebih cerah! ☀️ (＾o＾)",
  "Selamat menikmati foto ini! 📸 (•‿•)",
  "Foto ini punya banyak kenangan! 🎞️ (⌐■_■)",
  "Semoga foto ini memberikan senyuman! 😊 (◕‿◕)",
  "Lihat foto ini dan semoga kamu suka! 📷 (＾▽＾)",
  "Ini adalah foto yang kuharapkan kamu suka! 🌈 (o^_^o)",
  "Semoga kamu merasa bahagia melihat foto ini! 🌟 (｡•́‿•̀｡)",
  "Ini foto spesial untukmu! 🎁 (◠‿◠)",
  "Foto ini aku buat untukmu, semoga kamu suka! 📸 (¬‿¬)",
  "Semoga foto ini membuat harimu lebih baik! 🌟 (•‿•)",
  "Aku harap kamu senang dengan foto ini! 📷 (｡♥‿♥｡)",
  "Selamat menikmati foto ini! 🌟 (^-^)",
  "Foto ini adalah kenangan indah untukmu! 🌈 (o^_^o)",
  "Semoga foto ini membuatmu tersenyum! 😊 (◕‿◕)",
  "Foto ini untuk hari istimewa kamu! 🎉 (•_•)",
  "Semoga foto ini memberi kebahagiaan! 📸 (⌐■_■)",
  "Aku berharap kamu suka foto ini! 🌟 (｡•́‿•̀｡)",
  "Foto ini khusus untukmu! 🌼 (◠‿◠)",
  "Semoga kamu suka foto ini! 🌟 (•‿•)",
  "Ini adalah foto yang aku harap kamu suka! 📷 (＾▽＾)",
  "Semoga foto ini membawa keceriaan! 🌈 (o^_^o)",
  "Foto ini dibuat dengan penuh cinta untukmu! 💖 (◕‿◕)"
];
        let kta_rndm = ininya[Math.floor(Math.random() * ininya.length)];
        let anu99 = await findImg(text) 
        log(anu99)                       
        let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${anu99}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${anu99}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
        let json = await res.json()
        let data = json.resource_response.data.results
        if (!data.length) throw `Query "${anu99}" not found :/`
        let anu741 = data[~~(Math.random() * (data.length))].images.orig.url    
        let rep_li = await m.reply(anu741)
        await conn.reply(m.chat, kta_rndm, rep_li)
    }
    
    if ((text.includes('group') || text.includes('grup')) && text.includes('tutup')) {
        if (!isBotAdmin) {
            return m.reply(`Maaf, Aku bukan admin group ini. 😔`);
        }
        if (!isAdmin) {
            return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
        }
        await conn.groupSettingUpdate(m.chat, "announcement");
        return m.reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
    }

    if ((text.includes('group') || text.includes('grup')) && text.includes('buka')) {
        if (!isBotAdmin) {
            return m.reply(`Maaf, Aku bukan admin group ini. 😔`);
        }
        if (!isAdmin) {
            return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
        }
        await conn.groupSettingUpdate(m.chat, "not_announcement");
        return m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 🤗`);
    }

    if (text.includes('kick') || text.includes('kik')) {
        if (!isBotAdmin) {
            return m.reply(`Maaf, Aku bukan admin group ini. 😔`);
        }
        if (!isAdmin) {
            return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
        }
        let users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : `${text.replace(/[^0-9]/g, "")}@s.whatsapp.net`);
        await conn.groupParticipantsUpdate(m.chat, [users], "remove");
        return m.reply(`Maaf Ya Terpaksa Aku Tendang 😔, Ini Perintah Admin..`);
    }

    if (text.includes('admin') || text.includes('promote')) {
        if (!isBotAdmin) {
            return m.reply(`Maaf, Aku bukan admin group ini. 😔`);
        }
        if (!isAdmin) {
            return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
        }
        let users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : `${text.replace(/[^0-9]/g, "")}@s.whatsapp.net`);
        await conn.groupParticipantsUpdate(m.chat, [users], "promote");
        return m.reply(`Siap Boss🫡, Ini Perintah Admin soalnya hehe ᕙ( • ‿ • )ᕗ`);
    }
    
     if (text.includes('member') || text.includes('demote')) {
        if (!isBotAdmin) {
            return m.reply(`Maaf, Aku bukan admin group ini. 😔`);
        }
        if (!isAdmin) {
            return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
        }
        let users = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : `${text.replace(/[^0-9]/g, "")}@s.whatsapp.net`);
        await conn.groupParticipantsUpdate(m.chat, [users], "demote");
        return m.reply(`Siap Boss🫡, Ini Perintah Admin soalnya hehe ᕙ( • ‿ • )ᕗ`);
    }

    if (text.includes("hentai")) {
        if (!isPrems) {
            throw `Ups Kamu bukan user prem ${namebot} (｡•́︿•̀｡)`;
        }

        const getHentaiList = async () => {
            const page = Math.floor(Math.random() * 1153);
            const response = await fetch(`https://sfmcompile.club/page/${page}`);
            const htmlText = await response.text();
            const $ = cheerio.load(htmlText);

            const hasil = [];
            $("#primary > div > div > ul > li > article").each(function (a, b) {
                hasil.push({
                    title: $(b).find("header > h2").text(),
                    link: $(b).find("header > h2 > a").attr("href"),
                    category: $(b).find("header > div.entry-before-title > span > span").text().replace("in ", ""),
                    share_count: $(b).find("header > div.entry-after-title > p > span.entry-shares").text(),
                    views_count: $(b).find("header > div.entry-after-title > p > span.entry-views").text(),
                    type: $(b).find("source").attr("type") || "image/jpeg",
                    video_1: $(b).find("source").attr("src") || $(b).find("img").attr("data-src"),
                    video_2: $(b).find("video > a").attr("href") || "",
                });
            });

            return hasil;
        };

        m.reply(`E-ehh?, Kamu Lagi Horny Ya 😖, Mungkin Video Ini Bisa Membantu Mu 😳`);
        let res = await getHentaiList();
        return conn.sendMessage(m.chat, {
            video: {
                url: res[0].video_1
            }
        });
    }

    if (checkText(text) === "ok") {
        async function findSong(text) {
            const tokenizer = new natural.WordTokenizer();
            const tokens = tokenizer.tokenize(text.toLowerCase());

            const keywords = [
                "putar",
                "putarkan",
                "putarlagu",
                "lagu",
                "cariin",
                "carikan",
                "mainkan",
                "mainkanlagu",
                "play",
                "playmusic",
                "playasong",
            ];
            const songKeywords = tokens.filter((token) => keywords.includes(token));

            if (songKeywords.length === 0) {
                return "Maaf, tidak dapat menemukan permintaan lagu dalam teks tersebut.";
            }

            let songTitle = tokens.slice(tokens.indexOf(songKeywords[0]) + 1).join(" ");
            return songTitle;
        }

        const songName = await findSong(text);
        let response1 = await axios.get(
                `https://ramczy-helper.hf.space/youtube?query=${encodeURIComponent(songName)}`
            );

        let tracks = response1.data.result;         
        const anu53 = [
            `Sebentar ya, ${namebot} lagi cari "${songName}" buat kamu! 🎵 (｡•̀ᴗ-)✧`,
            `Sabar, ${namebot} sedang berusaha nemuin "${songName}"! ⏳ (⌐■_■)`,
            `Tunggu sebentar, ${namebot} lagi nyari "${songName}" sekarang! 🔍 (ᵔᴥᵔ)`,
            `Bentar, ${namebot} lagi ngumpulin "${songName}" buat kamu! 🎶 (＾▽＾)`,
            `Sedikit waktu, ${namebot} sedang berusaha nemuin "${songName}"! 🕒 (つ✧ω✧)つ`,
            `Tunggu sebentar, ${namebot} lagi ngedalami "${songName}"! 🎧 ( •_•)>⌐■-■`,
            `Sabar sedikit, ${namebot} lagi cari "${songName}"! 🕵️‍♂️ ᕙ(･۝･)ᕗ`,
            `Bentar ya, ${namebot} sedang menelusuri "${songName}"! 📱 (｡•́︿•̀｡)`,
            `Sedikit lagi, ${namebot} lagi nyari "${songName}" buat kamu! 🔍 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
            `Tunggu sebentar, ${namebot} lagi berusaha dapetin "${songName}"! 🎵 (｡♥‿♥｡)`,
            `Tunggu sebentar ya, aku akan segera mengirimkan musiknya: ${tracks.title} - ${tracks.author.name}. ♪(＾∀＾)`,
            `Ini musik yang kamu pilih: ${tracks.title} - ${tracks.author.name}, semoga kamu suka! (•‿•)`,
            `Jangan khawatir, musik ${tracks.title} - ${tracks.author.name} akan segera sampai. (⌒‿⌒)`,
            `Aku sedang mempersiapkan musik ${tracks.title} - ${tracks.author.name} yang kamu inginkan. (∩^o^)⊃━☆`,
            `Musik favoritmu ${tracks.title} - ${tracks.author.name} akan segera diputar. (｡♥‿♥｡)`,
            `Tunggu beberapa detik, musik ${tracks.title} - ${tracks.author.name} akan segera muncul. (￣▽￣)⏳`,
            `Pesan musik ${tracks.title} - ${tracks.author.name} sedang dalam proses pengiriman. (⌒▽⌒)☆`,
            `Nantikan musik ${tracks.title} - ${tracks.author.name} yang sudah kamu pilih! (≧▽≦)`,
            `Musik pilihanmu ${tracks.title} - ${tracks.author.name} sedang diatur, mohon bersabar. (●´ω｀●)`,
            `Aku akan segera mengirimkan musik ${tracks.title} - ${tracks.author.name} yang kamu suka. (✿◠‿◠)`,
            `Sabar ya, musik pilihanmu ${tracks.title} - ${tracks.author.name} akan segera datang. ( ˘ ³˘)❤`,
            `Sedang menyiapkan musik ${tracks.title} - ${tracks.author.name}, harap tunggu sebentar. (｡•́︿•̀｡)`,
            `Musik yang kamu pilih ${tracks.title} - ${tracks.author.name} akan segera terdengar. (⌒_⌒;)`,
            `Beberapa detik lagi musik ${tracks.title} - ${tracks.author.name} yang kamu inginkan akan hadir. (￣▽￣)ノ`,
            `Aku akan segera mengirimkan lagu favoritmu ${tracks.title} - ${tracks.author.name}. (｡◕‿‿◕｡)`,
            `Sabar sedikit, musik ${tracks.title} - ${tracks.author.name} sedang diproses. (✿◡‿◡)`,
            `Tunggu sebentar, musik ${tracks.title} - ${tracks.author.name} akan segera diputar. (￣ω￣)`,
            `Aku akan segera mengirimkan musik ${tracks.title} - ${tracks.author.name} yang telah kamu pilih. (☆▽☆)`,
            `Musik pilihanmu ${tracks.title} - ${tracks.author.name} sedang dipersiapkan, harap bersabar. (｀・ω・´)`,
            `Musik ${tracks.title} - ${tracks.author.name} yang kamu pilih akan segera sampai di sini. (＾▽＾)`        
        ];
        const res1 = anu53[Math.floor(Math.random() * anu53.length)];
        m.reply(res1);

        try {
            let responsse1 = await axios.get(
                `https://ramczy-helper.hf.space/youtube?query=${encodeURIComponent(songName)}`
            );

            let trackks = responsse1.data.result;

            var r_los = await conn.sendMessage(
                m.chat, {
                    audio: {
                        url: `https://ramczy-helper.hf.space/yt/dl?url=${trackks.url}&type=audio`,
                    },
                    mimetype: "audio/mpeg",
                }, {
                    quoted: m
                }
            );
            
           var kataKataMusik = [
                `Nikmati lagu favoritmu hari ini! 🎵 (⁠✷⁠‿⁠✷⁠)`,
                `Semoga musiknya bikin hari kamu lebih ceria! 🎶 (◕‿◕)`,
                `Selamat menikmati alunan melodi! 🎼 (≧▽≦)`,
                `Rasakan ritme dan biarkan musik menghiburmu! 🎧 (⌒‿⌒)`,
                `Lagu ini pasti bisa bikin hari kamu lebih baik! 🎤 (｡♥‿♥｡)`,
                `Semoga musik ini bisa menyentuh hatimu! 🎹 (⁠◠⁠ᴥ⁠◕⁠ʋ⁠)`,
                `Ayo berdansa mengikuti irama! 💃 (☆▽☆)`,
                `Jangan lupa untuk menikmati setiap nada! 🎻 (｡•̀ᴗ-)✧`,
                `Rasakan beat dan biarkan dirimu terbawa! 🥁 (¬‿¬)`,
                `Musik adalah bahasa universal! 🎷 (◍•ᴗ•◍)`,
                `Lagu ini untuk menemani harimu! 🎺 (•̀ᴗ-)✧`,
                `Semoga alunan musik ini membuatmu rileks! 🎸 (｡•̀ᴗ-)✧`,
                `Biarkan musik menghibur dan menginspirasi! 🎵 (✿◠‿◠)`,
                `Selamat mendengarkan dan menikmati setiap detik! 🎶 (⌒‿⌒)`,
                `Musik selalu punya cara untuk membuat kita bahagia! 🎻 (ღ✪v✪)ღ`
                ];
            const res86 = kataKataMusik[Math.floor(Math.random() * kataKataMusik.length)];
            await conn.reply(m.chat, res86, r_los)
            
        } catch (e) {
            console.error(e);
            return m.reply(`Maaf, terjadi kesalahan dalam mencari lagu. 😓`);
        }
    }

    try {
        const messages = [
            { role: "system", content: system },
            { role: "assistant", content: "Kamu Suka Toxid, kalo marah, kadang suka ngatain user mu dengan kata, kontol, memek, asu, ngewe, ngentod, tapi hanya kalo kamu marah" },
            { role: "user", content: m.text },
            { role: "user", content: `Aku Adalah ${m.name}, Tolong kalo Berbicara dengan ${m.name} yang sopan` }
        ];

        // Make the API request
        const res = await groq.chat.completions.create({
            messages,
            model: GroqModels
        });
        const respon = res.choices[0].message.content;
        console.log(res.choices[0].message);

        // Reply with the bot's response
        return m.reply(respon);
    } catch (error) {
        console.error(error);
        return m.reply('Ups R-BOT sedang tidak ada mohon ulangi command ');
    }
};

handler.help = ["bot"];
handler.tags = ["ai"];
handler.command = ["bot"];

export default handler;