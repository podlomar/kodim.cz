/* eslint-disable import/no-extraneous-dependencies */
import { NodeSSH } from 'node-ssh';
import prompt from 'prompt';

const remoteDir = '/var/www/stage.kodim.cz';

prompt.start();
const { username, password } = await prompt.get({
  properties: {
    username: {
      required: true,
    },
    password: {
      hidden: true,
    },
  },
});

const ssh = new NodeSSH();
await ssh.connect({
  host: 'podlomar.me',
  port: 22,
  username,
  password,
});

console.info(
  (await ssh.execCommand('supervisorctl stop kodim_stage')).stdout,
);
await ssh.execCommand('rm -rf dist/* node_modules package*', { cwd: remoteDir });
await ssh.putDirectory('./dist', `${remoteDir}/dist`, {
  recursive: true,
  tick: (localFile) => {
    console.info(localFile);
  },
});
await ssh.putFile('./package.json', `${remoteDir}/package.json`);
console.info('package.json');
await ssh.execCommand('cp server-config.json5 dist/', { cwd: remoteDir });

console.info(
  (await ssh.execCommand('npm install --production', { cwd: remoteDir })).stdout,
);
console.info(
  (await ssh.execCommand('supervisorctl start kodim_stage')).stdout,
);

ssh.dispose();
