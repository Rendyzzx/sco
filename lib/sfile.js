import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";

async function sfileV2search(query, page = 1) {
  try {
    const data = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`);
    const $ = cheerio.load(await data.text());
    const result = $(".list").map((index, element) => {
      const text = $(element).text();
      const name = $(element).find("a").text();
      const link = $(element).find("a").attr("href");
      const size = text.match(/\((.*?)\)/)?.[1] || "";
      return {
        name: name,
        link: link,
        size: size
      };
    }).get().filter(item => item.name);
    return {
      total: result.length,
      result: result
    };
  } catch (error) {
    throw error;
  }
}
async function sfileV2dl(id) {
  try {
    const {
      data
    } = await axios.get(`https://sfile-api.vercel.app/download/${id}`);
    const downloadUrl = data?.data?.url;
    const filename = downloadUrl ? downloadUrl.split("/").pop().split("&")[0] : "unknown";
    return {
      status: true,
      data: {
        date: data?.data?.date,
        total: data?.data?.downloaded,
        result: downloadUrl,
        filename: filename
      }
    };
  } catch (error) {
    throw error;
  }
}
async function sfileV1dl(url) {
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47",
    Referer: url,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
  };
  try {
    const {
      data,
      headers: responseHeaders
    } = await axios.get(url, {
      headers: headers
    });
    const cookies = responseHeaders["set-cookie"]?.map(cookie => cookie.split(";")[0]).join("; ") || "";
    headers.Cookie = cookies;
    const filename = data.match(/<h1 class="intro">(.*?)<\/h1>/s)?.[1] || "unknown";
    const mimetype = data.match(/<div class="list">.*? - (.*?)<\/div>/)?.[1] || "";
    const downloadUrl = data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
    headers.Referer = downloadUrl;
    if (!downloadUrl) return {
      status: false,
      message: "Download URL tidak ditemukan"
    };
    const {
      data: downloadPageData
    } = await axios.get(downloadUrl, {
      headers: headers
    });
    const finalDownloadUrl = downloadPageData.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
    const key = downloadPageData.match(/&k='\+(.*?)';/)?.[1].replace(`'`, "");
    const finalUrl = finalDownloadUrl + (key ? `&k=${key}` : "");
    const filesize = downloadPageData.match(/Download File \((.*?)\)/)?.[1];
    if (!finalUrl) return {
      status: false,
      message: "Download URL tidak ditemukan"
    };
    const {
      data: fileBuffer,
      headers: fileHeaders
    } = await axios.get(finalUrl, {
      responseType: "arraybuffer",
      headers: {
        ...headers,
        Referer: url
      }
    });
    const filenameFinal = fileHeaders["content-disposition"]?.match(/filename=["']?([^"';]+)["']?/)?.[1] || "unknown";
    return {
      status: true,
      data: {
        filename: filenameFinal,
        filesize: filesize,
        mimetype: mimetype || fileHeaders["content-type"],
        buffer: fileBuffer
      }
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      status: false,
      message: err.message || "Kesalahan tidak diketahui"
    };
  }
}
async function sfileV1search(id) {
  try {
    const {
      data
    } = await axios.get(`https://sfile-api.vercel.app/search/${id}`);
    return data?.data;
  } catch (error) {
    throw error;
  }
}

export { sfileV1search, sfileV1dl, sfileV2dl, sfileV2search, }