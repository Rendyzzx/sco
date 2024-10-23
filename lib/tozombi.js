import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

async function ToZombi(imageBuffer) {
    try {
        const { ext, mime } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], { type: mime });
        form.append('image', blob, 'image.' + ext);

        const response = await fetch("https://deepgrave-image-processor-no7pxf7mmq-uc.a.run.app/transform_in_place", {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }

        const base64Data = await response.text();
        
        // Convert base64 to image buffer and return it
        return Buffer.from(base64Data, 'base64');
    } catch (error) {
        return null;
    }
}

export { ToZombi }