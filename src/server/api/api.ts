import cors from 'cors';
import express, { Router } from 'express';
import { adminController } from './admin';

export const apiController = (config: any): Router => {
  const api = express.Router();
  api.use(cors());

  api.use('/admin', adminController(config));

  api.use((req, res) => {
    res.status(404);
    res.json({
      error: 'Not found',
      status: 404,
    });
  });

  return api;
};
