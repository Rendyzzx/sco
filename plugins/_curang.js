let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender]
        conn.reply(m.chat, `*SuccesAdd ${toSimple(100000000)} Money 💵!*`, m)
        global.db.data.users[m.sender].money += 100000000
        //global.db.data.users[m.sender].limit = 100000000000
        //global.db.data.users[m.sender].level = 100000000000
        //global.db.data.users[m.sender].exp = 100000000000 
}
handler.command = /^(curang|cheat)$/i
handler.premium = true
//handler.owner = true

export default handler


// fungsi yang diperlukan untuk fungsi tosimple
function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}

// fungsi nomor to simple biar gak panjang

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}