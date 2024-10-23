const prem = 500000
const free = 5000
const limitfree = 5
const limitprem = 5000
const moneyfree = 700000
const moneyprem = 14000000

let handler = async (m, { isPrems }) => {
    let time = global.db.data.users[m.sender].lastweekly + 604800000
  if (new Date - global.db.data.users[m.sender].lastweekly < 604800000) throw `Kamu Sudah Mengambilnya Minggu Ini\nTunggu Selama ${msToTime(time - new Date())} Lagi`
        global.db.data.users[m.sender].exp += isPrems ? prem : free
        global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree
        global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree
        conn.reply(m.chat, `Selamat Kamu Mendapatkan:\n\n+${toSimpl(isPrems ? prem : free)} Exp\n+${toSimpl(isPrems ? limitprem : limitfree)} Limit`, m)
        global.db.data.users[m.sender].lastweekly = new Date * 1
    }
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(mingguan|weekly)$/i
handler.fail = null
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    monthly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720)

  monthly  = (monthly < 10) ? "0" + monthly : monthly
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return monthly + " Hari " +  hours + " Jam " + minutes + " Menit"
}