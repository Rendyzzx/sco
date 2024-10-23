import axios from 'axios';
import cheerio from 'cheerio';

// Error handling with descriptive messages
async function tiktoksearch(query) {
  try {
    const searchResponse = await axios.get(`https://brainans.com/search?query=${query}`);
    const $ = cheerio.load(searchResponse.data);

    // Extract user link
    const userLink = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href');

    if (!userLink) {
      throw new Error(`No user found for query "${query}"`);
    }

    const userResponse = await axios.get(`https://brainans.com/${userLink}`);
    const $$ = cheerio.load(userResponse.data);

    // Extract video link collection
    const videoLinks = [];
    $$('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a').each((index, element) => {
      videoLinks.push(`https://brainans.com/${$$(element).attr('href')}`);
    });

    // Randomly select a video link
    const randomVideoLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];

    const videoResponse = await axios.get(randomVideoLink);
    const $$$ = cheerio.load(videoResponse.data);

    // Extract video details
    const result = {
      username: $$$('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text().trim(),
      caption: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__list').text().trim(),
      like_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text().trim(),
      comment_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(2) > span').text().trim(),
      share_count: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.content__btns.d-flex > div:nth-child(3) > span').text().trim(),
      videourl: $$$('#card-page > div > div.row > div > div > div.main__info.mb-4 > div.main__image-container > div > video').attr('src').trim(),
    };

    return result;
  } catch (error) {
    throw new Error(`Error fetching random video details: ${error.message}`);
  }
}

export { tiktoksearch }