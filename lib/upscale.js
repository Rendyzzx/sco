import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

class ImgLarger {
  constructor() {
    this.baseURL = 'https://get1.imglarger.com/api/Upscaler';
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://imgupscaler.com',
      'Referer': 'https://imgupscaler.com/',
      'User-Agent': 'Postify/1.0.0',
      'X-Forwarded-For': Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.'),
    };
  }

  async uploadImage(input, scaleRadio = 2, isLogin = 0) {
    const formData = new FormData();

    if (typeof input === 'string') {
      if (input.startsWith('http')) {
        try {
          const response = await axios.get(input, { responseType: 'arraybuffer' });
          const bf = Buffer.from(response.data);
          formData.append('myfile', bf, { filename: 'uploaded_image.jpg' });
        } catch (error) {
          console.error(error.message);
          throw new Error('Link gambar tidak dapat diunduh. Silakan coba lagi.');
        }
      } else {
        try {
          const bf = fs.readFileSync(input);
          const fileName = path.basename(input);
          formData.append('myfile', bf, { filename: fileName });
        } catch (error) {
          console.error(error.message);
          throw new Error('Tidak dapat membaca Path File yang diInputkan. Silakan periksa path file nyaa...');
        }
      }
    } else if (Buffer.isBuffer(input)) {
      formData.append('myfile', input, { filename: 'uploaded_image.jpg' });
    } else {
      throw new Error('Input tidak valid. Harap berikan path file, link gambar, atau buffer yang benar.');
    }

    formData.append('scaleRadio', scaleRadio);
    formData.append('isLogin', isLogin);

    try {
      console.log('Sedang mengupload gambar, mohon ditunggu...');
      const response = await axios.post(`${this.baseURL}/Upload`, formData, {
        headers: {
          ...this.headers,
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: progressEvent => {
          this.showProgress(progressEvent.loaded, progressEvent.total);
        }
      });
      
      if (response.data.code === 999) {
        console.error('Error: ', response.data.msg);
        throw new Error('Authorization nya ditolak oyy 🤣 soalnya limit lu nya udah habis 😎');
      }

      console.log('Upload gambar selesai :', response.data);
      return response.data;
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      throw new Error('Upload gambar gagal. Silakan periksa response API.');
    }
  }

  showProgress(loaded, total) {
    const percentage = Math.round((loaded / total) * 100);
    process.stdout.write(`\rUploading : ${percentage}%\n`);
  }

  async checkStatus(code, scaleRadio, isLogin) {
    const payload = { code, scaleRadio, isLogin };
    try {
      const response = await axios.post(`${this.baseURL}/CheckStatus`, payload, {
        headers: this.headers,
      });
      return response.data; 
    } catch (error) {
      console.error(error.message);
      throw new Error('Pemeriksaan status task gagal.');
    }
  }

  async processImage(input, scaleRadio = 2, isLogin = 0) {
    const { data: { code } } = await this.uploadImage(input, scaleRadio, isLogin);
    let status;
    do {
      status = await this.checkStatus(code, scaleRadio, isLogin);
      console.log(`\nStatus task: ${status.data.status}`);

      if (status.data.status === 'waiting') {
        console.log('Upscale image nya masih diproses, sabar yakk...');
        await this.delay(5000);
      }
    } while (status.data.status === 'waiting');

    console.log('Proses selesai.');
    return status;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export { ImgLarger };