import express from 'express';
import { GroupModel, UserModel } from './db';

export const api = express.Router();

api.use(async (req, res, next) => {
  if (req.session.user === undefined) {
    res.status(403);
    res.send();
    return;
  }

  if (req.session.user.login !== 'podlomar') {
    res.status(403);
    res.send();
    return;
  }

  next();
});

api.get('/groups', async (req, res) => {
  const groups = await GroupModel.find();
  res.send(groups.map((group) => ({
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${group.name}`,
    data: {
      name: group.name,
    },
  })));
  res.send(groups);
});

api.get('/groups/:name', async (req, res) => {
  const group = await GroupModel.findOne({ name: req.params.name });
  if (group === null) {
    res.status(404);
    res.send();
    return;
  }

  const users = await UserModel.find({ groups: group.id });
  res.send({
    ...group.toObject(),
    users: users.map((user) => ({
      type: 'users',
      data: {
        url: `${req.protocol}://${req.get('host')}${req.baseUrl}/users/${user.login}`,
        login: user.login,
        name: user.name,
      },
    })),
  });
});

api.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.send(users.map((user) => ({
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.login}`,
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
    url: `${req.protocol}://${req.get('host')}${req.baseUrl}/groups/${group.name}`,
    name: group.name,
  }));

  res.send({
    ...user.toObject(),
    groups,
  });
});
