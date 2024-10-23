import { sticker } from '../lib/sticker.js';
import axios from "axios";
import uploadFile from "../lib/uploadFile.js";
import _ from "lodash";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    const q = m.quoted || m;
    const match = q?.mimetype?.match(/^(image|video|webp)\//);
    const mediaUrl = match ? await uploadFile(await q?.download()) : "https://pomf2.lain.la/f/jkod2drv.png";
    const senderId = parseInt(m.sender.split("@")[0]);
    const senderName = m.name || await conn.getName(m.sender);
    const senderPhotoUrl = await conn.profilePictureUrl(m.sender, "image").catch(() => "https://pomf2.lain.la/f/jkod2drv.png");
    m.react(waits)
    const replyMessage = q !== m ? {
      entities: [],
      avatar: true,
      id: parseInt(q.sender.split("@")[0]),
      name: q.name || await conn.getName(q.sender),
      photo: {
        url: await conn.profilePictureUrl(q.sender, "image").catch(() => "https://pomf2.lain.la/f/jkod2drv.png")
      },
      text: q.text || q.caption || q.description || q.message?.documentMessage?.caption || ""
    } : null;
    const messageText = text || q?.text || q?.caption || q?.description || q?.message?.documentMessage?.caption || m.text || m.caption || m.message?.documentMessage?.caption || "";
    const json = {
      type: "quote",
      format: "png",
      backgroundColor: "#273443",
      width: 512,
      height: 768,
      scale: 2,
      messages: [_.omitBy({
        entities: [],
        avatar: true,
        from: {
          id: senderId,
          name: senderName,
          photo: {
            url: await conn.profilePictureUrl(m.sender, 'image').catch(_ => "https://telegra.ph/file/320b066dc81928b782c7b.png") 
          }
        },
        text: messageText,
        replyMessage: replyMessage || undefined,
        media: match ? {
          url: `https://wsrv.nl/?url=${encodeURIComponent(mediaUrl)}&output=png`
        } : undefined
      }, _.isUndefined)]
    };
    const buffer = await Quotly(json);
    if (!buffer) return m.reply("Error generating quote image.");
    const stickerBuffer = await sticker(buffer, false, global.stickpack, global.stickauth);
    if (!stickerBuffer) return m.reply('Error creating sticker.');
    m.react(done)
    await conn.sendFile(m.chat, stickerBuffer, 'Quotly.webp', '', m);
    //await conn.sendFile(m.chat, buffer, "Quotly.webp", "", m);
  } catch (error) {
    console.error("Handler Error:", error);
    m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["qc"];
handler.tags = ["general"];
handler.command = /^(qc)$/i;
export default handler;
async function Quotly(data) {
  try {
    const response = await axios.post("https://bot.lyo.su/quote/generate", data, {
      headers: {
        "content-type": "application/json"
      }
    });
    return Buffer.from(response.data?.result?.image, "base64");
  } catch (error) {
    console.error("Quotly Error:", error);
    try {
      const fallbackResponse = await axios.get(`https://widipe.com/quotely`, {
        params: {
          avatar: data.messages[0]?.from.photo.url,
          name: data.messages[0]?.from.name,
          text: data.messages[0]?.text
        },
        responseType: "arraybuffer"
      });
      return Buffer.from(fallbackResponse.data, "base64");
    } catch (fallbackError) {
      console.error("Quotly Error (Backup):", fallbackError);
      return null;
    }
  }
}