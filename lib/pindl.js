import axios from 'axios'
import cheerio from 'cheerio'

async function pindl(url) {
  try {
    const response = await axios.get(`https://www.savepin.app/download.php?url=${encodeURIComponent(url)}&lang=en&type=redirect`);

    const $ = cheerio.load(response.data);

    const thumbUrl = $('figure.media-left img').attr('src');
    const title = $('div.media-content strong').text().trim() || 'No title available';

    const details = [];

    $('tbody tr').each((i, element) => {
      const quality = $(element).find('td').eq(0).text().trim();
      const format = $(element).find('td').eq(1).text().trim().toLowerCase();
      const url = 'https://www.savepin.app/' + $(element).find('a').attr('href');

      if (format === 'jpg' || format === 'png' || format === 'jpeg') {
        details.push({
          image: {
            url,
            quality
          }
        });
      } else if (format === 'mp4') {
        details.push({
          video: {
            url,
            quality
          }
        });
      }
    });

    if (!thumbUrl || details.length === 0) {
      throw new Error('Unable to retrieve all required data.');
    }

    return JSON.stringify({
      title,
      thumb: thumbUrl,
      details
    }, null, 2);
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
}

export { pindl }
// By 
// Mas miftah