import sharp from "sharp";

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted;
	if (!q) {
		return m.reply(
			'Reply Foto nya'
		);
	}

	let mime = (q.msg || q).mimetype || "";

	if (!mime.startsWith("image/")) {
		return m.reply(
			`Hanya Bisa untuk Foto`,
		);
	}
	try {
	    m.react(waits)
	    m.reply('Wait 1/5 minute')
		// Download gambar
		let media = await q.download();
		console.log("Media downloaded successfully.");

		// memuat gambar dengan sharp
		const image = sharp(media);

		// mendapatkan metadata gambar
		const metadata = await image.metadata();

		// naikin dimensi
		const newWidth = metadata.width * 7;
		const newHeight = metadata.height * 7;

		image.resize(newWidth, newHeight);

		// effect to enhance sharpness
		image.sharpen();

		// JPEG format with 80% quality
		const buffer = await image.jpeg({ quality: 100 }).toBuffer();

		// Send the enhanced image as a file with the caption "Ini Foto HD nya kak"
		m.react(done)
		conn.sendFile(
			m.chat,
			buffer,
			"enhanced_image.jpg",
			me,
			m,
		);
		console.log("Enhanced image sent to user.");
	} catch (error) {
		console.error("Error in enhancing:", error);
		m.reply(eror);
	}
};

handler.help = handler.command =  ["hdr"];
handler.tags = ['tools'];

export default handler;