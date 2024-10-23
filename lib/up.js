import axios from 'axios';
import FormData from 'form-data';

async function uploadFile(buffer) {
    const tipe = await import('file-type');
    const { ext } = await tipe.fileTypeFromBuffer(buffer) || {};
    const form = new FormData();
    form.append("file", buffer, 'tmp.' + ext);
    try {
        const { data } = await axios({
            url: "https://tmpfiles.org/api/v1/upload",
            method: "POST",
            headers: {
                ...form.getHeaders()
            },
            data: form.getBuffer()
        });
        console.log(data);
        const ew = /https?:\/\/tmpfiles.org\/(.*)/.exec(data.data.url);
        return 'https://tmpfiles.org/dl/' + ew[1];
    } catch (e) {
        throw e;
    }
};

export { uploadFile }