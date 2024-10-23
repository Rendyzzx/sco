let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    conn.sessi = conn.sessi ? conn.sessi : {}; 
    conn.sessi[m.sender] = {
        pesan: []
    };
  m.reply('Pilih input:\n\n[1]. 1 (✅)\n[2]. 2 (✨)')
};

handler.before = async (m, {
    conn
}) => {
  conn.sessi = conn.sessi ? conn.sessi : {};  
  if (!conn.sessi[m.sender]) return; 
  const cleanText = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (conn.sessi[m.sender] && m.text) {
  if (m.quoted && m.quoted.text && m.quoted.fromMe && m.quoted.isBaileys && !global.prefix.test(m.text)) {  
  if (cleanText.trim().toUpperCase() === '1') {
  m.react("✅")
  m.reply("sesi chat testing ✅")
  } else if (cleanText.trim().toUpperCase() === '2') {
  m.react("✨")  
  m.reply("sesi chat testing ✨")
  } else return
  }
 }
};

handler.command = /^(sesichat|sesi)$/i;
handler.owner = true;

export default handler;