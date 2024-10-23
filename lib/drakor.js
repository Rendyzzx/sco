import cheerio from 'cheerio';
import fetch from 'node-fetch';

async function drakor(query) {
  try {
    const response = await fetch('https://drakorasia.us?s=' + query + '&post_type=post');
    const html = await response.text();
    const $ = cheerio.load(html);

    const extractedData = $('.post.archive').map((index, element) => {
      const title = $(element).find('h2 a').text().trim();
      const link = $(element).find('h2 a').attr('href');
      const image = $(element).find('img').attr('src');
      const categories = $(element).find('.genrenya span[rel="tag"]').map((index, el) => $(el).text()).get();
      const year = $(element).find('.category a[rel="tag"]').first().text().trim();
      const episodes = $(element).find('.category').contents().filter((index, el) => el.nodeType === 3).text().trim();

      return {
        title,
        link,
        image,
        categories,
        year,
        episodes,
      };
    }).get();

    return extractedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { drakor };