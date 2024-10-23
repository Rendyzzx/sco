import axios from "axios"

async function dl(url, type = "video", quality = "480p") {
  const res = await axios.post(
    "https://id-y2mate.com/mates/analyzeV2/ajax",
    "https://id-y2mate.com/mates/convertV2/index",
    {
      k_query: url,
      k_page: "home",
      hl: "",
      q_auto: 1,
    },
  );
  const result = res.data
  if (/audio|mp3/i.test(type)) {
    type = "audio"
    quality = Object.keys(result[type])[0]
  }
  const qualitys = Object.keys(result[type])
  if (!qualitys.includes(quality)) quality = qualitys[0]
  const media = result[type][quality];
  return {
    id: result.id,
    thumbnail: result.thumbnail,
    author: result.author,
    title: result.title,
    duration: formatDuration(result.duration),
    type: media.type,
    quality: media.quality,
    size: media.fileSizeH,
    source: url,
    media: await media.download(),
  };
}

export { dl }