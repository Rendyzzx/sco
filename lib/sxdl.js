import axios from "axios";

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function sdxlAnime(prompt) {
  try {
    return await new Promise(async(resolve, reject) => {
      if(!prompt) return reject("failed reading undefined prompt!");
      axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
        prompt,
        negativePrompt: null,
        key: "Soft-Anime",
        width: 512,
        height: 768,
        quantity: 1,
        size: "512x768"
      }).then(res => {
        const data = res.data;
        if(data.code !== 0) return reject(data.message);
        if(data.data.safetyState === "RISKY") return reject("nsfw image was generated, you try create other image again!")
        if(!data.data?.url) return reject("failed generating image!")
        return resolve({
          status: true,
          image: data.data.url
        })
      }).catch(reject)
    })
  } catch (e) {
    return {
      status: false,
      message: e
    }
  }
}

export { sdxlAnime };