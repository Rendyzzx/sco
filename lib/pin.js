import axios from "axios"
import cheerio from "cheerio"

// Error handling with descriptive messages
async function pindl(url) {
  try {
    const response = await axios.post(`https://www.expertsphp.com/facebook-video-downloader.php`, {
      url, // Directly pass the URL as data
    }, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
        "cookie": "__gads=ID=a826d8f71f32cdce-228526c6c4d30038:T=1656127044:RT=1656127044:S=ALNI_Mbc0q65XMPrQjf8pqxKtg_DfBEnNw; __gpi=UID=0000068f7e0217a6:T=1656127044:RT=1656334216:S=ALNI_MYDy-jLWlGuI8I9ZeSAgcTfDaJohQ; _gid=GA1.2.1776710921.1656334217; _gat_gtag_UA_120752274_1=1; _ga_D1XX1R246W=GS1.1.1656354473.4.1.1656354584.0; _ga=GA1.2.136312705.1656127045"
      },
    });

    const $ = cheerio.load(response.data);
    const results = [];

    // Extract data from each table row
    $('#showdata > div:nth-child(4) > table > tbody > tr ').each((index, element) => {
      const result = {
        status: 200, // Assuming all responses are successful
        quality: $(element).find('> td:nth-child(2) > strong').text().trim(),
        format: $(element).find('> td:nth-child(3) > strong').text().trim(),
        url: $(element).find('> td:nth-child(1) > a').attr('href'),
      };

      if (result.url) { // Handle potential missing URLs
        results.push(result);
      } else {
        console.warn(`Skipping invalid URL at index ${index}`);
      }
    });

    return results;
  } catch (error) {
    throw new Error(`Error fetching Pinterest download links: ${error.message}`); // Rethrow with clear message
  }
}

export { pindl }

//module.exports = { Getongoing, Getdownload, Getdetail, Getsearch }