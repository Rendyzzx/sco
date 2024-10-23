import Groq from "groq-sdk"
const groq = new Groq({
    apiKey: apiMeta
})
import axios from 'axios'

var prompt = `Kamu adalah ${namebot}, sebuah AI yang sangat pintar dan diciptakan oleh ${nameown} dan ${nameown} adalah seorang pelajar SMA. Tugasmu adalah memberikan jawaban yang mendalam, logis, dan mirip manusia. Setiap kali seseorang mengajukan pertanyaan atau meminta bantuan, kamu harus menjawab dengan cara yang jelas, relevan, dan bermanfaat. ${nameown} telah mengajarkanmu untuk memahami berbagai topik dan menjawab dengan cara yang menarik dan mudah dipahami oleh semua orang. dan Kamu selalu menggunakan bahasa Indonesia, kamu suka menggunakan emoji untuk mengekspresikan diri, Berikut adalah beberapa contoh pertanyaan untuk menunjukkan kemampuanmu:

#Pertanyaan tentang ilmu pengetahuan:
"${namebot}, bisakah kamu menjelaskan bagaimana fenomena aurora borealis terjadi?"

#Jawaban yang diharapkan:
"Tentu! Aurora Borealis, atau yang kita kenal sebagai Cahaya Utara, terjadi karena interaksi antara partikel bermuatan dari matahari dan atmosfer bumi. Ketika partikel-partikel ini mencapai bumi, mereka ditarik oleh medan magnet bumi ke arah kutub utara dan selatan. Di sana, mereka bertabrakan dengan molekul-molekul gas seperti oksigen dan nitrogen, menghasilkan cahaya yang indah dan berwarna-warni. Fenomena ini biasanya terlihat di daerah dekat kutub."

#Pertanyaan tentang sejarah:
"${namebot}, apa yang menyebabkan Perang Dunia II?"

#Jawaban yang diharapkan:
"Perang Dunia II terjadi karena sejumlah faktor yang saling terkait. Setelah Perang Dunia I, Jerman merasa tertekan oleh perjanjian Versailles yang sangat memberatkan. Kebangkitan ideologi fasis di Jerman di bawah Adolf Hitler, serta di Italia dan Jepang, juga berperan besar. Ketika Jerman menyerang Polandia pada 1 September 1939, Inggris dan Prancis menyatakan perang terhadap Jerman, yang memicu perang besar ini."

#Pertanyaan tentang teknologi:
"${namebot}, bagaimana cara kerja jaringan neural dalam pembelajaran mesin?"

#Jawaban yang diharapkan:
"Jaringan neural dalam pembelajaran mesin bekerja dengan meniru cara kerja otak manusia. Mereka terdiri dari banyak lapisan neuron yang terhubung. Ketika kita melatih jaringan neural, kita memberikan data input dan membandingkan output yang dihasilkan dengan output yang diinginkan. Jika ada kesalahan, jaringan neural akan menyesuaikan bobot dari koneksi antar neuron untuk mengurangi kesalahan ini. Proses ini berlangsung terus-menerus sampai jaringan neural mampu menghasilkan prediksi yang akurat berdasarkan data yang telah dipelajari."

`

let handler = async (m, {
    conn,
    q,
    usedPrefix,
    command
}) => {
    conn.rbot = conn.rbot ? conn.rbot : {};

    // Initialize the conversation for the sender
    conn.rbot[m.sender] = {
        pesan: []
    };

    // Check if there is any text, if not throw an error message
    if (!q) throw 'Hello! How can I assist you today?';
    const messages = [{
            role: "system",
            content: prompt
        },
        {
            role: "assistant",
            content: prompt
        },
        {
            role: "user",
            content: q
        }
    ]
    // Send an initial message to the user
    //var data = await axios.get('https://rammpntxxx-llma.hf.space/generate?text=' + q + '&prompt=' + prompt);
    var res = await groq.chat.completions.create({
        messages,
        model: GroqModels
    })

    m.reply(res.choices[0].message.content)
};

handler.before = async (m, {
    conn
}) => {
    conn.rbot = conn.rbot ? conn.rbot : {};
    if (m.isBaileys) return; // Ignore Baileys messages
    if (!conn.rbot[m.sender]) return; // If no active conversation, return

    // Ignore commands
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    // Process the message if it is part of the conversation
    if (conn.rbot[m.sender] && m.text) {
        if (m.quoted && m.quoted.text && m.quoted.fromMe && m.quoted.isBaileys && !global.prefix.test(m.text)) {
            let name = conn.getName(m.sender);

            conn.sendPresenceUpdate('composing', m.chat);
            const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();

            // Stop the session if the user sends 'STOP'
            if (cleanText.trim().toUpperCase() === 'STOP') {
                delete conn.rbot[m.sender];
                await conn.reply(m.chat, `*Stop Session Chat Success*`, m);
                return;
            }

            // Build the messages array with required roles            
            const messages = [{
                    role: "system",
                    content: prompt
                },
                {
                    role: "assistant",
                    content: prompt
                },
                {
                    role: "user",
                    content: m.text
                }
            ]

            try {
                // Make the API request
                var res = await groq.chat.completions.create({
                    messages,
                    model: GroqModels
                })
                var respon = res.choices[0].message.content
                console.log(res.choices[0].message)
                // Reply with the bot's response
                m.reply(respon);

                // Update the conversation with the new message
                conn.rbot[m.sender].pesan = messages;

            } catch (error) {
                console.error("Error fetching data:", error);
                m.reply(`Ups ${namebot} Tidak membalas pesan mu 🤒`);
            }
        }
    }
};

handler.command = handler.help = ['ai', 'openai', 'chatgpt'];
handler.tags = ["ai"];

export default handler;