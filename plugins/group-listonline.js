let handler = async (m, { conn }) => {
  let online = [...Object.keys(conn.chats), conn.user.jid];

  let res = online
    .filter((v) => v.includes("@s.whatsapp.net"))
    .map((i) => "@" + i.split("@s.whatsapp.net")[0] + "\n")
    .join("");

  const gc = await conn.groupMetadata(m.chat);
  const mem = gc?.participants || [];
  const sortedParticipants = mem
    .sort((a, b) => {
      const totalMessagesA = res[a.id] || 0;
      const totalMessagesB = res[b.id] || 0;
      return totalMessagesB - totalMessagesA;
    })
    .filter((participant) => online.includes(participant.id));

  const participantMessages = sortedParticipants.map((participant, index) => {
    const totalMessages = res[participant.id] || 0;
    return `${index + 1} @${participant.id.split("@")[0]}`;
  });

  const finalText = `*List Online:*\n\n${participantMessages.join('\n')}`;

  conn.reply(m.chat, finalText, m, { mentions: online.filter((v) => v) });
};

handler.help = ["listonline"];
handler.tags = ["group"];
handler.command = /^(list(on(line)?))$/i
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;