import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import json5 from 'json5';
import { KodimCms } from 'kodim-cms';
import { AccessGrantAll } from 'kodim-cms/esm/content/access-check.js';
import { CmsApp } from 'kodim-cms/esm/server.js';
import mongoose from 'mongoose';
import { apiController } from './api/api';
import { appController } from './app';

const config = json5.parse(fs.readFileSync('./server-config.json5', 'utf-8'));

await mongoose.connect(config.dbUrl);

const cms = await KodimCms.load(config.contentDir, `${config.serverUrl}/cms`);
const cmsApp = new CmsApp(cms, () => new AccessGrantAll());

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/', express.static('./public'));
server.use('/assets', express.static('./assets', { fallthrough: false }));
server.use('/js', express.static('./js', { fallthrough: false }));
server.use('/changelog', express.static('../changelog', { fallthrough: false }));

server.use('/cms', cmsApp.router);
server.use('/api', apiController(config));
server.use(appController(config, cms));

server.listen(config.port, () => {
  console.info(`Serving on localhost:${config.port}`);
});
