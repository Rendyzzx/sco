import fetch from 'node-fetch';
var { xnxxSearch, xnxxdl } = await import('../lib/xnxx.js');

let handler = async (m, { text, conn }) => {
    if (!text) throw 'What are you searching for?';

    try {
        // Perform the search
        let data = await xnxxSearch(text);
        let results = data.result;

        if (results.length === 0) {
            m.reply('No videos found.');
            return;
        }

        let response = `[ *XNXX SEARCH RESULTS* ]\n\n`;
        results.forEach((item, index) => {
            response += `> ${index + 1}. Title: ${item.title}\n`;
            //response += `> Views: ${item.views}\n`;
            //response += `> Quality: ${item.quality}\n`;
            //response += `> Duration: ${item.duration}\n`;
            response += `> Link: ${item.link}\n──────────────────\n`;
        });

        response = response.trim();

        // Store the search results for session-based interaction
        conn.xnxx = conn.xnxx || {};
        conn.xnxx[m.chat] = {
            results,  // Save the results for later use
            messageId: (await m.reply(response + '\nReply with the number to download the video.')).key.id,
            timeout: setTimeout(() => {
                delete conn.xnxx[m.chat];  // Clear session after timeout
            }, 120000),  // 2-minute timeout
        };
    } catch (err) {
        m.reply('An error occurred. Please try again.');
        console.error(err);
    }
};

// Manage session before video download
handler.before = async (m, { conn }) => {
    if (!conn.xnxx || !conn.xnxx[m.chat]) return false;  // No active session

    if (!m.quoted || !m.quoted.isBaileys || !m.quoted.fromMe || m.quoted.key.id !== conn.xnxx[m.chat].messageId) {
        return true;
    }

    const index = parseInt(m.text) - 1;
    let selectedVideo = conn.xnxx[m.chat].results[index];

    if (!isNaN(index) && selectedVideo) {
        clearTimeout(conn.xnxx[m.chat].timeout);  // Clear session timeout
        let downloadData = await xnxxdl(selectedVideo.link);
        let videoUrl = downloadData.result.files.high;
        
        await conn.sendFile(m.chat, videoUrl, '', `Title: ${downloadData.result.title}`, m);
        m.react('✅');  // Indicate success

        // Reset session timeout
        conn.xnxx[m.chat].timeout = setTimeout(() => {
            delete conn.xnxx[m.chat];  // Clear session after timeout
        }, 120000);
    } else {
        m.reply('Invalid number. Please try again.');
    }

    return true;  // Message processed
};

handler.command = handler.help = ['xnsearch', 'bokep'];
handler.tags = ['tools'];
handler.premium = true;

export default handler;