import axios from 'axios' 
import cheerio from 'cheerio'

async function randomBokep() {
  return new Promise(async (resolve, reject) => {
    try {
      const randPage = Math.floor(Math.random() * 4) + 1;
      const getData = await axios.get(`https://www.lensa69.com/category/video-bokep/page/${randPage}`);
      const $ = cheerio.load(getData.data);
      let resultt = [];
      $(".item").each(function (aa, bb) {
        resultt[aa] = {
          title: $(this).find("a > .image > img").attr("alt"),
          thumb: $(this).find("a > .image > img").attr("src"),
          url: $(this).find("a").attr("href"),
          views: $(this).find(".total-views").text().trim(),
        };
      });
      const filResult = resultt.filter((F) => F != undefined);
      const randResult = filResult[Math.floor(Math.random() * filResult.length)];
      let final = await axios.get(randResult.url);
      const $$ = cheerio.load(final.data);
      const urlLoad = $$(".movieplay > iframe").attr("src");
      const result = {
        title: randResult.title,
        thumb: randResult.thumb,
        views: `${randResult.views} views`,
        url: urlLoad,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
  }
  
export { randomBokep }