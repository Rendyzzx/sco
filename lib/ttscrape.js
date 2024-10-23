import axios from 'axios';
import cheerio from'cheerio';
import fetch from 'node-fetch';
import https from "https";
import qs from "qs";
const Utils = "https://api.tiklydown.link";

function v1(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("url input is required"));
    Axios.get(Utils.API_URL + "/api/download", { params: { url } })
      .then((b) => resolve(b.data))
      .catch(reject);
  });
}

function v2(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error("url input is required"));
    Axios.get(Utils.API_URL + "/api/download/v2", { params: { url } })
      .then((b) => resolve(b.data))
      .catch(reject);
  });
}

export {
v1,
v2
}