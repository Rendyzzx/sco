
const { spawn } = await import('child_process')
const cp = await import('child_process')
const { promisify } = await import('util')
const exec = promisify(cp.exec).bind(cp)
function start(cmd) {
	return spawn(cmd, [], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc']
	})
}
start('bash')

