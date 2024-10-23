import axios from "axios"
import cheerio from "cheerio"
function ongoing(){
	return new Promise((reject,resolve) => {
		axios.get('https://otakudesu.moe/ongoing-anime/').then(({ data}) => {
			const $ = cheerio.load(data)
			const result = [];
			const img = [];
			const epz = [];
			const ne = [];
			const th = [];
			const ep = [];
			const nm =[];
			$('div.detpost').each(function(a,b) {
				img.push($(b).find('img').attr('src'))
				nm.push($(b).find('h2').text())
				th.push($(b).find('a').attr('href'))
			})
			$('div.epztipe').each(function(d,c) {
				epz.push($(c).text())
			})
			$('div.newnime').each(function(f,g) {
				ne.push($(g).text())
			})
			$('div.epz').each(function(m,n){
				ep.push($(n).text())
			})
		for( let i = 0; i < img.length; i++){
			result.push({
				nama: nm[i],
				image: img[i],
				episode: ep[i],
				setiap: epz[i],
				rilis: ne[i],
				link: th[i]
			})
		}
		resolve(result)
		})
		.catch(reject)
	})
}

export { ongoing }

//module.exports = { Getongoing, Getdownload, Getdetail, Getsearch }