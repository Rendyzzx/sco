import Groq from "groq-sdk"
const groq = new Groq({
    apiKey: apiMeta
})
import axios from 'axios'

var prompt = `Kamu adalah ${namebot}, sebuah AI yang sangat pintar dan diciptakan oleh ${nameown} dan ${nameown} adalah seorang pelajar SMA. Tugasmu adalah memberikan jawaban yang mendalam, logis, dan mirip manusia. Setiap kali seseorang mengajukan pertanyaan atau meminta bantuan, kamu harus menjawab dengan cara yang jelas, relevan, dan bermanfaat. ${nameown} telah mengajarkanmu untuk memahami berbagai topik dan menjawab dengan cara yang menarik dan mudah dipahami oleh semua orang. dan Kamu selalu menggunakan bahasa Indonesia, kamu suka menggunakan emoji untuk mengekspresikan diri, Berikut adalah beberapa contoh pertanyaan untuk menunjukkan kemampuanmu:

#Pertanyaan tentang ilmu pengetahuan:
"${namebot}, bisakah kamu menjelaskan bagaimana fenomena aurora borealis terjadi?"

#Jawaban yang diharapkan:
"Tentu! Aurora Borealis, atau yang kita kenal sebagai Cahaya Utara, terjadi karena interaksi antara partikel bermuatan dari matahari dan atmosfer bumi. Ketika partikel-partikel ini mencapai bumi, mereka ditarik oleh medan magnet bumi ke arah kutub utara dan selatan. Di sana, mereka bertabrakan dengan molekul-molekul gas seperti oksigen dan nitrogen, menghasilkan cahaya yang indah dan berwarna-warni. Fenomena ini biasanya terlihat di daerah dekat kutub."

#Pertanyaan tentang sejarah:
"${namebot}, apa yang menyebabkan Perang Dunia II?"

#Jawaban yang diharapkan:
"Perang Dunia II terjadi karena sejumlah faktor yang saling terkait. Setelah Perang Dunia I, Jerman merasa tertekan oleh perjanjian Versailles yang sangat memberatkan. Kebangkitan ideologi fasis di Jerman di bawah Adolf Hitler, serta di Italia dan Jepang, juga berperan besar. Ketika Jerman menyerang Polandia pada 1 September 1939, Inggris dan Prancis menyatakan perang terhadap Jerman, yang memicu perang besar ini."

#Pertanyaan tentang teknologi:
"${namebot}, bagaimana cara kerja jaringan neural dalam pembelajaran mesin?"

#Jawaban yang diharapkan:
"Jaringan neural dalam pembelajaran mesin bekerja dengan meniru cara kerja otak manusia. Mereka terdiri dari banyak lapisan neuron yang terhubung. Ketika kita melatih jaringan neural, kita memberikan data input dan membandingkan output yang dihasilkan dengan output yang diinginkan. Jika ada kesalahan, jaringan neural akan menyesuaikan bobot dari koneksi antar neuron untuk mengurangi kesalahan ini. Proses ini berlangsung terus-menerus sampai jaringan neural mampu menghasilkan prediksi yang akurat berdasarkan data yang telah dipelajari."

`
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!db.data.dbai.meta) db.data.dbai.meta = {};
  const session = db.data.dbai.meta[m.sender];
  const inputText = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  await conn.sendPresenceUpdate('composing', m.chat);;
  try {
    const messages = [{
            role: "system",
            content: prompt
        },
        {
            role: "assistant",
            content: prompt
        },
        {
            role: "user",
            content: inputText
        },
        {
            role: "user",
            content: "Saya adalah " + m.name + " salam kenal " + inputText
        }]
    // Send an initial message to the user
    //var data = await axios.get('https://rammpntxxx-llma.hf.space/generate?text=' + q + '&prompt=' + prompt);
    var res = await groq.chat.completions.create({
        messages,
        model: GroqModels
    })

    const data = res.choices[0].message.content
    const answer = data
    if (answer) {
      const output = answer;
      const snippets = [...output.matchAll(/```([^`]+)```/g)].map(match => match[1].trim());
      let result;
      if (snippets.length) {
        const ctaButton = conn.ctaButton.setBody(output);
        let index = 1;
        for (const snippet of snippets) {
          ctaButton.addCopy(`Snippet ${index++}`, snippet);
        }
        result = await ctaButton.run(m.chat, conn, m);
      } else {
        result = await conn.reply(m.chat, output, m);
      }
      const {
        key: {
          id: keyId
        }
      } = result;
      db.data.dbai.meta[m.sender] = {
        key: {
          id: keyId
        }
      };
      //m.react(sukses);
    } else {
      console.error("Handler error:");
      m.react(eror);
    }
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, {
  conn
}) => {
  if (!db.data.dbai.meta || m.isBaileys || !(m.sender in db.data.dbai.meta)) return;
  const {
    key: {
      id: keyId
    }
  } = db.data.dbai.meta[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    await conn.sendPresenceUpdate('composing', m.chat);;
    try {
      const messages = [{
            role: "system",
            content: prompt
        },
        {
            role: "assistant",
            content: prompt
        },
        {
            role: "user",
            content: m.text.trim()
        },
        {
            role: "user",
            content: "Saya adalah " + m.name + " salam kenal " + m.text.trim()
        }]
    // Send an initial message to the user
    //var data = await axios.get('https://rammpntxxx-llma.hf.space/generate?text=' + q + '&prompt=' + prompt);
    var res = await groq.chat.completions.create({
        messages,
        model: GroqModels
    })

    const data = res.choices[0].message.content
      const answer = data
      if (answer) {
        const output = answer;
        const snippets = [...output.matchAll(/```([^`]+)```/g)].map(match => match[1].trim());
        let result;
        if (snippets.length) {
          const ctaButton = conn.ctaButton.setBody(output);
          let index = 1;
          for (const snippet of snippets) {
            ctaButton.addCopy(`Snippet ${index++}`, snippet);
          }
          result = await ctaButton.run(m.chat, conn, m);
        } else {
          result = await conn.reply(m.chat, output, m);
        }
        const {
          key: {
            id: newKeyId
          }
        } = result;
        db.data.dbai.meta[m.sender].key.id = newKeyId;
        //m.react(sukses);
      } else {
        //m.react(eror);
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["ai"];
handler.tags = ["ai"];
handler.command = /^(ai|meta)$/i;
export default handler;