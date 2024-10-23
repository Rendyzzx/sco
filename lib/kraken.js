import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
import {
    FormData,
    Blob
} from "formdata-node";
import {
    fileTypeFromBuffer
} from "file-type";

const uloadUrlRegexStr = /url: "([^"]+)"/;
const referer = "https://krakenfiles.com";

const createFormData = async (content, fieldName, ext) => {
    const {
        mime
    } = await fileTypeFromBuffer(content) || {};
    const blob = new Blob([content], {
        type: mime
    });
    const formData = new FormData();
    formData.append(fieldName, blob, `${randomBytes}.${ext}`);
    return formData;
};

async function kraken(content) {
    try {
        const {
            data
        } = await axios.get(referer);
        const uploadUrl = data.match(uloadUrlRegexStr)?.[1];
        if (!uploadUrl) throw new Error("No regex match.");
        const {
            ext,
            mime
        } = await fileTypeFromBuffer(content) || {};
        const formData = await createFormData(content, "files[]", ext);
        const response = await axios.post(uploadUrl, formData, {
            headers: {
                Referer: referer,
                "Content-Type": "multipart/form-data"
            },
        });
        const {
            files
        } = response.data;
        const file = files[0];
        console.log("Uploaded to Krakenfiles.com")
        const html = await (await fetch(referer + file.url)).text();
        const linkValue = cheerio.load(html)('#link1').val();
        return linkValue;
    } catch (error) {
        console.log(error)
    }
}

export {
    kraken
}