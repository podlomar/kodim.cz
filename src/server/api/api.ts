import cors from 'cors';
import express, { Router } from 'express';
import { UserModel } from '../db';
import { adminController } from './admin';

export const apiController = (config: any): Router => {
  const api = express.Router();
  api.use(cors());

  api.use('/admin', adminController(config));

  api.get('/me', async (req, res) => {
    const user = await UserModel.findOne({ login: req.auth?.login });
    if (user === null) {
      res.status(401);
      res.json({ error: 'Not authorized' });
      return;
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  });

  api.use((req, res) => {
    res.status(404);
    res.json({
      error: 'Not found',
    });
  });

  return api;
};
