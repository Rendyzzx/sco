import {
  Sticker
} from "wa-sticker-formatter";
const {
  ttp,
  raterian,
  attp
} = await import("../lib/maker/text2picture.js");
const handler = async (m, {
  conn,
  q,
  usedPrefix,
  command
}) => {
  try {
    m.react(waits);
    var res = await ttp(q)
    var img = res[0].url
    var stiker = await _createSticker(img, !1, packname, author, 30);
    m.reply(stiker)
    } catch (error) {
    console.error(error);
    m.reply(eror);
  }
};
handler.help = handler.command = ["ttp"];
handler.tags = ["general"];
handler.limit = true;
export default handler;

async function _createSticker(img, url, packName, authorName, quality = 30) {
  try {
    return new Sticker(img || url, {
      type: "full",
      pack: packName,
      author: authorName,
      quality: quality
    }).toBuffer();
  } catch (error) {
    console.error("Error:", error);
  }
}