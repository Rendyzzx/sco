import whois from 'whois';
import util from 'util';
import parseRawData from '../lib/parse-raw-data.js';
const promis = util.promisify(whois.lookup);
async function lookupDomain(e) { // Ubah nama fungsi menjadi lookupDomain
    const json = await promis(e);
    const result = await parseRawData(json);

    if (result.nameServer) {
        result.nameServers = result.nameServer.split(' ');
        delete result.nameServer;
    }

    return {
        status: 200,
        creator: 'rama', // Anda perlu mendefinisikan wm sebelum menggunakannya
        result
    };
}

export { lookupDomain }