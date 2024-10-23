/*import axios from "axios"
import cheerio from "cheerio"
const Base_url = "https://220.158.234.46/"

function Getongoing () {
const res = await axios.get(`${Base_url}page/1`)
const $ = cheerio.load(res.data)
const arrays = []
  $("div.putih.updateanime > ul > li").each(function () {
        const title = $(this).find("div.dtl > h2 > a").text().trim()
        const posted_by = $(this).find("div.dtl > span:nth-child(2)").text().trim().replace("Posted by: ", "")
        const released_on = $(this).find("div.dtl > span:nth-child(3)").text().trim().replace("Released on: ", "")
        const thumb = $(this).find("div.thumb > a > img").attr("src")
        const link = $(this).find("div.dtl > h2 > a").attr("href")
        arrays.push({title, posted_by, released_on, thumb, link})
  })
return arrays
}

function Getdownload(urls) {
const res = await axios.get(urls)
const $ = cheerio.load(res.data)
  const anime_object = { 
     title: "",
     data: {},
     thumb: "",
     stream_list: []
  }
  const title = $("div.putih:nth-child(2) > div.pad_content > div.dtlx > h1").text().trim()
  anime_object.title = title
  const thumb = $("div.putih:nth-child(3) > div.detail > div.thumb > img").attr("src")
  anime_object.thumb = thumb

  $("div.putih:nth-child(3) > div.detail > div.dtl > span").each((idx, el) => {
  let str = ($(el).find('b').text() || 'synopsis').trim()
  anime_object.data[str.toLowerCase()] = $(el).text().replace(`${str} : `, '')
  })
  
  const Getstream = () => {
     const array = []
     const arrays = []
     $("div.content_episode > div.mirror-server > ul > li").each(function () {
        const mirror = $(this).find("a").attr("href")
        const type = $(this).find("a").text().trim()
        array.push({mirror, type})
     })     
     for (let i of array) {
        const res = await axios.get(urls + i.mirror)
        const _$ = cheerio.load(res.data)
        const link = _$("div.content_episode > div.player > iframe").attr("src")
        arrays.push({type: i.type, link})
     }
     return arrays
  }
  anime_object.stream_list = await Getstream()
return anime_object  
}

function Getdetail(urls) {
const res = await axios.get(urls)
const $ = cheerio.load(res.data)
  const anime_object = { 
     title: "",
     data: {},
     thumb: "", 
     sinopsis: "",
     download_list: [],
     episode_list: []
  }
  const embed = []
  const title = $("div.area > div:nth-child(1) > div.bigcontent > div.infox > h1").text().trim()
  anime_object.title = title
  const thumb = $("div.area > div:nth-child(1) > div.bigcontent > div.thumbss > img").attr("src")
  anime_object.thumb = thumb
  const sinopsis = $("div.area > div:nth-child(2) > div.lead > div.desc > div > p").text().trim()
  anime_object.sinopsis = sinopsis
  
  // Terimakasih kepada arip sepuh yang terhormat 
  $('div.area > div:nth-child(1) > div.spe > span').each(function () {
      const str = $(this).find('b').text()
      anime_object.data[str.split(' :')[0].toLowerCase().replace(/ /g, '_')] = $(this).text().replace(str, '').trim()
  })
  
  $("div.area > div:nth-child(3) > div.episodelist > div.download > div.ddl-list").each(function () {
       const title = $(this).find("span.title").text()
       const embed = $(this).find("a").get().map(v => {
             const host = $(v).text().trim()
             const link = $(v).attr("href")
             return {host, link}
       })
       anime_object.download_list.push({title, embed})
  })
  
  $("div.area > div:nth-child(4) > div.episodelist > ul > li").each(function () {
       const title = $(this).find("span.watch > a").text().trim()
       const date = $(this).find("span.rightoff").text().trim()
       const link = $(this).find("span.watch > a").attr("href")
  anime_object.episode_list.push({title, date, link})
  })
return anime_object
}

function Getsearch(query) {
const res = await axios.get(`${Base_url}?s=${query}`)
const $ = cheerio.load(res.data), array = []
               $("div.arcpad > ul > div").each(function () {
                     const title = $(this).find("div.bsx > a").attr("alt")
                     const type = $(this).find("div.bsx > a > div.limit > span").text().trim()
                     const rating = $(this).find("div.bsx > a > div.bigor > div.adds > div.rating > i").text().trim()
                     const image = $(this).find("div.bsx > a > div.limit > img").attr("src")
                     const link = $(this).find("div.bsx > a").attr("href")
                     array.push({ title: title, type: type, rating: rating, image: image, link: link })
                })
return array                
}
export { Getongoing, Getdownload, Getdetail, Getsearch }*/

//module.exports = { Getongoing, Getdownload, Getdetail, Getsearch }