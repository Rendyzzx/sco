import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = m => m
handler.all = async function(m) {
    let name = await conn.getName(m.sender)
    let pp = 'https://telegra.ph/file/fc5e41b96c7a809b150c1.png'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) {} finally {

        //global.bg = await (await fetch(img)).buffer()
        global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])

        // Module 
        global.fetch = import('node-fetch')
        global.bochil = import('@bochilteam/scraper')

        const _uptime = process.uptime() * 1000

        // Ini untuk command crator/owner
        global.kontak2 = [
            [owner[0], await this.getName(owner[0] + '@s.whatsapp.net'), 'ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ', 'no@gmail.com', true],
            [owner[1], await this.getName(owner[1] + '@s.whatsapp.net'), 'ᴅᴇᴠᴇʟᴏᴩᴇʀ ʙᴏᴛ', 'rlxfly.uwu@gmail.com', true], // Kalo mau di tambah tinggal copy 1baris ini di tempel di bawahnya trs di edit dikit!
        ]

        // ucapan ini mah
        global.ucapan = ucapan()

        // pesan sementara
        global.ephemeral = null // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''
        let urls = pickRandom(['https://telegra.ph/file/f72f4916858424fb0adf1.jpg', 'https://telegra.ph/file/f72f4916858424fb0adf1.jpg'])
        // externalAdReply atau text with thumbnail. gatau bahasa Inggris? coba translate!
        global.adReply = {
            contextInfo: {
                forwardingScore: 1,
                isForwarded: false, // ini biar ada tulisannya diteruskan berkali-kali, jika ingin di hilangkan ganti true menjadi false
                externalAdReply: { // Bagian ini sesuka kalian berkreasi :'v
                    showAdAttribution: true,
                    title: wm,
                    body: nameown,
                    mediaType: 1,
                    //renderLargerThumbnail : true,
                    thumbnailUrl: thumbs,
                    sourceUrl: swb
                }
            }
        }

        global.adReplyV2 = {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: wm,
                    body: conn.user.nawm,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumbs,
                    sourceUrl: sgc
                }
            }
        }


        global.fakeig = {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaUrl: sig,
                    mediaType: "VIDEO",
                    description: sig,
                    title: wm,
                    body: '',
                    thumbnailUrl: pp,
                    sourceUrl: 'https://www.instagram.com/tv/Cab9X6xB6S0/?igsh=MTJzeml3endkaGRwcQ==' || sig
                }
            }
        }
        // Fake 
        global.ftroli = {
            key: {
                remoteJid: 'status@broadcast',
                participant: '0@s.whatsapp.net'
            },
            message: {
                orderMessage: {
                    itemCount: 9999999999999999999999999999999999999999999999999999999,
                    status: 1,
                    surface: 1,
                    message: wm,
                    orderTitle: wm,
                    sellerJid: '0@s.whatsapp.net'
                }
            }
        }
        global.fkontak = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                'contactMessage': {
                    'displayName': wm,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${me},;;;\nFN:${me},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': fs.readFileSync('./me.png'),
                    thumbnail: fs.readFileSync('./me.png'),
                    sendEphemeral: true
                }
            }
        }
        global.fvn = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "17608914335-1625305606@g.us"
                } : {})
            },
            message: {
                "audioMessage": {
                    "mimetype": "audio/ogg; codecs=opus",
                    "seconds": "999999999999",
                    "ptt": "true"
                }
            }
        }

        global.ftextt = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "17608914335-1625305606@g.us"
                } : {})
            },
            message: {
                "extendedTextMessage": {
                    "text": wm,
                    "title": wm,
                    'jpegThumbnail': fs.readFileSync('./me.png')
                }
            }
        }

        global.fliveLoc = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "status@broadcast"
                } : {})
            },
            message: {
                "liveLocationMessage": {
                    "caption": "Hi",
                    "h": `${me}`,
                    'jpegThumbnail': fs.readFileSync('./me.png')
                }
            }
        }

        global.fliveLoc2 = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "status@broadcast"
                } : {})
            },
            message: {
                "liveLocationMessage": {
                    "title": "Hi There Im Using GitHub",
                    "h": wm,
                    'jpegThumbnail': fs.readFileSync('./me.png')
                }
            }
        }

        global.ftoko = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "17608914335@s.whatsapp.net"
                } : {})
            },
            message: {
                "productMessage": {
                    "product": {
                        "productImage": {
                            "mimetype": "image/jpeg",
                            "jpegThumbnail": fs.readFileSync('./me.png') //Gambarnye
                        },
                        "title": wm, //Kasih namalu 
                        "description": "Simple Bot Esm",
                        "currencyCode": "USD",
                        "priceAmount1000": "20000000",
                        "retailerId": "Ghost",
                        "productImageCount": 1
                    },
                    "businessOwnerJid": `0@s.whatsapp.net`
                }
            }
        }

        global.fdocs = {
            key: {
                participant: '0@s.whatsapp.net'
            },
            message: {
                documentMessage: {
                    title: wm,
                    jpegThumbnail: fs.readFileSync('./me.png')
                }
            }
        }

        global.fgclink = {
            "key": {
                "fromMe": false,
                "participant": "0@s.whatsapp.net",
                "remoteJid": "0@s.whatsapp.net"
            },
            "message": {
                "groupInviteMessage": {
                    "groupJid": "17608914335-1625305606@g.us",
                    "inviteCode": "null",
                    "groupName": "Iyh",
                    "caption": wm,
                    'jpegThumbnail': fs.readFileSync('./me.png')
                }
            }
        }

        global.pee = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                ...(m.chat ? {
                    remoteJid: ""
                } : {})
            },

            'message': {
                "stickerMessage": {
                    "url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
                    "fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
                    "fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
                    "mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
                    "mimetype": "image/webp",
                    "height": 40,
                    "width": 40,
                    "directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
                    "fileLength": "99999999",
                    "mediaKeyTimestamp": "16572901099967",
                    'isAnimated': []
                }
            }
        }
        global.fgif = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: "17608914335-1625305606@g.us"
                } : {})
            },
            message: {
                "videoMessage": {
                    "title": wm,
                    "h": `Hmm`,
                    'seconds': '999999999',
                    'gifPlayback': 'true',
                    'caption': wm,
                    'jpegThumbnail': fs.readFileSync('./me.png')
                }
            }
        }
        //Fakes Random
        let fek = [global.ftroli, global.fkontak, global.fvn, global.fvid, global.ftextt, global.fliveLoc, global.fliveLoc2, global.ftoko, global.fdocs, global.fgclink, global.fgif]

        //Get Random Fake
        global.fake = fek.getRandom()
    }
}

export default handler

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam 🌙"
    if (time >= 4) {
        res = "Selamat pagi 🌄"
    }
    if (time > 10) {
        res = "Selamat siang ☀️"
    }
    if (time >= 15) {
        res = "Selamat sore 🌅"
    }
    if (time >= 18) {
        res = "Selamat malam 🌙"
    }
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}