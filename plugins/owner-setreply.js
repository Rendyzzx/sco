import moment from "moment-timezone";

const handler = async (m, { conn, command, text }) => {
  db.data.dbbot.temareply = db.data.dbbot.temareply || { contextInfo: {} };

  let themes = {
    1: "Normal",
    2: "AdReply Small",
    3: "AdReply Large",
    4: "Newsletter",
    5: "Newsletter with AdReply Small",
    6: "Newsletter with AdReply Large",
    7: "Fake IG"
  };

  let themeDetails = {
    Normal: {},
    "AdReply Small": global.adReply || {}, // Ensure adReply exists
    "AdReply Large": {
      contextInfo: {
        externalAdReply: {
          title: ucapan + " " + m.name,
          body: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: pickRandom([thumbnailUrl]),
          sourceUrl: sgc
        }
      }
    },
    Newsletter: {
      contextInfo: {
        groupMentions: [],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: idch,
          newsletterName: wm,
          serverMessageId: -1
        },
        businessMessageForwardInfo: {
          businessOwnerJid: businessOwnerJid()
        },
        forwardingScore: 256
      }
    },
    "Newsletter with AdReply Small": {
      contextInfo: {
        groupMentions: [],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: idch,
          newsletterName: wm,
          serverMessageId: -1
        },
        businessMessageForwardInfo: {
          businessOwnerJid: businessOwnerJid()
        },
        forwardingScore: 256,
        externalAdReply: {
          title: ucapan + " " + m.name,
          thumbnailUrl: pickRandom([thumbnailUrl])
        }
      }
    },
    "Newsletter with AdReply Large": {
      contextInfo: {
        groupMentions: [],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: idch,
          newsletterName: wm,
          serverMessageId: -1
        },
        businessMessageForwardInfo: {
          businessOwnerJid: businessOwnerJid()
        },
        forwardingScore: 256,
        externalAdReply: {
          title: ucapan + " " + m.name,
          body: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: pickRandom([thumbnailUrl]),
          sourceUrl: sgc
        }
      }
    },
    "Fake IG": global.fakeig || {} // Ensure fakeig exists
  };

  if (text) {
    let themeIndex = parseInt(text);
    if (isNaN(themeIndex) || !themes[themeIndex]) {
      return await conn.reply(m.chat, "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
        Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join("\n"), m);
    }

    const themeKey = themes[themeIndex];
    const themeDetail = themeDetails[themeKey];

    if (!themeDetail) {
      return await conn.reply(m.chat, "Tema tidak ditemukan.", m);
    }

    db.data.dbbot.temareply = themeDetail;
    await conn.reply(m.chat, "Tema berhasil diatur\n" + themeIndex + ". " + themeKey, m);
  } else {
    await conn.reply(m.chat, "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
      Object.entries(themes).map(([id, theme]) => `*${id}.* ${theme}`).join("\n"), m);
  }
};

handler.help = ["setreply"];
handler.tags = ["owner"];
handler.command = /^(setreply)$/i;
handler.owner = true;
export default handler;

function pickRandom(list) {
  const shuffledList = list.slice().sort(() => Math.random() - 0.5);
  return shuffledList[Math.floor(Math.random() * shuffledList.length)];
}

function businessOwnerJid() {
  return pickRandom([nomorown, "0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"]) + "@s.whatsapp.net";
}