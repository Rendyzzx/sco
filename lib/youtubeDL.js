import axios from 'axios'

function youtube(Url, type) {
    return new Promise(async (resolve, reject) => {
        function rand() {
		    let randomNumbers = ''
            for (let i = 0; i < 4; i++) {
                randomNumbers += Math.floor(Math.random() * 10).toString()
            }
            return randomNumbers
        }
        const videoInfoUrl = "https://v4.mp3youtube.cc/api/getVideoInfo"
        const convertUrl = "https://v4.mp3youtube.cc/api/converter"
        const headers = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "https://v4.mp3youtube.cc/enIuX",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Cookie": "PHPSESSID=287kfgmr8f0skbv3kga91p7bv7"
        }
        try {
            const videoInfo = await axios.post(videoInfoUrl, new URLSearchParams({ link: Url }).toString(), { headers })
            if (videoInfo.status !== 200) return reject()
            const convert = await axios.post(convertUrl, new URLSearchParams({ link: Url, format: type }).toString(), { headers })
            if (convert.status !== 200) return reject()
            resolve({
                title: videoInfo?.data?.title ? videoInfo.data.title : `YouTube ${type == "mp4" ? "Video" : "Audio"} - ${rand()}`,
                thumbnail: videoInfo.data?.thumbnail,
                duration: videoInfo.data?.videoTime,
                link: convert.data.url
            })
        } catch (error) {
            reject()
        }
    })
}

export { youtube }