import axios from 'axios'

async function chatgpt(messages) {
  try {
    const {
      data
    } = await axios.post(`https://porno.sytes.net/ai/chatgpt`, {
      messages
    })
    
    return {
      status: true,
      result: data.result
    }
  } catch(e) {
    return {
      status: false,
      message: e.message
    }
  }
}

export { chatgpt }