import express, { Router } from 'express';
import { GroupModel, UserModel } from './db';

const allowedUsers = ['podlomar', 'FilipChalupa'];

export const apiController = (config: any): Router => {
  const api = express.Router();

  api.use(async (req, res, next) => {
    const login: string | undefined = req.auth?.login;
    if (!allowedUsers.includes(login ?? '')) {
      res.status(403);
      res.send();
      return;
    }

    next();
  });

  api.get('/groups', async (req, res) => {
    const groups = await GroupModel.find();
    res.json(groups.map((group) => ({
      url: `${config.serverUrl}${req.originalUrl}/${group.name}`,
      data: {
        name: group.name,
      },
    })));
  });

  api.get('/groups/:name', async (req, res) => {
    const group = await GroupModel.findOne({ name: req.params.name });
    if (group === null) {
      res.sendStatus(404);
      return;
    }

    const users = await UserModel.find({ groups: group.id });
    res.json({
      ...group.toObject(),
      users: users.map((user) => ({
        type: 'users',
        data: {
          url: `${config.serverUrl}${req.baseUrl}/users/${user.login}`,
          login: user.login,
          name: user.name,
        },
      })),
    });
  });

  api.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.json(users.map((user) => ({
      url: `${config.serverUrl}${req.originalUrl}/${user.login}`,
      data: {
        login: user.login,
        name: user.name,
      },
    })));
  });

  api.get('/users/:login', async (req, res) => {
    const user = await UserModel.findOne({ login: req.params.login }).populate('groups');
    if (user === null) {
      res.status(404);
      res.send();

      return;
    }

    const groups = user.groups.map((group) => ({
      url: `${config.serverUrl}${req.baseUrl}/groups/${group.name}`,
      name: group.name,
    }));

    res.json({
      ...user.toObject(),
      groups,
    });
  });

  return api;
};
