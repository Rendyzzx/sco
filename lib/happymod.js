import axios from 'axios';
import cheerio from 'cheerio';

function happymod(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.happymod.com/search.html?q=${query}`).then(async tod => {
            const $ = cheerio.load(tod.data)
            let hasil = []
            $("div.pdt-app-box").each(function(c, d) {
                let name = $(d).find("a").text().trim();
                let icon = $(d).find("img.lazy").attr('data-original');
                let link = $(d).find("a").attr('href');
                let link2 = `https://www.happymod.com${link}`
                const Data = {
                    icon: icon,
                    name: name,
                    link: link2
                }
                hasil.push(Data)
            })
            resolve(hasil);
        }).catch(reject)
    });
}

async function happymoddl(link) {
    try {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);

        // Extract information
        const title = $('body > div > div.container-left > section:nth-child(1) > div > h1').text();
        const info = $('body > div > div.container-left > section:nth-child(1) > div > ul').text().replace(/\t|- /g, '');

        // Collect download links and titles
        const jlinks = [];
        const downloadLinks = [];
        $('body > div.container-row.clearfix.container-wrap.pdt-font-container > div.container-left > section:nth-child(1) > div > div:nth-child(3) > div > p > a').each((index, element) => {
            const jlink = $(element).text();
            const dlLink = $(element).attr('href');
            jlinks.push(jlink);
            downloadLinks.push(dlLink.startsWith('/') ? `https://happymod.com${dlLink}` : dlLink);
        });

        // Prepare the result object
        const result = {
            creator: 'Kayla Bot',
            title: title,
            info: info,
            download: downloadLinks,
        };

        return result;
    } catch (error) {
        throw error; // Rethrow for proper handling
    }
}

export {
    happymod,
    happymoddl
}