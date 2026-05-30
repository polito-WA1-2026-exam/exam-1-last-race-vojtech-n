'use strict';

import * as userService from '../services/user.service.js';
import { validateUsername, validatePassword } from '../utils/input-validation.js';

const registerUser = async(req, res, next) => {
  const { username, password } = req.body;

  if (!validateUsername) {
    return res.status(400).json({ error: 'Invalid username!' });
  }

  if (!validatePassword) {
    return res.status(400).json({ error: 'Invalid password!' });
  }

  try {
    await userService.registerUser(username, password);
    res.json({ success: true, data: 'User created successfuly'});
  } catch (err) {
    next(err);
  }
};

const getUsersByScore = async(req, res, next) => {
  try {
    const users = await userService.getUsersByScore();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

const updateBestScore = async(req, res, next) => {
  const username = req.params.username;
  const { newBestScore } = req.body;

  try {
    await userService.updateBestScore(username, newBestScore);
    res.json({ success: true, message: `Score updated for user ${username}` });
  } catch (err) {
    next(err);
  }
};

const registerGame = async(req, res, next) => {
  const username = req.params.username;

  try {
    await userService.registerGame(username);
    res.json({ success: true, message: `Played game registered for user ${username}` });
  } catch(err) {
    next(err);
  }
}

export { registerUser, getUsersByScore, updateBestScore, registerGame };