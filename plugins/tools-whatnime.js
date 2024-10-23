var { upload } = await import("../lib/uploadMedia.js")
import fetch from "node-fetch";
import * as fs from "fs";
const fetchAnimeInfo = async url => (await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`)).json(), handler = async (m, {
  conn,
  usedPrefix
}) => {
  const q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw "Fotonya?";
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
  const img = await q?.download(),
    upld = await upload(img);
  m.react(waits);
  try {
    const json = await fetchAnimeInfo(upld.url),
      {
        title,
        synonyms,
        isAdult
      } = json.result[0]?.anilist,
      {
        episode,
        similarity,
        image
      } = json.result[0],
      result = `*Title :* ${title.romaji} (${title.native})\n*Synonyms :* ${synonyms.join(", ")}\n*Adult :* ${isAdult}\n*Similarity :* ${(100 * similarity).toFixed(1)}%\n*Episode :* ${episode}`;
    await conn.sendFile(m.chat, image, "wait.jpg", result, m);
  } catch (e) {
    throw "Error: Could not retrieve anime information.";
  }
};
handler.help = ["whatanime"], handler.tags = ["tools"], handler.command = /^(wait|whatanime|source)$/i,
  handler.limit = !0;
export default handler;