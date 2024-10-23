import axios from 'axios';
import cheerio from 'cheerio';

async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Could not fetch HTML from ${url}: ${error}`);
  }
}

function extractMovies(html) {
  const $ = cheerio.load(html);
  const results = [];

  $('.col-3 .movie').each((index, element) => {
    const movieTitle = $(element).find('.movie-desc h4').text().trim();
    const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src');
    const moviePoster = $(element).find('.movie-poster img').attr('src');
    const movieLink = $(element).find('a').attr('href');

    const data = {
      title: movieTitle,
      label: movieLabel,
      poster: moviePoster,
      link: movieLink
    };

    results.push(data);
  });

  return results;
}

async function cinema() {
  const url = 'https://21cineplex.com/';

  try {
    const html = await fetchHTML(url);
    const movies = extractMovies(html);
    return movies;
  } catch (error) {
    console.error(error.message);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}

export { cinema }