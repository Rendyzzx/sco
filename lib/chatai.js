// *# Vestia Zeta C.AI*
import axios from 'axios'

async function chat(message) {
  try {
    if(!message) return { status: false, message: "undefined reading message" };
    return await new Promise((resolve, reject) => {
      axios.post("https://backend.aichattings.com/api/v2/chatgpt/talk", {
        msg: message,
        model: "gpt3",
        locale: "ai-characters",
        role_id: 150,
        ep_user_id: 25560
      }).then(async res => {
        const data = res.data;
        if(!data) return reject("failed getting response from zeta!");
        resolve({
          status: true,
          answer: data
        })
      }).catch(reject)
    })
  } catch (e) {
    return { status: false, message: e };
  }
}

export { chat };