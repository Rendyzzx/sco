import axios from "axios"
import cheerio from "cheerio"

async function search(page = 1) {
  try {
    let { data } = await axios(`https://mcpedl.org/downloading/page/${page}`)
    let $ = cheerio.load(data)

    let result = []
    $("article.tease.tease-post > section.entry-header-category").each(function() {
      let $$ = $(this)
      let obj = {}
      obj.thumbnail = $$.find("a.post-thumbnail > picture > img").attr("data-src")
      obj.title = $$.find("h2.entry-title").text().trim()
      obj.id = $$.find("h2.entry-title > a").attr("href").split("/").at(-2)
      result.push(obj)
    })

    return result
  } catch(err) {
    if(err?.response?.status == 404) return {
      error: true,
      message: "Page Not Found"
    }
    throw err
  }
}

async function get(id) {
  try {
    let { data } = await axios(`https://mcpedl.org/${id}`)
    let $ = cheerio.load(data)

    let __dl = (await axios("https://mcpedl.org/dw_file.php?id=" + $("#download-link > table > tbody > tr > td > a").attr("href").split("/").at(-1))).data
    let _dl = cheerio.load(__dl)
    let dl = _dl("a").attr("href")

    let result = {}
    result.url = dl
    result.version = $($("#download-link > table > tbody > tr > td")[0]).text()
    result.size = $($(".entry-footer > .entry-footer-wrapper > .entry-footer-column > .entry-footer-content > span").get(-1)).text()

    return result
  } catch(err) {
    if(err?.response?.status == 404) return {
      error: true,
      message: "Page Not Found"
    }
    throw err
  }
}

export {
  search,
  get
}