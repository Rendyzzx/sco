import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";
import fetch from "node-fetch";
async function toAnime(url) {
	return new Promise(async (resolve, reject) => {
		const formData = new FormData();
		formData.append("image-url", url);
		await axios
			.post("https://tools.revesery.com/image-anime/convert.php", formData, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				resolve(error?.response);
			});
	});
}
export  {
toAnime
}