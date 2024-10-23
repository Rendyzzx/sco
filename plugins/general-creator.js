import fetch from "node-fetch";
import PhoneNumber from "awesome-phonenumber";
var handler = async (m, {
    conn
}) => {
    //let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;${wm};Bot;;Md\nFN:${nameown}\nNICKNAME:${nicknameown}\nORG:${nameown}\nTITLE:Zzzz\nitem1.TEL;waid=${nomorown}:${own}\nitem1.X-ABLabel:Click Here\nitem2.URL:google.com\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:${email}\nitem3.X-ABLabel:💌 Mail Owner ${wm}\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:📍 Lokasi Saya\nBDAY;value=date:🔖 ${lahir}\nEND:VCARD`
     const ownerPromises = owner.map(async (item, index) => [item[0], conn.getName(item[0] + "@s.whatsapp.net") || "Tidak diketahui", "👑 Owner", "Click Here!", email, "🇮🇩 Indonesia", "🚀 https://google.com/", "Nothing Spam!!!!"]),
      data = await Promise.all(ownerPromises);
    let contacts = [];
    for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
      number = number.replace(/[^0-9]/g, "");
      let njid = number + "@s.whatsapp.net",
        vcard = (await conn.getBusinessProfile(njid).catch(_ => null), `\nBEGIN:VCARD\nVERSION:3.0\nN:;${name.replace(/\n/g, "\\n").split(" ").reverse().join(";")};;;\nFN:${name.replace(/\n/g, "\\n")}\nitem.ORG:${isi}\nitem1.TEL;waid=${number}:${PhoneNumber("+" + number).getNumber("international")}\nitem1.X-ABLabel:${isi1}\nitem2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email\nitem3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac\nitem3.X-ABLabel:📍 Region\nitem4.URL:${isi4}\nitem4.X-ABLabel:Website\nitem5.X-ABLabel:${isi5}\nEND:VCARD`.trim());
      contacts.push({
        vcard: vcard,
        displayName: name
      });
    }
    let tag_own = await conn.sendMessage(m.chat, {
      contacts: {
        displayName: (contacts.length > 1 ? wm : contacts[0]?.displayName) || null,
        contacts: contacts
      }      
    }, {
      quoted: m
    });
    await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} Ini Owner ku, walaupun dia ngeselin dia sebenarnya baik kok :D, kalo mau minta sv pm aja tapi jangan di spam ya :)`, tag_own, {
      mentions: [m.sender]
    });
    }
handler.help = ['owner', 'creator']
handler.tags = ['general']

handler.command = /^(owner|creator)$/i

export default handler