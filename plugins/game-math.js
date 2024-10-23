let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    const buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
    if (args.length < 1) return m.reply(`
  Mode: ${Object.keys(modes).join(`\n•`)}
  Contoh penggunaan: ${usedPrefix}math medium
  `.trim())
    let mode = args[0].toLowerCase()
    if (!(mode in modes)) return m.reply(`
  Mode: ${Object.keys(modes).join(' | ')}
  Contoh penggunaan: ${usedPrefix}math medium
    `.trim())
    let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        //let caption = `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} MONEY💵`.trim()
        await conn.sendMessage(m.chat, {
        text: `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} MONEY💵`.trim(),
        contextInfo: {
        externalAdReply: {
        title: `MATH`,
        thumbnailUrl: `https://telegra.ph/file/4342a0795ed1a01765c4a.jpg`,
        mediaType: 1,
        renderLargerThumbnail: true
        }}}, { quoted: m}),
        //conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} XP`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) m.reply(`Waktu habis!\nJawabannya adalah ${math.result}`)
            delete conn.math[id]
        }, math.time)
    ]
}
handler.help = handler.command = ['math']
handler.tags = ['game']

let modes = {
    noob: [-3, 3, -3, 3, '+-', 10000, 100],
    easy: [-10, 10, -10, 10, '*/+-', 150000, 400],
    medium: [-40, 40, -20, 20, '*/+-', 300000, 1500],
    hard: [-100, 100, -70, 70, '*/+-', 500000, 3500],
    extreme: [-999999, 999999, -999999, 999999, '*/', 700000, 99990],
    impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 150000, 3500000],
    impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 150000, 50000000]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler