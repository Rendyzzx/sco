import axios from 'axios' 
async function tiktok(url) {
	let res = await axios.post('https://www.tikwm.com/api', {}, {
		params: { url, count: 12, cursor: 0, web: 1, hd: 1 }
	})
	return res.data
}
export {
  tiktok,
}