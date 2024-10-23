import jimp from 'jimp'
import PhoneNumber from 'awesome-phonenumber'
import moment from "moment-timezone"
const getFolderSize = (await import("get-folder-size")).default;
import {
    watchFile,
    unwatchFile,
    readFileSync
} from 'fs'
import fs from 'fs'
import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
var {
    generateWAMessageFromContent,
    proto,
    prepareWAMessageMedia,
    fetchLatestBaileysVersion,
    fetchLatestWaWebVersion
} = require('@adiwajshing/baileys')
const media = await prepareWAMessageMedia({
    image: (await conn.getFile(thumbs)).data
}, {
    upload: conn.waUploadToServer
})
import NetworkSpeed from 'network-speed'
const test = new NetworkSpeed()
import {
    tmpdir
} from 'os'
import os from 'os'
const {
    createCanvas,
    loadImage
} = require('canvas');
const {
    upload
} = await import('../lib/uploadMedia.js');
let handler = async (m, {
    conn,
    usedPrefix: _p
}) => {
    let glb = global.db.data.users
    let user = `@${m.sender.split('@')[0]}`
    let usrs = db.data.users[m.sender]
    let nams = m.pushName || conn.getName(m.sender)
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let ttlreg = Object.keys(global.db.data.users).length
    let isPrefix = m.prefix ? "Multi" : "No";
    let processName = `${process.title.split('/').pop().toUpperCase()}, ${(process.version).toUpperCase()}`;
    let mode = global.opts["self"] ? "Private" : "Publik"
    let platform = os.platform()
    let totalreg = Object.keys(glb).length
    let rtotalreg = Object.values(glb).filter(user => user.registered === true).length
    let tags = {}
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium': 'Free'}`
    let {
        limit,
        role,
        money,
        exp,
        level
    } = global.db.data.users[m.sender]
    let imgr = flaaa.getRandom()
    let upload = await getNetworkUploadSpeedd()
    let old = new Date()
    let wibh = moment.tz('Asia/Jakarta')
        .format('HH')
    let wibm = moment.tz('Asia/Jakarta')
        .format('mm')
    let wibs = moment.tz('Asia/Jakarta')
        .format('ss')
    let wktuwib = `${wibh}.${wibm}`

    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let download = await getNetworkDownloadSpeed()
    //SET MENU DI SINI
    const defaultMenu = {
        before: "┌── ⌜  Y O U I N F O  ⌟\n" +
            `├── *Name:* ${nams}
├── *Status:* ${prems}
├── *Limit:* ${limit}
├── *Money:* ${formatRupiah(money)}
├── *Role:* ${role}
├── *Level:* ${level} 
└── *Xp:* ${exp} 

` + "┌── ⌜  B O T I N F O  ⌟\n" +
            `├── *Bot Name:* ${namebot}
├── *Mode:* ${mode}
├── *Platform:* ${platform}
├── *Type:* ${processName}
├── *Baileys:* @latest
└── *Database:* ${rtotalreg} dari ${totalreg}

> Harap Gunakan bot dengan bijak dan tidak spam cmd
%readmore
`,
        header: `┌── ⌜ *%category* ⌟`,
        body: '├── %cmd %islimit%isPremium',
        footer: "└──",
        after: ``,
    }
    try {
        let name = m.pushName || conn.getName(m.sender)
        let d = new Date(new Date + 3600000)
        let locale = 'id'
        // d.getTimeZoneOffset()
        // Offset -420 is 18.00
        // Offset    0 is  0.00
        // Offset  420 is  7.00
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        })
        let time = d.toLocaleTimeString(locale, {
            timeZone: 'Asia/Jakarta'
        })
        time = time.replace(/[.]/g, ':')
        let _uptime
        if (process.send) {
            process.send('uptime')
            _uptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }

        let uptime = clockString(_uptime)
        let help = Object.values(global.plugins)
            .filter(plugin => !plugin.disabled)
            .map(plugin => {
                return {
                    help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
                    tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                    prefix: 'customPrefix' in plugin,
                    limit: plugin.limit,
                    premium: plugin.premium,
                    enabled: !plugin.disabled,
                }
            })
        for (let plugin of help)
            if (plugin && 'tags' in plugin)
                for (let tag of plugin.tags)
                    if (!(tag in tags) && tag) tags[tag] = tag
        conn.menu = conn.menu ? conn.menu : {}
        let before = conn.menu.before || defaultMenu.before
        let header = conn.menu.header || defaultMenu.header
        let body = conn.menu.body || defaultMenu.body
        let footer = conn.menu.footer || defaultMenu.footer
        let after = conn.menu.after || defaultMenu.after
        let _text = [
            before, ...Object.keys(tags)
            .map(tag => {
                return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
                    ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
                    .map(menu => {
                        return menu.help.map(help => {
                                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                                    .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                                    .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                                    .trim()
                            })
                            .join('\n')
                    }), footer
                ].join('\n')
            }), after
        ].join('\n')
        let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
        let replace = {
            '%': '%',
            p: _p,
            uptime,
            me: conn.getName(conn.user.jid),
            name,
            date,
            time,
            readmore: readMore,
            platform,
            mode,
            processName,
            rtotalreg,
            totalreg
        }
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

        const vi = ['https://telegra.ph/file/067b2cb3312837533239c.mp4', 'https://telegra.ph/file/e38881701692c74484a17.mp4', 'https://telegra.ph/file/de776d34ef058b7d2ec12.mp4', 'https://telegra.ph/file/bc82653506c301b40679c.mp4', 'https://telegra.ph/file/7f10b3624991bbcee9ded.mp4', 'https://telegra.ph/file/51aa9701839dcc29066e9.mp4', 'https://telegra.ph/file/4f26132ac0296a34a45a8.mp4']

        var vid = vi[Math.floor(Math.random() * (vi.length))]
        let hi = `\n\n\t\t _Have a good day ${name}_ \t\t\n\n`
        const totag = {
            contextInfo: {
                mentionedJid: [text]
            }
        }
        let mtag = text + totag
        let ppl = await (await conn.profilePictureUrl(m.sender, 'image')
            .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'))
        let ppb = await (await conn.profilePictureUrl(conn.user.jid, 'image')
            .catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'))
        conn.temamenu = conn.temamenu ? conn.temamenu : {
            id: 10
        }
        if (conn.temamenu.id === 0) {
            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        "messageContextInfo": {
                            "deviceListMetadata": {},
                            "deviceListMetadataVersion": 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: ""
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: wm
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: text.trim(),
                                subtitle: "",
                                hasMediaAttachment: true,
                                ...media
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [{
                                    "name": "cta_url",
                                    "buttonParamsJson": "{\"display_text\":\"Channel 🛰️\",\"url\":\"https://whatsapp.com/channel/0029VaEHHgo6LwHiSQjNDG1b/215\",\"merchant_url\":\"https://whatsapp.com/channel/0029VaEHHgo6LwHiSQjNDG1b/215\"}"
                                }],
                            })
                        })
                    }
                }
            }, {})

            await conn.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id
            })
        }
        if (conn.temamenu.id === 1) {
            conn.reply(m.chat, text.trim(), m)
        } else if (conn.temamenu.id === 2) {
            await conn.sendMessage(m.chat, {
                react: {
                    text: `✅`,
                    key: m.key,
                }
            })
            let msg = {
                "document": {
                    "url": sgc
                },
                "mimetype": global.dpdf,
                "fileName": "2021-2024",
                "fileLength": global.fsizedoc,
                "pageCount": 2024,
                "contextInfo": {
                    "externalAdReply": {
                        "mediaUrl": sgc,
                        "mediaType": 1,
                        "renderLargerThumbnail": true,
                        "previewType": 2,
                        "title": `  R  -  B  O  T  `,
                        "body": me,
                        "thumbnailUrl": thumbs,
                        "sourceUrl": sgc
                    }
                },
                "caption": text.trim(),
            }
            await conn.sendMessage(m.chat, msg, {
                quoted: m
            })
        } else if (conn.temamenu.id === 3) {
            conn.sendMessage(m.chat, {
                text: text.trim(),
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "Click Here",
                        newsletterJid: idch,
                    },
                    externalAdReply: {
                        title: `R-BOT Assistand`,
                        body: '',
                        thumbnailUrl: thumbs,
                        sourceUrl: '',
                        mediaType: 1,
                        renderLargerThumbnail: false
                    }
                }
            }, {
                quoted: m
            })
        } else if (conn.temamenu.id === 4) {
            var msg = generateWAMessageFromContent(
                m.chat, {
                    interactiveMessage: {
                        body: {
                            text: text.trim()
                        },
                        footer: {
                            text: me
                        },
                        header: {
                            title: '',
                            hasMediaAttachment: false
                        },
                        nativeFlowMessage: {
                            buttons: [{
                                text: ""
                            }]
                        }
                    },
                }, {
                    quoted: m
                }
            );
            await conn.relayMessage(m.chat, msg.message, m)
        } else if (conn.temamenu.id === 5) {
            await conn.sendMessage(m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        thumbnailUrl: thumbs,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            })
        } else if (conn.temamenu.id === 6) {
            let msg = {
                "document": {
                    "url": sgc
                },
                "mimetype": global.dpdf,
                "fileName": "2021-2024",
                "fileLength": global.fsizedoc,
                "pageCount": 2024,
                "contextInfo": {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "Click Here",
                        newsletterJid: idch,
                    },
                    "externalAdReply": {
                        "mediaUrl": sgc,
                        "mediaType": 1,
                        "renderLargerThumbnail": false,
                        "previewType": 2,
                        "title": wm,
                        "body": me,
                        "thumbnailUrl": thumbs,
                        "sourceUrl": me
                    }
                },
                "caption": text.trim(),
            }
            await conn.sendMessage(m.chat, msg, {
                quoted: m
            })
        } else if (conn.temamenu.id === 7) {
            await conn.sendMessage(m.chat, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: me,
                        body: '',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumbs,
                        sourceUrl: sgc,
                    }
                },
                text: text.trim()
            }, {
                quoted: m
            })
        } else if (conn.temamenu.id === 8) {
            await conn.sendButtonCta(m.chat, [
                [text.trim(), wm, thumbs, [
                    ["Creator 👤", ".owner"],
                    ["Souce Code 🗂️", ".sc"]
                ], null, [], null]
            ], m, {
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            });
        } else if (conn.temamenu.id === 9) {
            await conn.sendMessage(m.chat, {
                text: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: namebot,
                        thumbnailUrl: thumbs
                    }
                }
            }, {
                quoted: m
            })
        } else if (conn.temamenu.id === 10) {
            const {
                createCanvas,
                loadImage
            } = require('canvas');
            const {
                upload
            } = await import('../lib/uploadMedia.js');

            // Ukuran namecard
            const width = 700;
            const height = 400;

            // Data namecard
            const data = {
                name: nams,
                title: namebot,
                level: level,
                status: prems,
                limit: limit // Jumlah limit, misalnya "50/100"
            };

            // Membuat kanvas
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            // Background pemandangan dengan gradien
            const background = await loadImage(bgmenu); // Ganti dengan URL gambar pemandangan
            ctx.drawImage(background, 0, 0, width, height);

            // Gradient overlay untuk efek elegan
            const gradientOverlay = ctx.createLinearGradient(0, 0, width, height);
            gradientOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.4)'); // Transparan hitam lebih gelap
            gradientOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.2)'); // Transparan hitam lebih ringan
            ctx.fillStyle = gradientOverlay;
            ctx.fillRect(0, 0, width, height);

            // Border elegan dengan bayangan halus
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 12;
            ctx.strokeRect(25, 25, width - 50, height - 50);
            ctx.shadowBlur = 0;

            // Garis pembatas horizontal di tengah kartu dengan efek 3D
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 4;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(40, height / 2);
            ctx.lineTo(width - 40, height / 2);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Menambahkan teks dengan font elegan dan bayangan
            ctx.fillStyle = '#ffffff'; // Warna putih untuk nama
            ctx.font = 'bold 45px "Small Caps", Serif'; // Menggunakan font Small Caps
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 8;
            const nameText = ctx.measureText(data.name);
            ctx.fillText(data.name, (width - nameText.width) / 2, 110);

            ctx.font = 'italic 30px "Small Caps", Serif';
            const titleText = ctx.measureText(data.title);
            ctx.fillText(data.title, (width - titleText.width) / 2, 160);

            // Menambahkan informasi level, status, dan jumlah limit dengan desain yang menarik
            ctx.font = '20px "Small Caps", Sans-Serif';
            ctx.fillStyle = '#cccccc'; // Warna abu-abu untuk level
            const levelText = ctx.measureText(`Level: ${data.level}`);
            ctx.fillText(`Level: ${data.level}`, (width - levelText.width) / 2, height - 80);

            ctx.font = '20px "Small Caps", Sans-Serif';
            ctx.fillStyle = data.status === 'Premium' ? '#cccccc' : '#999999'; // Warna abu-abu untuk status
            const statusText = ctx.measureText(`Status: ${data.status}`);
            ctx.fillText(`Status: ${data.status}`, (width - statusText.width) / 2, height - 50);

            // Menambahkan informasi limit dengan efek bayangan yang lebih jelas
            ctx.font = 'bold 28px "Small Caps", Sans-Serif'; // Ukuran font untuk limit
            ctx.fillStyle = '#cccccc'; // Warna abu-abu untuk limit
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'; // Warna bayangan lebih gelap
            ctx.shadowBlur = 12; // Blur bayangan yang lebih besar
            const limitText = ctx.measureText(`Limit: ${data.limit}`);
            ctx.fillText(`Limit: ${data.limit}`, (width - limitText.width) / 2, height / 2 + 50);

            // Menyimpan dan mengunggah gambar
            const buffer = canvas.toBuffer('image/png');
            const link = await upload(buffer);

            // Pastikan text adalah string sebelum diproses lebih lanjut
            let textt = text.trim(); // Define the text, you can set the desired value
            if (typeof text !== 'string') {
                textt = String(text); // Pastikan text adalah string
            }

            const img = link.url;
            await conn.sendMessage(m.chat, {
                image: {
                    url: img
                },
                caption: text.trim() // Pastikan text.trim() adalah string
            }, {
                quoted: m
            });

        }
    } catch (e) {
        m.reply('An error occurred')
        m.reply(e)
    }
}
handler.help = ['menu']
handler.tags = ['general']
handler.alias = ['menu', 'help']
handler.command = /^(menu|help|\?)$/i
handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}

const FileSize = (number) => {
    var SI_POSTFIXES = ["B", " KB", " MB", " GB", " TB", " PB", " EB"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if (tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
        formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString()
            .padStart(2, 0))
        .join(':')
}

function ucapan() {
    const time = moment.tz("Asia/Jakarta")
        .format("HH")
    let res = "Selamat Pagi!"
    if (time >= 4) {
        res = "Selamat Pagi!"
    }
    if (time >= 10) {
        res = "Selamat Siang!"
    }
    if (time >= 15) {
        res = "Selamat Sore!"
    }
    if (time >= 18) {
        res = "Selamat Malam!"
    }
    return res
}

async function getNetworkUploadSpeedd() {
    const options = {
        hostname: 'www.google.com',
        port: 80,
        path: tmpdir(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const fileSizeInBytes = 2000000
    const speed = await test.checkUploadSpeed(options, fileSizeInBytes)
    return speed
}

async function getNetworkDownloadSpeed() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
    const fileSizeInBytes = 500000
    const speed = await test.checkDownloadSpeed(baseUrl, fileSizeInBytes)
    return speed
}