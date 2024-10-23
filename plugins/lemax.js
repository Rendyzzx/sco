import Groq from "groq-sdk"
const groq = new Groq({
    apiKey: apiMeta
})
import axios from 'axios'

var prompt = `kamu adalah anime`

let handler = async (m, {
    conn,
    q,
    usedPrefix,
    command
}) => {
    conn.lemax = conn.lemax ? conn.lemax : {};

    // Initialize the conversation for the sender
    conn.lemax[m.sender] = {
        pesan: []
    };
    
    if (m.isGroup) return m.reply("Used In private chats!!")
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
    var res = await groq.chat.completions.create({
        messages,
        model: "Llama3-70b-8192"
    })

    m.reply(res.choices[0].message.content)
};

handler.before = async (m, {
    conn
}) => {
    conn.lemax = conn.lemax ? conn.lemax : {};
    if (m.isBaileys) return; // Ignore Baileys messages
    if (!conn.lemax[m.sender]) return; // If no active conversation, return

    // Ignore commands for group chats
    if (m.isGroup) return; // Do not respond in groups

    // Process the message if it is part of the conversation
    if (conn.lemax[m.sender] && m.text) {
        const name = conn.getName(m.sender);

        conn.sendPresenceUpdate('composing', m.chat);
        const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();

        // Stop the session if the user sends 'STOP'
        if (cleanText.trim().toUpperCase() === 'STOP') {
            delete conn.lemax[m.sender];
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
                model: "Llama3-70b-8192"
            })
            var respon = res.choices[0].message.content
            console.log(res.choices[0].message)
            // Reply with the bot's response
            m.reply(respon);

            // Update the conversation with the new message
            conn.lemax[m.sender].pesan = messages;

        } catch (error) {
            console.error("Error fetching data:", error);
            m.reply(`Ups ${name} Tidak membalas pesan mu 🤒`);
        }
    }
};

// Update command handling
handler.command = handler.help = ['lemax'];
handler.tags = ["ai"];

export default handler;