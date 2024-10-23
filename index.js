console.log('Starting...')

import './config.js'
import yargs from 'yargs'
import cfonts from 'cfonts'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { createRequire } from 'module'
import { createInterface } from 'readline'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import terminalImage from 'terminal-image';

// https://stackoverflow.com/a/50052194
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const taylorImage = fs.readFileSync(join(__dirname, 'thumbnail.jpg'));
say(namebot, {
        font: 'chrome',
        align: 'center',
        gradient: ['blue', 'green']
    });
    /*console.log(await terminalImage.buffer(taylorImage, {
        width: 60
    }
    )
    );*/
/*say('R-BOT', { font: 'chrome', align: 'center', gradient: ['red', 'blue'] })
say(`Happy Surfing`, { font: 'console', align: 'center', gradient: ['red', 'magenta'] })*/

var isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', gradient: ['red', 'magenta'] })
  setupMaster({ exec: args[0], args: args.slice(1) })
  let p = fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case "reset":
        console.log("saatnya reset");
        p.process.kill();
        //isRunning = false;
        start.apply(this, arguments);
        break;
      case "null":
        p.process.kill();
        //isRunning = false;
        start.apply(this, arguments);
        break;
      case "SIGKILL":
        p.process.kill();
        //isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;  
     case 'sigsegv':
      p.process.kill()
      //isRunning = false
      start.apply(this, arguments)
      break
      }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('Exited with code:', code)
    if (code !== 0) return start(file)
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')