import fetch from "node-fetch";
import axios from 'axios';
//import FormData from 'form-data';
import crypto from "crypto";
import { fileTypeFromBuffer } from 'file-type'
import {
    FormData,
    Blob
} from "formdata-node";

const randomBytes = crypto.randomBytes(5).toString("hex");

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

async function pomf(buffer) {
            try {
            const {
                ext
            } = await fileTypeFromBuffer(buffer) || {};
            const form = await createFormData(buffer, "files[]", ext);
            const res = await fetch("https://pomf2.lain.la/upload.php", {
                method: "POST",
                body: form
            });
            const json = await res.json();
            if (!json.success) throw json;            
            return json.files[0].url;
        } catch (error) {
            console.log(error)
        }
    }


export { pomf }