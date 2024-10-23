const handler = async (m, {
  text,
  usedPrefix,
  command,
  conn
}) => {
  if (!text) throw query
  m.reply("https://image.thum.io/get/fullpage/"+text)
};
handler.help = ["ssweb"];
handler.tags = ["tools"];
handler.command = /^(ss(web)?(shot)?)$/i;
export default handler;