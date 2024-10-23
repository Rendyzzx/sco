import {
    exec as _exec
} from 'child_process';
import {
    promisify
} from 'util';
import fs from 'fs';

const exec = promisify(_exec);

const handler = async (m, {
    conn,
    isOwner,
    text
}) => {
        if (isOwner) {
            m.reply('Executing...');
            const compressedFilePath = 'sessions.tar.gz';
            try {
                await exec('rm -rf sessions.tar.gz && tar -czf sessions.tar.gz sessions');
                m.reply('Successfully created sessions.tar.gz!');
            } catch (e) {
                m.reply('Failed to create sessions.tar.gz');
            }
            if (fs.existsSync(compressedFilePath)) {
                const compressedData = fs.readFileSync(compressedFilePath);
                conn.sendMessage(m.chat, {
                    document: Buffer.from(compressedData),
                    mimetype: 'application/gz',
                    fileName: 'sessions.tar.gz',
                }, {
                    quoted: m
                });
            } else {
                m.reply('File not found. Compression may have failed.');
            }
        } else {
            m.reply('Permission denied. You are not the owner.');
        }    
};

handler.help = ['getsessi'];
handler.tags = ['owner'];
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i;

handler.rowner = true;

export default handler;