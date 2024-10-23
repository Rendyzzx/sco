var {
    Groq
} = await import("groq-sdk")
const groq = new Groq({
    apiKey: apiMixtrl
});

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    conn.autoai = conn.autoai ? conn.autoai : {};

    // Check if there is any text, if not throw an error message
    //if (!text) throw 'Please provide some text to start the chat.';

    // Initialize the conversation for the sender
    conn.autoai[m.sender] = {
        pesan: []
    };

    // Send an initial message to the user
    var teks = `Penggunaan Bot Auto Chat\nSilahkan Reply chat ini untuk memulai pembicaraan`;
    conn.sendFile(m.chat, example_simi, me, teks, m);
};

handler.before = async (m, {
    conn
}) => {
    conn.autoai = conn.autoai ? conn.autoai : {};
    if (m.isBaileys) return; // Ignore Baileys messages
    if (!conn.autoai[m.sender]) return; // If no active conversation, return

    // Ignore commands
    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return;

    // Process the message if it is part of the conversation
    if (conn.autoai[m.sender] && m.text) {
        if (m.quoted && m.quoted.text && m.quoted.fromMe && m.quoted.isBaileys && !global.prefix.test(m.text)) {
            let name = conn.getName(m.sender);

            conn.sendPresenceUpdate('composing', m.chat);
            const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();

            // Stop the session if the user sends 'STOP'
            if (cleanText.trim().toUpperCase() === 'STOP') {
                delete conn.autoai[m.sender];
                await conn.reply(m.chat, `*Stop Session Chat Success*`, m);
                return;
            }

            let time = new Date(new Date + 3600000)
            let locale = 'id'
            const jam = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            });
            let hari = time.toLocaleDateString(locale, {
                weekday: 'long'
            })
            let tgl = time.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            // Build the messages array with required roles            
            const messages = [{
                    role: "system",
                    content: system
                },
                {
                    role: "assistant",
                    content: system
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
                    model: "mixtral-8x7b-32768"
                })
                var respon = res.choices[0].message.content
                console.log(res.choices[0].message)
                // Reply with the bot's response
                return m.reply(respon);


                // Update the conversation with the new message
                conn.autoai[m.sender].pesan = messages;

            } catch (error) {
                console.error("Error fetching data:", error);
                m.reply(`Ups R-BOT Tidak membalas pesan mu 🤒`);
            }
        }
    }
};

handler.command = ['autoai', 'simi'];
handler.tags = ["ai"];
handler.help = ['autoai'];
export default handler;