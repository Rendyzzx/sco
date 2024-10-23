import { Axios } from "./func/Utils.js"
import { StatusWaIndonesiaBaseUrl } from "./func/Constant.js"
import { errorHandling } from "./func/Interface.js"
import { StatusWaIndonesiaAny } from "./func/Types.js"

async function popular (page = "1", seed = "6316") {
	   try {
		const { data } = await Axios.request({
			url:
				StatusWaIndonesiaBaseUrl +
				"/videostatus_studio/videostatus_indonesia/get_new_video_portrait.php",
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			data: new URLSearchParams({ seed, page, type: "popular" })
		}).catch((e) => e.response)
		if (data && typeof data === "object") {
			return data.items
		} else {
			throw new Error(`data: ${typeof data}`)
		}
	} catch (e) {
		return {
			error: true,
			message: String(e)
		}
	}
}
async function search(query = string, page = "1", seed = "3013") {
	try {
		const { data } = await Axios.request({
			url:
				StatusWaIndonesiaBaseUrl +
				"/videostatus_studio/videostatus_indonesia/get_new_video_portrait.php",
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			data: new URLSearchParams({ s: query, seed, page, type: "search" })
		}).catch((e) => e.response)
		if (data && typeof data === "object") {
			return data.items
		} else {
			throw new Error(`data: ${typeof data}`)
		}
	} catch (e) {
		return {
			error: true,
			message: String(e)
		}
	}
}
export { popular, search }