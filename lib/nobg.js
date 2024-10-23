import axios from "axios";

async function removebg(buffer) {
  try {
    if (!buffer) return { status: false, message: "undefined reading buffer" };
    
    const image = buffer.toString("base64");

    const response = await axios.post("https://us-central1-ai-apps-prod.cloudfunctions.net/restorePhoto", {
      image: `data:image/png;base64,${image}`,
      model: "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003"
    });

    const data = response.data;
    console.log(response.status, data);
    
    if (!data || data.includes('Failed')) {
      return { status: false, message: 'Failed to restore image' };
    }

    return {
      status: true,
      image: data.replace(/\"/g, "")
    };
    
  } catch (e) {
    return { status: false, message: e.message };
  }
}

export { removebg };