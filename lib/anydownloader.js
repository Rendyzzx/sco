import fetch from "node-fetch";

async function download(URL) {
  try {
    const response = await fetch("https://anydownloader.com/wp-json/aio-dl/video-data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        url: URL,
        token: "d3113b033987d7debe39e8b117bc27b1afdf8f9c423723be3ffbe226767a6f76"
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Terjadi kesalahan saat mengambil data.");
  }
}

export { download }