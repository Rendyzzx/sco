import axios from "axios";
import * as cheerio from "cheerio";
import request from "request";
import crypto from "crypto";

async function remini(url, apikey) {
  const content = (await conn.getFile(url)).data,
    md5Hash = crypto.createHash("md5").update(content).digest("base64"),
    client = axios.create({
      baseURL: "https://developer.remini.ai/api",
      headers: {
        Authorization: `Bearer ${apikey}`
      },
      timeout: 6e4
    }),
    submitTaskResponse = await client.post("/tasks", {
      tools: [{
        type: "face_enhance",
        mode: "beautify"
      }, {
        type: "background_enhance",
        mode: "base"
      }],
      image_md5: md5Hash,
      image_content_type: "image/jpeg"
    }),
    taskID = submitTaskResponse.data.task_id,
    uploadURL = submitTaskResponse.data.upload_url,
    uploadHeaders = submitTaskResponse.data.upload_headers;
  await axios.put(uploadURL, content, {
    headers: uploadHeaders
  }), await client.post(`/tasks/${taskID}/process`);
  for (let i = 0; i < 50; i++) {
    const getTaskResponse = await client.get(`/tasks/${taskID}`);
    if ("completed" === getTaskResponse.data.status) return getTaskResponse.data.result.output_url;
    if ("processing" !== getTaskResponse.data.status) return "Found illegal status: " + getTaskResponse.data.status;
    await new Promise(resolve => setTimeout(resolve, 2e3));
  }
}

export { remini }