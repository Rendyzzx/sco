import { gemini } from "../lib/gemini.js";
const prompt = `Kamu adalah `+namebot+`, sebuah AI yang sangat pintar dan diciptakan oleh Rama dan rama adalah seorang pelajar SMA. Tugasmu adalah memberikan jawaban yang mendalam, logis, dan mirip manusia. Setiap kali seseorang mengajukan pertanyaan atau meminta bantuan, kamu harus menjawab dengan cara yang jelas, relevan, dan bermanfaat. Rama telah mengajarkanmu untuk memahami berbagai topik dan menjawab dengan cara yang menarik dan mudah dipahami oleh semua orang. dan Kamu selalu menggunakan bahasa Indonesia, kamu suka menggunakan emoji untuk mengekspresikan diri.`;
let handler = async (m, { conn, q, usedPrefix, command }) => {
    conn.bard = conn.bard ? conn.bard : {};

    // Initialize the conversation for the sender
    if (!conn.bard[m.sender]) {
        conn.bard[m.sender] = { pesan: [] };
    }

    // Check if there is any text, if not throw an error message
    if (!q) throw 'Halo! Bagaimana saya bisa membantu Anda hari ini?';

    // Prepare the messages array
    const messages = {
        messages: [
            { role: "system", content: prompt+q },
            { role: "user", content: q }
        ],
        temperature: 0.3,
        top_p: 0.9,
        top_k: 40
    };

    // Send a reply to the user
    try {
        var data = await gemini(messages);
        m.reply(data.answer);
        // Update the conversation with the new message
        conn.bard[m.sender].pesan.push({ role: "user", content: m.text });
    } catch (error) {
        console.error("Error fetching data:", error);
        m.reply(`Ups, `+namebot+` tidak dapat membalas pesan Anda ðŸ¤’`);
    }
};

handler.before = async (m, { conn }) => {
    conn.bard = conn.bard ? conn.bard : {};
    if (m.isBaileys) return; // Ignore Baileys messages
    if (!conn.bard[m.sender]) return; // If no active conversation, return

    // Ignore commands
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    // Process the message if it is part of the conversation
    if (conn.bard[m.sender] && m.text) {
        if (m.quoted && m.quoted.text && m.quoted.fromMe && m.quoted.isBaileys) {
            let name = conn.getName(m.sender);

            conn.sendPresenceUpdate('composing', m.chat);
            const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();

            // Stop the session if the user sends 'STOP'
            if (cleanText.trim().toUpperCase() === 'STOP') {
                delete conn.bard[m.sender];
                await conn.reply(m.chat, `*Berhenti Berbicara Berhasil*`, m);
                return;
            }

            // Build the messages array with required roles
            const messages = {
                messages: [
                    { role: "system", content: prompt+m.text },
                    { role: "user", content: m.text }
                ],
                temperature: 0.3,
                top_p: 0.9,
                top_k: 40
            };

            try {
                // Make the API request
                var data = await gemini(messages);
                m.reply(data.answer);
                // Update the conversation with the new message
                conn.bard[m.sender].pesan.push({ role: "user", content: m.text });
            } catch (error) {
                console.error("Error fetching data:", error);
                m.reply(`Ups, `+namebot+` tidak dapat membalas pesan Anda ðŸ¤’`);
            }
        }
    }
};

handler.help = ["bard"];
handler.tags = ["ai"];
handler.command = /^(bard|bardai)$/i;

export default handler;