import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export default async buffer => {
	let { ext } = await fileTypeFromBuffer(buffer)
	let form = new FormData()
	form.append('file', buffer, `${~~(Math.random() * 9e5)}.${ext}`)
	let response = await axios.post('https://xzn.wtf/up/upload', form, { headers: form.getHeaders() }).catch(e => e.response)
	return response.data
}