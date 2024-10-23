import axios from "axios"

async function askGpt(messages) {
  let res = await axios({
    method: "POST",
    url: "https://omniplex.ai/api/chat",
    data: {
      "frequency_penalty": 0,
      "max_tokens": 512,
      messages,
  "model": "gpt-3.5-turbo",
  "presence_penalty": 0,
  "temperature": 1,
  "top_p": 1
    },
    headers: {
      "User-Agent": "okhttp/4.9.0",
      "Referer": "https://omniplex.ai/",
      "Origin": "https://omniplex.ai"
    }
  })  
  return res.data
}

export { askGpt }