import axios from "axios";
import fetch from "node-fetch";
import formData from "form-data";
import cheerio from "cheerio";
import crypto from "crypto";

var generateHash = input => crypto.createHash("sha256").update(input).digest("hex")

async function ig(url) {
  try {
    const a = await axios.get("https://116.203.129.92/"),
      csrf = cheerio.load(a.data)('meta[name="csrf-token"]').attr("content"),
      b = await axios.post("https://116.203.129.92/getData", `url=${encodeURIComponent(url)}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
          "X-CSRF-TOKEN": csrf,
          "X-Requested-With": "XMLHttpRequest",
          cookie: a.headers["set-cookie"]
        }
      });
    return b.data.error ? {
      status: !1
    } : {
      status: !0,
      result: b.data
    };
  } catch (error) {
    return {
      status: !1
    };
  }
}
async function saveig(q) {
  try {
    const html = (await axios.post("https://saveig.app/api/ajaxSearch", new URLSearchParams({
        q: q,
        t: "media",
        lang: "id"
      }))).data.data,
      $ = cheerio.load(html),
      medias = $("ul.download-box li").map(((index, element) => {
        const $thumb = $(element).find(".download-items__thumb img"),
          $btn = $(element).find(".download-items__btn a"),
          $options = $(element).find(".photo-option select option"),
          type = $btn.attr("onclick")?.includes("click_download_video") ? "video" : "image";
        return {
          type: type,
          thumb: $thumb.attr("src") || "",
          url: $btn.attr("href")?.replace("&dl=1", "") || "",
          quality: $options.filter(":selected").text() || "",
          options: $options.map(((i, opt) => ({
            type: type,
            url: $(opt).val() || "",
            quality: $(opt).text() || ""
          }))).get()
        };
      })).get();
    return {
      medias: medias
    };
  } catch (error) {
    return console.error("Error fetching Instagram media:", error), {
      error: "Failed to fetch media"
    };
  }
}
async function instagramGetUrl(url_media) {
  try {
    return (await axios.get(`https://api.sssgram.com/st-tik/ins/dl?url=${url_media}&timestamp=${Date.now()}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        Origin: "https://www.sssgram.com",
        Connection: "keep-alive",
        Referer: "https://www.sssgram.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site"
      }
    })).data.result;
  } catch (err) {
    throw err;
  }
}
async function FastDl(link) {
  try {
    const ts = Date.now(),
      _ts = ts - Math.floor(1e6 * Math.random()),
      _tsc = Math.floor(1e6 * Math.random()),
      _s = generateHash(`${link}${ts}${_ts}${_tsc}`),
      { data: data } = await axios.post("https://fastdl.app/api/convert", {
        url: link,
        ts: ts,
        _ts: _ts,
        _tsc: _tsc,
        _s: _s
      }, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });
    return {
      status: 200,
      creator: "David XD",
      result: data
    };
  } catch (error) {
    return console.error(error), {
      status: 500,
      message: "Internal Server Error"
    };
  }
}

export {
    ig,
    FastDl,
    instagramGetUrl,
    saveig
};