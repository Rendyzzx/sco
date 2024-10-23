import { chromium } from 'playwright';
import cheerio from 'cheerio';

/*
ANGGAP AJA INI WM :V
SCRAPER INI PUNYA YANZBOTZ
DON'T CLAIM OKEY
*/

async function isou(message) {
  return new Promise(async (resolve, reject) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3191.0 Safari/537.36',
    });

    const page = await context.newPage();

    await page.goto("https://isou.chat/");
    await page.fill('.t-input__inner[placeholder="Ask a question."]', message);
    await page.click('.t-button--variant-base.t-button--theme-primary.t-button--shape-round.t-button--icon-only');
    await page.waitForTimeout(10000);
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    
    const html = await page.content();
    const $ = cheerio.load(html);

    const result = {
      answer: '',
      related: [],
      sources: []
    };

    let answers = [];
    $('.markdown-body p').each((index, element) => {
      answers.push($(element).text().trim());
    });
    result.answer = answers.join('\n');

    $('.grid .cursor-pointer').each((index, element) => {
      result.related.push($(element).text().trim());
    });

    $('.leading-5').each((index, element) => {
      const sourceTitle = $(element).find('div.truncate').first().text().trim();
      const sourceLink = $(element).find('a').attr('href');
      result.sources.push({ title: sourceTitle, link: sourceLink });
    });
    resolve(result);
    await browser.close();
  });
};

export { isou }

/*
cara penggunaan 
exports.isou("Apa itu gravitasi?")
*/