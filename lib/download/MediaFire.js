import * as cheerio from "cheerio";
import got from "got";
import fetch from "node-fetch";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";

async function mediafireDl(url) {
  try {
    const res = await fetch(url),
      $ = cheerio.load(await res.text()),
      link = $("a#downloadButton").attr("href"),
      [nama, mime, size] = [link.split("/").pop().trim(), link.split(".").pop().trim(), $("a#downloadButton").text().replace(/Download|\(|\)|\n|\s+/g, "").trim()];
    return [{
      nama: nama,
      mime: mime,
      size: size,
      link: link
    }];
  } catch (error) {
    throw console.error(error), new Error("Error Gan");
  }
}
async function mediafireDl2(url) {
  try {
    var _a, _b;
    if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) throw new Error("Invalid URL: " + url);
    const data = await (await fetch(url)).text(),
      $ = cheerio.load(data),
      Url = ($("#downloadButton").attr("href") || "").trim(),
      url2 = ($("#download_link > a.retry").attr("href") || "").trim(),
      $intro = $("div.dl-info > div.intro"),
      filename = $intro.find("div.filename").text().trim(),
      filetype = $intro.find("div.filetype > span").eq(0).text().trim(),
      ext = (null === (_b = null === (_a = /\(\.(.*?)\)/.exec($intro.find("div.filetype > span").eq(1).text())) || void 0 === _a ? void 0 : _a[1]) || void 0 === _b ? void 0 : _b.trim()) || "bin",
      $li = $("div.dl-info > ul.details > li"),
      aploud = $li.eq(1).find("span").text().trim(),
      filesizeH = $li.eq(0).find("span").text().trim();
    return {
      link: Url,
      url2: url2,
      nama: filename,
      filetype: filetype,
      mime: ext,
      aploud: aploud,
      size: filesizeH,
      filesize: parseFloat(filesizeH) * (/GB/i.test(filesizeH) ? 1e6 : /MB/i.test(filesizeH) ? 1e3 : /KB/i.test(filesizeH) ? 1 : /B/i.test(filesizeH) ? .1 : 0)
    };
  } catch (error) {
    throw console.error(error), new Error("Error Gan");
  }
}
async function mediafiredl(url) {
  const data = await got(url).text();
  const $ = cheerio.load(data);
  const downloadUrl = ($("#downloadButton").attr("href") || "").trim();
  const alternativeUrl = ($("#download_link > a.retry").attr("href") || "").trim();
  const $intro = $("div.dl-info > div.intro");
  const filename = $intro.find("div.filename").text().trim();
  const filetype = $intro.find("div.filetype > span").eq(0).text().trim();
  const ext = /\(\.(.*?)\)/.exec($intro.find("div.filetype > span").eq(1).text())?.[1]?.trim() || "bin";
  const uploaded = $("div.dl-info > ul.details > li").eq(1).find("span").text().trim();
  const filesize = $("div.dl-info > ul.details > li").eq(0).find("span").text().trim();
  return {
    url: downloadUrl || alternativeUrl,
    alternativeUrl: alternativeUrl,
    filename: filename,
    filetype: filetype,
    ext: ext,
    uploaded: uploaded,
    filesize: filesize
  };
}

export { mediafiredl, mediafireDl2, mediafireDl }