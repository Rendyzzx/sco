import didyoumean from 'didyoumean'
import similarity from 'similarity'
export async function before(m, { match, usedPrefix, command }) {
	if (usedPrefix) return await conn.sendPresenceUpdate('available', m.id)
}
//export const disabled = false