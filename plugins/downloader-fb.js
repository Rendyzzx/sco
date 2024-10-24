import fetch from "node-fetch";
import {
  facebook
} from "@xct007/frieren-scraper";
import {
  facebookdl
} from "@bochilteam/scraper";
import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  flaaa.getRandom();
  let ends = ["v1", "v2", "v3", "v4"],
    [links, version, quality] = text.split(" ");
  const msgg = `Input query!\n*Example:*\n*- ${usedPrefix + command}* link v1 sd/hd\n*- ${usedPrefix + command}* link v2 sd/hd\n*- ${usedPrefix + command}* link v3 sd/hd`;
  if (version = version || ends.getRandom(), quality = quality || ["hd", "sd"].getRandom(), !(links && version && quality)) return await conn.reply(m.chat, msgg, m);
  if (ends.includes(version)) {
    if ("v1" === version.toLowerCase()) try {
      let results = await facebook.v1(links);
      if (!quality) return await conn.reply(m.chat, msgg, m);
      let out, caption = me
      "hd" === quality && (out = results.urls[0]?.hd ? results.urls[0]?.hd : results.urls[1].sd ? results.urls[1].sd : giflogo), "sd" === quality && (out = results.urls[1].sd ? results.urls[1].sd : results.urls[0]?.hd ? results.urls[0]?.hd : giflogo),
        m.react(waits), await conn.sendFile(m.chat, out, "", caption, m);
    } catch (e) {
      m.react(eror);
    }
    if ("v2" === version.toLowerCase()) try {
      let results = await FbDownload(links);
      if (!quality) return await conn.reply(m.chat, msgg, m);
      let out, caption = me
      "hd" === quality && (out = results.links["Download High Quality"] ? results.links["Download High Quality"] : results.links["Download Low Quality"] ? results.links["Download Low Quality"] : giflogo), "sd" === quality && (out = results.links["Download Low Quality"] ? results.links["Download Low Quality"] : results.links["Download High Quality"] ? results.links["Download High Quality"] : giflogo),
        m.react(waits), await conn.sendFile(m.chat, out, "", caption, m);
    } catch (e) {
      m.react(eror);
    }
    if ("v3" === version.toLowerCase()) try {
      if (!quality) return await conn.reply(m.chat, msgg, m);
      const {
        result
      } = await facebookdl(links), results = result;
      let out, caption = me
      "hd" === quality.toLowerCase() && (out = results.find(video => "hd" === video.quality) ? results.find(video => "hd" === video.quality) : results.find(video => "sd" === video.quality) ? results.find(video => "sd" === video.quality) : giflogo), "sd" === quality.toLowerCase() && (out = results.find(video => "sd" === video.quality) ? results.find(video => "sd" === video.quality) : results.find(video => "hd" === video.quality) ? results.find(video => "hd" === video.quality) : giflogo),
        m.react(waits), await conn.sendFile(m.chat, out, "", caption, m);
    } catch (e) {
      m.react(eror);
    }
    if ("v4" === version.toLowerCase()) try {
      let results = await facebookVideo(links);
      if (!quality) return await conn.reply(m.chat, msgg, m);
      let out, caption = me
      "hd" === quality && (out = results.result[0]?.url ? results.result[0]?.url : results.result[1].url ? results.result[1].url : giflogo), "sd" === quality && (out = results.result[1].url ? results.result[1].url : results.result[0]?.url ? results.result[0]?.url : giflogo),
        m.react(waits), await conn.sendFile(m.chat, out, "", caption, m);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["facebook"], handler.tags = ["downloader"], handler.alias = ["fb", "fbdl", "facebook", "facebookdl"],
  handler.command = /^((facebook|fb)(dl)?)$/i;
export default handler;
async function FbDownload(vid_url) {
  try {
    const data = {
        url: vid_url
      },
      searchParams = new URLSearchParams();
    searchParams.append("url", data.url);
    const response = await fetch("https://facebook-video-downloader.fly.dev/app/main.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: searchParams.toString()
    });
    return await response.json();
  } catch (e) {
    return null;
  }
}
const baseURL = "https://fdownloader.net/id",
  apiURL = "https://v3.fdownloader.net/api/ajaxSearch?lang=en",
  facebookVideo = async url => {
    try {
      const {
        data
      } = await axios(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0"
        },
        data: new URLSearchParams(Object.entries({
          recaptchaToken: "",
          q: url,
          t: "media",
          lang: "en"
        }))
      }), script = cheerio.load(data)("body").find("script").text().trim(), k_token = script.split("k_token = ")[1].split(";")[0], k_exp = script.split("k_exp = ")[1].split(";")[0], {
        data: apiData
      } = await axios(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0"
        },
        data: new URLSearchParams(Object.entries({
          k_exp: k_exp,
          k_token: k_token,
          q: url,
          lang: "en",
          web: "fdownloader.net",
          v: "v2",
          w: ""
        }))
      }), $api = cheerio.load(apiData.data), result = [], duration = $api("div.clearfix > p").text().trim();
      return $api("div.tab__content").find("tbody > tr").each((index, element) => {
        const quality = $api(element).find("td.video-quality").text(),
          videoUrl = $api(element).find("td > a").attr("href");
        quality && videoUrl && result.push({
          quality: quality,
          url: videoUrl
        });
      }), {
        duration: duration,
        result: result
      };
    } catch (error) {
      throw console.log(error), error;
    }
  };