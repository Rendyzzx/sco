let handler = async (m, {
    conn,
    args
}) => {
	await m.react(waits)
	
	let groups = Object.keys(await conn.groupFetchAllParticipating())
	await Promise.all(
		groups.map(jid => conn.chatModify({ delete: true, lastMessages: [m] }, jid))
	)
	
	return m.reply(`Successfully deleted messages in ${groups.length} groups`)
}

handler.help = handler.command = ['clearchat']
handler.tags = ['owner']
handler.owner = true

export default handler