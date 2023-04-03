import cors from 'cors';
import express, { ErrorRequestHandler, Router } from 'express';
import { authController } from './auth';
import { adminController } from './admin';

export const apiController = (config: any): Router => {
  const api = authController(config);
  api.use(cors());
  api.use(express.json());

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({ error: 'Invalid credentials' });
    } else {
      next(err);
    }
  };

  api.use(errorHandler);

  api.use('/admin', adminController(config));

  api.get('/me', async (req, res) => {
    const user = req.account?.user;
    if (user === undefined) {
      res.status(403);
      res.json({ error: 'Not authenticated' });
      return;
    }

    res.json({
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
