import express, { Router } from 'express';
import { GroupModel, UserModel } from '../db';

const allowedUsers = ['podlomar', 'FilipChalupa'];

export const adminController = (config: any): Router => {
  const admin = express.Router();

  admin.use(async (req, res, next) => {
    const login: string | undefined = req.auth?.login;
    if (!allowedUsers.includes(login ?? '')) {
      res.status(403);
      res.send();
      return;
    }

    next();
  });

  admin.get('/groups', async (req, res) => {
    const groups = await GroupModel.find();
    res.json(
      groups.map((group) => ({
        url: `${config.serverUrl}${req.originalUrl}/${group.name}`,
        data: {
          name: group.name,
        },
      })),
    );
  });

  admin.get('/groups/:name', async (req, res) => {
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

  admin.post('/groups/:name', async (req, res) => {
    const group = await GroupModel.findOne({ name: req.params.name });
    if (group === null) {
      res.sendStatus(404);
      return;
    }

    const validActions = ['grantExcAccess', 'revokeExcAccess'];

    const { action } = req.query;

    if (typeof action !== 'string') {
      res.status(400);
      res.send({
        error: 'Invalid or missing query param "action"',
      });
      return;
    }

    if (!validActions.includes(action)) {
      res.status(400);
      res.send({
        error: `Invalid action "${action}"`,
      });
      return;
    }

    const { lesson, excType } = req.body;

    if (typeof lesson !== 'string') {
      res.status(400);
      res.send({
        error: 'Missing valid "lesson" attribute',
      });
      return;
    }

    if (!/^(\/[a-zA-Z0-9_-]+){4}$/.test(lesson)) {
      res.status(400);
      res.send({
        error: 'The "lesson" attribute is not a well formed lesson path',
      });
      return;
    }

    if (typeof excType !== 'string') {
      res.status(400);
      res.send({
        error: 'Missing valid "excType" attribute',
      });
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(excType)) {
      res.status(400);
      res.send({
        error: 'The "excType" attribute is not a well formed exercise type',
      });
      return;
    }

    const claim = `${lesson}/*/${excType}>*`;

    if (action === 'grantExcAccess') {
      if (group.claims.content.includes(claim)) {
        res.status(400);
        res.send({
          error: `This group already grants access to lesson exercises "${claim}"`,
        });
        return;
      }

      group.claims.content.push(claim);
      await group.save();

      res.send(group.claims);
      return;
    }

    if (action === 'revokeExcAccess') {
      const index = group.claims.content.findIndex((c) => c === claim);

      if (index === -1) {
        res.status(400);
        res.send({
          error: `This group does not grant access to lesson exercises "${claim}"`,
        });
        return;
      }

      group.claims.content.splice(index, 1);
      await group.save();

      res.send(group.claims);
    }
  });

  admin.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.json(
      users.map((user) => ({
        url: `${config.serverUrl}${req.originalUrl}/${user.login}`,
        data: {
          login: user.login,
          name: user.name,
        },
      })),
    );
  });

  admin.get('/users/:login', async (req, res) => {
    const user = await UserModel.findOne({ login: req.params.login }).populate(
      'groups',
    );
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

  return admin;
};
