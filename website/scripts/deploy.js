import { NodeSSH } from 'node-ssh';
import prompt from 'prompt';

const instance = process.argv[2] ?? 'dev';

const remoteDir = `/var/www/${instance}.kodim.cz/website`;
console.info(`Deploying to ${remoteDir}`);

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
  (await ssh.execCommand(`supervisorctl stop kodim_${instance}`)).stdout,
);
await ssh.execCommand('rm -rf .next/* .next node_modules', { cwd: remoteDir });
console.info(
  (await ssh.execCommand('npm clean-install --production', { cwd: remoteDir })).stdout,
);
console.info(
  (await ssh.execCommand('npm run build', { cwd: remoteDir })).stdout,
);
console.info(
  (await ssh.execCommand(`supervisorctl start kodim_${instance}`)).stdout,
);

ssh.dispose();
